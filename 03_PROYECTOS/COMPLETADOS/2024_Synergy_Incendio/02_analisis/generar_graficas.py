import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import matplotlib.colors as mcolors

# ==============================================================================
# CONFIGURACIÓN ESTRATÉGICA DE VISUALIZACIÓN (VERSIÓN FINAL COMPLETA v4.2)
# ==============================================================================

# --- Archivo de Entrada ---
INPUT_CSV = 'reporte_riesgo_completo_CORRECTO.csv' # ¡Importante! Usar el CSV con los datos corregidos

# --- Umbrales de Energía ---
THRESHOLD_HELMET_J = 50
THRESHOLD_SEVERE_INJURY_J = 200
THRESHOLD_STRUCTURAL_J = 10000

# --- Estilos de Gráficos Profesionales ---
sns.set_theme(style="whitegrid")
plt.rcParams.update({
    'font.family': 'sans-serif', 'font.sans-serif': ['Arial'],
    'axes.labelsize': 18, 'axes.labelweight': 'bold',
    'xtick.labelsize': 14, 'ytick.labelsize': 14,
    'figure.titlesize': 24, 'figure.titleweight': 'bold',
    'axes.titlepad': 20,
    'legend.fontsize': 14, 'legend.title_fontsize': 16
})

# ==============================================================================
# FUNCIÓN 1: DASHBOARD DE DECISIÓN (Mapa de Riesgo Categórico)
# ==============================================================================
def plot_risk_category_heatmap(df: pd.DataFrame):
    """Genera el mapa de calor final con colores de riesgo industrial 100% correctos."""
    print("Generando Gráfico 1: Dashboard de Decisión (Versión Final)...")
    
    df_sch40 = df[df['Schedule'] == 40].copy()
    df_sch40['NPS_float'] = df_sch40['NPS (pulgadas)'].astype(float)
    
    risk_map = df_sch40.pivot_table(
        index='Altura Caída (m)',
        columns='NPS_float',
        values='Nivel de Riesgo',
        aggfunc='first'
    )
    
    risk_levels_config = {
        "BAJO (Verde)":           {"code": "B", "value": 0, "color": "#16a34a"},
        "SIGNIFICATIVO (Amarillo)":{"code": "S", "value": 1, "color": "#facc15"},
        "GRAVE (Rojo)":           {"code": "G", "value": 2, "color": "#f97316"},
        "CATASTRÓFICO (Púrpura)": {"code": "C", "value": 3, "color": "#dc2626"}
    }
    
    numeric_map = risk_map.apply(lambda col: col.map(lambda x: risk_levels_config.get(x, {}).get('value', -1)))
    annotation_map = risk_map.apply(lambda col: col.map(lambda x: risk_levels_config.get(x, {}).get('code', '?')))
    colors = [v['color'] for k, v in sorted(risk_levels_config.items(), key=lambda item: item[1]['value'])]
    custom_cmap = mcolors.ListedColormap(colors)
    
    fig, ax = plt.subplots(figsize=(20, 11))

    sns.heatmap(
        data=numeric_map.values,
        ax=ax, annot=annotation_map.values, fmt='s',
        annot_kws={"fontsize": 14, "weight": "bold", "color": "white"},
        linewidths=1.5, linecolor='white',
        cmap=custom_cmap, cbar=False,
        xticklabels=risk_map.columns.map('{:.1f}'.format).str.replace(r'\.0$', '', regex=True),
        yticklabels=risk_map.index
    )
    
    legend_text = 'Leyenda: B: Bajo (<50J), S: Significativo (<200J), G: Grave (<10kJ), C: Catastrófico (≥10kJ)'
    main_title = 'Mapa de Riesgo Operacional por Escenario de Izaje (Tuberías SCH 40)'
    
    fig.suptitle(main_title)
    ax.set_title(legend_text, fontsize=16)
    
    ax.set_xlabel('Diámetro Nominal de Tubería (Pulgadas)')
    ax.set_ylabel('Altura de Caída (metros)')
    plt.xticks(rotation=45, ha='right')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('grafico_mapa_riesgo_DEFINITIVO.png', dpi=300)
    print("Gráfico 1 (Mapa de Riesgo Definitivo) guardado.")

# ==============================================================================
# FUNCIÓN 2: LA CURVA DE IMPACTO (Análisis de Escenarios Críticos)
# ==============================================================================
def plot_critical_scenarios(df: pd.DataFrame):
    """Genera el gráfico de líneas simplificado con los escenarios clave."""
    print("Generando Gráfico 2: La Curva de Impacto...")
    
    scenarios_to_plot = ['2', '6', '12']
    # Asegúrate de que los NPS estén como string para el filtro .isin()
    df_critical = df[(df['Schedule'] == 40) & (df['NPS (pulgadas)'].astype(str).isin(scenarios_to_plot))].copy()
    
    # Ordenar la leyenda de forma lógica
    df_critical['NPS (pulgadas)'] = pd.Categorical(df_critical['NPS (pulgadas)'], categories=scenarios_to_plot, ordered=True)

    fig, ax = plt.subplots(figsize=(14, 9))
    sns.lineplot(
        data=df_critical,
        x='Altura Caída (m)', y='Energía Impacto (kJ)',
        hue='NPS (pulgadas)',
        palette='plasma',
        linewidth=4.5, ax=ax,
        marker='o', markersize=10
    )
    
    ax.axhline(y=THRESHOLD_HELMET_J/1000, color='orange', linestyle='--', linewidth=2.5, label=f'Límite EPP (Casco - {int(THRESHOLD_HELMET_J)} J)')
    ax.axhline(y=THRESHOLD_SEVERE_INJURY_J/1000, color='red', linestyle='--', linewidth=2.5, label=f'Riesgo Lesión Grave ({int(THRESHOLD_SEVERE_INJURY_J)} J)')
    ax.axhline(y=THRESHOLD_STRUCTURAL_J/1000, color='darkred', linestyle=':', linewidth=3, label=f'Riesgo Estructural ({int(THRESHOLD_STRUCTURAL_J/1000)} kJ)')
    
    ax.set_title('El Impacto No Lineal del Diámetro en la Energía de Caída (SCH 40)', fontsize=20)
    ax.set_xlabel('Altura de Caída (metros)')
    ax.set_ylabel('Energía de Impacto (KiloJoules - kJ)')
    ax.set_yscale('log')
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(handles=handles, labels=labels, title='Diámetro (NPS)', bbox_to_anchor=(1.02, 1), loc='upper left')
    
    plt.tight_layout(rect=[0, 0, 0.82, 1])
    plt.savefig('grafico_escenarios_criticos_DEFINITIVO.png', dpi=300)
    print("Gráfico 2 (Curva de Impacto Definitivo) guardado.")

# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================
if __name__ == "__main__":
    try:
        df_riesgos = pd.read_csv(INPUT_CSV, sep=';', decimal=',')
        
        # Generar AMBAS visualizaciones finales
        plot_risk_category_heatmap(df_riesgos)
        plot_critical_scenarios(df_riesgos)
        
        print("\n¡Proceso de visualización v4.2 para el dossier completado!")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo '{INPUT_CSV}'. Ejecute 'simulacion_final.py' primero.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
