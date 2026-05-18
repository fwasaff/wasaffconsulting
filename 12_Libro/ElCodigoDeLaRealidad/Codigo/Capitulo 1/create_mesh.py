# file: create_mesh.py
import gmsh
import sys

# --- Parámetros de Simulación ---
# Radios de la geometría [m]
R_CONC = 0.15
R_STEEL = 0.16
# Tamaño de elemento característico para la malla [m]
MESH_SIZE = 0.005
# Nombre del archivo de salida
OUTPUT_FILE = "pipe_mesh.msh"

# --- Etiquetas (Tags) para Identificación ---
# Es una buena práctica usar variables para los tags, evita "números mágicos"
CONC_TAG = 1   # Etiqueta para el subdominio del concentrado
STEEL_TAG = 2  # Etiqueta para el subdominio del acero
OUTER_BC_TAG = 3 # Etiqueta para la frontera exterior

print(f"[*] Inicializando GMSH para crear la malla de la tubería...")

gmsh.initialize()
gmsh.model.add("tubería_concentrado")

# --- Creación de la Geometría ---
# Punto central
center = gmsh.model.geo.addPoint(0, 0, 0, meshSize=MESH_SIZE)

# Puntos para definir los círculos
p_inner_1 = gmsh.model.geo.addPoint(R_CONC, 0, 0, meshSize=MESH_SIZE)
p_inner_2 = gmsh.model.geo.addPoint(-R_CONC, 0, 0, meshSize=MESH_SIZE)
p_outer_1 = gmsh.model.geo.addPoint(R_STEEL, 0, 0, meshSize=MESH_SIZE)
p_outer_2 = gmsh.model.geo.addPoint(-R_STEEL, 0, 0, meshSize=MESH_SIZE)

# Arcos para formar los círculos
# Sintaxis: gmsh.model.geo.addCircleArc(start_tag, center_tag, end_tag)
arc_inner_1 = gmsh.model.geo.addCircleArc(p_inner_1, center, p_inner_2)
arc_inner_2 = gmsh.model.geo.addCircleArc(p_inner_2, center, p_inner_1)
arc_outer_1 = gmsh.model.geo.addCircleArc(p_outer_1, center, p_outer_2)
arc_outer_2 = gmsh.model.geo.addCircleArc(p_outer_2, center, p_outer_1)

# Curvas cerradas ("Curve Loops") para definir las fronteras de las superficies
# Loop para el concentrado (círculo interior)
loop_conc = gmsh.model.geo.addCurveLoop([arc_inner_1, arc_inner_2])
# Loop para el acero (círculo exterior menos el interior)
# Los arcos interiores se añaden con signo negativo para indicar orientación opuesta
loop_steel = gmsh.model.geo.addCurveLoop([arc_outer_1, arc_outer_2, -arc_inner_2, -arc_inner_1])

# Superficies planas a partir de los loops
surface_conc = gmsh.model.geo.addPlaneSurface([loop_conc])
surface_steel = gmsh.model.geo.addPlaneSurface([loop_steel])

# --- Asignación de Etiquetas Físicas ---
# Sincronizar el modelo CAD con el modelo GMSH
gmsh.model.geo.synchronize()

# Asignar Physical Groups (grupos físicos) para identificar las entidades
# Sintaxis: gmsh.model.addPhysicalGroup(dimension, [tags_entidades], tag_físico)
gmsh.model.addPhysicalGroup(2, [surface_conc], CONC_TAG)
gmsh.model.addPhysicalGroup(2, [surface_steel], STEEL_TAG)
gmsh.model.addPhysicalGroup(1, [arc_outer_1, arc_outer_2], OUTER_BC_TAG)

# Añadir nombres a los grupos para claridad en GMSH GUI
gmsh.model.setPhysicalName(2, CONC_TAG, "Concentrado")
gmsh.model.setPhysicalName(2, STEEL_TAG, "Acero")
gmsh.model.setPhysicalName(1, OUTER_BC_TAG, "FronteraExterior")

# --- Generación de la Malla ---
gmsh.model.mesh.generate(2) # Generar malla 2D

# --- Guardar y Finalizar ---
gmsh.write(OUTPUT_FILE)
print(f"[+] Malla guardada exitosamente en '{OUTPUT_FILE}'.")
gmsh.finalize()
