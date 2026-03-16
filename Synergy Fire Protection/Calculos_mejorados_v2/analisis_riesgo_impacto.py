import math
import pandas as pd
from typing import Dict, List, Any

# ==============================================================================
# CONFIGURACIÓN DEL ANÁLISIS
# ==============================================================================

# --- CONSTANTES FÍSICAS ---
G = 9.81  # Aceleración gravitacional (m/s^2)
DENSITY_STEEL = 7850  # Densidad del acero al carbono (kg/m^3)
MPS_TO_KMPH = 3.6     # Factor de conversión de m/s a km/h

# --- DATOS DE ENTRADA ESTANDARIZADOS (ASME B36.10M) ---
PIPE_DATA: Dict[str, Dict[str, Any]] = {
    "1":    {"OD": 33.4,  "SCH": {10: 2.77, 20: 2.9,  30: 3.38,  40: 3.38}},
    "1-1/4":{"OD": 42.2,  "SCH": {10: 2.77, 20: 2.97, 30: 3.56,  40: 3.56}},
    "1-1/2":{"OD": 48.3,  "SCH": {10: 2.77, 20: 3.18, 30: 3.68,  40: 3.68}},
    "2":    {"OD": 60.3,  "SCH": {10: 2.77, 20: 3.18, 30: 3.91,  40: 3.91}},
    "2-1/2":{"OD": 73.0,  "SCH": {10: 3.05, 20: 4.78, 30: 5.16,  40: 5.16}},
    "3":    {"OD": 88.9,  "SCH": {10: 3.05, 20: 5.16, 30: 5.49,  40: 5.49}},
    "4":    {"OD": 114.3, "SCH": {10: 3.05, 20: 5.16, 30: 6.02,  40: 6.02}},
    "5":    {"OD": 141.3, "SCH": {10: 3.4,  20: 5.56, 30: 6.55,  40: 6.55}},
    "6":    {"OD": 168.3, "SCH": {10: 3.4,  20: 5.56, 30: 7.11,  40: 7.11}},
    "8":    {"OD": 219.1, "SCH": {10: 3.76, 20: 6.35, 30: 7.04,  40: 8.18}},
    "10":   {"OD": 273.0, "SCH": {10: 4.19, 20: 6.35, 30: 7.8,   40: 9.27}},
    "12":   {"OD": 323.8, "SCH": {10: 4.57, 20: 6.35, 30: 8.38,  40: 9.53}}
}

# --- PARÁMETROS DEL ANÁLISIS ---
HEIGHTS_M = range(1, 17) 
PIPE_LENGTH_M = 6.0      

# ==============================================================================
# MÓDULO DE CÁLCULOS FÍSICOS
# ==============================================================================

def calculate_pipe_mass(od_mm: float, t_mm: float, length_m: float) -> float:
    od_m, t_m = od_mm / 1000, t_mm / 1000
    id_m = od_m - 2 * t_m
    volume_m3 = (math.pi / 4) * (od_m**2 - id_m**2) * length_m
    return volume_m3 * DENSITY_STEEL

def calculate_impact_velocity_mps(h_m: float) -> float:
    return math.sqrt(2 * G * h_m)

def calculate_impact_energy_joules(m_kg: float, h_m: float) -> float:
    return m_kg * G * h_m

def calculate_impact_momentum_kgmps(m_kg: float, v_mps: float) -> float:
    return m_kg * v_mps

def calculate_safety_radius_m(h_m: float, vx_mps: float = 3.0) -> float:
    fall_time_s = math.sqrt(2 * h_m / G)
    return vx_mps * fall_time_s

def calculate_whip_radius_m(h_m: float, L_m: float) -> float:
    vx_whip_mps = (math.sqrt(3 * G * L_m)) / 2
    fall_time_s = math.sqrt(2 * h_m / G)
    return (vx_whip_mps * fall_time_s) + (L_m / 2)

# ==============================================================================
# LÓGICA PRINCIPAL DE LA SIMULACIÓN
# ==============================================================================

def run_analysis() -> pd.DataFrame:
    results: List[Dict[str, Any]] = []
    print("Iniciando análisis predictivo de riesgos por caída de objetos...")
    
    for nps, props in PIPE_DATA.items():
        for sch, t_mm in props["SCH"].items():
            mass = calculate_pipe_mass(props["OD"], t_mm, PIPE_LENGTH_M)
            for height in HEIGHTS_M:
                velocity = calculate_impact_velocity_mps(height)
                results.append({
                    "NPS (pulgadas)": nps,
                    "Schedule": sch,
                    "Altura Caída (m)": height,
                    "Masa Tubería (kg)": round(mass, 2),
                    "Velocidad Impacto (km/h)": round(velocity * MPS_TO_KMPH, 2),
                    "Momento Impacto (kg·m/s)": round(calculate_impact_momentum_kgmps(mass, velocity), 2),
                    "Energía Impacto (kJ)": round(calculate_impact_energy_joules(mass, height) / 1000, 2),
                    "Radio Operacional (m)": round(calculate_safety_radius_m(height), 2),
                    "Radio Exclusión Látigo (m)": round(calculate_whip_radius_m(height, PIPE_LENGTH_M), 2)
                })
    
    print(f"Análisis completado para {len(results)} escenarios.")
    df = pd.DataFrame(results).sort_values(by=["Energía Impacto (kJ)"], ascending=False)
    return df

# --- EJECUCIÓN DEL SCRIPT ---
if __name__ == "__main__":
    reporte_df = run_analysis()
    output_filename = 'reporte_riesgo_impacto_tuberias_completo.csv'
    reporte_df.to_csv(output_filename, index=False)
    print(f"\nReporte guardado exitosamente como '{output_filename}'")
    print("\n--- TOP 15 ESCENARIOS DE MAYOR RIESGO (Por Energía de Impacto) ---")
    print(reporte_df.head(15).to_string())
