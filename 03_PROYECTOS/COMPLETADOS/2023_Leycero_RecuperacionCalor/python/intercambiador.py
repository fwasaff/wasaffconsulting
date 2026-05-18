"""
intercambiador.py — Modelo ε-NTU para intercambiadores de placas Kaeser

Método ε-NTU (Effectiveness - Number of Transfer Units):
  Referencia: Incropera & DeWitt, "Fundamentals of Heat and Mass Transfer", 7th ed., §11.4

Supuestos:
  - Intercambiador de placas de doble paso (counter-flow)
  - Régimen permanente
  - Propiedades del fluido constantes a temperatura media de cada lado
  - T_hot_in = 60°C (estimado; dato Kaeser no disponible — ver NOTAS)
  - Lado caliente: agua de refrigeración interna del compresor (circuito Kaeser)
  - Lado frío: circuito aislado de agua industrial

NOTAS:
  T_hot_in es el dato más crítico y faltante. Estimado en 60°C basado en:
    - Temperatura máxima de aceite en compresores Kaeser FSD: ~80°C
    - Intercambiador interno Kaeser baja temperatura aprox. 15–20°C
    - Rango típico reportado en fichas técnicas Kaeser: 55–70°C
  Verificar con ficha técnica o medición directa antes de dimensionar equipo final.
"""

import math
from fluido import Fluido


# ---------------------------------------------------------------------------
# Datos de compresores
# ---------------------------------------------------------------------------

COMPRESORES = [
    {"id": "C1", "modelo": "FSD 575", "Q_kW": 252, "eta": 0.80, "activo_normal": True},
    {"id": "C2", "modelo": "FSD 575", "Q_kW": 252, "eta": 0.80, "activo_normal": True},
    {"id": "C3", "modelo": "FSD 575", "Q_kW": 252, "eta": 0.80, "activo_normal": False},
    {"id": "C4", "modelo": "DSDX 305","Q_kW": 128, "eta": 0.80, "activo_normal": True},
    {"id": "C5", "modelo": "ESD 445", "Q_kW": 200, "eta": 0.80, "activo_normal": False},
    {"id": "C6", "modelo": "DSDX 305","Q_kW": 128, "eta": 0.80, "activo_normal": False},
]

T_HOT_IN  = 60.0   # °C — temperatura entrada agua caliente lado Kaeser (ESTIMADO)
T_COLD_IN = 6.0    # °C — temperatura entrada agua industrial fría
DELTA_T   = 20.0   # °C — salto térmico circuito frío (calibrado con plano)


# ---------------------------------------------------------------------------
# Núcleo ε-NTU para intercambiador de flujo contrario (counter-flow)
# ---------------------------------------------------------------------------

def epsilon_ntu_counterflow(NTU, C_min, C_max):
    """
    Efectividad para intercambiador de flujo contrario.
    ε = [1 - exp(-NTU·(1 - C_min/C_max))] / [1 - (C_min/C_max)·exp(-NTU·(1 - C_min/C_max))]
    Caso especial C_min = C_max: ε = NTU/(1+NTU)
    """
    Cr = C_min / C_max
    if abs(1.0 - Cr) < 1e-6:
        return NTU / (1.0 + NTU)
    exp_term = math.exp(-NTU * (1.0 - Cr))
    return (1.0 - exp_term) / (1.0 - Cr * exp_term)


def ntu_para_epsilon_counterflow(epsilon, C_min, C_max):
    """
    NTU requerido para alcanzar una efectividad ε dada.
    Inversión analítica de la ecuación de flujo contrario.
    """
    Cr = C_min / C_max
    if abs(1.0 - Cr) < 1e-6:
        return epsilon / (1.0 - epsilon)
    return (1.0 / (1.0 - Cr)) * math.log((1.0 - Cr * epsilon) / (1.0 - epsilon))


# ---------------------------------------------------------------------------
# Análisis por compresor
# ---------------------------------------------------------------------------

