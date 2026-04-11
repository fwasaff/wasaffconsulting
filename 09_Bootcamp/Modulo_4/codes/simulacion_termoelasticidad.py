# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# % WASAFF CONSULTING - MÓDULO 4: SIMULACIÓN DE TERMOELASTICIDAD
# % Script de FEniCS para el problema de la tira bimetálica (VERSIÓN 2.1 - CORRECCIÓN DE NOMBRES)
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

# --- 1. Importar librerías ---
from fenics import *
import matplotlib.pyplot as plt
import numpy as np
import os

# --- 2. Definir parámetros físicos y de la simulación ---

# Geometría
L_beam = 0.1      # Longitud de la viga [m] - RENOMBRADO PARA CLARIDAD
H_metal = 0.01 # Altura de cada capa de metal [m]

# Propiedades del Acero (dominio inferior)
E_acero = 200e9
nu_acero = 0.3
alpha_acero = 12e-6
lambda_acero = E_acero*nu_acero / ((1+nu_acero)*(1-2*nu_acero))
mu_acero = E_acero / (2*(1+nu_acero))

# Propiedades del Cobre (dominio superior)
E_cobre = 120e9
nu_cobre = 0.34
alpha_cobre = 17e-6
lambda_cobre = E_cobre*nu_cobre / ((1+nu_cobre)*(1-2*nu_cobre))
mu_cobre = E_cobre / (2*(1+nu_cobre))

# Condiciones Térmicas
T_inicial = 20.0
T_final = 120.0

# --- 3. Crear la malla y marcar los subdominios ---
mesh = RectangleMesh(Point(0, -H_metal), Point(L_beam, H_metal), 40, 20)
subdomains = MeshFunction("size_t", mesh, mesh.topology().dim())

class Acero(SubDomain):
    def inside(self, x, on_boundary):
        return x[1] <= 0.0 + DOLFIN_EPS
class Cobre(SubDomain):
    def inside(self, x, on_boundary):
        return x[1] >= 0.0 - DOLFIN_EPS

subdomain_acero = Acero()
subdomain_cobre = Cobre()
subdomain_acero.mark(subdomains, 0)
subdomain_cobre.mark(subdomains, 1)

dx = Measure('dx', domain=mesh, subdomain_data=subdomains)

# --- 4. Definir el Espacio de Funciones (solo para Mecánica) ---
V_u = VectorFunctionSpace(mesh, 'P', 2)

# --- 5. Definir la Condición de Contorno Mecánica ---
def empotramiento_borde(x, on_boundary):
    return on_boundary and near(x[0], 0)
bc_mecanico = DirichletBC(V_u, Constant((0, 0)), empotramiento_borde)

# --- 6. Definir la forma débil (CORREGIDA) ---
u = TrialFunction(V_u)
v = TestFunction(V_u)

T = Constant(T_final)

def epsilon(u):
    return 0.5*(grad(u) + grad(u).T)

lmbda = Expression('x[1] >= 0 ? l_cobre : l_acero',
                   l_cobre=lambda_cobre, l_acero=lambda_acero, degree=0)
mu = Expression('x[1] >= 0 ? mu_cobre : mu_acero',
                mu_cobre=mu_cobre, mu_acero=mu_acero, degree=0)
alpha = Expression('x[1] >= 0 ? a_cobre : a_acero',
                   a_cobre=alpha_cobre, a_acero=alpha_acero, degree=0)

def sigma_mec(u):
    return lmbda*tr(epsilon(u))*Identity(len(u)) + 2*mu*epsilon(u)

def sigma_th(T):
    return - (3*lmbda + 2*mu) * alpha * (T - T_inicial) * Identity(len(u))

# Forma bilineal a(u, v)
a_form = inner(sigma_mec(u), epsilon(v)) * dx

# Forma lineal L(v) - CAMBIO DE NOMBRE
L_form = -inner(sigma_th(T), epsilon(v)) * dx

# --- 7. Resolver el problema variacional ---
print("Resolviendo el sistema elástico...")
u_sol = Function(V_u)
solve(a_form == L_form, u_sol, bc_mecanico) # CAMBIO DE NOMBRE
print("Solución completada.")

# --- 8. Guardar y visualizar los resultados ---
u_sol.rename("Desplazamiento", "u")

if not os.path.exists("termoelasticidad"):
    os.makedirs("termoelasticidad")
    
vtkfile_u = File('termoelasticidad/desplazamiento.pvd')
vtkfile_u << u_sol

# --- Post-procesamiento para gráfico de deflexión ---
print("Generando gráfico de deflexión...")
puntos_borde_superior = []
deflexiones = []
x_coords = np.linspace(0, L_beam, 101) # USANDO EL NOMBRE CORRECTO PARA LA LONGITUD
for x in x_coords:
    try:
        desplazamiento_y = u_sol(x, H_metal)[1]
        puntos_borde_superior.append(x)
        deflexiones.append(desplazamiento_y)
    except Exception as e:
        pass

plt.figure(figsize=(10, 6))
plt.plot(puntos_borde_superior, deflexiones, color='#001F3F', linewidth=2)
plt.title('Deflexión del Borde Superior de la Tira Bimetálica', fontsize=16)
plt.xlabel('Posición a lo largo de la viga (m)', fontsize=12)
plt.ylabel('Deflexión Vertical (m)', fontsize=12)
plt.grid(True, linestyle='--', alpha=0.6)
plt.savefig('deflexion_bimetalica.png')
print("Gráfico 'deflexion_bimetalica.png' guardado.")
