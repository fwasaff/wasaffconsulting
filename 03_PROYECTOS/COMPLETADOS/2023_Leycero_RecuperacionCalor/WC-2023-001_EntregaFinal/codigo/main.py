"""
WC-2023-001 — Leycero / CMPC Papeles Cordillera
Sistema de recuperación de calor residual de compresores

main.py — integrador: red hidráulica + análisis térmico + acumulador

Datos base:
  - 6 compresores Kaeser: 3×FSD575 (315kW) + 2×DSDX305 (160kW) + 1×ESD445 (250kW)
  - Circuito agua industrial: T_entrada = 6°C, T_salida = 16°C
  - Operación normal (Punto 3): C1+C2+C4 activos → 622 kW térmicos
  - Operación máxima: todos activos → 1.212 kW térmicos
  - Caudal normal: ~27 m³/h | Caudal máximo: ~50 m³/h

Supuestos de red hidráulica (ver NOTA al pie):
  - Tuberías acero cédula 40, ASME B36.10M
  - Temperatura media del fluido: 11°C (media entre 6 y 16°C)
  - Longitudes estimadas desde plano P-645-CL-4-22_43-4853
  - Tramo crítico: colector principal entre último compresor y acumuladores
"""

from fluido import Fluido
from tuberia import Tuberia
from calculos_hidraulicos import CalculosHidraulicos

# ---------------------------------------------------------------------------
# Configuración del sistema
# ---------------------------------------------------------------------------

COMPRESORES = [
    {"id": "C1", "modelo": "FSD 575", "P_motor_kW": 315, "Q_termico_kW": 252, "eta": 0.80},
    {"id": "C2", "modelo": "FSD 575", "P_motor_kW": 315, "Q_termico_kW": 252, "eta": 0.80},
    {"id": "C3", "modelo": "FSD 575", "P_motor_kW": 315, "Q_termico_kW": 252, "eta": 0.80},
    {"id": "C4", "modelo": "DSDX 305","P_motor_kW": 160, "Q_termico_kW": 128, "eta": 0.80},
    {"id": "C5", "modelo": "ESD 445", "P_motor_kW": 250, "Q_termico_kW": 200, "eta": 0.80},
    {"id": "C6", "modelo": "DSDX 305","P_motor_kW": 160, "Q_termico_kW": 128, "eta": 0.80},
]

# Operación normal: C1 + C2 + C4
ACTIVOS_NORMAL = {"C1", "C2", "C4"}
T_AGUA_ENTRADA = 6.0    # °C — temperatura mínima agua industrial (invierno)
T_AGUA_SALIDA  = 26.0   # °C — temperatura salida circuito aislado (estimada)
# NOTA: ΔT = 20°C da Q_normal ≈ 27 m³/h, consistente con plano P-645-CL-4-22.
# Si medición en planta confirma ΔT ≠ 20°C, ajustar T_AGUA_SALIDA y re-ejecutar.
DELTA_T        = T_AGUA_SALIDA - T_AGUA_ENTRADA  # 20°C


def caudal_compresor(Q_kW, delta_T, fluido):
    """
    Caudal de agua necesario para evacuar Q_kW con ΔT dado.
    Q [m³/s] = P [W] / (ρ [kg/m³] × cp [J/(kg·K)] × ΔT [K])
    """
    cp = 4182.0  # J/(kg·K) — agua a ~11°C
    return (Q_kW * 1000) / (fluido.densidad * cp * delta_T)


# ---------------------------------------------------------------------------
# Red hidráulica
# ---------------------------------------------------------------------------

def construir_red(modo="normal"):
    """
    Construye la lista de tramos de la red hidráulica.

    Topología (11 tramos):
      T1–T6 : ramales individuales de cada compresor al colector de impulsión
      T7–T9 : colector de impulsión (sala compresores → sala acumuladores)
      T10   : colector de retorno (acumuladores → bomba)
      T11   : salida bomba → distribución a compresores

    NOTA: longitudes estimadas desde plano P-645-CL-4-22_43-4853 (2023).
    Confirmar en obra antes de dimensionar bomba definitiva.
    """
    T_media = (T_AGUA_ENTRADA + T_AGUA_SALIDA) / 2  # 11°C
    fluido = Fluido(T_media)

    activos = ACTIVOS_NORMAL if modo == "normal" else {c["id"] for c in COMPRESORES}

    # Caudales por compresor [m³/s]
    Q = {}
    for c in COMPRESORES:
        if c["id"] in activos:
            Q[c["id"]] = caudal_compresor(c["Q_termico_kW"], DELTA_T, fluido)
        else:
            Q[c["id"]] = 0.0

    Q_colector_1 = Q["C1"] + Q["C2"] + Q["C3"]          # m³/s — bloque izquierdo
    Q_colector_2 = Q["C4"] + Q["C5"] + Q["C6"]          # m³/s — bloque derecho
    Q_total      = Q_colector_1 + Q_colector_2           # m³/s — total sistema

    def tramo(nombre, longitud, flujo_m3s, dn):
        return Tuberia(
            nombre=nombre,
            longitud=longitud,
            fluido=fluido,
            cedula=40,
            flujo=flujo_m3s,
            diametro_nominal=dn,
        )

    # Ramales individuales: DN65 (2.5") × ~8 m cada uno
    T1 = tramo("T1 — C1 → colector",    8.0,  Q["C1"],      "2.5 pulgadas")
    T2 = tramo("T2 — C2 → colector",    8.0,  Q["C2"],      "2.5 pulgadas")
    T3 = tramo("T3 — C3 → colector",    8.0,  Q["C3"],      "2.5 pulgadas")
    T4 = tramo("T4 — C4 → colector",    8.0,  Q["C4"],      "2.5 pulgadas")
    T5 = tramo("T5 — C5 → colector",    8.0,  Q["C5"],      "2.5 pulgadas")
    T6 = tramo("T6 — C6 → colector",    8.0,  Q["C6"],      "2.5 pulgadas")

    # Colector de impulsión: DN100 (4") — de izquierda a derecha
    T7 = tramo("T7 — Colector bloque C1-C2-C3", 12.0, Q_colector_1, "4 pulgadas")
    T8 = tramo("T8 — Colector bloque C4-C5-C6", 12.0, Q_colector_2, "4 pulgadas")
    T9 = tramo("T9 — Colector sala → acumuladores", 20.0, Q_total,  "4 pulgadas")

    # Retorno y salida bomba
    T10 = tramo("T10 — Acumuladores → bomba",    15.0, Q_total, "4 pulgadas")
    T11 = tramo("T11 — Bomba → distribución",     8.0, Q_total, "4 pulgadas")

    return [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11], fluido, Q_total


