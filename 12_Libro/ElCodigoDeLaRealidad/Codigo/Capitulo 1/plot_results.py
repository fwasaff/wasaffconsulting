# file: plot_results.py
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.tri as tri

# --- Parámetros de Graficación ---
DATA_FILE = "Figuras/plot_data.npz"
OUTPUT_FIGURE = "Figuras/poisson_pipe_result_professional.png"
R_CONC = 0.15
R_STEEL = 0.16
SOLIDIFICATION_TEMP = 0.0

# Estilo profesional para las figuras
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams.update({
    "font.family": "serif",
    "font.size": 12,
    "axes.labelsize": 14,
    "xtick.labelsize": 12,
    "ytick.labelsize": 12,
    "legend.fontsize": 12,
    "figure.figsize": (14, 6) # Ancho, alto en pulgadas
})

print(f"[*] Cargando datos desde '{DATA_FILE}' para graficar...")
# --- Carga de Datos ---
with np.load(DATA_FILE) as data:
    coords = data['coords']
    connectivity = data['connectivity']
    solution = data['solution']

x_coords, y_coords = coords[:, 0], coords[:, 1]
# Crear un objeto de triangulación para Matplotlib
triangulation = tri.Triangulation(x_coords, y_coords, connectivity)


print("[*] Generando figura de dos paneles...")
# --- Creación de la Figura ---
fig, (ax1, ax2) = plt.subplots(1, 2)
fig.suptitle('Análisis del Riesgo de Solidificación en la Tubería', fontsize=16, weight='bold')

# --- Panel Izquierdo: Perfil Térmico Espacial (2D) ---
ax1.set_aspect('equal')
ax1.set_title('Perfil Térmico Espacial', fontsize=14, style='italic')
# Mapa de calor de contorno
contour = ax1.tricontourf(triangulation, solution, levels=100, cmap='plasma')

# Barra de color
cbar = fig.colorbar(contour, ax=ax1, orientation='vertical')
cbar.set_label('Temperatura [°C]')

# Isoterma de solidificación (0 °C)
isotherm = ax1.tricontour(
    triangulation, solution,
    levels=[SOLIDIFICATION_TEMP],
    colors='yellow',
    linestyles='--',
    linewidths=2
)
# Etiqueta para la isoterma
ax1.clabel(isotherm, inline=True, fmt=f'Isoterma {SOLIDIFICATION_TEMP:.0f}°C', fontsize=12)

ax1.set_xlabel('Coordenada X [m]')
ax1.set_ylabel('Coordenada Y [m]')
ax1.grid(False) # La grilla no es útil en un contour plot

# --- Panel Derecho: Análisis Cuantitativo Radial ---
ax2.set_title('Análisis Cuantitativo Radial', fontsize=14, style='italic')
# Calcular el radio para cada punto
radii = np.sqrt(x_coords**2 + y_coords**2)

# Ordenar los puntos por radio para un gráfico limpio
sort_indices = np.argsort(radii)
radii_sorted = radii[sort_indices]
solution_sorted = solution[sort_indices]

ax2.plot(radii_sorted, solution_sorted, 'o', markersize=2, alpha=0.3, label='Nodos FEM')

# Línea de umbral de solidificación
ax2.axhline(
    y=SOLIDIFICATION_TEMP,
    color='r',
    linestyle='--',
    linewidth=2,
    label=f'Temp. Solidificación ({SOLIDIFICATION_TEMP:.0f}°C)'
)

# Resaltar las regiones de los materiales
ax2.axvspan(0, R_CONC, color='cyan', alpha=0.2, label='Concentrado')
ax2.axvspan(R_CONC, R_STEEL, color='gray', alpha=0.3, label='Acero')

ax2.set_xlabel('Radio [m]')
ax2.set_ylabel('Temperatura [°C]')
ax2.legend()
ax2.set_xlim(0, R_STEEL)

# --- Finalizar y Guardar ---
plt.tight_layout(rect=[0, 0, 1, 0.96]) # Ajustar para el supertítulo
plt.savefig(OUTPUT_FIGURE, dpi=300, bbox_inches='tight')

print(f"[+] Figura guardada exitosamente en '{OUTPUT_FIGURE}'.")
plt.show()
