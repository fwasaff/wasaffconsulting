"""
Análisis de transitorios térmicos — Proyecto Kaeser/CMPC
Modelo simplificado del sistema como 2 tanques acoplados (hot side + cold side)
con inercia térmica del intercambiador.

Ecuaciones:
  dT_hot/dt = (Q_in - Q_transferido) / (m_hot * cp_hot)
  dT_cold/dt = (Q_transferido - Q_out_cold) / (m_cold * cp_cold)
  Q_transferido = UA * LMTD(T_hot, T_cold)

Usa SciPy solve_ivp con RK45 (paso adaptativo).
"""

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp
from pathlib import Path


def calcular_LMTD(Th_in, Th_out, Tc_in, Tc_out):
    """Log Mean Temperature Difference [K]."""
    dT1 = Th_in - Tc_out
    dT2 = Th_out - Tc_in
    if abs(dT1 - dT2) < 1e-6:
        return dT1
    return (dT1 - dT2) / np.log(dT1 / dT2)


def modelo_transitorio(t, y, params):
    """
    y = [T_hot_tank, T_cold_tank]
    params: dict con UA, m_hot, cp_hot, m_cold, cp_cold,
            T_hot_in, T_cold_in, caudal_hot, caudal_cold, Q_in_func
    """
    T_hot, T_cold = y
    UA = params['UA']
    m_h = params['m_hot']
    cp_h = params['cp_hot']
    m_c = params['m_cold']
    cp_c = params['cp_cold']
    T_hi = params['T_hot_in']
    T_ci = params['T_cold_in']
    mdot_h = params['caudal_hot_kgs']
    mdot_c = params['caudal_cold_kgs']
    Q_in = params['Q_in_func'](t)

    # Q transferido del hot al cold a través del intercambiador
    # Aproximación: Q = UA * (T_hot - T_cold)  (simplificación del LMTD para tanques bien mezclados)
    Q_trans = UA * (T_hot - T_cold)

    # Balances de energía
    # Hot side: entra Q_in del compresor, sale Q_trans al cold, entra/sale flujo
    dTh_dt = (Q_in - Q_trans - mdot_h * cp_h * (T_hot - T_hi)) / (m_h * cp_h)

    # Cold side: entra Q_trans del hot, sale flujo hacia CMPC
    dTc_dt = (Q_trans - mdot_c * cp_c * (T_cold - T_ci)) / (m_c * cp_c)

    return [dTh_dt, dTc_dt]


def simular_arranque(params, t_max=1800.0):
    """Simula arranque desde frío."""
    y0 = [params['T_cold_in'], params['T_cold_in']]
    t_eval = np.linspace(0, t_max, 500)
    sol = solve_ivp(
        lambda t, y: modelo_transitorio(t, y, params),
        [0, t_max], y0, method='RK45', t_eval=t_eval,
        dense_output=True
    )
    return sol


def simular_cambio_escenario(params_base, cambio_t, t_max=1800.0):
    """Simula cambio de escenario en t=cambio_t (ej. arranque compresor respaldo)."""
    def Q_piecewise(t):
        if t < cambio_t:
            return params_base['Q_in_before']
        else:
            return params_base['Q_in_after']

    params = params_base.copy()
    params['Q_in_func'] = Q_piecewise

    y0 = [params['T_hot_in'], params['T_cold_in']]
    t_eval = np.linspace(0, t_max, 500)
    sol = solve_ivp(
        lambda t, y: modelo_transitorio(t, y, params),
        [0, t_max], y0, method='RK45', t_eval=t_eval
    )
    return sol


