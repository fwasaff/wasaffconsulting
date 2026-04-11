# Metodología: Dinámica Molecular con LAMMPS/LPMD

**Versión:** 1.0
**Fecha:** 2026-03-16
**Aplicable a:** Propiedades mecánicas a escala nanoscópica, colisiones inelásticas, transiciones de fase, transferencia de energía entre sistemas atómicos
**Validada en:** Investigación NanoMaterials UChile (2010-2013), colisiones inelásticas, publicado Springer 2011

---

## Pasos

### 1. Definición del sistema
- Composición química (elementos, aleaciones, polímeros)
- Tamaño de la celda de simulación (número de átomos: 10³ a 10⁶ típico)
- Condiciones de contorno (periódicas, libres, mixtas)
- Temperatura y presión de referencia

### 2. Elección del potencial interatómico
La elección del potencial es la decisión más crítica. Define la física del sistema.

| Tipo | Aplicación | Ejemplo |
|------|-----------|---------|
| Lennard-Jones | Gases nobles, sistemas modelo | Argón |
| EAM / Finnis-Sinclair | Metales FCC/BCC | Cu, Al, Fe |
| Tersoff / Brenner | Covalentes (Si, C, SiC) | Silicio, diamante |
| ReaxFF | Reacciones químicas | Combustión, catálisis |
| MEAM | Metales con dirección de enlace | Ti, Mg |

**Regla:** usar el potencial más sencillo que reproduzca la propiedad de interés. Validar contra datos experimentales conocidos.

### 3. Minimización de energía (relajación)
Antes de cualquier simulación dinámica:
```
# En LAMMPS
minimize 1.0e-6 1.0e-8 1000 10000
```
Verificar que la energía converge y no hay átomos superpuestos.

### 4. Equilibrado del sistema

**Ensemble NVT** (T constante):
- Usar termostato Nosé-Hoover
- Tiempo de equilibrado: 50–200 ps típico (depende del sistema)
- Verificar: temperatura promedio estable ± 5%

**Ensemble NPT** (T y P constantes):
- Usar barostato Parrinello-Rahman
- Para obtener densidad de equilibrio

### 5. Producción

Definir claramente antes de lanzar:
- Duración total (ps o ns)
- Paso de tiempo: 1–2 fs para sistemas atómicos típicos
- Frecuencia de volcado de trayectorias (dump) y energías
- Propiedades a calcular durante la corrida

### 6. Análisis de trayectorias

| Propiedad | Herramienta | Método |
|-----------|-------------|--------|
| RDF (función distribución radial) | LAMMPS `compute rdf` | Promedio sobre producción |
| MSD (desplazamiento cuadrático medio) | LAMMPS `compute msd` | Coeficiente de difusión via Einstein |
| Energía cinética/potencial | Thermodynamic output | Log file |
| Tensión/deformación | LAMMPS `compute stress/atom` | Tensor de estrés |
| Identificación de fases | OVITO — CNA/PTM | Post-procesamiento |

---

## Parámetros clave

| Parámetro | Rango típico | Nota |
|-----------|-------------|------|
| Paso de tiempo (dt) | 0.5 – 2.0 fs | Verificar conservación de energía en NVE |
| Temperatura equilibrado | T_objetivo ± 5% | Checar antes de producción |
| Tiempo de equilibrado | 50 – 500 ps | Más tiempo para sistemas complejos |
| Cutoff del potencial | 2.5σ (LJ) o según potencial | Definido en el archivo de potencial |
| Número de átomos | 10³ – 10⁵ | >10⁶ requiere HPC o GPU |

---

## Advertencias

- **Verificar conservación de energía** en NVE antes de producción — si el paso de tiempo es muy grande, la energía derivará
- **Condiciones periódicas**: el tamaño de la caja debe ser al menos 2× el cutoff del potencial
- **Efectos de tamaño finito**: propiedades como conductividad térmica convergen lentamente con N — verificar
- **Temperatura de inicio**: no usar velocidades aleatorias directamente a T alta — calentar gradualmente
- **Tiempo de correlación**: asegurar que el tiempo de producción es >> tiempo de relajación del sistema

---

## Scripts asociados
*(por crear)*
- `scripts_reutilizables/bash/lammps_run.sh` — script de lanzamiento LAMMPS en Linux
- `scripts_reutilizables/python/analizar_rdf.py` — análisis de RDF desde archivo log
- `scripts_reutilizables/python/msd_diffusion.py` — cálculo coeficiente de difusión

---

## Referencias
- Frenkel, D. & Smit, B. *Understanding Molecular Simulation*, 2nd ed. Academic Press, 2002.
- Plimpton, S. "Fast Parallel Algorithms for Short-Range Molecular Dynamics," J. Comp. Phys. 117, 1-19 (1995). — paper original LAMMPS
- LAMMPS documentation: https://docs.lammps.org
