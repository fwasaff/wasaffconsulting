#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script para el Capítulo 2 del libro "El Código de la Realidad".
Resuelve el enfriamiento transitorio y genera la figura final de calidad de publicación (12/10).
"""

from fenics import *
from mshr import Circle, generate_mesh
import matplotlib.pyplot as plt
import matplotlib.tri as mtri
import numpy as np

# --- 1-6. Simulación (versión consolidada) ---
print("Pasos 1-6: Realizando la simulación...")
R_conc, R_ext = 0.15, 0.16; k_conc, k_steel = 2.0, 45.0
rho_conc, cp_conc = 1800.0, 3500.0; rho_steel, cp_steel = 7850.0, 460.0
T_int_steady, T_ext, T_solidification = 30.0, -5.0, 0.0
dt = 60.0; num_steps = 120
t_final = dt * num_steps
mesh = generate_mesh(Circle(Point(0,0), R_ext), 64)
V = FunctionSpace(mesh, 'P', 2)
materials = MeshFunction("size_t", mesh, 2, 0)
subdomain_conc_marker = 1
subdomain_steel_marker = 2
AutoSubDomain(lambda x: np.sqrt(x[0]**2+x[1]**2) <= R_conc+1e-6).mark(materials, subdomain_conc_marker)
AutoSubDomain(lambda x: np.sqrt(x[0]**2+x[1]**2) > R_conc).mark(materials, subdomain_steel_marker)
class MaterialProp(UserExpression):
    def __init__(self, m, v1, v2, **kw): super().__init__(**kw); self.m, self.v1, self.v2 = m, v1, v2
    def eval_cell(self, values, x, c): values[0] = self.v1 if self.m[c.index] == subdomain_conc_marker else self.v2
    def value_shape(self): return ()
k = MaterialProp(materials, k_conc, k_steel, degree=0)
rho_cp = MaterialProp(materials, rho_conc*cp_conc, rho_steel*cp_steel, degree=0)
TOL = 1e-3
T_s, v_s = TrialFunction(V), TestFunction(V)
bc_i = DirichletBC(V, Constant(T_int_steady), lambda x, on_b: near(x[0],0,TOL) and near(x[1],0,TOL), 'pointwise')
bc_e = DirichletBC(V, Constant(T_ext), lambda x, on_b: on_b and near(np.sqrt(x[0]**2+x[1]**2), R_ext, TOL))
a_s = k*dot(grad(T_s), grad(v_s))*dx; L_s = Constant(0.0)*v_s*dx
T_initial = Function(V); solve(a_s == L_s, T_initial, [bc_i, bc_e])
T, v, Tn = TrialFunction(V), TestFunction(V), Function(V)
Tn.assign(T_initial)
a = rho_cp*T*v*dx + dt*k*dot(grad(T), grad(v))*dx; L = rho_cp*Tn*v*dx
T_sol = Function(V)

dofmap = V.dofmap()
concentrate_dofs = []
for cell in cells(mesh):
    if materials[cell] == subdomain_conc_marker:
        concentrate_dofs.extend(dofmap.cell_dofs(cell.index()))
concentrate_dofs = np.unique(concentrate_dofs)

time_points = [0.0]
min_temp_history = [T_initial.vector().get_local()[concentrate_dofs].min()]
time_to_freeze = None
snapshots = {0.0: T_initial.copy(deepcopy=True)}
for i in range(num_steps):
    t = (i + 1) * dt; solve(a == L, T_sol, [bc_e]); Tn.assign(T_sol)
    min_temp_conc = T_sol.vector().get_local()[concentrate_dofs].min()
    time_points.append(t/60.0); min_temp_history.append(min_temp_conc)
    if min_temp_conc <= T_solidification and time_to_freeze is None:
        time_to_freeze = t/60.0
        print(f"--> Umbral de 0C en el CONCENTRADO alcanzado en t={time_to_freeze:.1f} min.")
    if abs(t - t_final) < dt/2: snapshots[t_final] = T_sol.copy(deepcopy=True)

# --- 7. Post-procesamiento y Visualización FINAL ---
print("Paso 7: Generando la figura final...")
plt.style.use('seaborn-v0_8-whitegrid')
fig = plt.figure(figsize=(20, 9))
gs = fig.add_gridspec(1, 2, width_ratios=[1, 1.2]) # <-- LA LÍNEA QUE FALTABA
fig.suptitle("Análisis del Enfriamiento: La Carrera Contra el Tiempo", fontsize=28)

ax1 = fig.add_subplot(gs[0]); ax1.set_aspect('equal')
coords = mesh.coordinates()
triangulation = mtri.Triangulation(coords[:, 0], coords[:, 1], mesh.cells())
levels = np.linspace(T_ext, T_int_steady, 100)
c1 = ax1.tricontourf(triangulation, T_initial.compute_vertex_values(), levels=levels, cmap='coolwarm')
contour_t0 = ax1.tricontour(triangulation, T_initial.compute_vertex_values(), levels=[0], colors='yellow', linewidths=3.5, linestyles='--')
final_temps = snapshots.get(t_final, T_sol).compute_vertex_values()
ax1.tricontour(triangulation, final_temps, levels=[0], colors='black', linewidths=4, linestyles='-')
ax1.set_title("Progreso del Frente de Congelamiento", fontsize=20, fontweight='bold')
ax1.set_xlabel("X (m)", fontsize=16); ax1.set_ylabel("Y (m)", fontsize=16)
ax1.tick_params(axis='both', which='major', labelsize=14)
leg = ax1.legend([contour_t0.collections[0], ax1.tricontour(triangulation, final_temps, levels=[0], colors='black').collections[0]],
                 ['Isoterma 0°C (t=0)', f'Isoterma 0°C (t={t_final/60.0:.0f} min)'],
                 fontsize=14, loc='upper right')
leg.get_frame().set_alpha(0.8)
fig.colorbar(c1, ax=ax1, label="Temperatura (°C)", shrink=0.9)

ax2 = fig.add_subplot(gs[1])
ax2.plot(time_points, min_temp_history, lw=3.5, marker='.', markersize=10, label='Temp. Mínima en el Concentrado')
ax2.axhline(0, color='red', ls='--', lw=3.5, label='Umbral Solidificación (0°C)')
if time_to_freeze is not None:
    ax2.axvspan(time_to_freeze, max(time_points), color='red', alpha=0.1, label='Zona de Falla Inminente')
    ax2.annotate(f'Tiempo Crítico:\n{time_to_freeze:.1f} min',
                 xy=(time_to_freeze, 0), xytext=(time_to_freeze + 30, 15),
                 arrowprops=dict(facecolor='black', shrink=0.05, width=2, headwidth=10),
                 ha='center', fontsize=18, fontweight='bold', bbox=dict(boxstyle="round,pad=0.5", fc="yellow"))
ax2.set_title("Curva de Enfriamiento Crítica", fontsize=22, fontweight='bold')
ax2.set_xlabel("Tiempo (minutos)", fontsize=18); ax2.set_ylabel("Temperatura (°C)", fontsize=18)
ax2.legend(fontsize=14); ax2.grid(True, linestyle=':')
ax2.set_xlim(-2, max(time_points) + 5); ax2.set_ylim(T_ext - 2, T_int_steady + 1)
ax2.tick_params(axis='both', which='major', labelsize=14)

plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.savefig('Figuras/heat_pipe_result.png', dpi=300, bbox_inches='tight')
print(f"\nFigura 12/10 guardada en: {output_path}")
