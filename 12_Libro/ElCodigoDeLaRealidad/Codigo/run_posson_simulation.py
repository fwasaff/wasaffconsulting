#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de simulación para el Capítulo 1 del libro "El Código de la Realidad".
Resuelve la Ecuación de Poisson para un caso de estudio de disipación de calor.
Genera una visualización de los resultados y la guarda como una imagen PNG.
"""

# Importamos las librerías necesarias
# fenics para la simulación y matplotlib para la visualización
from fenics import *
import matplotlib.pyplot as plt

# --- Inicio de la Simulación ---
print("Iniciando la simulación de la Ecuación de Poisson...")

# 1. Definir la malla y el espacio funcional
print("Paso 1: Creando la malla y el espacio funcional...")
mesh = UnitSquareMesh(32, 32)
V = FunctionSpace(mesh, 'P', 1)

# 2. Definir las condiciones de contorno (Dirichlet)
print("Paso 2: Definiendo las condiciones de contorno...")
T_D = Constant(0.0)
def boundary(x, on_boundary):
    return on_boundary
bc = DirichletBC(V, T_D, boundary)

# 3. Definir el problema variacional (la forma débil)
print("Paso 3: Definiendo el problema variacional...")
T = TrialFunction(V)
v = TestFunction(V)
f = Expression('10*exp(-((pow(x[0]-0.5, 2) + pow(x[1]-0.5, 2)) / 0.02))', degree=2)
k = Constant(1.0)
a = k*dot(grad(T), grad(v))*dx
L = f*v*dx

# 4. Resolver el problema
print("Paso 4: Resolviendo el sistema de ecuaciones...")
Tsol = Function(V)
solve(a == L, Tsol, bc)

# --- Fin de la Simulación y Visualización ---

# 5. Guardar el resultado en formato VTK (para ParaView)
print("Paso 5: Guardando la solución en formato VTK...")
vtkfile = File('Figuras/poisson_solution.pvd')
vtkfile << Tsol

# 6. Crear y guardar la figura PNG para el libro
print("Paso 6: Generando la figura 'poisson_result.png'...")
plt.figure(figsize=(8, 6))
p = plot(Tsol, title="Distribución de Temperatura (T)")
plt.xlabel("Coordenada X (m)")
plt.ylabel("Coordenada Y (m)")
plt.colorbar(p, label="Temperatura (°C)")

# Guardamos la figura en la carpeta 'Figuras'
output_path = 'Figuras/poisson_result.png'
plt.savefig(output_path, dpi=300, bbox_inches='tight')

print(f"\n¡Simulación completada con éxito!")
print(f"La figura ha sido guardada en: {output_path}")

# Opcional: mostrar la figura en una ventana emergente
# plt.show()
