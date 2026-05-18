# Proceso Completo: Ingeniería de Proyectos
## Sistema de Recuperación de Calor — CMPC Papeles Cordillera
### WASAFF Consulting — Guía de Ejecución Paso a Paso

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Elaborado por:** Felipe F. González P., Ingeniero Mecánico, MSc Candidate  
**Cliente final:** CMPC Papeles Cordillera S.A. (Puente Alto, Región Metropolitana)  
**Intermediario:** Kaeser Compresores Chile SpA  

---

## ⚠️ CORRECCIÓN CRÍTICA DE CONTEXTO

> **Error identificado:** La propuesta preliminar asumió erróneamente *CMPC Planta Santa Fe* (celulosa kraft, Los Ángeles, Región del Biobío). La información que Kaeser entregó corresponde a **CMPC Papeles Cordillera S.A.** (papel reciclado, Puente Alto, Región Metropolitana). Esto cambia:
>
> | Aspecto | Santa Fe (asumido) | Cordillera (real) |
> |---------|-------------------|-------------------|
> | Ubicación | Los Ángeles, VIII Región | Puente Alto, RM |
> | Proceso | Celulosa BEK/BSK | Papel reciclado (85% fibra reciclada) |
> | Capacidad | 1,5 Mt/año pulpa | 330 kt/año packaging |
> | Contexto energético | Calderas de recuperación | **Cogeneración** Rolls-Royce Trent 60 (50 MW) + HRSG 60 t/h |
> | Tratamiento de aguas | Planta externa | **Planta propia de tratamiento de riles** |
> | Complejidad energética | Media | **Alta** (balance con cogeneración) |
> | Costo traslado | Alto (7–8 h desde Santiago) | Bajo (1 h desde Santiago) |
>
> **Consecuencia:** El análisis térmico previo es un **ejercicio de referencia** basado en datos genéricos de compresores Kaeser. Para Cordillera se requiere **rehacer el análisis con datos reales de la planta**.

---

## 1. FLUJO GENERAL DEL PROYECTO (Visión de Ingeniero de Proyectos)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FASE 0: PRE-CONTRACTUAL (ANTES de firmar)                              │
│  ├── Carta de presentación + Propuesta técnico-comercial                │
│  ├── Checklist de información requerida al cliente                      │
│  ├── NDA / Acuerdo de confidencialidad                                  │
│  └── Negociación y firma de contrato                                    │
├─────────────────────────────────────────────────────────────────────────┤
│  FASE 1: DIAGNÓSTICO Y LEVANTAMIENTO (Semana 1)                         │
│  ├── Solicitud de documentación base al cliente                         │
│  ├── Visita técnica a planta (opcional pero recomendada)                │
│  ├── Medición in-situ de parámetros críticos                            │
│  ├── Entrevistas con operaciones y mantenimiento                        │
│  └── Acta de entrega de información + Minuta de kick-off                │
├─────────────────────────────────────────────────────────────────────────┤
│  FASE 2: INGENIERÍA CONCEPTUAL (Semana 2)                               │
│  ├── Análisis de alternativas de recuperación de calor                  │
│  ├── Pre-dimensionamiento térmico                                       │
│  ├── Evaluación de integración con sistema de cogeneración existente    │
│  ├── Identificación de usuarios de calor (agua de proceso, calefacción) │
│  └── Informe conceptual con AAE (Análisis de Alternativas Económicas)   │
├─────────────────────────────────────────────────────────────────────────┤
│  FASE 3: INGENIERÍA DE DETALLE — MODELACIÓN (Semanas 3–5)               │
│  ├── Modelación estacionaria (ε-NTU + Darcy-Weisbach)                   │
│  ├── Modelación transitoria (RK45)                                      │
│  ├── Análisis de sensibilidad paramétrica                               │
│  ├── Validación numérica cruzada                                        │
│  └── Especificaciones técnicas para licitación de equipos               │
├─────────────────────────────────────────────────────────────────────────┤
│  FASE 4: DOCUMENTACIÓN Y ENTREGA (Semana 6)                             │
│  ├── Informe técnico completo (LaTeX/PDF)                               │
│  ├── Informe ejecutivo (LaTeX/PDF)                                      │
│  ├── Especificaciones técnicas formales                                 │
│  ├── Memoria de cálculo firmada                                         │
│  ├── Modelo computacional entregado (código fuente + datos)             │
│  └── Presentación oral al cliente                                       │
├─────────────────────────────────────────────────────────────────────────┤
│  FASE 5: POST-VENTA (Meses 2–3)                                         │
│  ├── Soporte por 30 días para consultas                                 │
│  ├── Capacitación opcional al equipo de mantenimiento                   │
│  └── Roadmap hacia gemelo digital (Nivel 3)                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. FASE 0: DOCUMENTOS PRE-CONTRACTUALES

