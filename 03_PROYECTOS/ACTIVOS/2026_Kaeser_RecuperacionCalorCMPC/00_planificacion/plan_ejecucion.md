# Plan de Ejecución del Proyecto
## Sistema de Recuperación de Calor — CMPC Papeles Cordillera S.A.

**Proyecto:** 2026_Kaeser_RecuperacionCalorCMPC  
**Cliente final:** CMPC Papeles Cordillera S.A. (Puente Alto, RM)  
**Intermediario:** Kaeser Compresores Chile SpA  
**Consultor:** WASAFF Consulting — Felipe Wasaff  
**Fecha de inicio Fase 0:** 18 de mayo de 2026  
**Fecha objetivo de término:** 30 de junio de 2026 (6 semanas desde kick-off)  

---

## 1. RESUMEN EJECUTIVO DEL PLAN

Este documento define la hoja de ruta para la ejecución completa del proyecto de ingeniería de detalle del sistema de recuperación de calor del aceite lubricante de compresores Kaeser en CMPC Papeles Cordillera S.A.

**Alcance contratado:** Nivel 2 — Modelación Numérica Avanzada  
**Inversión objetivo:** CLP $480.000.000 + IVA  
**Metodología:** 5 fases secuenciales con hitos de pago  

---

## 2. ESTRUCTURA DEL PROYECTO (Carpetas)

```
2026_Kaeser_RecuperacionCalorCMPC/
├── 00_planificacion/           ← Planes, cronogramas, riesgos, actas
│   ├── plan_ejecucion.md
│   ├── cronograma.md
│   ├── registro_riesgos.md
│   └── actas/
├── 01_datos/                   ← Datos de entrada (JSON, Excel, PDFs)
│   ├── fichas_kaeser.json
│   ├── mediciones_in_situ/
│   └── documentacion_cliente/
├── 02_analisis/                ← Código fuente Python
│   ├── sistema.py
│   ├── estacionario.py
│   ├── transitorios.py
│   ├── sensibilidad.py
│   └── validacion_fenics_2d.py
├── 03_resultados/              ← Outputs de modelación
│   ├── figuras/
│   ├── tablas/
│   └── json/
├── 04_informe/                 ← Documentos LaTeX/PDF
│   ├── informe_tecnico.tex/pdf
│   ├── informe_ejecutivo.tex/pdf
│   └── propuesta_comercial.tex/pdf
├── 05_gestion/                 ← Procesos, normativa, lecciones
│   └── proceso_completo_ing_proyectos.md
└── 06_entregables_fase0/       ← Documentos pre-contractuales
    ├── propuesta_comercial_corregida/
    ├── checklist_informacion/
    ├── nda/
    └── carta_presentacion/
```

---

## 3. CRONOGRAMA DETALLADO

### FASE 0: PRE-CONTRACTUAL (Semana 0 — 18–24 mayo 2026)

| Día | Actividad | Responsable | Entregable | Estado |
|-----|-----------|-------------|------------|--------|
| 0 | Crear estructura de carpetas + plan de ejecución | WASAFF | plan_ejecucion.md | ✅ En ejecución |
| 0 | Corregir propuesta comercial (Santa Fe → Cordillera) | WASAFF | propuesta_comercial_v2.tex/pdf | ⏳ Pendiente |
| 0 | Crear checklist de información requerida | WASAFF | checklist_informacion.xlsx | ⏳ Pendiente |
| 0 | Crear NDA template | WASAFF | nda_template.pdf | ⏳ Pendiente |
| 0 | Crear carta de presentación | WASAFF | carta_presentacion.pdf | ⏳ Pendiente |
| 1–2 | Revisión interna de documentos Fase 0 | WASAFF | — | ⏳ Pendiente |
| 3 | Enviar correo a Kaeser con adjuntos | WASAFF | Correo + 3 adjuntos | ⏳ Pendiente |
| 3–7 | Esperar respuesta / agendar reunión | Kaeser/CMPC | — | ⏳ Pendiente |
| 7 | Firma de contrato + pago anticipo (25%) | Ambas partes | Contrato firmado + OC | ⏳ Pendiente |

### FASE 1: DIAGNÓSTICO Y LEVANTAMIENTO (Semana 1 — Kick-off)

| Día | Actividad | Responsable | Entregable |
|-----|-----------|-------------|------------|
| 1 | Kick-off meeting (presencial o virtual) | Todos | Minuta firmada |
| 1–2 | Entrega de información base por CMPC | CMPC | Checklist completado |
| 2–3 | Revisión de documentación recibida | WASAFF | Análisis de gaps |
| 3–5 | Visita técnica a planta Cordillera (Puente Alto) | WASAFF + CMPC | Registro de mediciones |
| 5 | Entrevistas con operaciones y mantenimiento | WASAFF | Notas estructuradas |
| 5 | Cierre Fase 1 | Todos | Acta de entrega de info + Minuta |

### FASE 2: INGENIERÍA CONCEPTUAL (Semana 2)

| Día | Actividad | Entregable |
|-----|-----------|------------|
| 1–2 | Análisis de alternativas de recuperación de calor | Matriz de alternativas |
| 2–3 | Pre-dimensionamiento térmico | Cálculos preliminares |
| 3–4 | Evaluación de integración con cogeneración | Análisis de balance energético |
| 4–5 | Informe conceptual + AAE | Informe conceptual aprobado |
| 5 | Hito de pago 2 (25%) | — |

