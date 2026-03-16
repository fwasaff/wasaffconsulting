import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import math

# ==============================================================================
# CONFIGURACIÓN GLOBAL Y ESTILOS
# ==============================================================================
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams.update({
    'font.family': 'sans-serif', 'font.sans-serif': ['Arial'],
    'axes.labelsize': 14, 'axes.labelweight': 'bold',
    'xtick.labelsize': 12, 'ytick.labelsize': 12,
    'figure.titlesize': 18, 'figure.titleweight': 'bold',
    'axes.titlepad': 20,
    'legend.fontsize': 12
})

# ==============================================================================
# GRÁFICO 1: SIMULACIÓN DE FALLA TÉRMICA
# ==============================================================================
def plot_thermal_failure_curve():
    """Simula y grafica la evolución de la temperatura en el tanque de 1700L."""
    print("Generando Gráfico 1: Simulación de Falla Térmica...")
    
    # --- Parámetros de la simulación ---
    V_tanque = 1.7
    densidad_glicol = 1050
    Cp_glicol = 4.186 # kJ/kg·K
    flujo_m3_h = 85
    flujo_kg_s = (flujo_m3_h * densidad_glicol) / 3600
    Q_kW = 495
    Q_kJ_s = Q_kW # kJ/s

    tiempo_simulacion = 301 # Simular hasta 300 segundos
    intervalos = np.arange(0, tiempo_simulacion, 1)

    # --- Condiciones iniciales ---
    m_tanque = V_tanque * densidad_glicol
    temperatura_tanque = 12.0
    temperatura_retorno = 17.0
    temperaturas = [temperatura_tanque]

    # --- Simulación ---
    for t in intervalos[1:]: # Empezar desde el segundo 1
        # Usamos un modelo de mezcla simple para el balance de energía
        # Nueva energía = Energía existente + Energía entrante del fluido + Energía de servidores
        energia_total = (m_tanque * Cp_glicol * temperaturas[-1]) + (flujo_kg_s * Cp_glicol * temperatura_retorno) * 1 # dt=1s
        # Nueva masa = masa existente + masa entrante
        nueva_masa_total = m_tanque + flujo_kg_s
        # T_nueva = Energia / (Masa * Cp). Aquí asumimos que Q_servidores calienta el agua que retorna de 12 a 17
        # Por lo tanto, el Q_servidores ya está implícito en la T_retorno
        
        # Corrección del balance: El calor se añade a la masa total del tanque.
        # dT/dt = Q_servidores / (m_total_sistema * Cp)
        # La forma más simple es calcular el aumento por segundo
        aumento_temp_por_segundo = Q_kJ_s / (m_tanque * Cp_glicol)
        nueva_temp = temperaturas[-1] + aumento_temp_por_segundo

        temperaturas.append(nueva_temp)

        if nueva_temp >= 17:
            print(f"Límite de temperatura alcanzado a los {t} segundos.")
            # Extendemos la simulación hasta el final para mostrar lo que habría pasado
            break
            
    # Rellenar el resto del tiempo con la última temperatura para el gráfico
    tiempo_real_sim = len(temperaturas)
    if tiempo_real_sim < len(intervalos):
        temperaturas.extend([17] * (len(intervalos) - tiempo_real_sim))


    # --- Creación del Gráfico ---
    fig, ax = plt.subplots(figsize=(12, 7))
    
    ax.plot(intervalos, temperaturas, label="Temperatura Proyectada del Tanque", color='#0054a6', linewidth=3)
    
    ax.axhline(y=17, color='#dc2626', linestyle='--', linewidth=2, label="Límite Máximo Operacional (17°C)")
    ax.axvline(x=tiempo_real_sim-1, color='red', linestyle=':', linewidth=2, label=f"Punto de Falla (~{tiempo_real_sim-1}s)")
    
    # Rellenar áreas para dar énfasis visual
    ax.fill_between(intervalos, 12, temperaturas, where=[temp < 17 for temp in temperaturas], color='green', alpha=0.1, label='Zona Segura')
    ax.fill_between(intervalos, 12, temperaturas, where=[temp >= 17 for temp in temperaturas], color='red', alpha=0.2, label='Zona de Riesgo Crítico')
    
    ax.set_xlabel("Tiempo desde el Apagón del Chiller (segundos)")
    ax.set_ylabel("Temperatura Promedio del Glicol (°C)")
    ax.set_title("Evolución de Temperatura del Sistema de Respaldo Actual (1700 L)")
    ax.set_ylim(bottom=11.5, top=18)
    ax.set_xlim(left=0, right=300)
    ax.legend()
    
    plt.tight_layout()
    plt.savefig('grafico_falla_termica_datacenter.png', dpi=300)
    print("Gráfico 1 (Falla Térmica) guardado.")

# ==============================================================================
# GRÁFICO 2: DESGLOSE DE PÉRDIDAS HIDRÁULICAS
# ==============================================================================
def plot_head_loss_breakdown():
    """Genera el gráfico de barras apiladas del desglose de la altura requerida."""
    print("Generando Gráfico 2: Desglose de Pérdidas Hidráulicas...")
    
    # --- Datos calculados previamente ---
    resultados = {
        "Altura Total Requerida (m)": 15.05,
        "Pérdida por Accesorios (m)": 10.51, # El "villano"
        "Pérdida por Fricción (m)": 4.11,   # Tuberías
        "Cabeza de Velocidad (m)": 0.42     # Energía de salida
    }
    
    labels = ['Pérdida por Accesorios (Servidores, codos)', 'Pérdida por Fricción (Tuberías)', 'Energía Cinética (Salida)']
    valores = [
        resultados["Pérdida por Accesorios (m)"],
        resultados["Pérdida por Fricción (m)"],
        resultados["Cabeza de Velocidad (m)"]
    ]
    
    colores = ['#f97316', '#0ea5e9', '#84cc16'] # Naranja (principal), Azul, Verde

    fig, ax = plt.subplots(figsize=(10, 7))
    
    bottom_val = 0
    for i, (label, valor) in enumerate(zip(labels, valores)):
        bar = ax.bar('Altura Total Requerida', valor, bottom=bottom_val, label=f"{label}: {valor:.2f} m", color=colores[i])
        bottom_val += valor
        
        # Añadir el porcentaje dentro de cada barra
        porcentaje = valor / resultados["Altura Total Requerida (m)"]
        # Solo mostrar el porcentaje si es significativo
        if porcentaje > 0.05:
            ax.text(bar.patches[0].get_x() + bar.patches[0].get_width() / 2, 
                    bottom_val - valor / 2, 
                    f'{porcentaje:.1%}',
                    ha='center', va='center', color='white', fontsize=16, weight='bold')

    ax.set_ylim(0, resultados["Altura Total Requerida (m)"] * 1.1)
    ax.set_ylabel('Altura Requerida (metros de columna de agua)')
    ax.set_title(f'Desglose de la Altura por Gravedad Requerida ({resultados["Altura Total Requerida (m)"]:.2f} m)')
    ax.legend(loc='upper right')
    
    ax.set_xticks([])
    
    plt.tight_layout()
    plt.savefig('grafico_desglose_perdidas_hidraulicas.png', dpi=300)
    print("Gráfico 2 (Desglose de Pérdidas) guardado.")

# ==============================================================================
# PUNTO DE ENTRADA DEL SCRIPT
# ==============================================================================
if __name__ == "__main__":
    plot_thermal_failure_curve()
    print("-" * 50)
    plot_head_loss_breakdown()
    print("\n¡Proceso de visualización para el dossier del Data Center completado!")