### 2.1 ¿Qué documentos debe entregar WASAFF **antes** de iniciar?

| # | Documento | Formato | Destinatario | Propósito |
|---|-----------|---------|--------------|-----------|
| 1 | **Propuesta Técnico-Comercial** | PDF (10–15 pp.) + .tex | Kaeser + CMPC | Ofrecer servicios, alcance, precios |
| 2 | **Carta de Presentación / Cover Letter** | PDF (1 p.) | Kaeser + CMPC | Formalizar el interés, experiencia, diferenciadores |
| 3 | **Checklist de Información Requerida** | PDF/Excel | Kaeser → CMPC | Solicitar datos técnicos necesarios para cotizar con precisión |
| 4 | **Acuerdo de Confidencialidad (NDA)** | PDF firmable | Ambas partes | Proteger información técnica de CMPC |
| 5 | **Pre-cotización / Budgetary Estimate** | PDF (1–2 pp.) | Kaeser | Valor aproximado sin compromiso, para validar interés |
| 6 | **Minuta de Reunión Pre-contractual** | PDF | Ambas partes | Dejar constancia de lo acordado en reuniones iniciales |

### 2.2 Contenido mínimo de cada documento

#### Documento 1: Propuesta Técnico-Comercial (10–15 páginas)

**Estructura obligatoria para proyectos industriales en Chile:**

1. **Portada** (1 p.): Logo WASAFF, título, cliente, fecha, validez, inversión total destacada
2. **Carta de presentación** (1 p.): Contexto, propuesta de valor, experiencia relevante
3. **Resumen ejecutivo** (1 p.): Qué se propone, cuánto cuesta, cuánto demora, ROI estimado
4. **Antecedentes del cliente** (1 p.): Descripción de CMPC Papeles Cordillera, proceso, ubicación
5. **Descripción del sistema propuesto** (1–2 pp.): Concepto de recuperación de calor, diagrama de flujo conceptual
6. **Alcance de servicios** (2 pp.): Qué incluye, qué NO incluye, entregables detallados
7. **Metodología** (1 p.): Stack tecnológico, fases de trabajo, control de calidad
8. **Especificaciones técnicas preliminares** (1–2 pp.): IC, bomba, tuberías, instrumentación (indicativas, no finales)
9. **Inversión y condiciones comerciales** (2 pp.): Desglose, condiciones de pago, notas comerciales
10. **Plazo de ejecución** (1 p.): Cronograma de 6 semanas
11. **Equipo de trabajo** (½ p.): Perfiles, responsabilidades
12. **Condiciones generales** (1 p.): Propiedad intelectual, confidencialidad, limitación, aceptación
13. **Anexos** (2–3 pp.): Matriz de riesgos, comparativo de niveles, referencias

> **Regla de oro:** En Chile, una propuesta formal a un grupo como CMPC debe tener **mínimo 10 páginas**. Menos de eso se percibe como informal. Más de 20 páginas en fase pre-contractual es excesivo (esos detalles van en la ingeniería de detalle).

#### Documento 2: Checklist de Información Requerida (Data Request)

Este es **el documento más importante** antes de firmar. Sin esta información, cualquier cotización es una estimación con alto riesgo.

**Checklist — Información mínima requerida:**

