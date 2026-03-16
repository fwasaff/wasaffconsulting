# Importar librerías necesarias
from fenics import *
import numpy as np
import matplotlib.pyplot as plt

# Definir el dominio y la malla
# Crear una malla simple (por ejemplo, un rectángulo para la tubería)
mesh = RectangleMesh(Point(0, 0), Point(10, 1), 100, 10)  # 100x10 elementos

# Definir los espacios de funciones
# Espacio para la velocidad (P2) y la presión (P1)
V = VectorFunctionSpace(mesh, 'P', 2)
Q = FunctionSpace(mesh, 'P', 1)

# Espacio para la temperatura (P1)
T_space = FunctionSpace(mesh, 'P', 1)

# Espacio mixto para velocidad y presión
W = V * Q

# Definir las condiciones de frontera
# Condición de velocidad de entrada (u_in = [1, 0])
u_in = Expression(('1.0', '0.0'), degree=2)

# Condición de presión de salida (p_out = 0)
p_out = Constant(0.0)

# Condición de temperatura de entrada (T_in = 10°C)
T_in = Constant(10.0)

# Aplicar condiciones de frontera
bc_u = DirichletBC(W.sub(0), u_in, 'near(x[0], 0)')  # Entrada
bc_p = DirichletBC(W.sub(1), p_out, 'near(x[0], 10)')  # Salida
bc_T = DirichletBC(T_space, T_in, 'near(x[0], 0)')  # Entrada
bcs = [bc_u, bc_p, bc_T]

# Definir las variables y parámetros
# Variables del problema
w = Function(W)
u, p = split(w)
T = Function(T_space)

# Parámetros físicos
rho = Constant(1050.0)  # Densidad del glicol (kg/m³)
mu = Constant(0.001)    # Viscosidad dinámica (Pa·s)
Cp = Constant(3.5e3)    # Capacidad calorífica (J/kg·K)
k = Constant(0.5)       # Conductividad térmica (W/m·K)
Q = Constant(495e3)     # Fuente de calor (W/m³)

# Definir las formulaciones débiles
# Formulación débil para Navier-Stokes
v, q = TestFunctions(W)
F1 = rho * dot(dot(u, nabla_grad(u)), v) * dx \
     + mu * inner(grad(u), grad(v)) * dx \
     - p * div(v) * dx \
     + q * div(u) * dx

# Formulación débil para la transferencia de calor
T_test = TestFunction(T_space)
F2 = rho * Cp * (dot(u, grad(T)) * T_test + dot(grad(T), grad(T_test))) * dx \
     - Q * T_test * dx

# Combinar las formulaciones
F = F1 + F2

# Resolver el sistema no lineal
solve(F == 0, w, bcs)

# Extraer la velocidad, presión y temperatura
u, p = w.split()
T = T_space.split()

# Visualizar los resultados
# Graficar la velocidad
plot(u)
plt.title("Campo de Velocidad")
plt.show()

# Graficar la presión
plot(p)
plt.title("Campo de Presión")
plt.show()

# Graficar la temperatura
plot(T)
plt.title("Campo de Temperatura")
plt.show()
