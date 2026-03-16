import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ==============================================================================
# CONFIGURACIÓN DEL ANÁLISIS VISUAL
# ==============================================================================

# --- Archivos ---
INPUT_CSV_FILENAME = 'reporte_riesgo_impacto_tuberias_completo.csv'
OUTPUT_IMAGE_FILENAME = 'grafico_energia_vs_altura_sch40.png'

# --- Umbrales de Energía de Impacto para Contextualización (en Joules) ---
THRESHOLD_HELMET_J = 135     # Límite superior de resistencia de un casco industrial (ANSI Tipo II)
THRESHOLD_BULLET_J = 550     # Energía típica de una bala 9mm
THRESHOLD_SEVERE_J = 10000   # Energía capaz de causar daño estructural severo (ej. 10 kJ)

# <<< CORRECCIÓN: Definimos PIPE_DATA aquí para que el main lo pueda pasar a las funciones.
# Si tuvieras esto en un archivo de configuración separado, lo importarías aquí.
# Esto asegura que el script es autónomo.
from analisis_riesgo_impacto import PIPE_DATA # Asumiendo que guardaste PIPE_DATA en el script anterior

# ==============================================================================
# FUNCIÓN PRINCIPAL DE VISUALIZACIÓN
# ==============================================================================

def generar_grafico_de_riesgo(df: pd.DataFrame, pipe_data_config: dict): # <<< CORRECCIÓN: Se añade el argumento
    """
    Genera y guarda un gráfico que visualiza la energía de impacto 
    en función de la altura y el diámetro de la tubería.
    """
    print("Iniciando generación de la visualización de riesgos...")

    # --- 1. Preparación de Datos ---
    df_sch40 = df[df['Schedule'] == 40].copy()

    # Usamos la configuración pasada para ordenar las categorías
    all_nps_in_data = df_sch40['NPS (pulgadas)'].unique()
    # <<< CORRECCIÓN: Usamos 'pipe_data_config' en lugar del 'PIPE_DATA' global
    ordered_categories = sorted(
        all_nps_in_data, 
        key=lambda x: list(pipe_data_config.keys()).index(x) if x in pipe_data_config else float('inf')
    )

    df_sch40['NPS (pulgadas)'] = pd.Categorical(df_sch40['NPS (pulgadas)'], categories=ordered_categories, ordered=True)

    # --- 2. Creación del Gráfico ---
    plt.style.use('seaborn-v0_8-whitegrid') 
    fig, ax = plt.subplots(figsize=(14, 9)) 

    sns.lineplot(
        data=df_sch40,
        x='Altura Caída (m)',
        y='Energía Impacto (kJ)',
        hue='NPS (pulgadas)',
        palette='viridis_r', 
        linewidth=2.5,
        ax=ax
    )

    # --- 3. Añadir Contexto Crítico ---
    ax.axhline(y=THRESHOLD_HELMET_J / 1000, color='orange', linestyle='--', linewidth=1.5,
                label=f'Límite Casco de Seguridad ({int(THRESHOLD_HELMET_J)} J)')
    ax.axhline(y=THRESHOLD_BULLET_J / 1000, color='red', linestyle='--', linewidth=1.5,
                label=f'Impacto Bala 9mm ({int(THRESHOLD_BULLET_J)} J)')
    ax.axhline(y=THRESHOLD_SEVERE_J / 1000, color='darkred', linestyle=':', linewidth=2,
                label=f'Riesgo Estructural Severo ({int(THRESHOLD_SEVERE_J/1000)} kJ)')

    # --- 4. Personalización y Títulos ---
    ax.set_title(
        'Energía de Impacto Predictiva por Caída de Tuberías (Acero, Sch 40)',
        fontsize=18, fontweight='bold', pad=20
    )
    ax.set_xlabel('Altura de Caída (metros)', fontsize=14)
    ax.set_ylabel('Energía de Impacto Potencial (KiloJoules - kJ)', fontsize=14)
    
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(handles=handles, labels=labels, title='Diámetro (NPS)',
              bbox_to_anchor=(1.02, 1), loc='upper left', title_fontsize='13', fontsize='11')
    
    ax.set_yscale('log')
    ax.set_ylim(bottom=0.01) 
    
    plt.tight_layout(rect=[0, 0, 0.85, 1]) 

    # --- 5. Guardar el Gráfico ---
    try:
        fig.savefig(OUTPUT_IMAGE_FILENAME, dpi=300, bbox_inches='tight')
        print(f"Gráfico guardado exitosamente como '{OUTPUT_IMAGE_FILENAME}'")
    except Exception as e:
        print(f"Error al guardar el gráfico: {e}")

def analizar_datos_clave(df: pd.DataFrame): # <<< CORRECCIÓN: Modificada para no depender de PIPE_DATA, es más robusta.
    """
    Imprime en la consola algunos insights numéricos clave derivados de los datos.
    """
    print("\n--- ANÁLISIS CUANTITATIVO DE RIESGOS ---")

    total_scenarios = len(df)
    if total_scenarios == 0:
        print("No hay datos para analizar.")
        return

    escenarios_letales_casco = df[df['Energía Impacto (kJ)'] > THRESHOLD_HELMET_J / 1000]
    porcentaje_letales = (len(escenarios_letales_casco) / total_scenarios) * 100
    print(f"-> {porcentaje_letales:.1f}% de los escenarios de caída analizados superan la capacidad de un casco de seguridad tipo II.")

    max_riesgo = df.iloc[0]
    print(f"-> Escenario de máximo riesgo: Tubería de {max_riesgo['NPS (pulgadas)']}'' Sch {max_riesgo['Schedule']} "
          f"cayendo de {max_riesgo['Altura Caída (m)']}m, generando {max_riesgo['Energía Impacto (kJ)']} kJ.")
    
    # Este análisis sí necesita filtrar, así que es correcto como está
    try:
        df_4_sch40 = df[(df['NPS (pulgadas)'] == '4') & (df['Schedule'] == 40)]
        if not df_4_sch40.empty:
            altura_critica_4_pulg = df_4_sch40[df_4_sch40['Energía Impacto (kJ)'] > THRESHOLD_HELMET_J / 1000]['Altura Caída (m)'].min()
            if pd.notna(altura_critica_4_pulg):
                print(f"-> Un tubo de 4'' (Sch 40) se vuelve potencialmente letal (supera un casco) desde apenas {altura_critica_4_pulg} metro(s) de caída.")
    except (KeyError, ValueError):
        print("-> No se pudo calcular la altura crítica para el tubo de 4''. Verifique los datos.")


# --- PUNTO DE ENTRADA DEL SCRIPT ---
if __name__ == "__main__":
    try:
        # En lugar de redefinir PIPE_DATA, lo importamos desde el script que lo genera.
        # Esto asegura que si actualizas los datos en un lugar, el cambio se propaga.
        from analisis_riesgo_impacto import PIPE_DATA
        
        df_riesgos = pd.read_csv(INPUT_CSV_FILENAME)
        
        # <<< CORRECCIÓN: Pasamos el diccionario como argumento a la función
        generar_grafico_de_riesgo(df_riesgos, PIPE_DATA)
        analizar_datos_clave(df_riesgos)

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo '{INPUT_CSV_FILENAME}'.")
        print("Por favor, ejecute primero el script 'analisis_riesgo_impacto.py' para generar los datos.")
    except ImportError:
        print("Error: No se pudo importar 'PIPE_DATA' desde 'analisis_riesgo_impacto.py'.")
        print("Asegúrese de que ambos scripts estén en la misma carpeta y que 'PIPE_DATA' esté definido en el script de generación.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
