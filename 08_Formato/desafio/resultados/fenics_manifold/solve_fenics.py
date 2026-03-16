# -*- coding: utf-8 -*-
"""
==============================================================================
 WASAFF CONSULTING - Desafío Técnico: ANÁLISIS DE MANIFOLD (FINAL)
==============================================================================
 Metodología 2: Solución FEniCS (Versión Final - Lectura XDMF Unificada)
==============================================================================
"""
from fenics import *
import numpy as np

# --- 1. Carga de Malla y Fronteras (Método XDMF Unificado) ---
print("Paso 1: Cargando malla y fronteras desde archivo XDMF unificado...")

mesh = Mesh()
with XDMFFile("manifold.xdmf") as infile:
    # Leemos la malla del volumen (los tetraedros)
    infile.read(mesh)
    
    # Creamos una MeshFunction para almacenar las etiquetas de las fronteras
    # El '2' es para la dimensión (caras/facetas 2D)
    mvc = MeshValueCollection("size_t", mesh, 2)
    
    # Leemos los datos de las fronteras DESDE EL MISMO ARCHIVO
    infile.read(mvc, "FacetRegions")
    
    # Creamos la MeshFunction final a partir de los datos leídos
    boundaries = cpp.mesh.MeshFunctionSizet(mesh, mvc)

print("Malla y fronteras cargadas correctamente desde el mismo archivo.")

# El resto del código es idéntico y ahora funcionará
INLET_ID = 10; OUTLET_1_ID = 21; OUTLET_2_ID = 22; OUTLET_3_ID = 23; OUTLET_4_ID = 24; OUTLET_5_ID = 25; WALLS_ID = 100

print("Paso 2: Definiendo espacios de funciones...")
V = VectorElement("CG", mesh.ufl_cell(), 2); P = FiniteElement("CG", mesh.ufl_cell(), 1)
W = FunctionSpace(mesh, MixedElement([V, P]))

print("Paso 3: Definiendo condiciones de contorno...")
inlet_velocity_profile = Expression(("1.0", "0.0", "0.0"), degree=2)
bc_inlet = DirichletBC(W.sub(0), inlet_velocity_profile, boundaries, INLET_ID)
bc_walls = DirichletBC(W.sub(0), Constant((0.0, 0.0, 0.0)), boundaries, WALLS_ID)
bcs = [bc_inlet, bc_walls]

print("Paso 4: Escribiendo la formulación variacional...")
(u, p) = TrialFunctions(W); (v, q) = TestFunctions(W); w = Function(W)
u_prev = w.sub(0); rho = Constant(998.2); mu = Constant(1.002E-3)
F = rho*dot(dot(u_prev, nabla_grad(u)), v)*dx + mu*inner(nabla_grad(u), nabla_grad(v))*dx - p*div(v)*dx + q*div(u)*dx
a, L = lhs(F), rhs(F)

print("Paso 5: Iniciando la resolución...")
w_prev = Function(W)
for i in range(20):
    assign(w.sub(0), w_prev.sub(0))
    solve(a == L, w, bcs, solver_parameters={'linear_solver': 'mumps'})
    diff = w.vector() - w_prev.vector(); error = np.linalg.norm(diff, 'l2') / np.linalg.norm(w.vector(), 'l2')
    print(f"  Iteración {i+1}: Error relativo = {error:.4e}")
    if error < 1e-6:
        print("Convergencia alcanzada."); break
    assign(w_prev, w)

(u_sol, p_sol) = w.split(deepcopy=True); print("¡Simulación completada con éxito!")

print("\n" + "="*60); print("Paso 6: Post-procesando resultados...")
n_out = Constant((0.0, 0.0, 1.0))
ds_measure = ds(subdomain_data=boundaries)
outlets_ids = [OUTLET_1_ID, OUTLET_2_ID, OUTLET_3_ID, OUTLET_4_ID, OUTLET_5_ID]
Q_outlets = [assemble(dot(u_sol, n_out) * ds_measure(ID)) for ID in outlets_ids]
Q_total_out = sum(Q_outlets)
print("\n--- Distribución de Caudal en Salidas ---")
for i, Q in enumerate(Q_outlets):
    print(f"Salida {i+1}: {100 * Q / Q_total_out:.2f} %")

A_inlet = assemble(Constant(1.0)*ds_measure(INLET_ID))
P_in_avg = assemble(p_sol * ds_measure(INLET_ID)) / A_inlet if A_inlet > 1e-12 else 0
delta_P_bar = P_in_avg / 1e5
print(f"\n--- Caída de Presión ---\nCaída de Presión Total (ΔP): {delta_P_bar:.5f} [bar]")

u_sol.rename("Velocidad", "m/s"); p_sol.rename("Presion", "Pa")
File('results_fenics/velocity.pvd') << u_sol
File('results_fenics/pressure.pvd') << p_sol
print("\nResultados para visualización guardados en 'results_fenics'.")
print("="*60)
