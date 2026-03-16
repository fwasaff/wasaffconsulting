# simulacion_final.py
import pandas as pd
import math

# --- CONFIGURACIÓN Y CONSTANTES ---
G = 9.81
PIPE_LENGTH_M = 6.0
HEIGHTS_M = range(1, 17)
PIPE_DATA = { # ... (Usa tu diccionario completo de tuberías aquí) ... 
    "1":    {"OD": 33.4,  "SCH": {10: 2.77, 40: 3.38}},
    "1.5":  {"OD": 48.3,  "SCH": {10: 2.77, 40: 3.68}},
    "2":    {"OD": 60.3,  "SCH": {10: 2.77, 40: 3.91}},
    "3":    {"OD": 88.9,  "SCH": {10: 3.05, 40: 5.49}},
    "4":    {"OD": 114.3, "SCH": {10: 3.05, 40: 6.02}},
    "6":    {"OD": 168.3, "SCH": {10: 3.4,  40: 7.11}},
    "8":    {"OD": 219.1, "SCH": {10: 3.76, 40: 8.18}},
    "10":   {"OD": 273.0, "SCH": {10: 4.19, 40: 9.27}},
    "12":   {"OD": 323.8, "SCH": {10: 4.57, 40: 9.53}}
}
DENSITY_STEEL = 7850

# --- UMBRALES DE RIESGO (en Joules) ---
THRESHOLD_BAJO = 50
THRESHOLD_SIGNIFICATIVO = 200
THRESHOLD_GRAVE = 10000

# --- FUNCIONES DE CÁLCULO (Sin cambios) ---
def calculate_pipe_mass(od_mm, t_mm, length_m):
    od_m, t_m = od_mm / 1000, t_mm / 1000
    id_m = od_m - 2 * t_m
    volume_m3 = (math.pi / 4) * (od_m**2 - id_m**2) * length_m
    return volume_m3 * DENSITY_STEEL

def calculate_impact_energy_joules(m_kg, h_m):
    return m_kg * G * h_m

# --- FUNCIÓN DE CLASIFICACIÓN DE RIESGO (CORREGIDA Y CENTRALIZADA) ---
def classify_risk(energy_joules):
    if energy_joules < THRESHOLD_BAJO:
        return "BAJO (Verde)"
    elif energy_joules < THRESHOLD_SIGNIFICATIVO:
        return "SIGNIFICATIVO (Amarillo)"
    elif energy_joules < THRESHOLD_GRAVE:
        return "GRAVE (Rojo)"
    else:
        return "CATASTRÓFICO (Púrpura)"

# --- LÓGICA PRINCIPAL ---
def run_analysis():
    results = []
    for nps, props in PIPE_DATA.items():
        for sch, t_mm in props["SCH"].items():
            mass = calculate_pipe_mass(props["OD"], t_mm, PIPE_LENGTH_M)
            for height in HEIGHTS_M:
                energy_J = calculate_impact_energy_joules(mass, height)
                risk_level = classify_risk(energy_J) # Usando la función corregida
                results.append({
                    "NPS (pulgadas)": nps, "Schedule": sch, "Altura Caída (m)": height,
                    "Masa Tubería (kg)": round(mass, 1),
                    "Energía Impacto (kJ)": round(energy_J / 1000, 2),
                    "Nivel de Riesgo": risk_level
                })
    df = pd.DataFrame(results).sort_values(by=["Energía Impacto (kJ)"], ascending=False)
    return df

if __name__ == "__main__":
    reporte_df = run_analysis()
    output_filename = 'reporte_riesgo_completo_CORRECTO.csv'
    reporte_df.to_csv(output_filename, index=False, sep=';', decimal=',')
    print(f"Datos CORRECTOS generados en '{output_filename}'")
