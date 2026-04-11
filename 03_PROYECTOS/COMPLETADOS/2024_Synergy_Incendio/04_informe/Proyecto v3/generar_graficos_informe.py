#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import math
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from typing import Dict, List, Any

# ==============================================================================
# CONFIGURACIÓN DE ESTILO DE PUBLICACIÓN (NIVEL "NATURE")
# ==============================================================================
try:
    # Intenta usar LaTeX para la mejor calidad tipográfica
    plt.rcParams.update({
        "font.family": "serif", "font.serif": ["Computer Modern Roman"], "text.usetex": True,
        "font.size": 12, "axes.labelsize": 14, "axes.titlesize": 16, "axes.titleweight": "bold",
        "xtick.labelsize": 11, "ytick.labelsize": 11, "legend.fontsize": 11, "figure.titlesize": 20
    })
except RuntimeError:
    print("Advertencia: Instalación de LaTeX no encontrada. Usando fuentes estándar.")
    plt.rcParams.update({
        "font.family": "sans-serif", "font.sans-serif": ["Arial"], "font.size": 12,
        "axes.labelsize": 14, "axes.titlesize": 16, "axes.titleweight": "bold",
        "xtick.labelsize": 11, "ytick.labelsize": 11, "legend.fontsize": 11, "figure.titlesize": 20
    })

# ==============================================================================
# MÓDULO DE FÍSICA Y DATOS (Idéntico a tu script original)
# ==============================================================================
G = 9.81
DENSITY_STEEL = 7850
PIPE_DATA: Dict[str, Dict[str, Any]] = {
    "1":    {"OD": 33.4,  "SCH": {10: 2.77, 40: 3.38}}, "2": {"OD": 60.3, "SCH": {10: 2.77, 40: 3.91}},
    "4":    {"OD": 114.3, "SCH": {10: 3.05, 40: 6.02}}, "6": {"OD": 168.3, "SCH": {10: 3.4, 40: 7.11}},
    "8":    {"OD": 219.1, "SCH": {10: 3.76, 40: 8.18}}, "10": {"OD": 273.0, "SCH": {10: 4.19, 40: 9.27}},
    "12":   {"OD": 323.8, "SCH": {10: 4.57, 40: 10.31}} # Simplificado a Sch 10 y 40 por claridad
}
HEIGHTS_M = np.linspace(1, 16, 50)
PIPE_LENGTH_M = 6.0

def calculate_pipe_mass(od_mm: float, t_mm: float, length_m: float) -> float:
    od_m, t_m = od_mm/1000, t_mm/1000
    id_m = od_m - 2 * t_m
    return (math.pi / 4) * (od_m**2 - id_m**2) * length_m * DENSITY_STEEL

def calculate_impact_energy_kj(m_kg: float, h_m: float) -> float:
    return m_kg * G * h_m / 1000

def calculate_whip_radius_m(h_m: float, L_m: float = PIPE_LENGTH_M) -> float:
    vx_whip_mps = (math.sqrt(3 * G * L_m)) / 2
    fall_time_s = math.sqrt(2 * h_m / G)
    return (vx_whip_mps * fall_time_s) + (L_m / 2)

# ==============================================================================
# FUNCIÓN PRINCIPAL DE VISUALIZACIÓN (DASHBOARD)
# ==============================================================================