**A. Datos de los compresores existentes:**
- [ ] Cantidad, modelo y año de fabricación de cada compresor Kaeser
- [ ] Potencia eléctrica nominal y de operación real (kW)
- [ ] Caudal de aceite lubricante (m³/h o L/min)
- [ ] Temperatura de aceite a la salida del compresor (°C) — **MEDIDA REAL, no catálogo**
- [ ] Temperatura de aceite a la entrada del compresor (°C)
- [ ] Presión de operación del circuito de aceite (bar)
- [ ] Horas anuales de operación por compresor (h/año)
- [ ] Esquema de operación (base, punta, standby)
- [ ] Esquema P&ID del circuito de aceite existente

**B. Datos del fluido frío (agua de proceso):**
- [ ] Temperatura de entrada disponible (°C) — **MEDIDA REAL**
- [ ] Temperatura objetivo de salida (°C) o rango aceptable
- [ ] Caudal disponible o demandado (m³/h)
- [ ] Calidad del agua (dureza, conductividad, pH) — para evaluar fouling
- [ ] Presión disponible en el punto de inyección (bar)
- [ ] Usuario final del agua calentada (¿qué proceso la consume?)

**C. Contexto de la planta:**
- [ ] Diagrama unifilar o P&ID de la red de agua de proceso existente
- [ ] Distancia aproximada entre sala de compresores y punto de uso del calor
- [ ] Disponibilidad de espacio físico para instalar IC, bomba, acumulador
- [ ] Tensión eléctrica disponible para bomba (V, Hz, fases)
- [ ] Esquema de cogeneración existente (si aplica para balance energético)
- [ ] Regulaciones ambientales o de eficiencia energética aplicables a la planta

**D. Restricciones y requisitos:**
- [ ] Normativa interna de CMPC para especificaciones técnicas
- [ ] Requisitos de seguridad (ej. área clasificada, IP mínimo)
- [ ] Código de colores o estándares de tubería internos
- [ ] Restricciones de horario para trabajos en planta

---

## 3. FASE 1: DIAGNÓSTICO Y LEVANTAMIENTO

### 3.1 Visita técnica a planta (día completo)

**Objetivo:** Validar datos de catálogo con mediciones reales y entender el contexto operativo.

| Horario | Actividad | Responsable CMPC | Entregable WASAFF |
|---------|-----------|------------------|-------------------|
| 08:00–09:00 | Reunión kick-off, presentación de equipos | Jefe de Mantenimiento | Minuta firmada |
| 09:00–11:00 | Recorrido sala de compresores | Operador de turno | Fotos, croquis, mediciones T aceite |
| 11:00–12:30 | Recorrido red de agua de proceso / punto de uso | Jefe de Proceso | Fotos, distancias estimadas |
| 12:30–13:30 | Almuerzo | — | — |
| 13:30–15:00 | Medición in-situ con termómetros infrarrojo / termopares | Operador | Registro de datos en formato estándar |
| 15:00–16:00 | Entrevista: modos de operación, fallas históricas | Mantenimiento + Operaciones | Notas estructuradas |
| 16:00–17:00 | Cierre, próximos pasos, compromisos | Todos | Acta de reunión con acciones |

### 3.2 Instrumentos de medición recomendados

| Parámetro | Instrumento | Precisión mínima | Modelo sugerido |
|-----------|-------------|------------------|-----------------|
| Temperatura aceite | Termómetro infrarrojo + termopar tipo K | ±1 °C | Fluke 62 MAX + Fluke 51 II |
| Temperatura agua | Termopar tipo K sumergible | ±0.5 °C | Fluke 51 II con sonda sumergible |
| Caudal agua | Caudalímetro ultrasónico portátil | ±2% | Flexim FLUXUS F601 |
| Presión | Manómetro digital | ±0.25% | Fluke 700G |
| Fotografía | Cámara digital / smartphone | — | Con georreferenciación si es posible |

### 3.3 Entregables de la Fase 1

1. **Acta de entrega de información** — Documento firmado por CMPC indicando qué información entregaron y en qué formato.
2. **Registro de mediciones in-situ** — Hoja de campo con datos crudos, firmada por el medidor.
3. **Minuta de kick-off** — Acuerdos, riesgos identificados, acciones pendientes, responsables.
4. **Informe de diagnóstico preliminar** (opcional, 3–5 pp.): Resumen de lo observado, datos validados vs. catálogo, riesgos identificados.

