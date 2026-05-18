# Análisis Retrospectivo: Leycero SpA / CMPC Puente Alto 2023
## Cómo se ejecutaría hoy con el stack del Magíster PUCV 2026

> **Proyecto original:** WC-2023-001 — Sistema de Recuperación de Calor Residual  
> **Cliente directo:** Leycero SpA (Nilton Martínez)  
> **Cliente final:** Papeles Cordillera S.A. (CMPC Puente Alto)  
> **Contratista equipos:** Kaeser Compresores de Chile SpA  
> **Fecha original:** 2023  
> **Valor original:** $1.000.000 CLP (informal, sin boleta)  
> **Valor estimado 2026:** $3.500.000 – $5.500.000 CLP (formal, con stack ampliado)

---

## 1. Contexto del proyecto original

### El problema
CMPC Puente Alto opera una sala de compresores con 6 equipos Kaeser de tornillo rotatorio. Cada compresor tiene un intercambiador de placas PTG integrado que recupera calor del aceite de enfriamiento. El calor disponible debe trasladarse al circuito de agua industrial de CMPC, pero los circuitos deben estar hidráulicamente aislados.

### Datos de los equipos (del brief Kaeser)

| Modelo | N° | P_nom (kW) | Q_térmico (kW) | Caudal ΔT25K (m³/h) | ΔP (bar) |
|--------|-----|-----------|----------------|----------------------|----------|
| FSD575 | 1 | 315 | 246 | 8,61 | 0,40 |
| FSD575 | 2 | 315 | 246 | 8,61 | 0,40 |
| FSD575 | 3 | 315 | 246 | 8,61 | 0,40 |
| DSDX305 | 4 | 160 | 130 | 4,50 | 0,25 |
| DSDX305 | 5 | 160 | 130 | 4,50 | 0,25 |
| ESD445 | 6 | 250 | 196 | 6,71 | 0,40 |

**Restricción operacional:** FSD575 N°3 es 100% respaldo. No opera simultáneamente con N°1 o N°2.

**Escenarios de operación (del Excel PTG):**

| Demanda aire (m³/min) | Frecuencia | Equipos en operación | Q_total (kW) | Caudal (m³/h) |
|-----------------------|------------|---------------------|--------------|---------------|
| 90 | 2% | 1-6 | 442 | 15,32 |
| 130 | 1% | 1-2-4 | 622 | 21,72 |
| 131 | 80% | 1-2-4 | 622 | 21,72 |
| 140 | 1% | 1-2-4 | 622 | 21,72 |
| 150 | 1% | 1-2-6 | 688 | ? |
| 174 | 14% | 1-2-4-5 | 752 | ? |
| 218 | 2% | 1-2-4-5-6 | 948 | ? |

### Lo que se entregó en 2023
- Memoria de cálculo técnica (PDF, 9 páginas)
- Informe ejecutivo (PDF, 2 páginas)
- Scripts Python: cálculos hidráulicos, propiedades de fluido, tubería (Sch40/80)
- Análisis ε-NTU (implícito en los cálculos, no documentado formalmente)
- No se entregó código modular ni validación con datos de campo

### Crítica honesta (abogado del diablo)
- El análisis fue **correcto pero básico**: ε-NTU + Darcy-Weisbach 1D con supuestos fuertes.
- **No se modelaron transitorios**: ¿qué pasa cuando arranca el compresor de respaldo? ¿Cuánto tarda el sistema en estabilizarse?
- **No se validó con FEniCS 2D**: El ε-NTU 1D asume coeficiente convectivo constante. En placas reales hay gradientes transversales.
- **No se cuantificó incertidumbre**: ¿Qué pasa si la T_hot_in varía ±5°C? ¿Y si el fouling crece?
- **El precio fue irrisorio**: $1.000.000 por un análisis que justificaba una inversión de equipos de $50M+. Eso no es "barato"; es "no sostenible para Wasaff".

---

## 2. Stack 2023 vs Stack 2026

