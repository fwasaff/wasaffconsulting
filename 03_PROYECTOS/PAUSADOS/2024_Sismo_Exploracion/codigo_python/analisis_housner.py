import math
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# ==============================================================================
# FASE 1: ANÁLISIS SÍSMICO DE TANQUE CON MODELO DE HOUSNER
# ==============================================================================

# --- 1. DATOS DE ENTRADA (Provenientes del cliente) ---
H_TANQUE = 15.0  # Altura total del tanque (m)
D_TANQUE = 10.0  # Diámetro interior del tanque (m)
R_TANQUE = D_TANQUE / 2 # Radio interior (m)
RHO_LIQUIDO = 1150 # Densidad del líquido (kg/m^3)
G = 9.81 # m/s^2

# ==============================================================================
# 2. MÓDULO DE CÁLCULOS FÍSICOS (Modelo de Housner)
# ==============================================================================

def calcular_parametros_housner(h_liquido: float, r_tanque: float, m_total: float) -> dict:
    """Calcula las masas y alturas efectivas según el modelo de Housner."""
    ratio = h_liquido / r_tanque
    
    # Fórmulas empíricas de Housner para tanques cilíndricos
    m_convectiva = m_total * (r_tanque / (2.18 * h_liquido)) * math.tanh(1.09 * (r_tanque / h_liquido))
    m_impulsiva = m_total * (math.tanh(0.866 * (r_tanque / h_liquido))) / (0.866 * (r_tanque / h_liquido))
    
    # Corregimos m_impulsiva para que m_total = mi + mc
    if m_impulsiva + m_convectiva > m_total:
         m_impulsiva = m_total - m_convectiva

    h_convectiva = h_liquido * (1 - (math.cosh(1.09 * r_tanque / h_liquido) - 1.0) / (1.09 * (r_tanque / h_liquido) * math.sinh(1.09 * r_tanque / h_liquido)))
    h_impulsiva = 0.375 * h_liquido

    return {
        "m_impulsiva_kg": m_impulsiva, "m_convectiva_kg": m_convectiva,
        "h_impulsiva_m": h_impulsiva, "h_convectiva_m": h_convectiva
    }

def calcular_respuesta_sismica(params: dict, h_liquido: float, r_tanque: float, a_h_g: float) -> dict:
    """Calcula el oleaje máximo y las fuerzas en la base."""
    # Frecuencia natural del oleaje (sloshing)
    omega_c = math.sqrt(1.84 * G / r_tanque * math.tanh(1.84 * h_liquido / r_tanque))
    periodo_c = 2 * math.pi / omega_c

    # Altura máxima de la ola (sloshing)
    altura_ola_max = 0.5 * r_tanque * a_h_g * (1 - 0.35 * (periodo_c - 1.5)**2) # Fórmula simplificada

    # Fuerzas sísmicas
    fuerza_impulsiva = params["m_impulsiva_kg"] * a_h_g * G
    fuerza_convectiva = params["m_convectiva_kg"] * a_h_g * G
    fuerza_cortante_basal = math.sqrt(fuerza_impulsiva**2 + fuerza_convectiva**2)

    return {
        "altura_ola_max_m": altura_ola_max,
        "fuerza_cortante_basal_kN": fuerza_cortante_basal / 1000,
        "periodo_oleaje_s": periodo_c
    }

# ==============================================================================
# 3. EJECUCIÓN DEL ANÁLISIS PARAMÉTRICO
# ==============================================================================
if __name__ == "__main__":
    # Rango de niveles de llenado para el análisis (10% a 100%)
    niveles_llenado_pct = np.linspace(10, 100, 19)
    
    results = []
    for pct in niveles_llenado_pct:
        h_liq = H_TANQUE * (pct / 100)
        m_total_liquido = RHO_LIQUIDO * math.pi * R_TANQUE**2 * h_liq
        
        params_housner = calcular_parametros_housner(h_liq, R_TANQUE, m_total_liquido)
        respuesta = calcular_respuesta_sismica(params_housner, h_liq, R_TANQUE, a_h_g=0.4)
        
        results.append({
            "nivel_llenado_pct": pct,
            "h_liquido_m": h_liq,
            "m_total_ton": m_total_liquido / 1000,
            "m_impulsiva_pct": (params_housner["m_impulsiva_kg"] / m_total_liquido) * 100,
            "m_convectiva_pct": (params_housner["m_convectiva_kg"] / m_total_liquido) * 100,
            "altura_ola_max_m": respuesta["altura_ola_max_m"],
            "fuerza_basal_ton": respuesta["fuerza_cortante_basal_kN"] / 9.81
        })
        
    df_results = pd.DataFrame(results)
    
    print("--- Resultados del Análisis de Housner ---")
    print(df_results.to_string())

    # ==============================================================================
    # 4. VISUALIZACIÓN ESTRATÉGICA
    # ==============================================================================
    sns.set_theme(style="whitegrid")
    
    # --- Gráfico 1: Validación del Modelo (para otros ingenieros) ---
    plt.figure(figsize=(10, 6))
    plt.plot(df_results["nivel_llenado_pct"], df_results["m_impulsiva_pct"], label="Masa Impulsiva (%)", lw=3)
    plt.plot(df_results["nivel_llenado_pct"], df_results["m_convectiva_pct"], label="Masa Convectiva (%)", lw=3)
    plt.xlabel("Nivel de Llenado del Tanque (%)")
    plt.ylabel("Porcentaje de la Masa Total del Líquido (%)")
    plt.title("Validación del Modelo de Housner: Distribución de Masas")
    plt.legend()
    plt.grid(True, which="both", ls="--")
    plt.savefig("grafico_validacion_masas.png", dpi=300)
    print("\nGráfico de validación guardado.")

    # --- Gráfico 2: Insight para el Cliente (Riesgo de Impacto en Techo) ---
    plt.figure(figsize=(10, 6))
    plt.plot(df_results["nivel_llenado_pct"], df_results["h_liquido_m"] + df_results["altura_ola_max_m"], 
             label="Altura Total del Líquido + Ola", color="crimson", lw=3)
    plt.axhline(y=H_TANQUE, color='k', linestyle='--', label=f'Altura del Tanque ({H_TANQUE} m)')
    plt.fill_between(df_results["nivel_llenado_pct"], df_results["h_liquido_m"] + df_results["altura_ola_max_m"], 
                     H_TANQUE, where=(df_results["h_liquido_m"] + df_results["altura_ola_max_m"] > H_TANQUE), 
                     color='red', alpha=0.3, label='Riesgo de Impacto en Techo')
    
    plt.xlabel("Nivel de Llenado del Tanque (%)")
    plt.ylabel("Altura Máxima Alcanzada por el Líquido (m)")
    plt.title("Análisis de Riesgo de 'Sloshing' por Nivel de Llenado")
    plt.legend()
    plt.ylim(bottom=0, top=H_TANQUE * 1.2)
    plt.grid(True, which="both", ls="--")
    plt.savefig("grafico_riesgo_sloshing.png", dpi=300)
    print("Gráfico de riesgo de sloshing guardado.")