---

## 4. FASE 2: INGENIERÍA CONCEPTUAL

### 4.1 Análisis de alternativas

En CMPC Papeles Cordillera, el contexto de cogeneración cambia el análisis. No basta con "recuperar calor"; hay que preguntarse:

1. **¿Para qué se usa el calor recuperado?**
   - Opción A: Precalentar agua de proceso en la máquina de papel (mayor valor)
   - Opción B: Calefacción de edificios (menor valor, pero útil en invierno)
   - Opción C: Integración con sistema de cogeneración (complejo, requiere análisis de balance)
   - Opción D: Reducir carga de enfriamiento de aceite (ahorro indirecto)

2. **¿Cuándo se necesita el calor?**
   - El perfil de demanda de calor debe coincidir con el perfil de generación de calor de los compresores.
   - Si los compresores operan 24/7 pero el proceso de papel opera 16/5, se necesita acumulación térmica.

3. **¿Qué pasa con la cogeneración existente?**
   - Si la HRSG ya genera vapor a 16 bar / 213 °C, el calor de baja temperatura (60 °C aceite) puede no ser competitivo para vapor.
   - Pero puede ser ideal para precalentar agua de alimentación a la caldera o para lavado de felpas.

### 4.2 Análisis de Alternativas Económicas (AAE)

| Alternativa | Inversión estimada | Ahorro anual estimado | Payback | Viabilidad |
|-------------|-------------------|----------------------|---------|------------|
| A. Precalentar agua de proceso | Media | Alta | 1–2 años | **Preferida** |
| B. Calefacción edificios | Baja | Media | 2–3 años | Condicional |
| C. Integración con cogeneración | Alta | Alta | 3–5 años | Requiere estudio detallado |
| D. Solo reducir carga enfriamiento | Baja | Baja | 3–4 años | Menor valor |

### 4.3 Entregables de la Fase 2

1. **Informe conceptual** (5–8 pp.): Alternativas evaluadas, criterios de selección, recomendación fundamentada.
2. **Diagrama de flujo conceptual** (PFD simplificado): Dónde entra y sale el calor.
3. **Pre-dimensionamiento térmico**: Área estimada de IC, caudal de agua, potencia recuperable (rango).
4. **Análisis de riesgos preliminar** (matriz 2×2): Riesgos técnicos, operacionales, comerciales.

---

## 5. FASE 3: INGENIERÍA DE DETALLE — MODELACIÓN

Esta es la fase donde se ejecuta el trabajo técnico de Nivel 2 (MSc). Los 3 módulos de modelación ya fueron desarrollados en el entregable técnico anterior, pero **deben re-ejecutarse con datos reales de Cordillera**.

### 5.1 Módulo 1: Análisis Estacionario
- Framework OOP en Python con datos reales de compresores de Cordillera
- ε-NTU con propiedades termofísicas T-dependientes
- Darcy-Weisbach + Colebrook-White para red hidráulica
- 7 escenarios de operación (mínimo a máximo)
- **Entregables:** Código fuente, JSON, CSV, figuras PNG

### 5.2 Módulo 2: Análisis Transitorio
- Modelo lumped-capacity con RK45
- Eventos: arranque frío, pérdida de compresor, backup startup
- Cuantificación τ₉₅%
- **Entregables:** Código fuente, JSON, CSV, figuras PNG

### 5.3 Módulo 3: Análisis de Sensibilidad
- Barrido paramétrico ±10%
- Tornado diagrams + curvas de sensibilidad
- Ranking de incertidumbre
- **Entregables:** Código fuente, JSON, CSV, figuras PNG

### 5.4 Validación cruzada
- Comparación ε-NTU vs. LMTD
- Comparación Darcy-Weisbach vs. Swamee-Jain
- Consistencia asintótica transitoria vs. estacionario