| Aspecto | 2023 (hecho) | 2026 (propuesto) | Impacto en valor entregado |
|---------|-------------|------------------|---------------------------|
| Modelo térmico | ε-NTU 1D analítico | ε-NTU 1D + **validación FEniCS 2D** perfiles de T en placas | El cliente ve que el modelo 1D es conservador y respaldado por simulación de elementos finitos |
| Modelo hidráulico | Darcy-Weisbach 1D, 11 tramos | Darcy-Weisbach 1D + **pérdidas locales validadas con OpenFOAM** para codos/tees críticos | Precisión en ΔP total mejora de ±15% a ±5% |
| Transitorios | No calculados | **RK45/BDF** para arranque/parada y cambio de escenario | Se entrega curva de T vs tiempo; el cliente dimensiona el control automático |
| Datos operacionales | No disponibles; se usaron especificaciones | **Pandas** para procesar datos SCADA/CMMS si existen; **splines** para interpolar huecos | Si el cliente tiene datos, el modelo se calibra. Si no, se declara la incertidumbre |
| Sensibilidad | Manual: "varié un parámetro y recalculé" | **JAX**: diferenciación automática de todo el modelo respecto a cualquier parámetro | El cliente pregunta "¿y si...?" y la respuesta toma 1 segundo, no 1 hora |
| Red hidráulica | 11 tramos, resoluble a mano | **PETSc/MUMPS**: si la red crece a 50+ tramos o se hace optimización topológica | Escalable a plantas complejas o múltiples circuitos |
| Código | Scripts sueltos, funciones sin docstring | **Framework OOP**: `Compresor`, `Intercambiador`, `Bomba`, `Acumulador` como objetos conectables | Reutilizable, testeable, documentado automáticamente |
| Informe | PDF estático 9 páginas | PDF técnico + PDF ejecutivo + **código ejecutable en Jupyter** + dashboard Pandas/Plotly | El cliente puede recalcular escenarios sin llamar a Wasaff |
| Post-venta | Ninguna | **Digital twin** con actualización trimestral de datos de operación | Retainer mensual: Wasaff monitorea el rendimiento real vs predicción |

---

## 3. Ejecución paso a paso con el stack 2026

### FASE 0 — Diagnóstico (misma reunión, más preguntas)

**Las 4 Preguntas Diagnósticas (estándar):**
1. ¿Qué decisión concreta? → "Aprobar inversión en recuperación de calor para CMPC"
2. ¿Qué datos tienen? → "Fichas técnicas Kaeser + layout. Datos operacionales reales en CMPC (SCADA) no accesibles aún"
3. ¿Plazo real? → "Segunda quincena de mayo (licitación CMPC)"
4. ¿Presupuesto? → "Kaeser gestiona; necesitan cifra para paquete"

**Preguntas nuevas que haríamos hoy (stack 2026):**
5. *"¿Tienen datos históricos de temperatura de salida del aceite de los compresores? Incluso 1 semana de datos nos permitiría calibrar el modelo."*
   - Si SÍ: Usamos Pandas para limpiar, splines para interpolar, y calibramos el modelo.
   - Si NO: Declaramos incertidumbre ±10% en T_hot_in como supuesto explícito.

6. *"¿Necesitan solo el dimensionamiento en estado estacionario, o también quieren saber cómo se comporta el sistema en arranque/parada?"*
   - Si solo estacionario: precio base ($3.500.000).
   - Si también transitorios: adicional de $1.500.000 (modelado RK45 + análisis de estabilidad).

7. *"¿El agua industrial tiene tratamiento químico? ¿Hay riesgo de fouling en el intercambiador de aislamiento?"*
   - Si SÍ: Incluimos análisis de degradación térmica anual (modelo de fouling simplificado).
   - Si NO: Declaramos que no modelamos fouling a >6 meses.

### FASE 1 — Propuesta formal (diferenciada por nivel)

**Opción A: Análisis estándar ($3.542.000)**
- ε-NTU 1D + red hidráulica Darcy-Weisbach 1D
- 3 escenarios de operación
- Informe técnico + ejecutivo + código Python
- Tiempo: 3 semanas

**Opción B: Análisis avanzado ($5.400.000)** ← Recomendado para CMPC
- Todo lo anterior, MÁS:
  - **Validación FEniCS 2D** del intercambiador de aislamiento (perfil T en placas)
  - **Transitorios RK45** para arranque/parada (curva T vs tiempo, 30 min de simulación)
  - **Análisis de sensibilidad automática** (JAX): variación de ±10% en parámetros clave
  - **Pérdidas locales validadas** con OpenFOAM para codos críticos (si el layout lo justifica)
  - Dashboard interactivo (Pandas + Plotly) para que CMPC recalcule escenarios
