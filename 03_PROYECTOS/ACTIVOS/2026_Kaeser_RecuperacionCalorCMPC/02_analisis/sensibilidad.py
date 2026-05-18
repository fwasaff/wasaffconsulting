"""
Análisis de sensibilidad paramétrica — Proyecto Kaeser/CMPC
Método: diferencias finitas centradas (riguroso, no requiere JAX)
Evalúa cómo varían Q_recuperado, T_cold_out y Area con ±10% de cada parámetro.
"""

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from sistema import SistemaRecuperacionCalor


def evaluar_modelo(sis, equipos, epsilon_obj=0.85):
    """Evalúa el modelo y retorna métricas clave."""
    res = sis.resolver_estacionario(equipos, epsilon_obj)
    return {
        'Q_total_kW': res['escenario']['Q_total_kW'],
        'T_cold_out_C': res['intercambiador']['T_cold_out_C'],
        'T_hot_out_C': res['intercambiador']['T_hot_out_C'],
        'area_m2': sis.intercambiador.area,
        'dP_red_mca': res['red_hidraulica']['dP_total_mca'],
        'pot_bomba_kW': res['bomba']['potencia_freno_kW']
    }


def _get_nested_attr(obj, name):
    """Obtiene atributo anidado, ej. 'intercambiador.U_global'."""
    parts = name.split('.')
    for p in parts:
        obj = getattr(obj, p)
    return obj


def _set_nested_attr(obj, name, value):
    """Setea atributo anidado, ej. 'intercambiador.U_global'."""
    parts = name.split('.')
    for p in parts[:-1]:
        obj = getattr(obj, p)
    setattr(obj, parts[-1], value)


def sensibilidad_parametro(sis, equipos, param_name, param_base, variacion=0.10, n_puntos=21):
    """
    Varía un parámetro en ±variacion% alrededor del valor base.
    Retorna DataFrame con resultados.
    """
    valores = np.linspace(param_base * (1 - variacion), param_base * (1 + variacion), n_puntos)
    resultados = []

    for val in valores:
        # Modificar el parámetro
        original = getattr(sis, param_name)
        setattr(sis, param_name, val)
        try:
            m = evaluar_modelo(sis, equipos)
            m[param_name] = val
            resultados.append(m)
        except Exception as e:
            print(f"Error en {param_name}={val}: {e}")
        finally:
            setattr(sis, param_name, original)

    return pd.DataFrame(resultados)


def tornado_diagram(resultados_base, variaciones, metrica='area_m2'):
    """
    Genera diagrama tornado de sensibilidad.
    variaciones: dict {parametro: (valor_low, valor_high, metrica_low, metrica_high)}
    """
    params = list(variaciones.keys())
    deltas = []
    for p in params:
        low, high, m_low, m_high = variaciones[p]
        deltas.append(max(abs(m_high - resultados_base[metrica]),
                          abs(m_low - resultados_base[metrica])))

    # Ordenar por magnitud
    idx = np.argsort(deltas)
    params_sorted = [params[i] for i in idx]
    deltas_sorted = [deltas[i] for i in idx]

    fig, ax = plt.subplots(figsize=(8, 5))
    colors = ['coral' if d < 0 else 'steelblue' for d in deltas_sorted]
    ax.barh(params_sorted, deltas_sorted, color=colors)
    ax.set_xlabel(f'Variación en {metrica}')
    ax.set_title(f'Diagrama Tornado — Sensibilidad ({metrica})')
    ax.grid(True, alpha=0.3, axis='x')
    fig.savefig(Path(__file__).parent.parent / '03_resultados/figuras/tornado_sensibilidad.png', dpi=300)
    print("Figura tornado guardada.")


