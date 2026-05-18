"""
Análisis estacionario completo — Proyecto Kaeser/CMPC
Resuelve todos los escenarios de operación y exporta resultados.
"""

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from sistema import SistemaRecuperacionCalor, rho_agua, cp_agua, mu_agua, k_agua


def main():
    # Cargar sistema
    base = Path(__file__).parent.parent
    sis = SistemaRecuperacionCalor.from_json(str(base / '01_datos/fichas_kaeser.json'))

    with open(base / '01_datos/fichas_kaeser.json') as f:
        data = json.load(f)

    escenarios = data['escenarios_operacion']

    # Resolver todos los escenarios
    resultados = {}
    for esc in escenarios:
        nombre = esc['nombre']
        equipos = esc['equipos_operando']
        res = sis.resolver_estacionario(equipos, epsilon_obj=0.85)
        resultados[nombre] = res
        print(f"\n=== Escenario: {nombre} ===")
        print(f"  Equipos: {equipos}")
        print(f"  Q total: {res['escenario']['Q_total_kW']:.1f} kW")
        print(f"  Area intercambiador: {sis.intercambiador.area:.3f} m2")
        print(f"  Epsilon: {res['intercambiador']['epsilon']:.3f}")
        print(f"  T_hot_out: {res['intercambiador']['T_hot_out_C']:.2f} C")
        print(f"  T_cold_out: {res['intercambiador']['T_cold_out_C']:.2f} C")
        print(f"  dP red: {res['red_hidraulica']['dP_total_mca']:.3f} m.c.a.")
        print(f"  Potencia bomba: {res['bomba']['potencia_freno_kW']:.3f} kW")
        print(f"  Autonomia acumulador: {res['acumulador']['tiempo_autonomia_min']:.1f} min")

    # Guardar resultados como JSON
    out_json = base / '03_resultados/resultados_estacionarios.json'
    # Serializar solo lo esencial
    serializable = {}
    for k, v in resultados.items():
        serializable[k] = {
            'Q_total_kW': v['escenario']['Q_total_kW'],
            'caudal_total_m3h': v['escenario']['caudal_total_m3h'],
            'area_intercambiador_m2': sis.intercambiador.area,
            'epsilon': v['intercambiador']['epsilon'],
            'T_hot_out_C': v['intercambiador']['T_hot_out_C'],
            'T_cold_out_C': v['intercambiador']['T_cold_out_C'],
            'dP_red_mca': v['red_hidraulica']['dP_total_mca'],
            'potencia_bomba_kW': v['bomba']['potencia_freno_kW'],
            'autonomia_acumulador_min': v['acumulador']['tiempo_autonomia_min']
        }
    with open(out_json, 'w') as f:
        json.dump(serializable, f, indent=2)
    print(f"\nResultados guardados en: {out_json}")

    # Tabla resumen CSV
    df_data = []
    for esc in escenarios:
        nombre = esc['nombre']
        r = resultados[nombre]
        df_data.append({
            'Escenario': nombre,
            'Demanda_aire_m3min': esc['demanda_aire_m3min'],
            'Frecuencia_%': esc['frecuencia_porcentaje'],
            'Equipos': '-'.join(map(str, esc['equipos_operando'])),
            'Q_total_kW': r['escenario']['Q_total_kW'],
            'Caudal_m3h': r['escenario']['caudal_total_m3h'],
            'Area_interc_m2': sis.intercambiador.area,
            'Epsilon': r['intercambiador']['epsilon'],
            'T_hot_out_C': r['intercambiador']['T_hot_out_C'],
            'T_cold_out_C': r['intercambiador']['T_cold_out_C'],
            'dP_red_mca': r['red_hidraulica']['dP_total_mca'],
            'Pot_bomba_kW': r['bomba']['potencia_freno_kW'],
            'Autonomia_min': r['acumulador']['tiempo_autonomia_min']
        })
    df = pd.DataFrame(df_data)
    df.to_csv(base / '03_resultados/tablas/escenarios_estacionarios.csv', index=False)
    print(f"Tabla CSV guardada en: {base / '03_resultados/tablas/escenarios_estacionarios.csv'}")

    # Figura: Comparación de escenarios
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))

    nombres = [e['nombre'] for e in escenarios]
    Qs = [resultados[n]['escenario']['Q_total_kW'] for n in nombres]
    areas = [sis.intercambiador.area for _ in nombres]  # misma area para todos
    dPs = [resultados[n]['red_hidraulica']['dP_total_mca'] for n in nombres]
    T_cold_outs = [resultados[n]['intercambiador']['T_cold_out_C'] for n in nombres]

    axes[0, 0].bar(nombres, Qs, color='steelblue')
    axes[0, 0].set_ylabel('Q total [kW]')
    axes[0, 0].set_title('Potencia térmica recuperable')
    axes[0, 0].tick_params(axis='x', rotation=45)

    axes[0, 1].bar(nombres, areas, color='coral')
    axes[0, 1].set_ylabel('Área [m2]')
    axes[0, 1].set_title('Área intercambiador (dimensionada al 80%)')
    axes[0, 1].tick_params(axis='x', rotation=45)

    axes[1, 0].bar(nombres, dPs, color='seagreen')
    axes[1, 0].set_ylabel('ΔP [m.c.a.]')
    axes[1, 0].set_title('Pérdida de carga red hidráulica')
    axes[1, 0].tick_params(axis='x', rotation=45)

    axes[1, 1].bar(nombres, T_cold_outs, color='darkorange')
    axes[1, 1].axhline(70, color='red', linestyle='--', label='Límite PTG (+70°C)')
    axes[1, 1].set_ylabel('T_cold_out [°C]')
    axes[1, 1].set_title('Temperatura agua caliente salida')
    axes[1, 1].legend()
    axes[1, 1].tick_params(axis='x', rotation=45)

    plt.tight_layout()
    fig.savefig(base / '03_resultados/figuras/comparacion_escenarios.png', dpi=300)
    print(f"Figura guardada en: {base / '03_resultados/figuras/comparacion_escenarios.png'}")

    # Figura: Curva del sistema (bomba)
    caudales = np.linspace(10, 45, 100)
    T_ref = 11.0
    alturas = [sis.red.deltaP_total(q, T_ref) / (rho_agua(T_ref) * 9.81) + 2.0 for q in caudales]

    fig2, ax2 = plt.subplots(figsize=(8, 5))
    ax2.plot(caudales, alturas, 'b-', linewidth=2, label='Curva del sistema')
    ax2.axvline(21.72, color='r', linestyle='--', label='Operación normal (21.7 m3/h)')
    ax2.axvline(32.93, color='orange', linestyle='--', label='Operación máxima (32.9 m3/h)')
    ax2.set_xlabel('Caudal [m3/h]')
    ax2.set_ylabel('Altura [m.c.a.]')
    ax2.set_title('Curva del sistema hidráulico')
    ax2.grid(True, alpha=0.3)
    ax2.legend()
    fig2.savefig(base / '03_resultados/figuras/curva_sistema_bomba.png', dpi=300)
    print(f"Figura guardada en: {base / '03_resultados/figuras/curva_sistema_bomba.png'}")

    plt.close('all')
    print("\n=== Análisis estacionario completado ===")


if __name__ == '__main__':
    main()