def crear_dashboard_riesgos(df: pd.DataFrame):
    print("Generando dashboard de análisis de riesgos...")
    fig = plt.figure(figsize=(18, 16), constrained_layout=True)
    gs = fig.add_gridspec(2, 2)
    fig.suptitle('Análisis Cuantitativo de Riesgos de Izaje para Tuberías de Acero', fontsize=24, fontweight='bold')

    # --- Panel A: Influencia del Espesor (Schedule) ---
    ax_a = fig.add_subplot(gs[0, 0])
    df_10inch = df[df['NPS (pulgadas)'] == '10']
    sns.lineplot(data=df_10inch, x='Altura Caída (m)', y='Energía Impacto (kJ)', hue='Schedule',
                 palette='plasma', linewidth=3, ax=ax_a)
    ax_a.set_title('A. El Espesor (Schedule) es un Factor Crítico')
    ax_a.set_ylabel('Energía de Impacto (kJ)')
    ax_a.set_xlabel('Altura de Caída (m)')
    ax_a.legend(title='Schedule')

    # --- Panel B: Zonas de Seguridad Basadas en Física ---
    ax_b = fig.add_subplot(gs[0, 1])
    df_8inch = df[(df['NPS (pulgadas)'] == '8') & (df['Schedule'] == 40)]
    ax_b.plot(df_8inch['Altura Caída (m)'], df_8inch['Radio Exclusión Látigo (m)'],
              color='red', linewidth=3, label='Radio de Exclusión (Falla de Eslinga)')
    ax_b.fill_between(df_8inch['Altura Caída (m)'], df_8inch['Radio Exclusión Látigo (m)'], 0, color='red', alpha=0.1)
    ax_b.set_title('B. Definición de Perímetros de Seguridad')
    ax_b.set_ylabel('Distancia Horizontal Máxima (m)')
    ax_b.set_xlabel('Altura de Izaje (m)')
    ax_b.legend()
    ax_b.set_ylim(bottom=0)

    # --- Panel C: El Argumento Irrefutable (Comparación de Energía) ---
    ax_c = fig.add_subplot(gs[1, :]) # Ocupa toda la fila inferior
    
    # Datos para la comparación
    energia_casco_kj = 135 / 1000
    # Energía de un vehículo de 1.4T a 50 km/h: E = 0.5 * 1400kg * (13.9 m/s)^2 = 135 kJ
    energia_vehiculo_kj = 135 
    energia_tubo_pequeno = df[(df['NPS (pulgadas)'] == '4') & (df['Schedule'] == 40) & (df['Altura Caída (m)'] == 1)]['Energía Impacto (kJ)'].iloc[0]
    energia_tubo_grande = df[(df['NPS (pulgadas)'] == '12') & (df['Schedule'] == 40) & (df['Altura Caída (m)'] == 16)]['Energía Impacto (kJ)'].iloc[0]
    
    escenarios = {
        'Límite Casco ANSI Tipo II': energia_casco_kj,
        'Caída de Tubo 4" Sch 40 (1m)': energia_tubo_pequeno,
        'Impacto Vehículo (1.4T @ 50 km/h)': energia_vehiculo_kj,
        'Peor Escenario: Tubo 12" Sch 40 (16m)': energia_tubo_grande,
    }
    
    bar_labels = list(escenarios.keys())
    bar_values = list(escenarios.values())
    
    bars = ax_c.barh(bar_labels, bar_values, color=['green', 'orange', 'red', 'darkred'])
    ax_c.set_xscale('log')
    ax_c.set_xlabel('Energía de Impacto (kJ) - Escala Logarítmica')
    ax_c.set_title('C. El Riesgo en Perspectiva: De la Percepción a la Realidad Física')
    ax_c.grid(axis='x', which='both', linestyle=':')
    ax_c.bar_label(bars, fmt='%.1f kJ', padding=5, fontsize=12, fontweight='bold')
    
    # Ajuste final de layout
    plt.savefig('Figuras/dashboard_analisis_riesgos.pdf', bbox_inches='tight')
    print("Dashboard guardado como 'Figuras/dashboard_analisis_riesgos.pdf'.")

# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================
if __name__ == "__main__":
    
    # 1. Ejecutar el análisis y generar el DataFrame
    data_rows = []
    for nps, props in PIPE_DATA.items():
        for sch, t_mm in props["SCH"].items():
            mass = calculate_pipe_mass(props["OD"], t_mm, PIPE_LENGTH_M)
            for height in HEIGHTS_M:
                data_rows.append({
                    "NPS (pulgadas)": nps, "Schedule": sch, "Altura Caída (m)": height,
                    "Masa Tubería (kg)": mass,
                    "Energía Impacto (kJ)": calculate_impact_energy_kj(mass, height),
                    "Radio Exclusión Látigo (m)": calculate_whip_radius_m(height, PIPE_LENGTH_M)
                })
    df_riesgos = pd.DataFrame(data_rows)
    print(f"Análisis completado para {len(df_riesgos)} escenarios.")

    # 2. Generar la visualización
    crear_dashboard_riesgos(df_riesgos)
    
    print("\n¡Proceso de análisis y visualización completado!")