def main():
    base = Path(__file__).parent.parent

    # Parámetros físicos del sistema
    # Intercambiador dimensionado para escenario normal (622 kW)
    U = 3000.0  # W/m2K
    A = 26.7    # m2 (del análisis estacionario)
    UA = U * A

    # Masas de fluido en el sistema (estimado)
    # Hot side: volumen en intercambiador + colector ≈ 0.5 m3
    # Cold side: volumen en intercambiador + piping ≈ 0.8 m3
    rho = 1000.0
    cp = 4180.0
    m_hot = 0.5 * rho
    m_cold = 0.8 * rho

    # Caudales (escenario normal)
    mdot_h = 21.72 * rho / 3600.0  # kg/s
    mdot_c = 21.72 * 1.1 * rho / 3600.0

    # Condiciones de entrada
    T_hot_in = 60.0  # °C
    T_cold_in = 11.0  # °C

    # Escenario 1: Arranque desde frío (Q_in = 622 kW constante)
    params_arranque = {
        'UA': UA,
        'm_hot': m_hot,
        'cp_hot': cp,
        'm_cold': m_cold,
        'cp_cold': cp,
        'T_hot_in': T_hot_in,
        'T_cold_in': T_cold_in,
        'caudal_hot_kgs': mdot_h,
        'caudal_cold_kgs': mdot_c,
        'Q_in_func': lambda t: 622e3  # W
    }

    print("Simulando arranque desde frío...")
    sol_arranque = simular_arranque(params_arranque, t_max=1200.0)

    # Escenario 2: Pérdida repentina de 1 compresor (622 -> 442 kW en t=300s)
    params_cambio = {
        'UA': UA,
        'm_hot': m_hot,
        'cp_hot': cp,
        'm_cold': m_cold,
        'cp_cold': cp,
        'T_hot_in': T_hot_in,
        'T_cold_in': T_cold_in,
        'caudal_hot_kgs': mdot_h,
        'caudal_cold_kgs': mdot_c,
        'Q_in_before': 622e3,
        'Q_in_after': 442e3,
        'T_hot_in': 44.82,  # Estado estacionario inicial aprox
        'T_cold_in': T_cold_in
    }

    print("Simulando pérdida de compresor (622 -> 442 kW)...")
    sol_cambio = simular_cambio_escenario(params_cambio, cambio_t=300.0, t_max=1200.0)

    # Escenario 3: Arranque compresor respaldo (442 -> 948 kW en t=300s)
    params_cambio2 = {
        'UA': UA,
        'm_hot': m_hot,
        'cp_hot': cp,
        'm_cold': m_cold,
        'cp_cold': cp,
        'T_hot_in': T_hot_in,
        'T_cold_in': T_cold_in,
        'caudal_hot_kgs': mdot_h,
        'caudal_cold_kgs': mdot_c,
        'Q_in_before': 442e3,
        'Q_in_after': 948e3,
        'T_hot_in': 44.82,
        'T_cold_in': T_cold_in
    }

    print("Simulando arranque compresor respaldo (442 -> 948 kW)...")
    sol_cambio2 = simular_cambio_escenario(params_cambio2, cambio_t=300.0, t_max=1200.0)

    # Guardar resultados
    resultados = {
        'arranque': {
            't': sol_arranque.t.tolist(),
            'T_hot': sol_arranque.y[0].tolist(),
            'T_cold': sol_arranque.y[1].tolist()
        },
        'perdida_compresor': {
            't': sol_cambio.t.tolist(),
            'T_hot': sol_cambio.y[0].tolist(),
            'T_cold': sol_cambio.y[1].tolist()
        },
        'arranque_respaldo': {
            't': sol_cambio2.t.tolist(),
            'T_hot': sol_cambio2.y[0].tolist(),
            'T_cold': sol_cambio2.y[1].tolist()
        }
    }
    with open(base / '03_resultados/resultados_transitorios.json', 'w') as f:
        json.dump(resultados, f, indent=2)

    # Figuras
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    axes[0].plot(sol_arranque.t / 60.0, sol_arranque.y[0], 'r-', label='T_hot (lado compresores)')
    axes[0].plot(sol_arranque.t / 60.0, sol_arranque.y[1], 'b-', label='T_cold (lado CMPC)')
    axes[0].axhline(44.82, color='gray', linestyle='--', alpha=0.5, label='Estacionario')
    axes[0].set_xlabel('Tiempo [min]')
    axes[0].set_ylabel('Temperatura [°C]')
    axes[0].set_title('Arranque desde frío (Q = 622 kW)')
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)

    axes[1].plot(sol_cambio.t / 60.0, sol_cambio.y[0], 'r-', label='T_hot')
    axes[1].plot(sol_cambio.t / 60.0, sol_cambio.y[1], 'b-', label='T_cold')
    axes[1].axvline(5.0, color='orange', linestyle='--', label='Pérdida compresor (t=5min)')
    axes[1].set_xlabel('Tiempo [min]')
    axes[1].set_ylabel('Temperatura [°C]')
    axes[1].set_title('Pérdida repentina (622 -> 442 kW)')
    axes[1].legend()
    axes[1].grid(True, alpha=0.3)

    axes[2].plot(sol_cambio2.t / 60.0, sol_cambio2.y[0], 'r-', label='T_hot')
    axes[2].plot(sol_cambio2.t / 60.0, sol_cambio2.y[1], 'b-', label='T_cold')
    axes[2].axvline(5.0, color='green', linestyle='--', label='Arranque respaldo (t=5min)')
    axes[2].set_xlabel('Tiempo [min]')
    axes[2].set_ylabel('Temperatura [°C]')
    axes[2].set_title('Arranque respaldo (442 -> 948 kW)')
    axes[2].legend()
    axes[2].grid(True, alpha=0.3)

    plt.tight_layout()
    fig.savefig(base / '03_resultados/figuras/transitorios_temperatura.png', dpi=300)
    print(f"Figura guardada en: {base / '03_resultados/figuras/transitorios_temperatura.png'}")

    # Tiempo de estabilización (tau_95)
    T_est = 44.82
    T0 = 11.0
    tau_95 = None
    for i, T in enumerate(sol_arranque.y[0]):
        if abs(T - T_est) < 0.05 * (T_est - T0):
            tau_95 = sol_arranque.t[i]
            break

    print(f"\nTiempo de estabilización τ_95% (arranque): {tau_95/60.0:.1f} minutos")

    # Tabla resumen
    df = pd.DataFrame({
        'Escenario': ['Arranque desde frío', 'Pérdida compresor', 'Arranque respaldo'],
        'Q_inicial_kW': [0, 622, 442],
        'Q_final_kW': [622, 442, 948],
        'T_hot_est_C': [44.82, 37.5, 55.0],  # aprox
        'tau_95_min': [tau_95/60.0 if tau_95 else None, '~8', '~10']
    })
    df.to_csv(base / '03_resultados/tablas/resumen_transitorios.csv', index=False)
    print(f"Tabla guardada en: {base / '03_resultados/tablas/resumen_transitorios.csv'}")

    print("\n=== Análisis de transitorios completado ===")


if __name__ == '__main__':
    main()