def analizar_compresor(comp, T_hot_in=T_HOT_IN, T_cold_in=T_COLD_IN, delta_T=DELTA_T):
    """
    Calcula el desempeño térmico del intercambiador de un compresor.

    Retorna dict con:
      Q_real     : potencia transferida real [W]
      T_cold_out : temperatura salida agua industrial [°C]
      T_hot_out  : temperatura salida agua compresor [°C]
      epsilon    : efectividad real del intercambiador
      NTU        : número de unidades de transferencia requerido
      UA         : coeficiente global × área [W/K]
      C_min, C_max: capacidades caloríficas [W/K]
    """
    Q_max_kW = comp["Q_kW"]        # kW — calor máximo recuperable (dato Kaeser)
    eta      = comp["eta"]         # eficiencia de recuperación Kaeser

    # Fluidos a temperatura media estimada
    T_hot_avg  = (T_hot_in + (T_hot_in - 10.0)) / 2   # estimado lado caliente
    T_cold_avg = T_cold_in + delta_T / 2

    fluido_hot  = Fluido(T_hot_avg)
    fluido_cold = Fluido(T_cold_avg)

    cp_hot  = fluido_hot.cp    # J/(kg·K)
    cp_cold = fluido_cold.cp

    # Caudal másico lado frío [kg/s] — de balance energético: Q = m_dot × cp × ΔT
    Q_real_W = Q_max_kW * 1000 * eta      # W — calor real transferido
    m_dot_cold = Q_real_W / (cp_cold * delta_T)  # kg/s

    T_cold_out = T_cold_in + delta_T      # °C

    # Caudal másico lado caliente — asumimos salida a 45°C (típico Kaeser)
    T_hot_out_est = 45.0   # °C — estimado; Kaeser mantiene temperatura controlada
    delta_T_hot = T_hot_in - T_hot_out_est
    m_dot_hot = Q_real_W / (cp_hot * delta_T_hot)  # kg/s

    # Capacidades caloríficas [W/K]
    C_hot  = m_dot_hot  * cp_hot
    C_cold = m_dot_cold * cp_cold

    C_min = min(C_hot, C_cold)
    C_max = max(C_hot, C_cold)
    Q_max_posible = C_min * (T_hot_in - T_cold_in)

    epsilon = Q_real_W / Q_max_posible

    NTU = ntu_para_epsilon_counterflow(epsilon, C_min, C_max)
    UA  = NTU * C_min   # W/K

    return {
        "id":          comp["id"],
        "modelo":      comp["modelo"],
        "Q_kW":        comp["Q_kW"],
        "Q_real_kW":   Q_real_W / 1000,
        "T_cold_in":   T_cold_in,
        "T_cold_out":  T_cold_out,
        "T_hot_in":    T_hot_in,
        "T_hot_out":   T_hot_out_est,
        "m_dot_cold_kgh": m_dot_cold * 3600,
        "m_dot_hot_kgh":  m_dot_hot  * 3600,
        "C_hot":       C_hot,
        "C_cold":      C_cold,
        "C_min":       C_min,
        "C_max":       C_max,
        "epsilon":     epsilon,
        "NTU":         NTU,
        "UA_WK":       UA,
    }


def analizar_intercambiadores(modo="normal"):
    """Analiza todos los intercambiadores en el modo de operación dado."""
    activos = [c for c in COMPRESORES if
               (c["activo_normal"] if modo == "normal" else True)]

    print(f"\n{'='*90}")
    print(f"  ANÁLISIS TÉRMICO ε-NTU — Modo: {modo.upper()}")
    print(f"  T_hot_in = {T_HOT_IN}°C (ESTIMADO)  |  T_cold_in = {T_COLD_IN}°C  |  ΔT_fría = {DELTA_T}°C")
    print(f"  {'*'*60}")
    print(f"  ADVERTENCIA: T_hot_in es un supuesto. Verificar con ficha técnica Kaeser.")
    print(f"{'='*90}")

    hdr = (f"{'ID':<5} {'Modelo':<10} {'Q_nom':>7} {'Q_real':>7} "
           f"{'T_h_in':>7} {'T_h_out':>7} {'T_c_out':>8} "
           f"{'ε':>6} {'NTU':>6} {'UA(W/K)':>9}")
    print(hdr)
    print("-" * 90)

    Q_total_kW    = 0.0
    UA_total      = 0.0
    m_cold_total  = 0.0
    resultados    = []

    for comp in activos:
        r = analizar_compresor(comp)
        resultados.append(r)
        Q_total_kW   += r["Q_real_kW"]
        UA_total     += r["UA_WK"]
        m_cold_total += r["m_dot_cold_kgh"]

        print(f"{r['id']:<5} {r['modelo']:<10} {r['Q_kW']:>7.0f} {r['Q_real_kW']:>7.1f} "
              f"{r['T_hot_in']:>7.1f} {r['T_hot_out']:>7.1f} {r['T_cold_out']:>8.1f} "
              f"{r['epsilon']:>6.3f} {r['NTU']:>6.3f} {r['UA_WK']:>9.1f}")

    print("-" * 90)
    print(f"{'TOTAL':<5} {'':<10} {'':<7} {Q_total_kW:>7.1f} kW  {'':>35}")
    print(f"\n  Caudal total lado frío: {m_cold_total:.1f} kg/h  = {m_cold_total/999.6:.1f} m³/h")
    print(f"  UA total del sistema  : {UA_total:.0f} W/K")
    print(f"  Q recuperado total    : {Q_total_kW:.1f} kW")

    return resultados
