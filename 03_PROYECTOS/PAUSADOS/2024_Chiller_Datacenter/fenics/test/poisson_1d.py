from dolfinx import mesh, fem, io
from mpi4py import MPI
import numpy as np
import ufl

# Crear una malla en el intervalo [0, 1] con 10 celdas
domain = mesh.create_interval(MPI.COMM_WORLD, 10, [0, 1])

# Definir el espacio de funciones de elementos finitos
element = ufl.FiniteElement("P", domain.ufl_cell(), 1)
V = fem.FunctionSpace(domain, element)

# Definir las condiciones de frontera
u_D = fem.Constant(domain, 0.0)

def boundary(x):
    return np.isclose(x[0], 0) | np.isclose(x[0], 1)

dofs = fem.locate_dofs_geometrical(V, boundary)
bc = fem.dirichletbc(u_D, dofs, V)

# Definir la forma variacional
u = ufl.TrialFunction(V)
v = ufl.TestFunction(V)
f = fem.Constant(domain, 1.0)  # Fuente
a = ufl.dot(ufl.grad(u), ufl.grad(v)) * ufl.dx
L = f * v * ufl.dx

# Calcular la solución
problem = fem.petsc.LinearProblem(a, L, bcs=[bc])
u = problem.solve()

# Guardar la solución en un archivo VTK
with io.XDMFFile(domain.comm, 'poisson_1d.xdmf', 'w') as file:
    file.write_mesh(domain)
    file.write_function(u)

# Graficar la solución (requiere matplotlib)
try:
    import matplotlib.pyplot as plt
    plt.figure()
    plot = io.plot(u)
    plt.colorbar(plot)
    plt.show()
except ImportError:
    print("Matplotlib no está instalado. No se puede graficar.")