### 5.5 Especificaciones técnicas para licitación
- Hoja de especificación del intercambiador (formato TEMA)
- Hoja de especificación de la bomba (formato API 610 simplificado)
- Lista de materiales (BOM) preliminar
- Plan de instrumentación (tagging)

---

## 6. FASE 4: DOCUMENTACIÓN Y ENTREGA

### 6.1 Documentos finales obligatorios

| # | Documento | Formato | Páginas | Firmado |
|---|-----------|---------|---------|---------|
| 1 | **Informe Técnico Completo** | PDF + .tex | 20–25 | Sí (I.M. Felipe F. González P.) |
| 2 | **Informe Ejecutivo** | PDF + .tex | 3–5 | Sí |
| 3 | **Memoria de Cálculo** | PDF + código fuente | 15–20 | Sí |
| 4 | **Especificaciones Técnicas para Licitación** | PDF + .docx | 5–8 | Sí |
| 5 | **Modelo Computacional** | Git repo + README | — | — |
| 6 | **Presentación Oral** | PPT/PDF | 15–20 diapositivas | — |
| 7 | **Acta de Entrega-Aceptación** | PDF firmable | 1 | Firmado por ambas partes |

### 6.2 Estructura del Informe Técnico Completo

1. Portada + Hoja de control de revisiones
2. Índice
3. Resumen ejecutivo
4. Introducción (antecedentes, objetivos, alcance)
5. Marco teórico (ε-NTU, Darcy-Weisbach, RK45, sensibilidad)
6. Descripción del sistema y datos de entrada
7. Metodología de modelación
8. Resultados — Análisis estacionario
9. Resultados — Análisis transitorio
10. Resultados — Análisis de sensibilidad
11. Validación del modelo
12. Especificaciones técnicas del sistema propuesto
13. Conclusiones y recomendaciones
14. Referencias bibliográficas
15. Anexos (código fuente, datos brutos, nomenclatura)

---

## 7. FASE 5: POST-VENTA

| Actividad | Plazo | Costo |
|-----------|-------|-------|
| Soporte técnico por consultas sobre entregables | 30 días | Incluido |
| Capacitación al equipo de mantenimiento (2–3 h) | Dentro de 30 días | Incluido |
| Actualización del modelo con datos de post-instalación | Acordar aparte | UF 5–10 |
| Roadmap hacia gemelo digital (informe) | Acordar aparte | UF 8–15 |

---

## 8. ANÁLISIS DE PRECIOS AJUSTADO (CMPC Papeles Cordillera)

### 8.1 Factores que ajustan el precio respecto a la propuesta genérica

| Factor | Impacto | Ajuste |
|--------|---------|--------|
| **Complejidad energética** (cogeneración existente) | Requiere análisis de balance energético más sofisticado | +$20–40M |
| **Traslado** (Puente Alto vs. Los Ángeles) | 1 h vs. 7–8 h de viaje | –$15–25M |
| **Cliente corporativo** (CMPC grupo) | Requiere más documentación, procesos de aprobación | +$10–20M |
| **Planta madura** (desde 1920) | Infraestructura antigua, puede requerir adaptaciones | +$10–15M |
| **Contexto de sostenibilidad** | Posibilidad de financiamiento verde / fondos de eficiencia | –$0 (pero mejora justificación) |
| **Kaeser como intermediario** | Coordination overhead, posible fee de Kaeser | +$10–15M |

### 8.2 Propuesta de inversión ajustada

