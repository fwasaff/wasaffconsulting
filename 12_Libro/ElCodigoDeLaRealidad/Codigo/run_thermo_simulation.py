#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de simulación para el Capítulo 4 del libro "El Código de la Realidad".
Resuelve un problema de TERMOELASTICIDAD de una viga bimetálica.
"""

from fenics import *
import matplotlib.pyplot as plt
import numpy as np

# --- 1. Parámetros Geométricos y Físicos ---
print("Paso 1: Definiendo parámetros del problema...")
L_beam, H_beam = 0.1, 0.02
E_steel, nu_steel, alpha_steel = 200e9, 0.3, 12e-6
E_copper, nu_copper, alpha_copper = 120e9, 0.35, 17e-6
T_ref, T_final = 20.0, 120.0
delta_T = T_final - T_ref

# --- 2. Creación de Malla y Definición de Subdominios ---
print("Paso 2: Creando la malla y los subdominios...")
mesh = RectangleMesh(Point(0, 0), Point(L_beam, H_beam), 100, 20)
materials = MeshFunction("size_t", mesh, mesh.topology().dim())

class Steel(SubDomain):
    def inside(self, x, on_boundary):
        return x[1] <= H_beam / 2

class Copper(SubDomain):
    def inside(self, x, on_boundary):
        return x[1] > H_beam / 2

materials.set_all(0)
subdomain_steel = Steel()
subdomain_steel.mark(materials, 1)
subdomain_copper = Copper()
subdomain_copper.mark(materials, 2)

# --- 3. Definición del Espacio de Funciones ---
print("Paso 3: Definiendo el espacio de funciones...")
V = VectorFunctionSpace(mesh, "CG", 2)
u = TrialFunction(V)
v = TestFunction(V)

# --- 4. Definición de las propiedades del material ---
def epsilon(u):
    return sym(grad(u))

def sigma_elastic(u, E, nu, alpha):
    mu = E / (2.0 * (1.0 + nu))
    lmbda = E * nu / ((1.0 + nu) * (1.0 - 2.0 * nu))
    strain_thermal = alpha * delta_T * Identity(2)
    strain_total = epsilon(u) - strain_thermal
    return lmbda * tr(strain_total) * Identity(2) + 2.0 * mu * strain_total

# --- 5. Formulación Variacional Corregida ---
print("Paso 4: Definiendo la formulación variacional...")
dx = Measure('dx', domain=mesh, subdomain_data=materials)

# Forma bilineal - separada por materiales
a_steel = inner(sigma_elastic(u, E_steel, nu_steel, alpha_steel), epsilon(v)) * dx(1)
a_copper = inner(sigma_elastic(u, E_copper, nu_copper, alpha_copper), epsilon(v)) * dx(2)
a = a_steel + a_copper

# Forma lineal - sin cargas externas
L = dot(Constant((0.0, 0.0)), v) * dx

# --- 6. Condiciones de Contorno ---
print("Paso 5: Aplicando condiciones de contorno...")
def left_boundary(x, on_boundary):
    return on_boundary and near(x[0], 0, DOLFIN_EPS)

bc = DirichletBC(V, Constant((0.0, 0.0)), left_boundary)

# --- 7. Resolución del Sistema ---
print("Paso 6: Resolviendo el sistema...")
u_sol = Function(V)
problem = LinearVariationalProblem(a, L, u_sol, bc)
solver = LinearVariationalSolver(problem)
solver.parameters["linear_solver"] = "mumps"
solver.parameters["symmetric"] = True

try:
    solver.solve()
    print("Sistema resuelto exitosamente!")
except Exception as e:
    print(f"Error al resolver: {e}")
    # Fallback: intentar con solver directo
    solver.parameters["linear_solver"] = "lu"
    solver.solve()
    print("Sistema resuelto con solver LU")

# --- 8. Post-procesamiento ---
print("Paso 7: Post-procesando resultados...")
V_scalar = FunctionSpace(mesh, "CG", 1)
u_magnitude = project(sqrt(dot(u_sol, u_sol)), V_scalar)

# Expresión para el esfuerzo σ_xx
class StressXX(UserExpression):
    def __init__(self, u, materials, **kwargs):
        super().__init__(**kwargs)
        self.u = u
        self.materials = materials
        
    def eval_cell(self, values, x, cell):
        material_id = self.materials[cell.index]
        if material_id == 1:  # Acero
            E, nu, alpha = E_steel, nu_steel, alpha_steel
        else:  # Cobre
            E, nu, alpha = E_copper, nu_copper, alpha_copper
            
        mu = E / (2.0 * (1.0 + nu))
        lmbda = E * nu / ((1.0 + nu) * (1.0 - 2.0 * nu))
        strain_thermal = alpha * delta_T * Identity(2)
        strain_total = epsilon(self.u) - strain_thermal
        sigma_tensor = lmbda * tr(strain_total) * Identity(2) + 2.0 * mu * strain_total
        
        # Evaluar el tensor en el punto
        values[0] = sigma_tensor[0, 0]
        
    def value_shape(self):
        return ()

# Crear y proyectar la expresión del esfuerzo
sigma_xx_expr = StressXX(u_sol, materials, degree=2)
sigma_xx = project(sigma_xx_expr, V_scalar)

# --- 9. Visualización ---
print("Paso 8: Generando visualización...")
plt.figure(figsize=(12, 5))

# Subplot 1: Desplazamientos
plt.subplot(1, 2, 1)
plot(u_magnitude, title="Magnitud de Desplazamiento (m)")
plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.colorbar()

# Subplot 2: Esfuerzos
plt.subplot(1, 2, 2)
# Usar raw string para evitar el warning de escape sequence
p = plot(sigma_xx / 1e6, cmap='RdBu_r', title=r"Esfuerzo en X, $\sigma_{xx}$ (MPa)")
plt.xlabel("X (m)")
plt.ylabel("Y (m)")
plt.colorbar(p)

plt.tight_layout()
plt.savefig('thermo_result.png', dpi=300, bbox_inches='tight')
print("¡Simulación completada! Resultados guardados en 'thermo_result.png'")

# Mostrar información adicional
print(f"\nInformación de la simulación:")
print(f"Desplazamiento máximo: {u_magnitude.vector().max():.2e} m")
print(f"Esfuerzo máximo: {sigma_xx.vector().max()/1e6:.2f} MPa")
print(f"Esfuerzo mínimo: {sigma_xx.vector().min()/1e6:.2f} MPa")

# También guardar resultados en formato XDMF para visualización posterior
with XDMFFile("displacement.xdmf") as xdmf:
    xdmf.write(u_sol)
    
with XDMFFile("stress_xx.xdmf") as xdmf:
    xdmf.write(sigma_xx)

print("Resultados también guardados en formato XDMF para post-procesamiento")