- Tiempo: 5 semanas

**Opción C: Digital Twin ($2.800.000 + retainer $400.000/mes)**
- Todo lo de B, MÁS:
  - Modelo ejecutable en Jupyter actualizable con datos de campo
  - Monitoreo trimestral de rendimiento real vs predicción
  - Alertas si la eficiencia cae >5% (indicador de fouling o falla)
- Para clientes recurrentes con retainer

### FASE 2 — Ejecución técnica (stack 2026 detallado)

#### Semana 1: Kickoff + datos + arquitectura OOP

**Documentos a crear:**
- `01_datos/README.md`: fuentes, fechas, calidad de cada dato
- `01_datos/fichas_kaeser.json`: parámetros de compresores en formato estructurado
- `02_analisis/sistema.py`: framework OOP con clases

**Arquitectura de clases (Python OOP + decoradores):**
```python
@dataclass
class Compresor:
    modelo: str
    potencia_nominal: float  # kW
    rendimiento_termico: float  # kW
    caudal_agua: float  # m3/h
    delta_p: float  # bar
    es_respaldo: bool = False

@dataclass
class Intercambiador:
    area: float  # m2, a calcular
    coef_global: float  # W/m2K, a estimar
    tipo: str = "placa_counterflow"
    
    def calcular_e_ntu(self, C_hot, C_cold, UA):
        ...

@dataclass  
class RedHidraulica:
    tramos: List[Tramo]
    metodo: str = "darcy_weisbach"
    
    def resolver(self, solver="direct"):
        # Si >20 nodos: usar PETSc CG + precondicionamiento
        ...
```

#### Semana 1–2: Modelado térmico (ε-NTU 1D + FEniCS 2D)

**Análisis 1D (rápido, para iterar):**
- Método ε-NTU con C_min, C_max, NTU = UA/C_min
- Validación cruzada con LMTD
- Output: Área requerida, temperaturas de salida, efectividad

**Validación 2D con FEniCSx (para el informe):**
- Geometría: canal entre dos placas (2D), longitud L, espesor e
- EDPs: convección-difusión estacionaria en el canal
  - ρc_p (u·∇T) = k ∇²T en el fluido
  - -k ∇T·n = q" en las paredes (flujo de calor del aceite)
- Condiciones de contorno: T_in conocida, flujo de calor en paredes, simetría en centro del canal
- Output: Perfil T(x,y), verificación de que la T_media de salida coincide con ε-NTU 1D dentro de ±3%
- Si no coincide: ajustar correlaciones de Nusselt en el modelo 1D

**Entregable intermedio:**
- Figura comparativa: perfil T FEniCS vs T promedio ε-NTU
- Nota técnica: "El modelo 1D es conservador en X% respecto al 2D. El error se debe a [causa física]."

#### Semana 2: Red hidráulica + selección de bomba

**Análisis 1D (estándar):**
- Darcy-Weisbach + Colebrook-White iterativo para 11 tramos
- Cálculo de Reynolds, factor de fricción, ΔP por tramo
- Verificación: ΣΔP = ΔP_bomba disponible

**Novedad 2026: Validación de pérdidas locales con OpenFOAM (si aplica):**
- Si hay codo especialmente crítico (radio corto, alta velocidad), correr CFD 2D/3D del codo
- Comparar factor K_local con tablas IDELCHIK / Crane
- Si la diferencia es >20%, usar el K de CFD en el modelo 1D
- *Nota: Para este proyecto, probablemente las tablas sean suficientes. OpenFOAM solo si el cliente paga el nivel avanzado.*

**Selección de bomba:**
- Curva del sistema: H = f(Q) = ΔP_estática + ΔP_fricción(Q) + ΔP_accesorios(Q)
- Intersección con curvas de bombas comerciales (dadas por fabricante)
- NPSH disponible vs requerido
- Decisión: bomba individual vs central (análisis económico simplificado)

#### Semana 2–3: Transitorios térmicos (Opción B)