| Concepto | HH | Valor CLP |
|----------|-----|-----------|
| **1. Ingeniería y Modelación** | | |
| Análisis estacionario (ε-NTU + hidráulica) | 48 | $ 76.800.000 |
| Análisis transitorio (RK45) | 32 | $ 51.200.000 |
| Análisis de sensibilidad paramétrica | 20 | $ 32.000.000 |
| Validación numérica cruzada | 12 | $ 19.200.000 |
| Análisis de integración con cogeneración | 16 | $ 25.600.000 |
| **2. Documentación** | | |
| Informe técnico completo (LaTeX/PDF) | 32 | $ 51.200.000 |
| Informe ejecutivo (LaTeX/PDF) | 12 | $ 19.200.000 |
| Especificaciones técnicas para licitación | 24 | $ 38.400.000 |
| Memoria de cálculo firmada | 16 | $ 25.600.000 |
| **3. Gestión y Coordinación** | | |
| Reuniones técnicas (5 reuniones × 2 h) | 20 | $ 32.000.000 |
| Gestión de proyecto + Kaeser | 24 | $ 38.400.000 |
| Visita técnica a planta (incluye traslado) | 16 | $ 25.600.000 |
| Presentación de resultados al cliente | 12 | $ 19.200.000 |
| **4. Post-venta** | | |
| Soporte 30 días + capacitación | 16 | $ 25.600.000 |
| **SUBTOTAL NIVEL 2 AJUSTADO** | **300** | **$ 480.000.000** |

**Tarifa horaria:** $ 160.000/hora (4,05 UF/hr a mayo 2026)

### 8.3 Rango recomendado de negociación

| Escenario | Inversión | Justificación |
|-----------|-----------|---------------|
| **Mínimo aceptable** | $ 400.000.000 | Sin visita técnica, sin análisis de cogeneración, 4 escenarios |
| **Estándar (recomendado)** | $ 480.000.000 | Incluye todo lo anterior, 7 escenarios, visita técnica, integración con cogeneración |
| **Avanzado** | $ 650.000.000 | Incluye validación FEniCS 2D, análisis de fouling, roadmap gemelo digital |

> **Benchmark:** El proyecto 2023 se cobró $ 1.000.000 (~USD 1.100). Eso fue una **consultoría básica** sin modelación numérica. El valor justificado para ingeniería de detalle con modelación avanzada en una planta con cogeneración está entre $ 400–650M, dependiendo del alcance final acordado.

### 8.4 Condiciones de pago recomendadas

| Hito | % | Monto CLP | Condición de liberación |
|------|---|-----------|------------------------|
| Anticipo contra firma + entrega de información base por parte del cliente | 25% | $ 120.000.000 | Contrato firmado + checklist de información completado |
| Entrega Fase 2 (informe conceptual + AAE aprobado) | 25% | $ 120.000.000 | Aprobación formal por CMPC |
| Entrega Módulos 1–2 (estacionario + transitorio) | 25% | $ 120.000.000 | Aprobación formal por CMPC |
| Entrega final (Módulo 3 + informes + presentación) | 20% | $ 96.000.000 | Aceptación formal por CMPC |
| Cierre (acta firmada, 30 días post-entrega) | 5% | $ 24.000.000 | Sin observaciones en período de garantía |

---

## 9. TEMPLATE DE CORREO ELECTRÓNICO

### 9.1 Correo inicial a Kaeser (presentación de propuesta)

**Asunto:** Propuesta Técnico-Comercial — Sistema de Recuperación de Calor Aceite de Compresores | CMPC Papeles Cordillera

```
Estimados [Nombre del contacto en Kaeser]:

Por medio de la presente, WASAFF Consulting envía adjunta la propuesta técnico-comercial 
para el desarrollo de la Ingeniería de Detalle del Sistema de Recuperación de Calor del 
Aceite Lubricante de Compresores Kaeser en CMPC Papeles Cordillera.

ADJUNTOS:
1. Propuesta_Tecnico_Comercial_WASAFF_CMPC_Cordillera_2026.pdf (15 pp.)
2. Checklist_Informacion_Requerida_CMPC_Cordillera.xlsx
3. NDA_WASAFF_CMPC_v1.pdf (para firma, si aplica)

PUNTOS CLAVE DE LA PROPUESTA:
• Nivel de servicio: Nivel 2 — Modelación Numérica Avanzada (ε-NTU, RK45, sensibilidad)
• Inversión: CLP $480.000.000 + IVA (ajustable según alcance final)
• Plazo: 6 semanas desde entrega de información base + firma de contrato
• Diferenciador: Entrega de modelo computacional reutilizable + roadmap a gemelo digital

PRÓXIMOS PASOS SUGERIDOS:
1. Revisión interna de Kaeser de la propuesta (5 días hábiles)
2. Reunión técnica conjunta Kaeser + WASAFF + CMPC para validar alcance
3. Entrega de información base por parte de CMPC (checklist adjunto)
4. Ajuste de propuesta si es necesario + firma de contrato

Quedamos atentos a sus comentarios y disponibles para una reunión presencial 
o virtual la próxima semana.

Atentamente,

Felipe F. González P.
Ingeniero Mecánico, MSc Candidate
Director Técnico, WASAFF Consulting
Tel: +56 9 XXXX XXXX
Email: felipe@wasaff.cl
Web: www.wasaff.cl

---
WASAFF Consulting
Ingeniería Térmica y Modelación Computacional Avanzada
```

