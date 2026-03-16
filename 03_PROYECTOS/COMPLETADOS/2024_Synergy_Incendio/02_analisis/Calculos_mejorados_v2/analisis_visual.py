import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from analisis_riesgo_impacto import PIPE_DATA 

# ... (El preámbulo y las dos primeras funciones de ploteo no cambian) ...
# ==============================================================================
# CONFIGURACIÓN GLOBAL DE ESTILO - VERSIÓN PUBLICACIÓN
# ==============================================================================
sns.set_theme(style="whitegrid")
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'Helvetica', 'DejaVu Sans'],
    'axes.labelsize': 16,      
    'axes.labelweight': 'bold',  
    'xtick.labelsize': 14,     
    'ytick.labelsize': 14,     
    'legend.fontsize': 12,     
    'legend.title_fontsize': 14
})

# --- Umbrales de Energía (Joules) ---
THRESHOLD_HELMET_J = 135
THRESHOLD_BULLET_J = 550
THRESHOLD_SEVERE_J = 10000

# ==============================================================================
# FUNCIONES DE VISUALIZACIÓN
# ==============================================================================

def plot_energia_vs_altura(df: pd.DataFrame, pipe_data_config: dict):
    print("Generando Gráfico 1 (Principal): Energía de Impacto...")
    # ... (código sin cambios)
    df_sch40 = df[df['Schedule'] == 40].copy()
    
    ordered_categories = sorted(
        df_sch40['NPS (pulgadas)'].unique(), 
        key=lambda x: list(pipe_data_config.keys()).index(x) if x in pipe_data_config else -1
    )
    df_sch40['NPS (pulgadas)'] = pd.Categorical(df_sch40['NPS (pulgadas)'], categories=ordered_categories, ordered=True)
    
    fig, ax = plt.subplots(figsize=(14, 10))
    sns.lineplot(data=df_sch40, x='Altura Caída (m)', y='Energía Impacto (kJ)', hue='NPS (pulgadas)', palette='viridis_r', linewidth=3.5, ax=ax) 
    
    ax.axhline(y=THRESHOLD_HELMET_J/1000, color='orange', linestyle='--', linewidth=2, label=f'Límite Casco Seguridad ({int(THRESHOLD_HELMET_J)} J)')
    ax.axhline(y=THRESHOLD_BULLET_J/1000, color='red', linestyle='--', linewidth=2, label=f'Impacto Bala 9mm ({int(THRESHOLD_BULLET_J)} J)')
    ax.axhline(y=THRESHOLD_SEVERE_J/1000, color='darkred', linestyle=':', linewidth=2.5, label=f'Riesgo Estructural Severo ({int(THRESHOLD_SEVERE_J/1000)} kJ)')

    ax.set_xlabel('Altura de Caída (metros)', labelpad=15)
    ax.set_ylabel('Energía de Impacto Potencial (KiloJoules - kJ)', labelpad=15)
    ax.set_yscale('log')
    ax.set_ylim(bottom=0.05, top=200)
    
    handles, labels = ax.get_legend_handles_labels()
    legend = ax.legend(handles=handles, labels=labels, title='Diámetro (NPS)', title_fontproperties={'weight':'bold', 'size': 14}, bbox_to_anchor=(1.02, 1), loc='upper left')
              
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    plt.tight_layout(rect=[0, 0, 0.85, 1])
    plt.savefig('grafico_energia_vs_altura_sch40.png', dpi=300)
    print("Gráfico 1 guardado.")

def plot_comparativa_schedule(df: pd.DataFrame):
    print("Generando Gráfico 2: Influencia del Schedule...")
    # ... (código sin cambios)
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
    """Genera el gráfico de radios de seguridad para un tubo de alto riesgo."""
    print("Generando Gráfico 3: Radios de Seguridad...")
    df_target = df[(df['NPS (pulgadas)'] == '8') & (df['Schedule'] == 40)]
    
    fig, ax = plt.subplots(figsize=(12, 8))
    sns.lineplot(data=df_target, x='Altura Caída (m)', y='Radio Operacional (m)', ax=ax, 
                 label='Radio Operacional (Perturbación por Viento 3 m/s)', linestyle='--', color='teal', linewidth=3)
    
    # <<< LA CORRECCIÓN ESTÁ EN ESTA LÍNEA >>>
    # Cambiamos "Radio de Exclusión (Falla de Eslinga)" por el nombre real de la columna en el CSV.
    sns.lineplot(data=df_target, x='Altura Caída (m)', y='Radio Exclusión Látigo (m)', ax=ax, 
                 label='Radio de Exclusión (Falla de Eslinga)', linewidth=4, color='crimson') 
    
    ax.set_xlabel('Altura de Izaje (m)', labelpad=15)
    ax.set_ylabel('Distancia Horizontal desde Punto de Caída (m)', labelpad=15)

    legend = ax.legend(frameon=True, fontsize=12)
    plt.setp(legend.get_title(), weight='bold') # Hace que el título de la leyenda sea negrita, si existe.
    
    ax.grid(True, which="both", ls="--", linewidth=0.5)
    plt.tight_layout()
    plt.savefig('grafico_radios_de_seguridad.png', dpi=300)
    print("Gráfico 3 guardado.")


# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================

if __name__ == "__main__":
    try:
        INPUT_CSV = 'reporte_riesgo_impacto_tuberias_completo.csv'
        df_riesgos = pd.read_csv(INPUT_CSV)
        
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