**¿Por qué importa?**
Cuando arranca el compresor de respaldo (N°3), el caudal de agua caliente aumenta repentinamente. El acumulador y el intercambiador de aislamiento necesitan tiempo para estabilizarse. CMPC quiere saber:
- ¿Cuánto tarda el sistema en alcanzar el 95% de T_estacionaria?
- ¿Hay riesgo de golpe de ariete térmico en el intercambiador?

**Modelo matemático:**
Sistema de EDOs acoplado:
- dT_tanque/dt = (ṁ_hot·cp_hot·T_hot_in + ṁ_cold·cp_cold·T_cold_in - ṁ_out·cp·T_tanque) / (ρ·V·cp)
- dT_intercambiador_placas/dt = función de la inercia térmica del metal

**Implementación:**
- SciPy `solve_ivp` con método `RK45` (paso adaptativo, bueno para transitorios suaves)
- Si hay stiffness (cambios muy rápidos): método `BDF` (más estable)
- Escenarios: arranque desde frío, arranque de compresor de respaldo, parada repentina

**Output:**
- Curvas T(t) para cada componente
- Tiempo de estabilización τ_95%
- Recomendación de control: ¿válvula de 3 vías con actuador de cuántos segundos?

#### Semana 3: Sensibilidad e incertidumbre (Opción B — JAX)

**¿Por qué importa?**
El cliente siempre pregunta "¿y si...?". Hoy recalcular a mano cada escenario es lento y propenso a errores.

**Implementación:**
```python
import jax.numpy as jnp
from jax import grad, vmap

def modelo_completo(params):
    T_hot_in, U, fouling_factor, caudal_cold = params
    # ... cálculo ε-NTU + red hidráulica ...
    return rendimiento_total, T_out_hot, T_out_cold

# Sensibilidad automática:
d_rendimiento_d_T_hot = grad(modelo_completo, argnums=0)
# Evaluar en ±10% de cada parámetro:
esenarios = vmap(modelo_completo)(grid_de_parametros)
```

**Output:**
- Tornado diagram: ¿qué parámetro afecta más el rendimiento?
- Intervalo de confianza del rendimiento: "Con incertidumbre en los datos, el rendimiento está entre X e Y kW con 90% de confianza"

#### Semana 3–4: Redacción + dashboard

**Informe técnico (LaTeX):**
- Portada, índice, control de versiones
- Capítulo 1: Alcance, supuestos, limitaciones
- Capítulo 2: Metodología (ε-NTU, Darcy-Weisbach, FEniCS 2D, RK45)
- Capítulo 3: Resultados (tablas, figuras)
- Capítulo 4: Sensibilidad e incertidumbre
- Capítulo 5: Recomendaciones accionables

**Informe ejecutivo (2 páginas):**
- Conclusión 1: "Recuperan 622 kW en operación normal (80% del tiempo)"
- Conclusión 2: "El intercambiador de aislamiento debe tener X m². Con el área recomendada, el margen de seguridad es del 15%."
- Conclusión 3: "El sistema se estabiliza en 8 minutos tras el arranque del compresor de respaldo. Se recomienda válvula de control con tiempo de respuesta <30 segundos."
- Recomendaciones con prioridad y estimación de inversión

**Dashboard interactivo (Jupyter + Pandas + Plotly):**
```python
import pandas as pd
import plotly.express as px

# El cliente puede mover sliders:
# - T_hot_in: 55°C – 65°C
# - Caudal agua industrial: 20 – 30 m³/h
# - Número de compresores operando: 1 – 6
# Y ver en tiempo real:
# - Q recuperado
# - T_out del intercambiador
# - ΔP de la red
# - Punto de operación de la bomba
```

### FASE 3 — Entrega

**Reunión de 60 min:**
- 15 min: presentación de resultados (3 hallazgos + 3 recomendaciones)
- 15 min: demo del dashboard interactivo (el cliente mueve sliders)
- 30 min: preguntas y próximos pasos

**Pregunta clave para cerrar:**
> *"¿Les gustaría que monitoreáramos el rendimiento real del sistema durante los primeros 6 meses de operación? Podemos calibrar el modelo con sus datos y ajustar las recomendaciones. Esto tiene un costo de $X mensuales como retainer."*

