# -*- coding: utf-8 -*-
"""
==============================================================================
 WASAFF CONSULTING - DESAFÍO TÉCNICO: ANÁLISIS DE MANIFOLD
==============================================================================
 Metodología 1: Solución por Cálculos Manuales (Analítico-Empírico)

 Autor: Felipe Wasaff
 Fecha: 19 de agosto de 2025

 Descripción:
 Este script resuelve el problema de distribución de flujo en un manifold
 industrial utilizando un método iterativo basado en la Ecuación de Bernoulli
 y correlaciones empíricas para las pérdidas de carga (Darcy-Weisbach y 
 coeficientes K).

 El objetivo es encontrar la distribución de caudal de equilibrio en las 5
 salidas y la caída de presión total del sistema.
 
==============================================================================
"""

import numpy as np
from scipy.optimize import fsolve

# =============================================================================
# 1. PARÁMETROS DE ENTRADA Y SUPUESTOS DEL MODELO
# =============================================================================

# Propiedades del Fluido (Agua a 20°C)
rho = 998.2      # Densidad [kg/m^3]
mu = 1.002e-3    # Viscosidad dinámica [Pa·s]

# Datos Geométricos
D_in = 0.100     # Diámetro de entrada [m]
d_out = 0.050    # Diámetro de salida [m]
epsilon = 0.045e-3 # Rugosidad absoluta del Acero Comercial [m]

# --- Supuestos Críticos del Modelo (a ser transparentados en el informe) ---
# Se modela el header principal con tramos y stubs verticales cortos.
L_header_segment = 0.5 # Longitud de cada segmento del header entre salidas [m]
L_stub = 0.5           # Longitud del tubo vertical de cada salida [m]

# Coeficientes de pérdida menor (K) basados en manuales de ingeniería (ej. Crane TP-410).
# La correcta selección de estos coeficientes es la mayor fuente de incertidumbre.
K_values = {
    # Para el flujo que se desvía 90° hacia una salida
    'branch': 1.0, 
    # Para el flujo que continúa recto a través de una "T"
    'run_through': 0.3,
    # La última salida se comporta como un codo de 90°
    'elbow_last': 0.9 
}

# Condiciones de Contorno
V_in = 1.0       # Velocidad en la entrada [m/s]
g = 9.81         # Aceleración gravitacional [m/s^2]

# Parámetros de la simulación iterativa
TOLERANCE = 1e-5 # Tolerancia para la convergencia de presiones
MAX_ITER = 100   # Máximo número de iteraciones
LEARNING_RATE = 0.1 # Factor de ajuste para la convergencia

# =============================================================================
# 2. FUNCIONES FUNDAMENTALES
# =============================================================================

def solve_colebrook(re, e_d):
    """
    Resuelve la ecuación implícita de Colebrook-White para el factor de fricción (f).
    Utiliza un solver numérico para máxima precisión.
    
    Args:
        re (float): Número de Reynolds.
        e_d (float): Rugosidad relativa (epsilon/D).
    
    Returns:
        float: Factor de fricción (f).
    """
    if re < 2300: # Flujo Laminar
        return 64 / re
    
    # Ecuación de Colebrook a resolver: func(f) = 0
    func = lambda f: 1 / np.sqrt(f) + 2 * np.log10(e_d / 3.7 + 2.51 / (re * np.sqrt(f)))
    
    # Se usa fsolve con una suposición inicial común para flujo turbulento (0.02)
    f_initial_guess = 0.02
    f_solution = fsolve(func, f_initial_guess)[0]
    return f_solution

def calculate_pressure_drop(flow_rate, diameter, length, re, e_d):
    """Calcula la caída de presión por fricción para un tramo de tubería."""
    f = solve_colebrook(re, e_d)
    velocity = flow_rate / (np.pi * (diameter/2)**2)
    delta_p = f * (length / diameter) * (rho * velocity**2 / 2)
    return delta_p

# =============================================================================
# 3. LÓGICA DE SOLUCIÓN ITERATIVA
# =============================================================================

# --- Inicialización ---
A_in = np.pi * (D_in / 2)**2
A_out = np.pi * (d_out / 2)**2
Qin_total = A_in * V_in

# Suposición inicial: distribución de flujo perfectamente simétrica
flow_distribution = np.full(5, 1.0 / 5.0)