### FASE 3: INGENIERÍA DE DETALLE (Semanas 3–5)

| Semana | Actividad | Entregable |
|--------|-----------|------------|
| 3 | Módulo 1: Análisis estacionario (ε-NTU + Darcy-Weisbach) | JSON, CSV, figuras |
| 3 | Módulo 2: Análisis transitorio (RK45) | JSON, CSV, figuras |
| 4 | Módulo 3: Análisis de sensibilidad paramétrica | Tornado + curvas |
| 4 | Validación numérica cruzada | Informe de validación |
| 4 | Especificaciones técnicas para licitación | Hojas de especificación |
| 5 | Hito de pago 3 (25%) | — |

### FASE 4: DOCUMENTACIÓN Y ENTREGA (Semana 6)

| Día | Actividad | Entregable |
|-----|-----------|------------|
| 1–2 | Redacción informe técnico completo | PDF 20–25 pp. |
| 2 | Redacción informe ejecutivo | PDF 3–5 pp. |
| 2–3 | Memoria de cálculo firmada | PDF 15–20 pp. |
| 3 | Empaquetado modelo computacional | Git repo + README |
| 4 | Presentación oral al cliente | PPT/PDF 15–20 diapositivas |
| 5 | Acta de entrega-aceptación | Documento firmado |
| 5 | Hito de pago 4 (20%) | — |

### FASE 5: POST-VENTA (Meses 2–3)

| Actividad | Plazo | Hito de pago 5 (5%) |
|-----------|-------|---------------------|
| Soporte 30 días | 30 días post-entrega | Al cierre |
| Capacitación opcional | Dentro de 30 días | — |
| Roadmap gemelo digital | Acordar aparte | — |

---

## 4. RECURSOS Y RESPONSABILIDADES

| Rol | Nombre | Responsabilidades |
|-----|--------|-------------------|
| **Director Técnico** | Felipe Wasaff | Modelación, informes, validación, presentación |
| **Gestor de Proyecto** | Felipe Wasaff | Cronograma, comunicación con cliente, pagos |
| **Especialista Térmico** | Felipe Wasaff | ε-NTU, transitorios, sensibilidad |
| **Analista Numérico** | Felipe Wasaff | FEniCS 2D, validación, código |

**Total HH presupuestadas:** 300 horas  
**Tarifa:** $160.000/hora  
**Inversión total:** $480.000.000 + IVA  

---

## 5. HITOS DE PAGO Y LIBERACIÓN

| Hito | % | Monto CLP | Condición de liberación |
|------|---|-----------|------------------------|
| 1. Anticipo + info base | 25% | $120.000.000 | Contrato firmado + checklist completado |
| 2. Informe conceptual aprobado | 25% | $120.000.000 | Aprobación formal por CMPC |
| 3. Módulos 1–2 entregados | 25% | $120.000.000 | Aprobación formal por CMPC |
| 4. Entrega final + presentación | 20% | $96.000.000 | Aceptación formal por CMPC |
| 5. Cierre (30 días post-entrega) | 5% | $24.000.000 | Sin observaciones en garantía |

---

## 6. REGISTRO DE RIESGOS INICIAL

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| R01 | CMPC no entrega información base a tiempo | Media | Alto | Checklist detallado, seguimiento semanal |
| R02 | Temperatura de aceite real difiere significativamente de catálogo | Alta | Alto | Medición in-situ obligatoria en Fase 1 |
| R03 | Integración con cogeneración es más compleja de lo esperado | Media | Alto | Incluir análisis de balance en Fase 2 |
| R04 | Kaeser tiene expectativas de alcance diferentes a CMPC | Media | Medio | Reunión conjunta Kaeser+CMPC+WASAFF en kick-off |
| R05 | Retrasos en aprobaciones internas de CMPC | Media | Medio | Definir tiempos de respuesta en contrato |
| R06 | Cambio de requisitos durante ejecución | Baja | Alto | Procedimiento formal de change order |

---

## 7. COMUNICACIÓN Y GOBIERNO

| Canal | Frecuencia | Participantes | Propósito |
|-------|-----------|---------------|-----------|
| Reuniones técnicas | Semanal (1 h) | WASAFF + Kaeser + CMPC | Avance, bloqueos, decisiones |
| Reporte de avance | Semanal (email) | Todos | Resumen de progreso vs. plan |
| Reunión de cierre | Única (2 h) | Todos | Presentación final, aceptación |
| Soporte post-venta | On-demand (30 días) | WASAFF + CMPC | Consultas sobre entregables |

---

## 8. CRITERIOS DE ACEPTACIÓN

La entrega será considerada aceptada cuando:

1. ✅ Todos los documentos de la Fase 4 estén entregados en formato digital (PDF + fuente)
2. ✅ El modelo computacional ejecute sin errores en el entorno del cliente
3. ✅ La presentación oral haya sido realizada y aprobada
4. ✅ No existan observaciones críticas sin resolver dentro de los 10 días hábiles post-entrega
5. ✅ El Acta de Entrega-Aceptación haya sido firmada por ambas partes

---

## 9. CONTROL DE VERSIONES

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 18/05/2026 | Felipe Wasaff | Creación inicial del plan |

---

*Documento confidencial. Uso exclusivo de WASAFF Consulting y CMPC Papeles Cordillera S.A.*
