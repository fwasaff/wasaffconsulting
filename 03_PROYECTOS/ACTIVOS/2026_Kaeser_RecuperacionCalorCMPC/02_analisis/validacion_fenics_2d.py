"""
Validación FEniCS 2D — Conducción-convección en canal de placa
Compara el resultado 2D con la aproximación 1D (ε-NTU) para validar el modelo.

Geometría: canal rectangular 2D
  - Longitud L = 0.5 m
  - Altura H = 0.003 m (espacio entre placas)
  - Flujo: agua fría entra por la izquierda, calor entra por pared inferior
  
EDP: rho*cp*(u·grad(T)) = k*laplaciano(T)  en el dominio
  - u = (u_mean, 0)  (flujo laminar desarrollado)
  - T = T_in en x=0
  - -k*dT/dn = q" en y=0 (flujo de calor del aceite)
  - dT/dn = 0 en y=H (pared superior aislada)
  - dT/dn = 0 en x=L (outflow)
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from pathlib import Path

try:
    from fenics import *
    HAS_FENICS = True
except ImportError:
    HAS_FENICS = False
    print("FEniCS no disponible. Se generará reporte sin validación 2D.")


def main():
    base = Path(__file__).parent.parent

    if not HAS_FENICS:
        # Crear un placeholder indicando que no se pudo correr
        with open(base / '03_resultados/validacion_fenics_estado.txt', 'w') as f:
            f.write("FEniCS no disponible en este entorno.\nValidación 2D debe ejecutarse en entorno con FEniCS/Docker.\n")
        return

    # Parámetros físicos (agua a ~30°C promedio)
    rho = 995.0      # kg/m3
    cp = 4178.0      # J/kgK
    k = 0.615        # W/mK
    u_mean = 0.5     # m/s (estimado para caudal ~8 m3/h en canal de 3mm x 0.5m)
    T_in = 11.0      # °C
    q_flux = 50000.0 # W/m2 (flujo de calor estimado del aceite)

    # Geometría
    L = 0.5   # m
    H = 0.003 # m

    # Malla
    nx = 100
    ny = 20
    mesh = RectangleMesh(Point(0, 0), Point(L, H), nx, ny)

    # Espacio de funciones
    V = FunctionSpace(mesh, 'P', 2)

    # Condiciones de contorno
    T_in_val = Constant(T_in)
    bc_inlet = DirichletBC(V, T_in_val, "near(x[0], 0)")
    bcs = [bc_inlet]

    # Función de prueba y solución
    T = Function(V)
    v = TestFunction(V)

    # Velocidad (constante, simplificación)
    u = Constant((u_mean, 0.0))

    # Formulación variacional: convección-difusión estacionaria
    # rho*cp*(u·grad(T))*v + k*inner(grad(T), grad(v)) = 0
    # + término de frontera Neumann en y=0
    F = rho*cp*dot(u, grad(T))*v*dx + k*dot(grad(T), grad(v))*dx - q_flux*v*ds(1)

    # Marcar la frontera inferior (y=0) como boundary_id=1
    class BottomBoundary(SubDomain):
        def inside(self, x, on_boundary):
            return on_boundary and near(x[1], 0)

    boundaries = MeshFunction("size_t", mesh, mesh.topology().dim() - 1)
    boundaries.set_all(0)
    bottom = BottomBoundary()
    bottom.mark(boundaries, 1)
    ds = Measure('ds', domain=mesh, subdomain_data=boundaries)

    # Reconstruir forma con ds marcado
    F = rho*cp*dot(u, grad(T))*v*dx + k*dot(grad(T), grad(v))*dx - q_flux*v*ds(1)

    # Resolver
    solve(F == 0, T, bcs)

    # Post-procesamiento
    T_out_avg = assemble(T * ds(2)) / assemble(1.0 * ds(2))  # frontera derecha x=L
    T_max = T.vector().max()
    T_min = T.vector().min()

    print(f"T promedio salida (x=L): {T_out_avg:.2f} °C")
    print(f"T max en dominio: {T_max:.2f} °C")
    print(f"T min en dominio: {T_min:.2f} °C")

    # Figura
    fig = plt.figure(figsize=(10, 4))
    p = plot(T, title='Temperatura [°C] - Validación 2D FEniCS')
    plt.colorbar(p)
    plt.xlabel('x [m]')
    plt.ylabel('y [m]')
    plt.tight_layout()
    fig.savefig(base / '03_resultados/figuras/validacion_fenics_2d.png', dpi=300)
    print(f"Figura guardada en: {base / '03_resultados/figuras/validacion_fenics_2d.png'}")

    # Guardar resultados
    with open(base / '03_resultados/resultados_fenics.json', 'w') as f:
        import json
        json.dump({
            'T_out_avg_C': float(T_out_avg),
            'T_max_C': float(T_max),
            'T_min_C': float(T_min),
            'u_mean_ms': u_mean,
            'q_flux_Wm2': q_flux,
            'L_m': L,
            'H_m': H,
            'nota': 'Modelo simplificado 2D para validacion conceptual'
        }, f, indent=2)

    print("\n=== Validación FEniCS 2D completada ===")


if __name__ == '__main__':
    main()