def main():
    base = Path(__file__).parent.parent
    sis = SistemaRecuperacionCalor.from_json(str(base / '01_datos/fichas_kaeser.json'))
    equipos = [1, 2, 4]  # escenario normal

    base_result = evaluar_modelo(sis, equipos)
    print("Resultado base:")
    for k, v in base_result.items():
        print(f"  {k}: {v:.3f}")

    # Parámetros a variar
    parametros = {
        'T_hot_in_C': sis.T_hot_in_C,
        'T_cold_in_C': sis.T_cold_in_C,
        'intercambiador.U_global': sis.intercambiador.U_global,
    }

    variaciones = {}
    all_results = {}

    metrica = 'area_m2'  # La métrica más sensible en este sistema

    for param_name, param_val in parametros.items():
        print(f"\nAnalizando sensibilidad de {param_name} (base={param_val:.2f})...")

        original = _get_nested_attr(sis, param_name)

        # Low (-10%)
        val_low = original * 0.90
        _set_nested_attr(sis, param_name, val_low)
        res_low = evaluar_modelo(sis, equipos)

        # High (+10%)
        val_high = original * 1.10
        _set_nested_attr(sis, param_name, val_high)
        res_high = evaluar_modelo(sis, equipos)

        # Restore
        _set_nested_attr(sis, param_name, original)

        variaciones[param_name] = (val_low, val_high, res_low[metrica], res_high[metrica])
        all_results[param_name] = {
            'base': original,
            'low': val_low,
            'high': val_high,
            'res_low': res_low,
            'res_high': res_high
        }

        print(f"  Area_low (-10%): {res_low[metrica]:.2f} m2")
        print(f"  Area_base: {base_result[metrica]:.2f} m2")
        print(f"  Area_high (+10%): {res_high[metrica]:.2f} m2")
        print(f"  ΔArea: {res_high[metrica] - res_low[metrica]:.2f} m2")
        print(f"  T_cold_out range: {res_low['T_cold_out_C']:.1f} - {res_high['T_cold_out_C']:.1f} C")

    # Guardar resultados
    with open(base / '03_resultados/resultados_sensibilidad.json', 'w') as f:
        json.dump({k: {
            'base': v['base'],
            'low': v['low'],
            'high': v['high'],
            'Q_low_kW': v['res_low']['Q_total_kW'],
            'Q_high_kW': v['res_high']['Q_total_kW']
        } for k, v in all_results.items()}, f, indent=2)

    # Tabla resumen
    df_rows = []
    for param_name, (val_low, val_high, q_low, q_high) in variaciones.items():
        df_rows.append({
            'Parametro': param_name,
            'Valor_base': all_results[param_name]['base'],
            'Unidad': 'C' if 'T_' in param_name else 'W/m2K',
            'Q_-10%_kW': q_low,
            'Q_+10%_kW': q_high,
            'Delta_Q_kW': q_high - q_low,
            'Impacto_relativo_%': (q_high - q_low) / base_result['Q_total_kW'] * 100
        })
    df = pd.DataFrame(df_rows)
    df.to_csv(base / '03_resultados/tablas/sensibilidad_parametrica.csv', index=False)
    print(f"\nTabla guardada en: {base / '03_resultados/tablas/sensibilidad_parametrica.csv'}")

    # Figura: Tornado
    tornado_diagram(base_result, variaciones, metrica='area_m2')

    # Figura: Curvas de sensibilidad
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    for i, (param_name, param_val) in enumerate(parametros.items()):
        if '.' in param_name:
            continue  # skip nested for curves (simplification)
        df_param = sensibilidad_parametro(sis, equipos, param_name, param_val, variacion=0.10, n_puntos=21)
        axes[i].plot(df_param[param_name], df_param['area_m2'], 'b-', linewidth=2)
        axes[i].axvline(param_val, color='gray', linestyle='--', alpha=0.5, label='Base')
        axes[i].set_xlabel(param_name)
        axes[i].set_ylabel('Area intercambiador [m2]')
        axes[i].set_title(f'Sensibilidad: {param_name}')
        axes[i].grid(True, alpha=0.3)
        axes[i].legend()

    plt.tight_layout()
    fig.savefig(base / '03_resultados/figuras/sensibilidad_curvas.png', dpi=300)
    print(f"Figura curvas guardada en: {base / '03_resultados/figuras/sensibilidad_curvas.png'}")

    print("\n=== Análisis de sensibilidad completado ===")


if __name__ == '__main__':
    main()
