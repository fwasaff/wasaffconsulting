"""
acumulador.py — Verificación del volumen de acumulación térmica

Sistema instalado: 10.000 L + 5.000 L = 15.000 L total
Pregunta: ¿Es suficiente para cubrir el transitorio cuando los compresores se apagan?

Modelo:
  Durante operación: acumulador carga (Q_carga > Q_demanda)
  Durante paro de compresores: acumulador descarga (Q_demanda sostenida por inercia)

  Energía útil = ρ × V × cp × ΔT_swing
  Tiempo de autonomía = Energía_útil / Q_demanda

Referencia:
  Verein Deutscher Ingenieure, VDI 4640 — Thermal Use of the Underground.
  ASHRAE Handbook — HVAC Systems and Equipment, Chapter 51 (Thermal Storage).
"""

from fluido import Fluido
import math


# ---------------------------------------------------------------------------
# Parámetros del sistema
# ---------------------------------------------------------------------------

V_ACUMULADOR_L   = 15_000.0    # L — volumen total instalado (10.000 + 5.000)
T_CARGA          = 26.0        # °C — temperatura máxima en el acumulador (= T_cold_out)
T_DESCARGA       = 15.0        # °C — temperatura mínima útil para el proceso
DELTA_T_SWING    = T_CARGA - T_DESCARGA   # K — swing térmico aprovechable

T_MEDIA          = (T_CARGA + T_DESCARGA) / 2.0   # para propiedades del fluido

# Demanda de calor del proceso cuando los compresores están parados [kW]
# Usar la potencia del modo normal como estimado conservador (worst case)
Q_DEMANDA_NORMAL_KW  = 201.6   # kW — calor que el proceso sigue necesitando (C1+C2+C4 × eta)
Q_DEMANDA_MINIMA_KW  = 100.0   # kW — demanda mínima estimada (sólo calefacción base)


# ---------------------------------------------------------------------------
# Cálculo de autonomía
# ---------------------------------------------------------------------------

def energia_util(V_litros, delta_T, fluido):
    """
    Energía térmica útil almacenada [kWh].
    E = ρ × V × cp × ΔT
    """
    V_m3 = V_litros / 1000.0
    E_joules = fluido.densidad * V_m3 * fluido.cp * delta_T
    return E_joules / 3_600_000.0   # kWh


def tiempo_autonomia(E_util_kWh, Q_demanda_kW):
    """Tiempo de descarga en horas."""
    return E_util_kWh / Q_demanda_kW


def volumen_minimo(Q_demanda_kW, t_autonomia_h, delta_T, fluido):
    """
    Volumen mínimo de acumulador para sostener Q_demanda durante t_autonomia.
    V [L] = Q × t / (ρ × cp × ΔT)
    """
    E_requerida_J = Q_demanda_kW * 1000 * t_autonomia_h * 3600
    V_m3 = E_requerida_J / (fluido.densidad * fluido.cp * delta_T)
    return V_m3 * 1000   # litros


def verificar_acumulador():
    fluido = Fluido(T_MEDIA)

    E_util = energia_util(V_ACUMULADOR_L, DELTA_T_SWING, fluido)

    print(f"\n{'='*65}")
    print(f"  VERIFICACIÓN DE ACUMULADOR TÉRMICO")
    print(f"{'='*65}")
    print(f"  Volumen instalado         : {V_ACUMULADOR_L:,.0f} L")
    print(f"  T_carga / T_descarga      : {T_CARGA}°C / {T_DESCARGA}°C  (ΔT = {DELTA_T_SWING}°C)")
    print(f"  Densidad agua a {T_MEDIA}°C    : {fluido.densidad:.1f} kg/m³")
    print(f"  cp agua                   : {fluido.cp:.0f} J/(kg·K)")
    print(f"  Energía útil almacenada   : {E_util:.2f} kWh  ({E_util*3600:.0f} kJ)")
    print()

    print(f"  {'Demanda proceso':25} {'Autonomía':>12} {'Veredicto':>12}")
    print(f"  {'-'*50}")

    for Q, etiqueta in [(Q_DEMANDA_NORMAL_KW, "Normal (622 kW recuperado)"),
                        (Q_DEMANDA_MINIMA_KW,  "Mínima (calefacción base) ")]:
        t_h = tiempo_autonomia(E_util, Q)
        t_min = t_h * 60
        ok = "OK ✓" if t_h >= 0.5 else "INSUFICIENTE ✗"
        print(f"  {etiqueta:25} Q={Q:>6.1f} kW  →  {t_min:>5.1f} min   {ok:>12}")

    print()
    print(f"  VOLUMEN MÍNIMO REQUERIDO por autonomía objetivo:")
    print(f"  {'Autonomía':12} {'Q demanda':>12} {'V_min (L)':>12} {'V_inst (L)':>12} {'Estado':>12}")
    print(f"  {'-'*62}")

    for t_h in [0.5, 1.0, 2.0]:
        for Q in [Q_DEMANDA_NORMAL_KW, Q_DEMANDA_MINIMA_KW]:
            V_min = volumen_minimo(Q, t_h, DELTA_T_SWING, fluido)
            estado = "OK" if V_ACUMULADOR_L >= V_min else "AMPLIAR"
            print(f"  {t_h*60:.0f} min        {Q:>12.1f} kW {V_min:>12.0f} L {V_ACUMULADOR_L:>12.0f} L {estado:>12}")

    print()
    print(f"  CONCLUSIÓN:")
    t_critico = tiempo_autonomia(E_util, Q_DEMANDA_NORMAL_KW)
    if t_critico >= 1.0:
        print(f"  Los {V_ACUMULADOR_L/1000:.0f} m³ instalados proveen {t_critico*60:.0f} min de autonomía")
        print(f"  frente a la demanda normal. Capacidad adecuada para paros de mantenimiento.")
    elif t_critico >= 0.5:
        print(f"  Autonomía de {t_critico*60:.0f} min — suficiente para arranque/paro pero marginal.")
        print(f"  Evaluar ampliación si el proceso requiere >30 min sin compresores.")
    else:
        print(f"  ADVERTENCIA: solo {t_critico*60:.1f} min de autonomía. Considerar ampliar volumen.")