### FASE 4 — Post-venta (digital twin)

**Retainer mensual ($400.000 – $600.000):**
- Cada mes CMPC envía datos de operación (CSV/Excel)
- Wasaff corre el modelo con los datos reales usando Pandas
- Comparación: rendimiento real vs predicción
- Alerta si la eficiencia cae >5%: "Posible fouling o falla de bomba. Revisar."
- Informe trimestral: 1 página con tendencias y recomendaciones de mantenimiento

---

## 4. Documentos a crear (checklist)

### Internos (Wasaff)
- [ ] `00_ficha.md`: ficha completa del proyecto
- [ ] `01_datos/README.md`: catálogo de fuentes de datos
- [ ] `01_datos/fichas_kaeser.json`: parámetros estructurados
- [ ] `02_analisis/sistema.py`: framework OOP completo
- [ ] `02_analisis/validacion_fenics_2d.py`: script FEniCSx
- [ ] `02_analisis/transitorios.py`: script RK45/BDF
- [ ] `02_analisis/sensibilidad_jax.py`: diferenciación automática
- [ ] `02_analisis/README.md`: instrucciones de ejecución
- [ ] `03_resultados/figuras/`: figuras de alta resolución (300 dpi)
- [ ] `03_resultados/tablas/`: tablas en CSV y LaTeX
- [ ] `04_informe/informe_tecnico.tex`: LaTeX completo
- [ ] `04_informe/informe_ejecutivo.tex`: 2 páginas
- [ ] `04_informe/presentacion.pdf`: 10 diapositivas
- [ ] `05_entrega/dashboard.ipynb`: Jupyter interactivo
- [ ] `05_entrega/paquete.zip`: todo lo anterior comprimido

### Externos (cliente)
- [ ] Informe técnico PDF (30-40 páginas)
- [ ] Informe ejecutivo PDF (2 páginas)
- [ ] Presentación PDF (10 diapositivas)
- [ ] Código fuente ZIP (con README de ejecución)
- [ ] Dashboard Jupyter (opción B/C)

---

## 5. Simulaciones a correr (orden de ejecución)

| # | Simulación | Herramienta | Input | Output | Tiempo CPU |
|---|-----------|-------------|-------|--------|------------|
| 1 | ε-NTU 1D estacionario | Python/NumPy | C_hot, C_cold, UA | A, ε, T_out | <1 s |
| 2 | Red hidráulica 1D | Python/NumPy | Geometría, rugosidad | ΔP, Q, v, Re | <1 s |
| 3 | **Validación FEniCS 2D** | FEniCSx | Geometría placa, propiedades | Perfil T(x,y) | 30–120 s |
| 4 | Curva de bomba | Python/NumPy | Curvas fabricante, punto operación | Q_op, H_op, NPSH | <1 s |
| 5 | **Transitorio arranque** | SciPy RK45 | Condiciones iniciales, P_comp(t) | T(t) cada componente | 10–60 s |
| 6 | **Transitorio cambio escenario** | SciPy RK45 | Pérdida repentina de 1 compresor | T(t), tiempo τ_95% | 10–60 s |
| 7 | **Sensibilidad paramétrica** | JAX + vmap | Grid de ±10% en 5 parámetros | 1000 escenarios | 5–30 s |
| 8 | Pérdidas locales CFD (opcional) | OpenFOAM | Codo crítico 3D | K_local vs tablas | 10–60 min |
| 9 | Dashboard interactivo | Jupyter/Plotly | Modelo encapsulado | Sliders + gráficas | Interactivo |

---

## 6. Pricing actualizado (2026)

### Opción A: Estándar ($3.542.000)
| Ítem | Días | Tarifa/día | Subtotal |
|------|------|-----------|----------|
| Director: modelado ε-NTU + red hidráulica | 5 | $280.000 | $1.400.000 |
| Analista: figuras, tablas, código base | 3 | $120.000 | $360.000 |
| Software + LaTeX | — | — | $100.000 |
| Subtotal | | | $1.860.000 |
| Contingencia 15% | | | $279.000 |
| **Total** | | | **$2.139.000** |
| Redondeo + margen estratégico | | | **$3.542.000** |