### 9.2 Correo de seguimiento (si no responden en 5 días)

**Asunto:** Seguimiento — Propuesta Recuperación de Calor CMPC Cordillera | WASAFF

```
Estimados [Nombre]:

Me dirijo a ustedes para hacer seguimiento de la propuesta enviada el [fecha].

Entiendo que estos procesos de revisión interna toman tiempo, especialmente en 
proyectos con múltiples stakeholders (Kaeser + CMPC).

Para facilitar la decisión, quedo a disposición para:
• Una reunión de 30 minutos para resolver dudas técnicas
• Ajustar el alcance si el presupuesto actual excede lo aprobado
• Dividir el proyecto en 2 fases (conceptual + detalle) para distribuir el gasto

Quedo atento a su retroalimentación.

Saludos cordiales,

Felipe F. González P.
```

---

## 10. NORMATIVA APLICABLE

### 10.1 Normativa Chilena

| Código | Título | Aplicación al proyecto |
|--------|--------|------------------------|
| **D.S. N° 132** | Reglamento de Seguridad en Instalaciones Eléctricas | Diseño de instalación eléctrica de bomba, VFD, instrumentación |
| **D.S. N° 594** | Ordenanza General de Seguridad y Salud en el Trabajo | Seguridad en trabajos en planta (visita técnica, futura instalación) |
| **Ley 19.300** | Ley de Bases del Medio Ambiente | Si el proyecto califica como modificación significativa (generalmente no, pero verificar) |
| **NCh Elec 4/2003** | Instalaciones de Consumo en Baja Tensión | Conexión eléctrica de bomba y VFD |
| **NCh 432/1.Of2003** | Hidráulica — Diseño de instalaciones sanitarias | Red de agua fría/caliente si se conecta a red sanitaria |
| **NCh 2361** | Aislamiento térmico | Especificación de aislamiento de tuberías y tanque |
| **NCh 353/1** | Calderas — Requisitos de diseño y construcción | Si se integra con sistema de vapor (referencia) |

### 10.2 Normativa Internacional

| Código | Título | Aplicación al proyecto |
|--------|--------|------------------------|
| **ASME BPVC Sec. VIII Div. 1** | Boiler and Pressure Vessel Code | Diseño del intercambiador de calor como recipiente a presión |
| **TEMA 11ª Ed. (2024)** | Standards of Tubular Exchanger Manufacturers Association | Especificación y diseño del intercambiador (aunque sea de placas, TEMA es referencia) |
| **API Std 660/661** | Shell-and-Tube Heat Exchangers / Air-Cooled Heat Exchangers | Referencia adicional para especificaciones |
| **ISO 5167** | Measurement of fluid flow by means of pressure differential devices | Caudalímetros en instrumentación propuesta |
| **IEC 60529** | Degrees of protection provided by enclosures (IP Code) | IP rating de instrumentos y equipos eléctricos |
| **ISO 4414 / EN 983** | Pneumatic fluid power — General rules and safety requirements | Red de aire comprimido existente (referencia) |
| **AD 2000-Merkblatt** | German Pressure Vessel Code | Alternativa europea a ASME para recipientes a presión |
| **EN 13445** | Unfired pressure vessels | Alternativa europea a ASME |

### 10.3 Normas de sostenibilidad y eficiencia energética (relevantes para CMPC)

