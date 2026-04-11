# file: solve_heat_pipe.py
import numpy as np
from mpi4py import MPI
from petsc4py.PETSc import ScalarType
import ufl
from dolfinx import fem, mesh
from dolfinx.io import gmshio, VTKFile

# --- Parámetros y Etiquetas (consistentes con el mallado) ---
# Etiquetas
CONC_TAG, STEEL_TAG, OUTER_BC_TAG = 1, 2, 3
# Geometría y Archivos
MESH_FILE = "pipe_mesh.msh"
OUTPUT_PVD = "Figuras/heat_pipe_transient.pvd"
OUTPUT_PLOT_DATA = "Figuras/heat_plot_data.npz"

# Parámetros Físicos
T_INT_SS = 30.0   # T en el centro para el estado estacionario inicial [°C]
T_EXT = -5.0      # T exterior del ambiente [°C]
# Parámetros Temporales
DT = 60.0         # Paso de tiempo [s]
T_FINAL = 7200.0    # Tiempo final de la simulación [s]
SNAPSHOT_TIME = 5 * 60.0 # Tiempo para el snapshot "después" [s]

print("[*] Iniciando simulación transitoria de la Ecuación del Calor...")

# --- 1. Lectura de Malla y Definición de Espacios ---
comm = MPI.COMM_WORLD
domain, cell_tags, facet_tags = gmshio.read_from_msh(MESH_FILE, comm, gdim=2)
V = fem.FunctionSpace(domain, ("CG", 2)) # Espacio Lagrange Cuadrático
Q = fem.FunctionSpace(domain, ("DG", 0)) # Espacio Galerkin Discontinuo para propiedades

# --- 2. Definición de Propiedades del Material ---
k = fem.Function(Q, name="Conductividad")
k.x.array[cell_tags.find(CONC_TAG)] = 2.0
k.x.array[cell_tags.find(STEEL_TAG)] = 45.0

rho_cp = fem.Function(Q, name="CapacidadVolumetrica")
rho_cp.x.array[cell_tags.find(CONC_TAG)] = 1800.0 * 3500.0
rho_cp.x.array[cell_tags.find(STEEL_TAG)] = 7850.0 * 460.0

# --- FASE 1: Calcular la Condición Inicial (Solución Estacionaria) ---
print("[1] Resolviendo estado estacionario para la condición inicial...")
T_ss = fem.Function(V, name="Temperatura_Estacionaria")
u_ss, v_ss = ufl.TrialFunction(V), ufl.TestFunction(V)

# BCs para el problema estacionario (con fuente de calor central)
dofs_outer_ss = fem.locate_dofs_topological(V, 1, facet_tags.find(OUTER_BC_TAG))
bc_ext_ss = fem.dirichletbc(ScalarType(T_EXT), dofs_outer_ss, V)
dofs_center_ss = fem.locate_dofs_geometrical(V, lambda x: np.isclose(x.T, [0, 0, 0]).all(axis=1))
bc_int_ss = fem.dirichletbc(ScalarType(T_INT_SS), dofs_center_ss, V)

# Resolución del problema de Poisson
a_ss = ufl.inner(k * ufl.grad(u_ss), ufl.grad(v_ss)) * ufl.dx
L_ss = fem.Constant(domain, ScalarType(0.0)) * v_ss * ufl.dx
problem_ss = fem.petsc.LinearProblem(a_ss, L_ss, bcs=[bc_ext_ss, bc_int_ss], u=T_ss)
problem_ss.solve()
print("    ... Condición inicial calculada.")


# --- FASE 2: Simulación Transitoria ---
print("[2] Iniciando simulación transitoria...")

# Preparar funciones para la solución en T^n (T_sol) y T^{n-1} (T_n)
T_sol = fem.Function(V, name="Temperatura")
T_n = fem.Function(V)
T_n.x.array[:] = T_ss.x.array  # Asignar la condición inicial T_0 = T_ss

# Definir BVP transitorio. Solo la BC externa se mantiene
dofs_outer_tr = fem.locate_dofs_topological(V, 1, facet_tags.find(OUTER_BC_TAG))
bc_ext_tr = fem.dirichletbc(ScalarType(T_EXT), dofs_outer_tr, V)

# Definir el problema variacional semi-discretizado (Método de Euler Implícito)
u, v = ufl.TrialFunction(V), ufl.TestFunction(V)
f = fem.Constant(domain, ScalarType(0.0))
# Reordenamos la Ec. (2.6) para tener la forma a(u, v) = L(v)
# a(u,v): Términos con la incógnita u = T^n
a_tr = rho_cp * u * v * ufl.dx + DT * ufl.inner(k * ufl.grad(u), ufl.grad(v)) * ufl.dx
# L(v): Términos conocidos del paso anterior
L_tr = (rho_cp * T_n) * v * ufl.dx

# El problema se define una vez fuera del bucle para eficiencia
problem_tr = fem.petsc.LinearProblem(a_tr, L_tr, bcs=[bc_ext_tr], u=T_sol)

# Preparar archivos de salida y almacenamiento de datos
vtk = VTKFile(domain.comm, OUTPUT_PVD, "w")
vtk.write_function(T_ss, 0.0) # Escribir el estado inicial en t=0
min_temp_data = [[0.0, T_ss.x.array.min()]]
T_snapshot = fem.Function(V) # Para guardar el estado a los 5 min

num_steps = int(T_FINAL / DT)
for i in range(num_steps):
    t = (i + 1) * DT
    
    # Resolver para el paso de tiempo actual T^n
    problem_tr.solve()
    
    # Actualizar la solución del paso anterior T^{n-1} para la siguiente iteración
    T_n.x.array[:] = T_sol.x.array
    
    # Guardar resultados
    vtk.write_function(T_sol, t)
    
    # Almacenar temperatura mínima y snapshot
    min_temp = T_sol.x.array.min()
    min_temp_data.append([t / 60.0, min_temp]) # Tiempo en minutos
    
    if np.isclose(t, SNAPSHOT_TIME):
        T_snapshot.x.array[:] = T_sol.x.array
        
    print(f"    ... Simulado hasta t = {t/60.0:.1f} min. T_min = {min_temp:.2f} °C")

vtk.close()
min_temp_data = np.array(min_temp_data)

# Guardar todos los datos necesarios para la graficación en un solo archivo
coords = V.tabulate_dof_coordinates()
domain.topology.create_connectivity(2, 0)
connectivity = domain.topology.connectivity(2, 0).array.reshape(-1, 3)
np.savez(
    OUTPUT_PLOT_DATA, 
    coords=coords, 
    connectivity=connectivity, 
    T_initial=T_ss.x.array, 
    T_snapshot=T_snapshot.x.array,
    min_temp_data=min_temp_data
)
print(f"[+] Simulación transitoria completa. Resultados en '{OUTPUT_PVD}' y '{OUTPUT_PLOT_DATA}'.")
