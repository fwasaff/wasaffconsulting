#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script de simulación para el Capítulo 1 (versión narrativa) del libro "El Código de la Realidad".
Resuelve la Ecuación de Poisson en una tubería y genera una figura de calidad de publicación definitiva (12/10).
"""

from fenics import *
from mshr import Circle, generate_mesh # <-- LA IMPORTACIÓN CRUCIAL QUE FALTABA
import matplotlib.pyplot as plt
import matplotlib.tri as mtri
import numpy as np

# --- 1-6. Simulación (versión robusta y consolidada) ---
print("Pasos 1-6: Realizando la simulación...")

# Parámetros
R_conc, R_ext = 0.15, 0.16; k_conc, k_steel = 2.0, 45.0
T_int_steady, T_ext = 30.0, -5.0
mesh_res = 128

# Malla y Dominios
domain_conc = Circle(Point(0, 0), R_conc)
domain_steel = Circle(Point(0, 0), R_ext) - Circle(Point(0, 0), R_conc)
mesh = generate_mesh(domain_conc + domain_steel, mesh_res)
V = FunctionSpace(mesh, 'P', 2)
materials = MeshFunction("size_t", mesh, 2, 0)
AutoSubDomain(lambda x: np.sqrt(x[0]**2+x[1]**2) <= R_conc+1e-6).mark(materials, 1)
AutoSubDomain(lambda x: np.sqrt(x[0]**2+x[1]**2) > R_conc).mark(materials, 2)

class MaterialProp(UserExpression):
    def __init__(self, m, v1, v2, **kw): super().__init__(**kw); self.m, self.v1, self.v2 = m, v1, v2
    def eval_cell(self, values, x, c): values[0] = self.v1 if self.m[c.index] == 1 else self.v2
    def value_shape(self): return ()
k = MaterialProp(materials, k_conc, k_steel, degree=0)

# Condición de Contorno y Solución
TOL = 1e-3
T, v = TrialFunction(V), TestFunction(V)
bc_i = DirichletBC(V, Constant(T_int_steady), lambda x, on_b: near(x[0],0,TOL) and near(x[1],0,TOL), 'pointwise')
bc_e = DirichletBC(V, Constant(T_ext), lambda x, on_b: on_b and near(np.sqrt(x[0]**2+x[1]**2), R_ext, TOL))
bcs = [bc_i, bc_e]
a = k*dot(grad(T), grad(v))*dx; L_s = Constant(0.0)*v*dx
T_sol = Function(V)
solve(a == L_s, T_sol, bcs)


# --- 7. Post-procesamiento y Visualización (CALIDAD "NATURE" - CORTE FINAL) ---
print("Paso 7: Generando figura final...")
plt.style.use('seaborn-v0_8-whitegrid')
fig, axes = plt.subplots(1, 2, figsize=(20, 9), gridspec_kw={'width_ratios': [1, 1.2]})
fig.suptitle("Análisis del Riesgo de Solidificación en la Tubería", fontsize=28)

# --- Panel Izquierdo: El Contexto Espacial (t=0) ---
ax1 = axes[0]; ax1.set_aspect('equal')
coords = mesh.coordinates()
tri = mtri.Triangulation(coords[:, 0], coords[:, 1], mesh.cells())
levels = np.linspace(T_ext, T_int_steady, 100)
c1 = ax1.tricontourf(tri, T_sol.compute_vertex_values(mesh), levels=levels, cmap='coolwarm')
contour_t0 = ax1.tricontour(tri, T_sol.compute_vertex_values(mesh), levels=[0], colors='yellow', linewidths=4, linestyles='--')
ax1.set_title("Perfil Térmico Estacionario", fontsize=20, fontweight='bold')
ax1.set_xlabel("X (m)", fontsize=16); ax1.set_ylabel("Y (m)", fontsize=16)
ax1.tick_params(axis='both', which='major', labelsize=14)
leg = ax1.legend([contour_t0.collections[0]], ['Isoterma de 0°C'], fontsize=14, loc='upper right')
leg.get_frame().set_alpha(0.8)
fig.colorbar(c1, ax=ax1, label="Temperatura (°C)", shrink=0.8)

# --- Panel Derecho: La Curva de Enfriamiento (El Protagonista) ---
ax2 = axes[1]
radii = np.linspace(0, R_ext, 400)
points = [(r, 0) for r in radii] # Muestreamos a lo largo del eje x
temps_radial = np.array([T_sol(p) for p in points])
ax2.plot(radii, temps_radial, lw=3.5, label='Perfil de Temperatura')
ax2.axhline(0, color='red', ls='--', lw=3.5, label='Umbral Solidificación (0°C)')
ax2.axvspan(0, R_conc, color='lightblue', alpha=0.3, label='Concentrado')
ax2.axvspan(R_conc, R_ext, color='gray', alpha=0.3, label='Acero')
# Encontramos el radio de congelamiento
if np.any(temps_radial <= 0):
    freeze_radius_index = np.where(temps_radial <= 0)[0][0]
    freeze_radius = radii[freeze_radius_index]
    ax2.annotate(f'Radio de Congelamiento:\n{freeze_radius:.3f} m',
                 xy=(freeze_radius, 0), xytext=(freeze_radius, 15),
                 arrowprops=dict(facecolor='black', shrink=0.05, width=2, headwidth=10),
                 ha='center', fontsize=18, fontweight='bold', bbox=dict(boxstyle="round,pad=0.5", fc="yellow"))

ax2.set_title("Análisis Cuantitativo Radial", fontsize=22, fontweight='bold')
ax2.set_xlabel("Radio (m)", fontsize=18); ax2.set_ylabel("Temperatura (°C)", fontsize=18)
ax2.legend(fontsize=14); ax2.grid(True, linestyle=':')
ax2.set_xlim(0, R_ext); ax2.set_ylim(T_ext - 2, T_int_steady + 2)
ax2.tick_params(axis='both', which='major', labelsize=14)

# --- Guardado ---
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
plt.savefig('Figuras/poisson_pipe_result.png', dpi=300, bbox_inches='tight')
print(f"\nFigura 12/10 guardada en: Figuras/poisson_pipe_result.png")
