# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
resultados.py — Generación de tablas y figuras de salida.

Exporta los resultados de todos los escenarios a:
- Tablas CSV para el informe LaTeX
- Figuras PNG (matplotlib) para incluir en el informe
"""

from pathlib import Path
import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams.update({
    "font.family": "serif",
    "font.size": 10,
    "axes.grid": True,
    "grid.alpha": 0.4,
})


def generar_reporte(resultados: dict, output_dir: Path) -> None:
    """
    Genera tablas y figuras a partir de los resultados calculados.

    Args:
        resultados: Dict {nombre_escenario: {intercambiador, red, bomba, acumulador}}
        output_dir: Carpeta donde guardar las figuras (03_figuras/)
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n{'='*60}")
    print("RESUMEN DE RESULTADOS — WASAFF Consulting")
    print(f"{'='*60}")

    for escenario, res in resultados.items():
        print(f"\nEscenario: {escenario.upper()}")

        if res.get("intercambiador"):
            ix = res["intercambiador"]
            print(f"  Intercambiador:")
            print(f"    Q real      = {ix.Q_real_kW:.1f} kW")
            print(f"    Efectividad = {ix.epsilon:.3f}")
            print(f"    NTU         = {ix.NTU:.3f}")
            print(f"    UA          = {ix.UA_W_K:.1f} W/K")
            print(f"    T_frio_out  = {ix.T_frio_salida_C:.1f} °C")

        if res.get("red"):
            red = res["red"]
            print(f"  Red hidráulica:")
            print(f"    ΔP total    = {red.dP_total_bar*1e3:.1f} mbar")

        if res.get("bomba"):
            b = res["bomba"]
            print(f"  Bomba:")
            print(f"    Caudal      = {b.caudal_m3h:.2f} m³/h")
            print(f"    Altura      = {b.altura_manometrica_m:.2f} m.c.a.")
            print(f"    P_eléctrica = {b.potencia_electrica_estimada_W/1e3:.2f} kW")

        if res.get("acumulador"):
            ac = res["acumulador"]
            print(f"  Acumulador:")
            print(f"    Volumen     = {ac.volumen_total_L:.1f} L (PRELIMINAR)")

    # TODO: Felipe — agregar aquí gráficos de:
    # 1. Curva ε vs NTU para contracorriente (validación visual)
    # 2. Diagrama de temperatura en el intercambiador (T vs. posición)
    # 3. Diagrama de Moody con el punto de operación de cada tramo
    # 4. Tabla comparativa de los 3 escenarios
    print(f"\nFiguras: pendiente — agregar en resultados.py una vez completados los TODOs")
