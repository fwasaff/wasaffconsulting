#!/bin/bash
# Setup Wasaff Consulting - Sistema de Análisis de Refrigeración
# Ubuntu 22.04/24.04

set -e  # Salir si hay error

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     WASAFF CONSULTING - Setup Análisis de Refrigeración      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# 1. Verificar Python 3
echo "📦 Verificando Python 3..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 no encontrado. Instalando..."
    sudo apt update
    sudo apt install -y python3 python3-pip python3-venv
else
    PYTHON_VERSION=$(python3 --version)
    echo "✅ $PYTHON_VERSION encontrado"
fi

# 2. Crear directorio del proyecto
PROJECT_DIR="$HOME/wasaff_refrigeracion"
echo ""
echo "📁 Creando directorio del proyecto: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# 3. Crear entorno virtual
echo ""
echo "🐍 Creando entorno virtual..."
python3 -m venv venv

# 4. Activar entorno virtual
echo ""
echo "🔧 Activando entorno virtual..."
source venv/bin/activate

# 5. Actualizar pip
echo ""
echo "⬆️  Actualizando pip..."
pip install --upgrade pip

# 6. Instalar dependencias
echo ""
echo "📚 Instalando dependencias..."
pip install CoolProp pandas numpy matplotlib openpyxl jupyter

# 7. Verificar instalación de CoolProp
echo ""
echo "🧪 Verificando instalación de CoolProp..."
python3 << EOF
try:
    from CoolProp.CoolProp import PropsSI
    print("✅ CoolProp instalado correctamente")
    # Test rápido
    T = PropsSI('T', 'P', 101325, 'Q', 0, 'Water')
    print(f"   Test: Temp saturación agua a 1 atm = {T-273.15:.1f}°C (esperado: 100°C)")
except Exception as e:
    print(f"❌ Error: {e}")
    exit(1)
EOF

# 8. Crear estructura de directorios
echo ""
echo "📂 Creando estructura de directorios..."
mkdir -p datos_entrada
mkdir -p reportes_salida
mkdir -p contratos
mkdir -p scripts

# 9. Crear archivo requirements.txt
echo ""
echo "📝 Generando requirements.txt..."
cat > requirements.txt << 'EOF'
CoolProp==6.6.0
pandas==2.1.4
numpy==1.26.2
matplotlib==3.8.2
openpyxl==3.1.2
jupyter==1.0.0
EOF

# 10. Crear .gitignore
echo ""
echo "🙈 Creando .gitignore..."
cat > .gitignore << 'EOF'
# Python
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.so
*.egg
*.egg-info/
dist/
build/

# Datos sensibles
datos_entrada/*.xlsx
datos_entrada/*.csv
reportes_salida/*.pdf
reportes_salida/*.png

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF

# 11. Crear script de activación fácil
echo ""
echo "🚀 Creando script de activación..."
cat > activate.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
echo "✅ Entorno Wasaff activado"
echo "📁 Directorio: $(pwd)"
echo ""
echo "Comandos disponibles:"
echo "  python scripts/analisis_refrigeracion.py    - Análisis de datos"
echo "  jupyter notebook                            - Abrir Jupyter"
echo "  deactivate                                  - Salir del entorno"
echo ""
EOF
chmod +x activate.sh

# 12. Crear README
cat > README.md << 'EOF'
# Wasaff Consulting - Sistema de Análisis de Refrigeración

## Inicio Rápido
```bash
# Activar entorno
source activate.sh

# O manualmente:
source venv/bin/activate
```

## Estructura
```
wasaff_refrigeracion/
├── venv/                   # Entorno virtual
├── datos_entrada/          # Excel/CSV de Nilton
├── reportes_salida/        # PDFs y gráficos generados
├── contratos/              # Contratos LaTeX
├── scripts/                # Scripts Python
│   └── analisis_refrigeracion.py
├── requirements.txt
└── README.md
```

## Uso Básico

1. Colocar archivo Excel en `datos_entrada/`
2. Ejecutar: `python scripts/analisis_refrigeracion.py`
3. Revisar resultados en `reportes_salida/`
EOF

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    ✅ INSTALACIÓN COMPLETA                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Directorio del proyecto: $PROJECT_DIR"
echo ""
echo "Para activar el entorno:"
echo "  cd $PROJECT_DIR"
echo "  source activate.sh"
echo ""
echo "Siguiente paso:"
echo "  1. Copiar analisis_refrigeracion.py a scripts/"
echo "  2. Copiar contrato LaTeX a contratos/"
echo "  3. ¡Listo para trabajar!"
echo ""