def calcular_red(modo="normal"):
    tramos, fluido, Q_total = construir_red(modo)

    print(f"\n{'='*85}")
    print(f"  RED HIDRÁULICA — Modo: {modo.upper()}   |   Q_total = {Q_total*3600:.1f} m³/h")
    print(f"  Fluido: agua a {fluido.temperatura}°C  |  ρ = {fluido.densidad:.1f} kg/m³")
    print(f"{'='*85}")

    header = (f"{'Tramo':<38} {'DN':<14} {'L(m)':>5} {'Q(m³/h)':>8} "
              f"{'v(m/s)':>7} {'Re':>8} {'f':>7} {'hf(mca)':>8} {'ΔP(kPa)':>8}")
    print(header)
    print("-" * 85)

    hf_total = 0.0
    dP_total = 0.0
    tramo_critico = None
    hf_max = 0.0

    for t in tramos:
        r = CalculosHidraulicos.resumen(t)
        print(f"{r['nombre']:<38} {r['DN']:<14} {r['L_m']:>5.1f} {r['Q_m3h']:>8.2f} "
              f"{r['v_ms']:>7.2f} {r['Re']:>8.0f} {r['f_darcy']:>7.4f} "
              f"{r['hf_mca']:>8.3f} {r['dP_kPa']:>8.2f}")
        hf_total += r["hf_mca"]
        dP_total += r["dP_kPa"]
        if r["hf_mca"] > hf_max:
            hf_max = r["hf_mca"]
            tramo_critico = r["nombre"]

    print("-" * 85)
    print(f"{'TOTAL RED (tramo crítico)':<55} "
          f"{'':>5} {'':>8} {'':>7} {'':>8} {'':>7} "
          f"{hf_total:>8.3f} {dP_total:>8.2f}")
    print(f"\n  Tramo crítico: {tramo_critico}  ({hf_max:.3f} mca)")
    print(f"  ΔP total red: {dP_total:.2f} kPa  ({dP_total/9.81:.2f} mca)")

    return hf_total, dP_total, Q_total


def seleccionar_bomba(H_sistema_mca, Q_m3h, margen=0.15):
    """
    Punto de operación mínimo para la bomba centrífuga.
    Agrega margen de seguridad sobre la curva del sistema.
    """
    H_bomba = H_sistema_mca * (1 + margen)
    rho = 988.0
    eta_bomba = 0.70  # eficiencia típica para bombas centrifugas a este caudal
    Q_m3s = Q_m3h / 3600.0
    P_hidraulica = rho * 9.81 * Q_m3s * H_bomba  # W
    P_electrica  = P_hidraulica / eta_bomba

    print(f"\n{'='*60}")
    print(f"  SELECCIÓN DE BOMBA")
    print(f"{'='*60}")
    print(f"  H sistema (sin margen)  : {H_sistema_mca:.2f} mca")
    print(f"  H bomba requerido (+{margen*100:.0f}%): {H_bomba:.2f} mca")
    print(f"  Q operación             : {Q_m3h:.1f} m³/h")
    print(f"  Potencia hidráulica     : {P_hidraulica/1000:.2f} kW")
    print(f"  Potencia eléctrica (η={eta_bomba}): {P_electrica/1000:.2f} kW")
    print(f"\n  → Buscar bomba centrífuga: Q~{Q_m3h:.0f} m³/h, H~{H_bomba:.1f} mca")
    print(f"    Motor recomendado: ≥ {P_electrica/1000:.1f} kW (IEC estándar siguiente)")


# ---------------------------------------------------------------------------
# Punto de entrada
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    # --- Análisis hidráulico ---
    hf_normal, dP_normal, Q_normal = calcular_red(modo="normal")
    hf_maximo, dP_maximo, Q_maximo = calcular_red(modo="maximo")

    # --- Selección de bomba (diseñar para modo máximo) ---
    seleccionar_bomba(hf_maximo, Q_maximo * 3600)

    # --- Módulos térmicos (ejecutar cuando intercambiador.py y acumulador.py estén listos) ---
    try:
        from intercambiador import analizar_intercambiadores
        analizar_intercambiadores(modo="normal")
        analizar_intercambiadores(modo="maximo")
    except ImportError:
        print("\n  [PENDIENTE] intercambiador.py no encontrado — ejecutar Paso 3")

    try:
        from acumulador import verificar_acumulador
        verificar_acumulador()
    except ImportError:
        print("  [PENDIENTE] acumulador.py no encontrado — ejecutar Paso 4")
