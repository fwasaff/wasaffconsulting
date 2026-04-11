#!/bin/bash

# Script para crear la estructura de directorios y archivos para el libro:
# "El Código de la Realidad" por Wasaff Consulting.

# Detiene el script si algún comando falla
set -e

PROJECT_NAME="ElCodigoDeLaRealidad"

# --- 1. Verificación de Seguridad ---
if [ -d "$PROJECT_NAME" ]; then
  echo "ERROR: El directorio '$PROJECT_NAME' ya existe en la ubicación actual."
  echo "Por favor, muévelo, renómbralo o elimina el directorio existente y vuelve a intentarlo."
  exit 1
fi

echo "Creando el directorio raíz del proyecto: $PROJECT_NAME"
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

# --- 2. Creación de la Estructura de Carpetas Principal ---
echo "Creando la estructura de carpetas..."
mkdir -p Config \
         Preliminares \
         Capitulos \
         Apendices \
         Bibliografia \
         Figuras \
         Codigo \
         Datos

# --- 3. Creación de Archivos Principales y de Configuración ---
echo "Creando archivos principales y de configuración..."

# Archivo Maestro LaTeX
touch LibroMaestro.tex

# Archivo Preamble
touch Config/WASAFF_Preamble.tex

# Archivo de Bibliografía
touch Bibliografia/BibliografiaMaestra.bib

# --- 4. Creación de Archivos .tex Vacíos para el Contenido ---
echo "Creando archivos .tex para cada sección..."

# Preliminares
touch Preliminares/Dedicatoria.tex
touch Preliminares/Prologo.tex
touch Preliminares/Introduccion.tex

# Parte I: Fundamentos
touch Capitulos/Capitulo_1_Poisson.tex
touch Capitulos/Capitulo_2_Calor.tex
touch Capitulos/Capitulo_3_NoLineal.tex

# Parte II: Multifísica
touch Capitulos/Capitulo_4_Termoelasticidad.tex
touch Capitulos/Capitulo_5_Stokes.tex
touch Capitulos/Capitulo_6_Conveccion.tex

# Parte III: Simulación Avanzada
touch Capitulos/Capitulo_7_Turbulencia.tex
touch Capitulos/Capitulo_8_FSI.tex
touch Capitulos/Capitulo_9_Optimizacion.tex

# Apéndices
touch Apendices/Apendice_A_Calculo.tex
touch Apendices/Apendice_B_FEniCS.tex
touch Apendices/Apendice_C_Instalacion.tex
touch Apendices/Apendice_D_Verificacion_Validacion.tex

# --- 5. Creación de Placeholders para que Git rastree carpetas vacías ---
# Usamos .gitkeep que es una convención común
touch Figuras/.gitkeep
touch Codigo/.gitkeep
touch Datos/.gitkeep

# --- 6. Creación de Archivos de Proyecto (README y .gitignore) ---
echo "Creando README.md y .gitignore..."

# README.md
cat << EOF > README.md
# El Código de la Realidad
**Simulación Multifísica desde los Primeros Principios para la Ingeniería Industrial**

Repositorio oficial para el libro y los materiales de simulación de Wasaff Consulting.

## Estructura del Proyecto

*   \`/LibroMaestro.tex\`: El archivo raíz de LaTeX.
*   \`/Config\`: Contiene el preámbulo y configuraciones del documento.
*   \`/Preliminares\`: Prólogo, introducción, etc.
*   \`/Capitulos\`: Un archivo \`.tex\` por cada capítulo del libro.
*   \`/Apendices\`: Los apéndices técnicos.
*   \`/Bibliografia\`: Contiene el archivo \`.bib\` con todas las referencias.
*   \`/Figuras\`: Todas las imágenes, gráficos y plots.
*   \`/Codigo\`: Scripts de simulación en Python/FEniCS.
*   \`/Datos\`: Archivos de mallas o datos de entrada para las simulaciones.

EOF

# .gitignore
cat << EOF > .gitignore
# Archivos autogenerados por LaTeX
*.aux
*.bbl
*.blg
*.log
*.out
*.toc
*.synctex.gz
_minted*
*.fls
*.fdb_latexmk

# Archivos de salida
*.pdf

# Archivos de editores y sistema
.vscode/
*.swp
*~
.DS_Store

# Archivos de Python
__pycache__/
*.pyc
venv/
.venv/
env/
.env

EOF

# --- 7. Mensaje Final ---
echo ""
echo "¡Éxito! La estructura del proyecto '$PROJECT_NAME' ha sido creada."
echo "Puedes empezar a trabajar editando los archivos en la nueva carpeta."
echo "Próximo paso sugerido: cd $PROJECT_NAME"
