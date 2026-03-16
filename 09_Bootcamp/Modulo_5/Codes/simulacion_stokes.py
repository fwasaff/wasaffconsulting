# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# % WASAFF CONSULTING - MÓDULO 5: INTRODUCCIÓN A LA CFD
# % Script de FEniCS para resolver el Flujo de Stokes alrededor
# % de un cilindro en un canal.
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

# --- 1. Importar librerías ---
from fenics import *
from mshr import *
import os

# --- 2. Definir parámetros físicos y geométricos ---
L_channel = 2.2      # Longitud del canal [m]
H_channel = 0.41     # Altura del canal [m]
r_cylinder = 0.05    # Radio del cilindro [m]
cx, cy = 0.2, 0.2    # Centro del cilindro [m]
mu = 1.49            # Viscosidad dinámica de la glicerina [Pa*s]
U_max = 1.0          # Velocidad máxima en la entrada [m/s]
mesh_resolution = 64 # Resolución de la malla

# --- 3. Construir la geometría y generar la malla ---
print("Generando la malla con mshr...")
channel = Rectangle(Point(0, 0), Point(L_channel, H_channel))
cylinder = Circle(Point(cx, cy), r_cylinder)
domain = channel - cylinder # Geometría final: un rectángulo con un agujero

mesh = generate_mesh(domain, mesh_resolution)

# --- 4. Definir el Espacio de Funciones Mixto (Taylor-Hood) ---
# Elemento Vectorial Cuadrático (P2) para la Velocidad
V_element = VectorElement("P", triangle, 2)
# Elemento Escalar Lineal (P1) para la Presión
Q_element = FiniteElement("P", triangle, 1)
# Espacio Mixto
ME = FunctionSpace(mesh, V_element * Q_element)

# --- 5. Definir las Condiciones de Contorno ---
# Definir las fronteras del dominio
inlet_boundary = "on_boundary && near(x[0], 0)"
outlet_boundary = "on_boundary && near(x[0], {})".format(L_channel)
wall_boundary = "on_boundary && (near(x[1], 0) || near(x[1], {}))".format(H_channel)
cylinder_boundary = "on_boundary && x[0] > 0.1 && x[0] < 0.3 && x[1] > 0.1 && x[1] < 0.3"

# Condición de entrada: Perfil parabólico
inflow_profile = Expression(('4.0 * U_max * x[1] * (H - x[1]) / (H*H)', '0.0'),
                          degree=2, U_max=U_max, H=H_channel)

# Crear los objetos de Condición de Contorno de Dirichlet
bc_inlet = DirichletBC(ME.sub(0), inflow_profile, inlet_boundary)
bc_walls = DirichletBC(ME.sub(0), Constant((0, 0)), wall_boundary)
bc_cylinder = DirichletBC(ME.sub(0), Constant((0, 0)), cylinder_boundary)
bc_outlet_pressure = DirichletBC(ME.sub(1), Constant(0), outlet_boundary)

bcs = [bc_inlet, bc_walls, bc_cylinder, bc_outlet_pressure]

# --- 6. Definir la forma débil acoplada ---
# Definir funciones de prueba y de solución del espacio mixto
(u, p) = TrialFunctions(ME)
(v, q) = TestFunctions(ME)

# Forma débil de Stokes: a((u,p), (v,q)) = L((v,q))
# La formulación es más directa que usando el tensor de esfuerzos explícito
a = (mu * inner(grad(u), grad(v)) - p * div(v) - q * div(u)) * dx

# El lado derecho es cero (sin fuerzas másicas)
f_body_force = Constant((0, 0))
L = dot(f_body_force, v) * dx

# --- 7. Resolver el problema variacional ---
print("Ensamblando y resolviendo el sistema lineal...")
w = Function(ME)
solve(a == L, w, bcs)
print("Solución completada.")

# --- 8. Guardar los resultados para visualización ---
# Dividir la solución mixta en sus componentes (velocidad y presión)
(u_sol, p_sol) = w.split()
u_sol.rename("Velocidad", "u")
p_sol.rename("Presion", "p")

# Crear el directorio de resultados si no existe
if not os.path.exists("stokes_results"):
    os.makedirs("stokes_results")

# Guardar en formato VTK para ParaView
vtkfile_u = File('stokes_results/velocidad.pvd')
vtkfile_p = File('stokes_results/presion.pvd')
vtkfile_u << u_sol
vtkfile_p << p_sol

print("\nResultados guardados en la carpeta 'stokes_results/'.")
print("Puedes visualizarlos con ParaView abriendo 'velocidad.pvd' y 'presion.pvd'.")