*Justificación del margen: código reusable, precedente 2023, relación con Kaeser.*

### Opción B: Avanzado ($5.400.000) ← Recomendado
| Ítem | Días | Tarifa/día | Subtotal |
|------|------|-----------|----------|
| Director: todo A + FEniCS 2D + transitorios + JAX | 8 | $280.000 | $2.240.000 |
| Analista: figuras, tablas, dashboard, validación | 5 | $120.000 | $600.000 |
| Software + LaTeX + computación | — | — | $200.000 |
| Subtotal | | | $3.040.000 |
| Contingencia 15% | | | $456.000 |
| **Total** | | | **$3.496.000** |
| Redondeo + valor diferenciado | | | **$5.400.000** |

### Opción C: Digital Twin (retainer)
- Setup inicial: $2.800.000 (igual a B pero con arquitectura de monitoreo)
- Retainer mensual: $400.000 – $600.000
- Mínimo 6 meses: total $5.200.000 – $6.400.000 en 1 año

---

## 7. Plan de implementación gradual (tu magíster)

### S1 2026 (Mar–Jun) — Lo que puedes hacer YA
- [ ] Refactorizar scripts 2023 a clases OOP (`Compresor`, `Intercambiador`, `Bomba`, `Acumulador`)
- [ ] Implementar GitFlow en `scripts_reutilizables/`
- [ ] Primer modelo FEniCS 2D: validar ε-NTU 1D para una geometría simple de placa
- [ ] Usar Pandas para post-procesar el Excel de Kaeser/CMPC

### S2 2026 (Jul–Dic) — Lo que tendrás con Métodos Numéricos
- [ ] Transitorios RK45 para arranque/parada en próximo proyecto real
- [ ] Gradientes Conjugados para red hidráulica si el proyecto lo justifica (>20 nodos)
- [ ] Splines cúbicos para interpolar datos de campo irregulares

### S3 2027 (Ene–Jun) — Lo que tendrás con Programación Avanzada completa
- [ ] JAX: sensibilidad automática en todos los proyectos nuevos
- [ ] PETSc: escalar a plantas complejas o optimización topológica
- [ ] pybind11: integrar librerías de fabricantes si es necesario

### S4 2027 (Jul–Dic) — Consolidación
- [ ] OpenFOAM: primer proyecto CFD completo (pérdidas locales, turbulencia)
- [ ] Digital twin: primer cliente con monitoreo trimestral
- [ ] Publicación: artículo corto sobre metodología Wasaff + validación FEniCS

---

## 8. Lecciones para registrar en `06_CONOCIMIENTO/lecciones_aprendidas.md`

1. **Precio:** $1.000.000 por un análisis de esta complejidad es insostenible. El precio de mercado 2026 es $3.5M–$5.5M. Nunca más.
2. **Datos:** Siempre solicitar datos de operación reales en la Fase 0. Especificar en la propuesta: "Sin datos de campo, el modelo tiene una incertidumbre estimada del ±10%."
3. **Validación:** Todo modelo 1D debe venir con una validación 2D (FEniCS) cuando el cliente pague por rigor. Es la diferencia entre "consultor con Excel" y "consultor con simulación computacional".
4. **Transitorios:** Los clientes industriales subestiman la importancia de los transitorios hasta que tienen un golpe de ariete. Ofrecerlo como upsell.
5. **Reutilización:** El código de este proyecto (intercambiadores de placas, compresores Kaeser) es reusable en cualquier planta con equipos similares. Documentar como "patrón de diseño" en `06_CONOCIMIENTO/`.

---

## Referencias internas

- Stack tecnológico: `06_CONOCIMIENTO/metodologias/stack_tecnologico_msc_2026.md`
- Metodología de proyectos: `06_CONOCIMIENTO/metodologias/metodologia-proyectos-wasaff.md`
- Playbook de venta: `02_COMERCIAL/playbook_venta_consultiva.md`
- Plantilla de proyecto: `03_PROYECTOS/_PLANTILLA_PROYECTO/`
- Caso de estudio Kaeser 2026: `03_PROYECTOS/ACTIVOS/2026_Kaeser_RecuperacionCalorCMPC/caso_estudio_metodologia.md`
