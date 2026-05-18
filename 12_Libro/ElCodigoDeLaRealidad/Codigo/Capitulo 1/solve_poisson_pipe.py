# file: solve_poisson_pipe.py
import numpy as np
from mpi4py import MPI
from petsc4py.PETSc import ScalarType
import ufl
from dolfinx import fem, mesh
from dolfinx.io import gmshio, VTKFile

# --- Etiquetas (deben coincidir con las de GMSH) ---
CONC_TAG = 1
STEEL_TAG = 2
OUTER_BC_TAG = 3
MESH_FILE = "pipe_mesh.msh"
OUTPUT_PVD = "Figuras/poisson_pipe_solution.pvd"
OUTPUT_NPZ = "Figuras/plot_data.npz"

print("[*] Iniciando la simulación FEniCSx para la tubería...")

# --- 1. Lectura de Malla y Etiquetas ---
domain, cell_tags, facet_tags = gmshio.read_from_msh(MESH_FILE, MPI.COMM_WORLD, gdim=2)

# --- 2. Definición del Espacio de Elementos Finitos ---
# Espacio de funciones Lagrange continuas de segundo orden (cuadráticas) para la temperatura
V = fem.FunctionSpace(domain, ("CG", 2))

# --- 3. Definición de Propiedades del Material ---
# k se define como una función constante a trozos usando un espacio Discontinuo Galerkin de orden 0
Q = fem.FunctionSpace(domain, ("DG", 0))
k = fem.Function(Q)
k.x.array[cell_tags.find(CONC_TAG)] = 2.0  # k en el concentrado
k.x.array[cell_tags.find(STEEL_TAG)] = 45.0 # k en el acero

# --- 4. Imposición de Condiciones de Contorno ---
T_INT = 30.0   # Temperatura en el centro [°C]
T_EXT = -5.0   # Temperatura exterior [°C]

# BC en la frontera exterior (usando la etiqueta de faceta)
outer_facets = facet_tags.find(OUTER_BC_TAG)
outer_dofs = fem.locate_dofs_topological(V, 1, outer_facets)
bc_ext = fem.dirichletbc(ScalarType(T_EXT), outer_dofs, V)

# BC en el punto central (0,0) (usando localización geométrica)
center_dofs = fem.locate_dofs_geometrical(V, lambda x: np.isclose(x[0], 0) & np.isclose(x[1], 0))
bc_int = fem.dirichletbc(ScalarType(T_INT), center_dofs, V)

bcs = [bc_int, bc_ext]

# --- 5. Formulación y Resolución del Problema Variacional ---
T = ufl.TrialFunction(V)
v = ufl.TestFunction(V)
f = fem.Constant(domain, ScalarType(0.0))

a = ufl.inner(k * ufl.grad(T), ufl.grad(v)) * ufl.dx
L = f * v * ufl.dx

# Configuración del solver: Usar un solver directo (LU) ya que el problema es pequeño y 2D
problem = fem.petsc.LinearProblem(a, L, bcs=bcs, petsc_options={"ksp_type": "preonly", "pc_type": "lu"})
print("[*] Resolviendo el sistema lineal...")
T_sol = problem.solve()
T_sol.name = "Temperatura"
print("[+] Solución obtenida.")

# --- 6. Post-procesamiento y Guardado de Datos ---
# Guardar solución en formato VTK para visualización en ParaView
with VTKFile(domain.comm, OUTPUT_PVD, "w") as file:
    file.write_mesh(domain)
    file.write_function(T_sol)
print(f"[+] Solución para ParaView guardada en '{OUTPUT_PVD}'.")

# Guardar datos necesarios para graficación 2D con Matplotlib
#   - Coordenadas de los nodos de la malla
#   - Conectividad de los triángulos (índices de nodos por elemento)
#   - Valores de la solución en los nodos
coords = V.tabulate_dof_coordinates()
solution_values = T_sol.x.array
domain.topology.create_connectivity(2, 0)
connectivity = domain.topology.connectivity(2, 0).array.reshape(-1, 3)

np.savez(OUTPUT_NPZ, coords=coords, connectivity=connectivity, solution=solution_values)
print(f"[+] Datos para graficación guardados en '{OUTPUT_NPZ}'.")
