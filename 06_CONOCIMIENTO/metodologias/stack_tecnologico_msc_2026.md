# Stack Tecnológico Wasaff Consulting — Integración Magíster Simulación Computacional PUCV 2026

## Filosofía de integración

El magíster no es un título para el currículum. Es un **arsenal técnico** que debe traducirse en capacidades diferenciadas para los clientes de Wasaff. Cada curso se integra al stack de la firma no cuando termina, sino cuando produce una herramienta reusable en proyectos reales.

---

## Módulo 1: Introducción a la Modelación Matemática (MSC 001)

### Capacidades adquiridas
| Tema académico | Herramienta industrial | Aplicación en Wasaff |
|----------------|----------------------|---------------------|
| EDPs: Calor, Ondas, Laplaciano | FEniCS / FEniCSx | Simulación 2D/3D de intercambiadores, perfiles de temperatura en placas, validación de hipótesis 1D |
| Difusión-reacción-advección | FEniCS + Python | Modelado de fouling en intercambiadores, transporte de contaminantes en fluidos industriales |
| Fenómenos de transporte (1er orden, características) | Método de características propio | Análisis de propagación de frentes térmicos en transitorios |
| Navier-Stokes | OpenFOAM / FEniCS | CFD de flujo en tuberías complejas, pérdidas locales en codos/tees (complemento a Darcy-Weisbach 1D) |
| Termoacoplamiento (cambio de fase) | FEniCS con formulación entálpica | Congelamiento/condensación en recuperación de calor, análisis de riesgo en climas extremos |
| Formación de patrones (Turing) | FEniCS | Investigación básica para publicaciones I+D (ANID/CORFO) |

### Integración inmediata al stack
- **FEniCSx** pasa de ser "el framework del bootcamp" a "el solver estándar para problemas 2D/3D de transferencia de calor y fluidos"
- Todo modelo 1D (ε-NTU, Darcy-Weisbach) debe venir acompañado de una **validación FEniCS 2D** cuando el cliente pague por rigor adicional
- **Regla de oro:** 1D para propuestas rápidas y dimensionamiento. 2D/3D FEniCS para validación crítica y publicaciones.

---

## Módulo 2: Métodos Numéricos (MSC 002)

### Capacidades adquiridas
| Tema académico | Herramienta industrial | Aplicación en Wasaff |
|----------------|----------------------|---------------------|
| RK4 / RK45 (paso simple explícito) | SciPy `solve_ivp` | Transitorios térmicos en recuperación de calor: ¿cuánto tarda el sistema en estabilizarse? |
| BDF / Adams-Bashforth-Moulton (multipaso) | SciPy / PETSc | Transitorios largos con paso adaptativo (arranque/parada de compresores) |
| Gradientes Conjugados + Precondicionamiento | PETSc / SciPy | Redes hidráulicas grandes (>50 nodos), optimización topológica de piping |
| Factorización LU / Cholesky | NumPy / SciPy | Sistemas lineales densos en modelos ε-NTU acoplados |
| Newton-Raphson | SciPy `optimize` | Acoplamiento no lineal temperatura-propiedades (CoolProp + iteración) |
| Splines cúbicas | SciPy `CubicSpline` | Interpolación de datos operacionales irregulares (datos de campo con huecos) |
| Cuadratura Gaussiana | SciPy `quad` / `fixed_quad` | Integrales de rendimiento térmico promedio anual |

### Integración inmediata al stack
- **Transitorios térmicos** pasan de "no calculables" a "entregables estándar" para proyectos >$5M
- **Redes hidráulicas grandes** dejan de ser un dolor de cabeza; PETSc las resuelve en segundos
- **Interpolación de datos de campo** con splines cubicas produce curvas de operación suaves para análisis anual

---

## Módulo 3: Programación Avanzada (MSC 005)

### Capacidades adquiridas
| Tema académico | Herramienta industrial | Aplicación en Wasaff |
|----------------|----------------------|---------------------|
| Python OOP + Decoradores + Metaprogramación | Clases abstractas de componentes | Framework de simulación térmica propio: `Compresor`, `Intercambiador`, `Bomba`, `Acumulador` como objetos conectables |
| Git / GitFlow | Control de versiones profesional | Cada proyecto es un branch. Cada versión del modelo es un tag. Reproducibilidad total. |
| Pandas (limpieza, transformación, visualización) | Análisis de datos operacionales | Post-procesamiento de datos CMMS/SCADA: horas de operación, eficiencias, fallas |
| BLAS / LAPACK / MUMPS | Álgebra lineal de alto rendimiento | Backend numérico para redes hidráulicas >100 tramos |
| Binders C++ (pybind11) | Wrappers de código legacy | Integrar librerías C++ de terceros (ej. códigos de fabricantes) al pipeline Python |
| PETSc (paralelización) | Computación distribuida | Optimización de diseño paramétrico (evaluar 1000 geometrías en paralelo) |
| GPU (JAX / PyTorch / TensorFlow) | Diferenciación automática (AD) | Sensibilidades automáticas: ¿cómo cambia el rendimiento si varía T_in ±2°C? Sin derivar a mano. |

### Integración inmediata al stack
- **Framework OOP:** Cada proyecto de Wasaff se modela como un grafo de componentes conectados (compresor → intercambiador → bomba → acumulador)
- **Pandas:** Informes automáticos con tablas dinámicas de operación anual
- **JAX:** Diferenciación automática para análisis de sensibilidad y optimización. El cliente pregunta "¿y si...?" y la respuesta se calcula en milisegundos, no en horas.

