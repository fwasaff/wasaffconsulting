import numpy as np
import matplotlib.pyplot as plt

# ==============================================================================
# CONFIGURACIÓN GLOBAL Y ESTILOS (Estándar Wasaff Consulting)
# ==============================================================================
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Raleway', 'Arial'],
    'axes.labelsize': 14,
    'axes.labelweight': 'bold',
    'xtick.labelsize': 12,
    'ytick.labelsize': 12,
    'axes.titlesize': 18,
    'axes.titleweight': 'bold',
    'figure.titlesize': 20,
    'figure.titleweight': 'bold',
    'axes.titlepad': 15,
    'legend.fontsize': 11
})

# ==============================================================================
# FUNCIÓN DE SIMULACIÓN Y GRÁFICO
# ==============================================================================
def simular_y_graficar(volumen_litros: float, filename: str, titulo: str):
    """
    Función genérica que simula la evolución de la temperatura para un volumen dado
    y genera un gráfico de alta calidad listo para el dossier.
    """
    print(f"Generando gráfico para {filename}...")

    # --- Parámetros de la simulación ---
    V_tanque_m3 = volumen_litros / 1000
    densidad_glicol = 1050
    Cp_glicol_kJ_kgK = 3.5  # Capacidad calorífica en kJ/kg·K
    Q_kW = 495  # Carga térmica en kW (que es igual a kJ/s)

    tiempo_simulacion_s = 301
    intervalos = np.arange(0, tiempo_simulacion_s, 1)

    # --- Condiciones iniciales ---
    m_tanque_kg = V_tanque_m3 * densidad_glicol
    temp_tanque_C = 12.0
    temperaturas = [temp_tanque_C]

    # --- Simulación ---
    for t in intervalos[1:]:
        # Cálculo del aumento de temperatura en cada paso de tiempo (dt = 1s)
        # dT = Q * dt / (m * Cp)
        delta_T_por_segundo = Q_kW / (m_tanque_kg * Cp_glicol_kJ_kgK)
        
        nueva_temp = temperaturas[-1] + delta_T_por_segundo
        
        # Limitar la temperatura a 17°C si se cruza el umbral
        if nueva_temp >= 17.0:
            temperaturas.append(17.0)
        else:
            temperaturas.append(nueva_temp)

    # --- Creación del Gráfico ---
    fig, ax = plt.subplots(figsize=(12, 7))

    # Graficar la curva de temperatura
    ax.plot(intervalos, temperaturas, color='#0054a6', linewidth=3.5, label='Temperatura Proyectada del Tanque')

    # Líneas y textos de referencia
    ax.axhline(y=17, color='#dc2626', linestyle='--', linewidth=2, label='Límite Máximo Operacional (17°C)')
    
    # Lógica para mostrar el punto de falla solo si ocurre
    if any(t >= 17 for t in temperaturas):
        try:
            tiempo_falla = next(i for i, temp in enumerate(temperaturas) if temp >= 17)
            ax.axvline(x=tiempo_falla, color='red', linestyle=':', linewidth=2, label=f'Punto de Falla (~{tiempo_falla}s)')
        except StopIteration:
            pass # No se encontró punto de falla

    # Rellenar áreas para dar énfasis visual
    ax.fill_between(intervalos, 12, temperaturas, where=np.array(temperaturas) < 17, color='green', alpha=0.1, label='Zona Segura')
    ax.fill_between(intervalos, 12, temperaturas, where=np.array(temperaturas) >= 17, color='red', alpha=0.2, label='Zona de Riesgo Crítico')

    # Formateo y etiquetas
    ax.set_xlabel("Tiempo desde el Apagón del Chiller (segundos)")
    ax.set_ylabel("Temperatura Promedio del Glicol (°C)")
    ax.set_title(titulo)
    ax.set_ylim(bottom=11.5, top=18.5)
    ax.set_xlim(left=0, right=300)
    ax.legend(loc='lower right')
    
    plt.tight_layout()
    plt.savefig(filename, dpi=300)
    print(f"Gráfico '{filename}' guardado exitosamente.")

# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================
if __name__ == "__main__":
    
    # Generar el Gráfico 1: Falla del sistema actual
    simular_y_graficar(
        volumen_litros=1700,
        filename='grafico_falla_actual.png',
        titulo='Evolución de Temperatura del Sistema de Respaldo Actual (1700 L)'
    )
    
    print("-" * 50)
    
    # Generar el Gráfico 2: Validación de la solución propuesta
    simular_y_graficar(
        volumen_litros=7500,
        filename='grafico_solucion_propuesta.png',
        titulo='Evolución de Temperatura con la Solución Propuesta (7500 L)'
    )
    
    print("\n¡Proceso de visualización para el dossier del Data Center completado!")
