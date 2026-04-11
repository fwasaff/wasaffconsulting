#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de simulación para el Capítulo 3 del libro "El Código de la Realidad".
Resuelve la Ecuación del Calor NO LINEAL para el enfriamiento de un disco de acero.
Genera una figura compuesta que muestra la evolución espacial y temporal.
"""

from fenics import *
# LA CORRECCIÓN #1: Importamos las herramientas de generación de mallas de mshr
from mshr import Circle, generate_mesh
import matplotlib.pyplot as plt
import numpy as np

# --- Parámetros de Simulación y Visualización ---
dt = 1.0           # Paso de tiempo (s)
num_steps = 60     # Número de pasos de tiempo
t_final = dt * num_steps

# Propiedades del material y condiciones de borde/iniciales
rho = 7900         # Densidad (kg/m^3)
cp = 500           # Capacidad calorífica (J/(kg*K))
T_border = 20.0    # Temperatura del borde (°C)
T_initial = 800.0  # Temperatura inicial (°C)

# Tiempos específicos en los que queremos una "fotografía"
snapshot_times = [5.0, 20.0, t_final]

# --- Inicialización de la Simulación ---
print("Iniciando la simulación de la Ecuación del Calor NO LINEAL...")

# LA CORRECCIÓN #2: Creamos la malla usando el flujo de trabajo de mshr
print("Paso 1: Creando la malla circular y el espacio funcional...")
domain = Circle(Point(0, 0), 0.05)  # Primero, definimos la geometría
mesh = generate_mesh(domain, 32)   # Segundo, generamos la malla a partir de la geometría

V = FunctionSpace(mesh, 'P', 1)

# Condiciones de contorno y iniciales
print("Paso 2: Definiendo condiciones de contorno e iniciales...")
def boundary(x, onBoundary):
    return onBoundary
bc = DirichletBC(V, Constant(T_border), boundary)

T = Function(V) 
Tn = Function(V)
Tn.assign(interpolate(Constant(T_initial), V))

# --- Definición del Problema Variacional No Lineal ---
print("Paso 3: Definiendo el problema variacional no lineal...")
v = TestFunction(V)
k = 14.6 + 0.0157 * T
F = rho*cp*(T - Tn)*v*dx + dt*k*dot(grad(T), grad(v))*dx

# --- Bucle Temporal con Almacenamiento de Datos ---
print("Paso 4: Ejecutando bucle temporal con solver de Newton...")
time_points = [0.0]
center_temp_history = [T_initial]
snapshots = {}
t = 0
vtkfile = File('Figuras/nonlinear_solution.pvd')
point_center = (0.0, 0.0)

for n in range(num_steps):
    t += dt
    print(f"Resolviendo para t = {t:.2f}s")
    
    solve(F == 0, T, bc)
    
    vtkfile << (T, t)
    
    time_points.append(t)
    center_temp_history.append(T(point_center))

    for snap_t in snapshot_times:
        if abs(t - snap_t) < dt / 2:
            snapshots[snap_t] = T.copy(deepcopy=True)
            print(f"   -> Snapshot guardado en t={snap_t:.2f}s")
    
    Tn.assign(T)

# --- Generación de la Figura Compuesta ---
print("\nGenerando la figura compuesta 'nonlinear_result.png'...")

# ... (El resto del código de visualización no necesita cambios) ...
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle('Enfriamiento No Lineal de un Disco de Acero', fontsize=16)

plot_axes = [axes[0, 0], axes[0, 1], axes[1, 0]]
for i, ax in enumerate(plot_axes):
    snap_t = snapshot_times[i]
    plt.sca(ax)
    p = plot(snapshots[snap_t], vmin=T_border, vmax=T_initial)
    ax.set_title(f'Temperatura en t = {snap_t:.1f} s')
    ax.set_xlabel("X (m)")
    ax.set_ylabel("Y (m)")

ax4 = axes[1, 1]
ax4.plot(time_points, center_temp_history, marker='o', linestyle='-', markersize=4)
ax4.set_title('Curva de Enfriamiento del Centro del Disco')
ax4.set_xlabel('Tiempo (s)')
ax4.set_ylabel('Temperatura (°C)')
ax4.grid(True)
ax4.set_xlim(0, t_final)
ax4.set_ylim(T_border - 50, T_initial + 50)

fig.tight_layout(rect=[0, 0.03, 0.9, 0.95])
cbar_ax = fig.add_axes([0.92, 0.15, 0.03, 0.7])
fig.colorbar(p, cax=cbar_ax, label='Temperatura (°C)')

output_path = 'Figuras/nonlinear_result.png'
plt.savefig(output_path, dpi=300)

print(f"\n¡Figura compuesta guardada en: {output_path}!")
print("El 'video' completo está en 'Figuras/nonlinear_solution.pvd'.")
