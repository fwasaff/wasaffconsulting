import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from analisis_riesgo_impacto import PIPE_DATA 

# ==============================================================================
# CONFIGURACIÓN DEL ANÁLISIS VISUAL - VERSIÓN PUBLICACIÓN MEJORADA
# ==============================================================================

# --- Archivos ---
INPUT_CSV = 'reporte_riesgo_impacto_tuberias_completo.csv'

# --- Umbrales de Energía con Contexto Industrial (Joules) ---
THRESHOLD_HELMET_J = 135          # Límite superior de un casco ANSI Z89.1 Tipo II, citado en el informe.
THRESHOLD_TOOL_DROP_J = 490       # Energía de una herramienta pesada (ej: combo 5kg) cayendo desde 10m. Tangible.
THRESHOLD_CEMENT_BAG_J = 1226     # Energía de un saco de cemento (25kg) cayendo desde 5m. Muy visual para la construcción.
THRESHOLD_SEVERE_J = 10000        # Umbral de Riesgo Estructural Severo (10 kJ).

# --- ESTILOS DE GRÁFICOS ---
sns.set_theme(style="whitegrid")
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'Helvetica', 'DejaVu Sans'],
    'axes.labelsize': 18,      
    'axes.labelweight': 'bold',  
    'xtick.labelsize': 18,     
    'ytick.labelsize': 18,     
    'legend.fontsize': 16,     
    'legend.title_fontsize': 16
})

# ==============================================================================
# FUNCIONES DE VISUALIZACIÓN
# ==============================================================================

def plot_energia_vs_altura(df: pd.DataFrame, pipe_data_config: dict):
    """Genera el gráfico principal de Energía vs Altura con umbrales industriales."""
    print("Generando Gráfico 1 (Principal): Energía de Impacto...")
    df_sch40 = df[df['Schedule'] == 40].copy()
    
    ordered_categories = sorted(df_sch40['NPS (pulgadas)'].unique(), key=lambda x: list(pipe_data_config.keys()).index(x))
    df_sch40['NPS (pulgadas)'] = pd.Categorical(df_sch40['NPS (pulgadas)'], categories=ordered_categories, ordered=True)
    
    fig, ax = plt.subplots(figsize=(14, 10))
    sns.lineplot(data=df_sch40, x='Altura Caída (m)', y='Energía Impacto (kJ)', hue='NPS (pulgadas)', palette='viridis_r', linewidth=3.5, ax=ax)
    
    # --- LÍNEAS DE UMBRAL ACTUALIZADAS ---
    ax.axhline(y=THRESHOLD_HELMET_J/1000, color='orange', linestyle='--', linewidth=2, 
                label=f'Límite Casco Seguridad ANSI Tipo II ({int(THRESHOLD_HELMET_J)} J)')
    ax.axhline(y=THRESHOLD_TOOL_DROP_J/1000, color='red', linestyle='--', linewidth=2, 
                label=f'Impacto Herramienta Pesada (5kg @ 10m)')
    ax.axhline(y=THRESHOLD_CEMENT_BAG_J/1000, color='maroon', linestyle='--', linewidth=2.5,
                label=f'Impacto Saco Cemento (25kg @ 5m)')
    ax.axhline(y=THRESHOLD_SEVERE_J/1000, color='darkred', linestyle=':', linewidth=3, 
                label=f'Riesgo Estructural Severo ({int(THRESHOLD_SEVERE_J/1000)} kJ)')

    # --- RESTO DEL FORMATEO ---
    ax.set_xlabel('Altura de Caída (metros)', labelpad=15)
    ax.set_ylabel('Energía de Impacto Potencial (KiloJoules - kJ)', labelpad=15)
    ax.set_yscale('log')
    ax.set_ylim(bottom=0.05, top=200)
    
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(handles=handles, labels=labels, title='Diámetro (NPS)', 
              title_fontproperties={'weight':'bold', 'size': 14}, 
              bbox_to_anchor=(1.02, 1), loc='upper left')
              
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    plt.tight_layout(rect=[0, 0, 0.85, 1])
    plt.savefig('grafico_energia_vs_altura_sch40.png', dpi=300)
    print("Gráfico 1 guardado.")

def plot_comparativa_schedule(df: pd.DataFrame):
    # (Esta función no necesita cambios, la mantengo por completitud)
    print("Generando Gráfico 2: Influencia del Schedule...")
    df_target = df[df['NPS (pulgadas)'] == '10']
    
    fig, ax = plt.subplots(figsize=(12, 8))
    sns.lineplot(data=df_target, x='Altura Caída (m)', y='Energía Impacto (kJ)', hue='Schedule', palette='magma', linewidth=3.5, ax=ax, legend='full')
    
    ax.set_xlabel('Altura de Caída (m)', labelpad=15)
    ax.set_ylabel('Energía de Impacto (kJ)', labelpad=15)
    
    legend = ax.legend(title='Schedule', title_fontproperties={'weight':'bold', 'size': 14})
    plt.setp(legend.get_texts(), fontsize='12')
    
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    plt.tight_layout()
    plt.savefig('grafico_comparativa_schedule.png', dpi=300)
    print("Gráfico 2 guardado.")

def plot_radios_de_seguridad(df: pd.DataFrame):
    # (Esta función no necesita cambios, la mantengo por completitud)
    print("Generando Gráfico 3: Radios de Seguridad...")
    df_target = df[(df['NPS (pulgadas)'] == '8') & (df['Schedule'] == 40)]
    
    fig, ax = plt.subplots(figsize=(12, 8))
    sns.lineplot(data=df_target, x='Altura Caída (m)', y='Radio Operacional (m)', ax=ax, 
                 label='Radio Operacional (Perturbación por Viento 3 m/s)', linestyle='--', color='teal', linewidth=3)
    sns.lineplot(data=df_target, x='Altura Caída (m)', y='Radio Exclusión Látigo (m)', ax=ax, 
                 label='Radio de Exclusión (Falla de Eslinga)', linewidth=4, color='crimson')
    
    ax.set_xlabel('Altura de Izaje (m)', labelpad=15)
    ax.set_ylabel('Distancia Horizontal desde Punto de Caída (m)', labelpad=15)

    legend = ax.legend(frameon=True, fontsize=12)
    
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    plt.tight_layout()
    plt.savefig('grafico_radios_de_seguridad.png', dpi=300)
    print("Gráfico 3 guardado.")

# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================
if __name__ == "__main__":
    try:
        df_riesgos = pd.read_csv(INPUT_CSV)
        
        # Generamos todas las visualizaciones
        plot_energia_vs_altura(df_riesgos, PIPE_DATA)
        plot_comparativa_schedule(df_riesgos)
        plot_radios_de_seguridad(df_riesgos)
        
        print("\n¡Proceso de visualización completado exitosamente con gráficos de alta calidad!")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo '{INPUT_CSV}'. Ejecute 'analisis_riesgo_impacto.py' primero.")
    except ImportError:
        print("Error: No se pudo importar 'PIPE_DATA' desde 'analisis_riesgo_impacto.py'.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