print("="*60)
print("INICIANDO SOLUCIÓN ITERATIVA PARA EL MÉTODO MANUAL")
print("="*60)
print(f"Caudal total de entrada: {Qin_total:.4f} m³/s")
Re_in = rho * V_in * D_in / mu
print(f"Número de Reynolds en la entrada: {Re_in:.0f} (Turbulento)")
print("-" * 60)

for i in range(MAX_ITER):
    
    # 1. Calcular caudales absolutos basados en la distribución actual
    Q_outlets = Qin_total * flow_distribution
    V_outlets = Q_outlets / A_out
    
    # 2. Calcular la caída de presión para cada una de las 5 rutas
    # El corazón del método: balance de energía desde la entrada hasta cada salida.
    
    pressures_in_calculated = []
    
    # Variables para el flujo a través del header
    Q_header = Qin_total
    V_header = V_in
    
    # Analizamos la pérdida de carga acumulada hasta cada salida
    delta_p_cumulative = 0
    
    for j in range(5): # j = 0 a 4, para las salidas 1 a 5
        
        # --- Pérdidas en el segmento del header ANTES de la salida actual ---
        if j > 0:
            Re_header = rho * V_header * D_in / mu
            e_d_header = epsilon / D_in
            delta_p_segment = calculate_pressure_drop(Q_header, D_in, L_header_segment, Re_header, e_d_header)
            
            # Pérdida menor por continuar recto en la "T" anterior
            delta_p_minor_run = K_values['run_through'] * (rho * V_header**2 / 2)
            delta_p_cumulative += delta_p_segment + delta_p_minor_run

        # --- Pérdidas en la derivación hacia la salida j ---
        # Pérdida por fricción en el stub vertical
        Re_out = rho * V_outlets[j] * d_out / mu
        e_d_out = epsilon / d_out
        delta_p_stub = calculate_pressure_drop(Q_outlets[j], d_out, L_stub, Re_out, e_d_out)
        
        # Pérdida menor en la "T"
        k_junction = K_values['branch'] if j < 4 else K_values['elbow_last']
        # La velocidad para el coeficiente K es la del header *antes* de la derivación
        delta_p_minor_branch = k_junction * (rho * V_header**2 / 2)
        
        # --- Energía Cinética y Caída de Presión Total ---
        # P_in - P_out = DeltaP_friccion + DeltaP_menores + Delta_EnergiaCinetica
        delta_KE = 0.5 * rho * (V_outlets[j]**2 - V_in**2)
        
        P_in_j = delta_p_cumulative + delta_p_stub + delta_p_minor_branch + delta_KE
        pressures_in_calculated.append(P_in_j)

        # Actualizar el flujo en el header para el siguiente segmento
        Q_header -= Q_outlets[j]
        V_header = Q_header / A_in
    
    # 3. Comprobar la convergencia
    pressures_in_calculated = np.array(pressures_in_calculated)
    std_dev = np.std(pressures_in_calculated)
    
    print(f"Iteración {i+1}: Desv. Est. de Presión = {std_dev:.2f} Pa")
    
    if std_dev < TOLERANCE:
        print("\n¡Convergencia alcanzada!")
        break
        
    # 4. Ajustar la distribución de flujo
    # La presión requerida es un indicador de la "resistencia" de cada ruta.
    # Ajustamos la distribución para darle más flujo a las rutas de menor resistencia.
    
    avg_pressure = np.mean(pressures_in_calculated)
    error = pressures_in_calculated - avg_pressure
    
    # El ajuste es proporcional e inverso al error de presión
    adjustment = flow_distribution * (1 - LEARNING_RATE * error / avg_pressure)
    
    # Renormalizar la distribución para asegurar que la suma siga siendo 1.0
    flow_distribution = adjustment / np.sum(adjustment)


# =============================================================================
# 4. PRESENTACIÓN DE RESULTADOS
# =============================================================================
final_pressure_drop_Pa = np.mean(pressures_in_calculated)
final_pressure_drop_bar = final_pressure_drop_Pa / 1e5

print("\n" + "="*60)
print("RESULTADOS FINALES DEL MÉTODO DE CÁLCULOS MANUALES")
print("="*60)
print(f"Caída de Presión Total (ΔP): {final_pressure_drop_bar:.4f} [bar]")
print("\nDistribución de Caudal en las Salidas:")
for j in range(5):
    print(f"  - Caudal Salida {j+1}: {flow_distribution[j]*100:.2f} [%]")

if i == MAX_ITER -1:
    print("\nADVERTENCIA: Se alcanzó el número máximo de iteraciones sin convergencia total.")
