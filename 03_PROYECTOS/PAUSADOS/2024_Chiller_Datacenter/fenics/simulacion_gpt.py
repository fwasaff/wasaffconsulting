from mpi4py import MPI
import numpy as np
import dolfinx
from dolfinx import mesh, fem
import ufl
from ufl.finiteelement import FiniteElement

# Crear malla para el dominio (2D)
domain = mesh.create_rectangle(MPI.COMM_WORLD, [np.array([0, 0]), np.array([2.0, 1.0])], [40, 20])

# Definir el espacio de elementos finitos de forma correcta
element_u = FiniteElement("Lagrange", domain.ufl_cell(), 2, shape=())  # Velocidad
element_p = FiniteElement("Lagrange", domain.ufl_cell(), 1, shape=())  # Presión
element_T = FiniteElement("Lagrange", domain.ufl_cell(), 1, shape=())  # Temperatura

# Crear los espacios funcionales en FEniCSx
V = fem.FunctionSpace(domain, element_u)
Q = fem.FunctionSpace(domain, element_p)
T = fem.FunctionSpace(domain, element_T)

print("Espacios funcionales creados correctamente en FEniCSx 0.9")