---

## Stack Tecnológico Consolidado Wasaff 2026

### Nivel 1: Análisis rápido (proyectos <$3M, plazo <2 semanas)
| Herramienta | Uso | Quién lo usa |
|-------------|-----|--------------|
| Python + NumPy + SciPy | Cálculos 1D, ε-NTU, Darcy-Weisbach | Director / Analista |
| CoolProp | Propiedades termofísicas exactas | Director |
| Matplotlib / Seaborn | Figuras para informes | Analista |
| LaTeX | Documentación técnica | Director |

### Nivel 2: Análisis riguroso (proyectos $3M–$8M, validación requerida)
| Herramienta | Uso | Quién lo usa |
|-------------|-----|--------------|
| FEniCSx | Validación 2D/3D de modelos 1D, perfiles térmicos, CFD básico | Director |
| PETSc / MUMPS | Redes hidráulicas grandes, sistemas dispersos | Director |
| Pandas | Análisis de datos operacionales históricos | Analista |
| Splines cúbicas (SciPy) | Interpolación de datos de campo | Analista |
| RK45 / BDF (SciPy) | Transitorios térmicos | Director |

### Nivel 3: Análisis de vanguardia (proyectos >$8M, I+D, publicaciones)
| Herramienta | Uso | Quién lo usa |
|-------------|-----|--------------|
| OpenFOAM | CFD completo: turbulencia, swirling flow, mixing | Director + PhD ad hoc |
| JAX | Diferenciación automática, optimización paramétrica, ML | Director |
| pybind11 | Integración de código C++ legacy o de alto rendimiento | Director |
| GPU (CUDA/JAX) | Optimización de diseño masiva (1000+ escenarios) | Director |
| FEniCSx + cambio de fase | Congelamiento, condensación, solidificación | Director + PhD ad hoc |

---

## Roadmap de implementación gradual

### Trimestre 1 (Mar–May 2026) — En curso
- [ ] Refactorizar `fluido.py`, `tuberia.py`, `intercambiador.py` a clases OOP con decoradores de validación
- [ ] Implementar GitFlow en `06_CONOCIMIENTO/scripts_reutilizables/`: `main`, `develop`, `feature/`
- [ ] Usar Pandas para post-procesamiento del Excel de Kaeser/CMPC
- [ ] Primer modelo FEniCS 2D: conducción de calor en placa de intercambiador (validar contra ε-NTU 1D)

### Trimestre 2 (Jun–Ago 2026)
- [ ] Transitorio térmico con RK45 para arranque/parada de compresores
- [ ] Red hidráulica >20 nodos con Gradientes Conjugados + precondicionamiento
- [ ] Framework OOP completo: `SistemaRecuperacionCalor` conecta `Compresor` + `Intercambiador` + `Bomba` + `Acumulador`
- [ ] Primer análisis de sensibilidad con JAX en proyecto real

### Trimestre 3 (Sep–Nov 2026)
- [ ] CFD con OpenFOAM: validación de pérdidas locales en codos (vs. factores de pérdida tabulados)
- [ ] Optimización paramétrica con JAX: encontrar geometría óptima de intercambiador para múltiples escenarios
- [ ] Publicación: artículo corto sobre metodología de recuperación de calor con validación FEniCS + datos de campo

### Trimestre 4 (Dic 2026 – Feb 2027)
- [ ] Modelo digital gemelo (digital twin) con transitorios en tiempo real para cliente recurrente
- [ ] Workshop interno: transferir conocimiento de FEniCS/PETSc/JAX al equipo
- [ ] Actualizar tarifas: añadir línea "Validación FEniCS 2D" y "Análisis transitorio RK45" con precios diferenciados

---

## Diferenciación competitiva

| Competencia típica | Wasaff 2023 | Wasaff 2026 (con magíster) |
|--------------------|-------------|---------------------------|
| Excel + tablas ASHRAE | Python + SciPy + CoolProp | FEniCS 2D/3D + validación experimental |
| Análisis estacionario solo | EDOs simples | Transitorios RK45/BDF + arranque/parada |
| Red hidráulica <10 tramos | Darcy-Weisbach manual | PETSc: redes ilimitadas + optimización |
| "Suponemos que..." | Supuestos declarados | Sensibilidad automática con JAX: incertidumbre cuantificada |
| Informe PDF estático | PDF + código | Dashboard interactivo (Pandas + Plotly) + modelo ejecutable |
| Una vez y chau | Entrega y olvido | Digital twin con actualización periódica de datos (retainer) |

---

## Notas de implementación

- **FEniCSx vs FEniCS:** El magíster probablemente use FEniCS legacy. Wasaff debe migrar a FEniCSx (fenicsproject.org) que es el futuro. Compatible en conceptos, API ligeramente diferente.
- **JAX vs PyTorch:** JAX es más puro para diferenciación automática científica. PyTorch es más general. Para ingeniería: JAX.
- **PETSc vía Python:** Usar `petsc4py` para integración con el stack Python existente.
- **Pandas en LaTeX:** `pandas.DataFrame.to_latex()` genera tablas LaTeX automáticamente desde análisis de datos.

---

*Documento vivo. Actualizar cada trimestre con lecciones aprendidas de proyectos reales.*
