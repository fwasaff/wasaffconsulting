#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de simulación AVANZADO para el Capítulo 2.
Resuelve la Ecuación del Calor transitoria y genera una figura compuesta 2x2
que muestra la evolución espacial y temporal de la temperatura.
"""

from fenics import *
import matplotlib.pyplot as plt
import numpy as np

# --- Parámetros de Simulación y Visualización ---
dt = 0.01
num_steps = 50
t_final = dt * num_steps
rho, cp, k = 1.0, 1.0, 1.0

# Tiempos específicos en los que queremos una "fotografía"
snapshot_times = [0.05, 0.20, t_final]

# --- Inicialización de la Simulación ---
print("Iniciando la simulación de la Ecuación del Calor transitoria...")
mesh = UnitSquareMesh(32, 32)
V = FunctionSpace(mesh, 'P', 1)

# Condiciones de contorno e iniciales
TD = Constant(0.0)
def boundary(x, onBoundary):
    return onBoundary
bc = DirichletBC(V, TD, boundary)
Tn = interpolate(Constant(0.0), V)

# Problema variacional
T = TrialFunction(V)
v = TestFunction(V)
f = Expression('10*exp(-((pow(x[0]-0.5, 2) + pow(x[1]-0.5, 2)) / 0.02))', degree=2)
a = rho*cp*T*v*dx + dt*k*dot(grad(T), grad(v))*dx
L = (rho*cp*Tn + dt*f)*v*dx
Tsol = Function(V)

# --- Bucle Temporal con Almacenamiento de Datos ---
print("Ejecutando bucle temporal y almacenando datos...")

# Listas para guardar los datos para el gráfico de evolución
time_points = [0.0]
max_temp_history = [0.0]

# Diccionario para guardar las "fotografías" de la solución
snapshots = {}
t = 0

for n in range(num_steps):
    t += dt
    solve(a == L, Tsol, bc)
    Tn.assign(Tsol)

    # Almacenar datos para el gráfico
    time_points.append(t)
    max_temp_history.append(Tsol.vector().max())

    # Comprobar si es momento de tomar una "fotografía"
    for snap_t in snapshot_times:
        if abs(t - snap_t) < dt / 2: # Comparamos con una pequeña tolerancia
            snapshots[snap_t] = Tsol.copy(deepcopy=True)
            print(f"   -> Snapshot guardado en t={snap_t:.2f}s")


# --- Generación de la Figura Compuesta (Versión Robusta) ---
print("\nGenerando la figura compuesta 'heat_result.png'...")

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle('Evolución de la Temperatura en la Placa', fontsize=16)

# Encontrar el rango global de temperatura para una barra de colores consistente
global_max_temp = max(max_temp_history)

# --- Panel 1: Snapshot en t = 0.05s ---
ax1 = axes[0, 0]
plt.sca(ax1)
plot(snapshots[0.05], vmin=0, vmax=global_max_temp)
ax1.set_title(f'Temperatura en t = {snapshot_times[0]:.2f} s')
ax1.set_xlabel("X (m)")
ax1.set_ylabel("Y (m)")

# --- Panel 2: Snapshot en t = 0.20s ---
ax2 = axes[0, 1]
plt.sca(ax2)
plot(snapshots[0.20], vmin=0, vmax=global_max_temp)
ax2.set_title(f'Temperatura en t = {snapshot_times[1]:.2f} s')
ax2.set_xlabel("X (m)")
ax2.set_ylabel("Y (m)")

# --- Panel 3: Snapshot en t = 0.50s (final) ---
ax3 = axes[1, 0]
plt.sca(ax3)
p3 = plot(snapshots[t_final], vmin=0, vmax=global_max_temp)
ax3.set_title(f'Temperatura en t = {snapshot_times[2]:.2f} s')
ax3.set_xlabel("X (m)")
ax3.set_ylabel("Y (m)")

# --- Panel 4: Evolución de la temperatura máxima ---
ax4 = axes[1, 1]
ax4.plot(time_points, max_temp_history, marker='o', linestyle='-', markersize=4)
ax4.set_title('Evolución de la Temperatura Máxima')
ax4.set_xlabel('Tiempo (s)')
ax4.set_ylabel('Temperatura Máxima (°C)')
ax4.grid(True)
ax4.set_xlim(0, t_final)
ax4.set_ylim(0, global_max_temp * 1.05)

# --- Barra de Colores (Método Robusto) ---
# Ajustamos el layout primero, dejando espacio a la derecha para la colorbar
fig.tight_layout(rect=[0, 0.03, 0.9, 0.95]) # <-- Dejamos un 10% de espacio a la derecha

# Creamos un nuevo eje para la colorbar en el espacio que dejamos
cbar_ax = fig.add_axes([0.92, 0.15, 0.03, 0.7]) # [izquierda, abajo, ancho, alto]
fig.colorbar(p3, cax=cbar_ax, label='Temperatura (°C)')


output_path = 'Figuras/heat_result.png'
plt.savefig(output_path, dpi=300)

print(f"\n¡Figura compuesta guardada en: {output_path}!")
