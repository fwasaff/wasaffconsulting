# -*- coding: utf-8 -*-
"""
======================================================================
 WASAFF CONSULTING - Script de Conversión de Malla (Versión 10/10)
======================================================================
 Usa MESHIO para convertir la malla de GMSH a un ÚNICO archivo XDMF
 que contiene tanto el volumen como las fronteras, garantizando la
 compatibilidad con FEniCS.
======================================================================
"""
import meshio
import numpy as np

print("Iniciando la conversión final con meshio...")

# Leemos la malla .msh
msh = meshio.read("manifold.msh")

# Extraemos los datos de las celdas (tetraedros) y las facetas (triángulos)
tetra_cells = msh.get_cells_type("tetra")
triangle_cells = msh.get_cells_type("triangle")

# Extraemos los datos físicos (los tags) para cada tipo
tetra_data = msh.get_cell_data("gmsh:physical", "tetra")
triangle_data = msh.get_cell_data("gmsh:physical", "triangle")

# Creamos un nuevo objeto de malla que contiene TODA la información
final_mesh = meshio.Mesh(
    points=msh.points, 
    cells=[("tetra", tetra_cells), ("triangle", triangle_cells)],
    cell_data={"VolumeRegions": [tetra_data], "FacetRegions": [triangle_data]}
)

# Escribimos el único archivo .xdmf que lo contiene todo
meshio.write("manifold.xdmf", final_mesh)

print("\n¡Conversión a un único archivo 'manifold.xdmf' completada con éxito!")