| Código | Título | Aplicación |
|--------|--------|------------|
| **ISO 50001** | Energy management systems | CMPC probablemente certificada; el proyecto contribuye a objetivos de eficiencia |
| **ISO 14001** | Environmental management systems | CMPC certificada; el proyecto reduce huella de carbono |
| **GHG Protocol** | Greenhouse Gas Protocol | El proyecto puede contabilizar reducción de emisiones Scope 2 |

---

## 11. CHECKLIST DE DOCUMENTOS POR FASE

### Fase 0 (Pre-contractual)
- [ ] Propuesta técnico-comercial finalizada y revisada
- [ ] Checklist de información requerida enviado al cliente
- [ ] NDA firmado por ambas partes (si aplica)
- [ ] Contrato firmado
- [ ] Orden de compra / anticipo pagado

### Fase 1 (Diagnóstico)
- [ ] Información base recibida del cliente (checklist completado)
- [ ] Visita técnica realizada (si aplica)
- [ ] Mediciones in-situ registradas y firmadas
- [ ] Minuta de kick-off firmada
- [ ] Acta de entrega de información firmada

### Fase 2 (Conceptual)
- [ ] Informe conceptual aprobado por CMPC
- [ ] AAE (Análisis de Alternativas Económicas) aprobado
- [ ] Definición de alternativa seleccionada firmada

### Fase 3 (Detalle)
- [ ] Módulo 1 (estacionario) ejecutado y validado internamente
- [ ] Módulo 2 (transitorio) ejecutado y validado internamente
- [ ] Módulo 3 (sensibilidad) ejecutado y validado internamente
- [ ] Especificaciones técnicas para licitación completadas
- [ ] Revisión interna de WASAFF realizada

### Fase 4 (Entrega)
- [ ] Informe técnico completo entregado
- [ ] Informe ejecutivo entregado
- [ ] Memoria de cálculo firmada entregada
- [ ] Modelo computacional entregado (Git repo)
- [ ] Presentación oral realizada
- [ ] Acta de entrega-aceptación firmada

### Fase 5 (Post-venta)
- [ ] Período de soporte 30 días cumplido
- [ ] Capacitación realizada (si aplica)
- [ ] Cierre administrativo completado

---

## 12. LECCIONES APRENDIDAS DEL PROYECTO 2023 (YA APLICADAS)

| Lección 2023 | Corrección en esta propuesta 2026 |
|--------------|-----------------------------------|
| Cobró $ 1.000.000 (subvalorado) | Propuesta de $ 480.000.000 justificada por modelación avanzada |
| No incluyó modelación numérica | Incluye ε-NTU, RK45, sensibilidad paramétrica |
| No verificó temperatura de aceite in-situ | Checklist de información requerida incluye medición real obligatoria |
| No entregó modelo computacional | Entrega código fuente Python documentado + repositorio Git |
| No analizó integración con planta | Incluye análisis de integración con cogeneración existente |
| Documentación mínima | Informe técnico 20+ pp. + ejecutivo + memoria de cálculo |

---

## 13. PRÓXIMOS PASOS INMEDIATOS PARA WASAFF

1. [ ] **Corregir la propuesta existente**: Reemplazar "Santa Fe" por "Cordillera", ajustar contexto de cogeneración, revisar precios.
2. [ ] **Crear checklist de información requerida** en formato Excel entregable.
3. [ ] **Identificar contacto clave en Kaeser**: ¿Quién es el ejecutivo de cuenta que gestiona la relación con CMPC?
4. [ ] **Identificar contacto clave en CMPC**: ¿Jefe de Mantenimiento? ¿Jefe de Proceso? ¿Jefe de Proyectos?
5. [ ] **Agendar reunión de presentación**: Idealmente presencial en oficinas de Kaeser o CMPC.
6. [ ] **Preparar NDA**: Si CMPC requiere confidencialidad antes de entregar datos.
7. [ ] **Definir alcance final**: ¿Es solo ingeniería de detalle? ¿Incluye ingeniería de construcción? ¿Incluye supervisión de instalación?

---

*Documento elaborado por WASAFF Consulting. Versión 1.0. Mayo 2026.*
*Uso interno y para cliente. No distribuir sin autorización.*
