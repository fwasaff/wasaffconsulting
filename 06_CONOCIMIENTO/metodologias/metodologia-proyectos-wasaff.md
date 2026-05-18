# Metodología de Proyectos Wasaff Consulting
## Ciclo completo: Primer contacto → Post-venta
### Versión 1.0 — 2026-05-18

---

## Filosofía

Wasaff Consulting no vende "horas de ingeniero". Vende **certeza técnica**.
El cliente no paga por un modelo de simulación; paga por la **capacidad de tomar una decisión de inversión o diseño con riesgo cuantificado**.

> *"Un modelo mal hecho es más peligroso que ningún modelo. Un modelo bien hecho, bien explicado y bien entregado, es un activo estratégico para el cliente."*

---

## Las 5 Fases del Proyecto

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   FASE 0    │ → │   FASE 1    │ → │   FASE 2    │ → │   FASE 3    │ → │   FASE 4    │
│ Diagnóstico │   │  Propuesta  │   │  Ejecución  │   │   Entrega   │   │  Post-venta │
│  y Venta    │   │   Formal    │   │   Técnica   │   │   Formal    │   │  y Expansión│
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
   45 min – 2h      2 – 5 días        1 – 6 semanas      1 – 3 días       Continuo
   GRATIS           COBRABLE          COBRADO            COBRADO          GRATIS/RETAINER
```

---

## FASE 0 — Diagnóstico y Venta Consultiva

### Objetivo
Determinar si el problema del cliente es **tratable con simulación computacional** y si el cliente **tiene presupuesto y decisión** para contratar.

No es una reunión técnica. Es una **reunión de negocio con lentes técnicos**.

### Regla de oro de la primera reunión
**Tú hablas 30% del tiempo. El cliente habla 70%.**

Tu trabajo no es impresionar con ecuaciones. Es escuchar hasta que el cliente te diga exactamente cuánto le cuesta el problema que no resuelve.

### Las 4 Preguntas Diagnósticas (obligatorias)

| # | Pregunta | Qué descubres | Cómo usar la respuesta |
|---|----------|---------------|------------------------|
| 1 | *"¿Qué decisión concreta necesitan tomar con este análisis?"* | Si tienen un problema definido o solo curiosidad técnica | Sin decisión = no hay proyecto. Solo hay presupuesto si hay consecuencia de no actuar. |
| 2 | *"¿Qué datos de proceso tienen disponibles hoy?"* | Nivel de madurez del cliente y riesgo técnico | Si no tienen datos, el proyecto debe incluir una fase de caracterización (más caro, más lento). |
| 3 | *"¿Cuál es el plazo real? ¿Hay algo que se detiene si esto no está listo para esa fecha?"* | Si el plazo es real o inventado | Plazo inventado = negociación de precio. Plazo real = prima de urgencia justificada. |
| 4 | *"¿Tienen presupuesto definido o necesitan una cifra para gestionar la aprobación interna?"* | Si el comprador es decisor o solo un filtro | Si necesitan cifra para "gestionar", debes dar un rango ancho en la reunión y la propuesta formal después. |

### Preguntas técnicas exploratorias (según tipo de proyecto)

**Simulación térmica/hidráulica:**
- "¿Han intentado resolver esto con reglas de dedo o tablas antes? ¿Qué resultado obtuvieron?"
- "¿Tienen mediciones de temperatura/caudal/presión en operación actual?"
- "¿El sistema ya existe o está en diseño?" (existente = validación con datos; diseño = predicción con incertidumbre)

**Dinámica molecular / materiales:**
- "¿Hay resultados experimentales con los que contrastar? ¿Quién los hizo?"
- "¿Quieren publicar o solo obtener el número para diseño?" (publicación = más rigor, más tiempo)

**Análisis de datos masivos:**
- "¿Los datos están en un solo sistema o hay que unificar fuentes?"
- "¿Quién en su equipo sabe qué significa cada columna del dataset?"

### Habilidades blandas — Fase 0

#### 1. El lenguaje del cliente (traducción bidireccional)
El cliente dice: *"Necesitamos que nos digan si el intercambiador aguanta."*
Tú escuchas: *"Necesitan un análisis de esfuerzos térmicos con validación normativa, probablemente ASME VIII Div.1, porque alguien en su equipo ya dudó del diseño y hay dinero en juego."*

**Nunca uses jerga sin traducir.**
- ❌ "Vamos a hacer un análisis ε-NTU con correlaciones de Gnielinski para obtener el coeficiente convectivo."
- ✅ "Vamos a calcular cuánto calor realmente se transfiere en cada escenario de operación, usando las mismas ecuaciones que usan los fabricantes de intercambiadores para dimensionarlos."

#### 2. Anchor pricing en la primera reunión
Si el cliente pide una cifra en la primera reunión:
- Nunca des un número exacto.
- Usa rangos de mercado: *"Proyectos de esta complejidad suelen estar entre $2.500.000 y $5.000.000, dependiendo del nivel de detalle del informe y si incluye validación con datos de campo."*
- Observa la reacción. Si no se inmuta, estás por debajo del presupuesto. Si se asusta, educa sobre el valor.

#### 3. La objeción más común: "Es caro"
Respuesta estándar:
> *"Entiendo. Para contextualizar: ¿sabe cuánto cuesta un día de parada no planificada de esta planta? ¿O cuánto pagarían por un intercambiador sobredimensionado que no necesitan? Lo que hacemos es reducir la incertidumbre de esas decisiones de 7 cifras a un margen cuantificado. El costo de este análisis es típicamente el 0.5% del valor de la decisión que va a tomar con él."*

**Nunca justifiques el precio con tus costos.** Justifícalo con el valor del error que evitas.

#### 4. Cierre de la reunión diagnóstica
Si el proyecto es viable:
1. Resumen verbal: *"Entonces, para confirmar: ustedes necesitan [X], para decidir [Y], con datos disponibles [Z], antes del [fecha]. Les envío una propuesta formal en 48-72 horas con alcance, entregables, plazo y precio fijo."*
2. Email de seguimiento en las próximas 4 horas.
3. Si no es viable: sé honesto. *"Este problema no requiere simulación. Les sugiero hablar con [referencia] que puede resolverlo más rápido y barato."* → El cliente te recordará como confiable.

---

## FASE 1 — Propuesta Formal

### Estructura de la propuesta (máximo 4 páginas)

Las grandes firmas no envían propuestas de 20 páginas. Envían documentos cortos, densos y sin desperdicio.

**Página 1: Carta de presentación (1 párrafo)**
> *"Respetado [Nombre]: A continuación presentamos nuestra propuesta técnica y comercial para [problema concreto]. El alcance, entregables y condiciones están detallados en las páginas siguientes. Estamos disponibles para una reunión de aclaraciones cuando lo estime conveniente."*

**Página 2: Alcance y Metodología**
- ¿Qué se modela? (1 párrafo con figura conceptual)
- ¿Qué NO se modela? (lista explícita — evita scope creep)
- Supuestos clave (si cambian, cambia el precio)
- Metodología (referencia normativa o paper de autoridad)

**Página 3: Entregables, Hitos y Cronograma**

| Hito | Entregable | Fecha | Pago |
|------|-----------|-------|------|
| 1 — Kickoff | Reunión de alineación y validación de datos | D+2 | 40% |
| 2 — Preliminar | Resultados intermedios + revisión conjunta | D+10 | 30% |
| 3 — Final | Informe + código + presentación ejecutiva | D+20 | 30% |

**Página 4: Inversión y Condiciones**
- Precio final (un solo número, sin desglose de horas)
- Condiciones de pago (3 cuotas estándar)
- Condiciones de cambio de alcance
- Vigencia de la oferta (30 días)
- Firma y datos legales

### Reglas de precio en la propuesta

1. **Nunca desglose horas.** El cliente no compra horas; compra resultado. Un desglose de horas invita a micromanagement.
2. **Un solo número.** Si hay opciones, máximo 2: "Estándar" y "Expedido" (con prima de urgencia).
3. **Anchor high.** Si estimas $3.500.000, cotiza $4.200.000. Negociar para bajar a $3.800.000 se siente como un descuento para el cliente, pero tú ganas más.
4. **Incluye contingencia del 15-20%** dentro del precio. No como ítem aparte.

### El email que acompaña la propuesta

Asunto: *Propuesta técnica — [Nombre corto proyecto] | Wasaff Consulting*

Cuerpo:
> *[Nombre],*
> *Adjunto propuesta formal para [problema].*
> *Dos puntos importantes:*
> *1. La vigencia de esta oferta es de 30 días, ya que los plazos y disponibilidad del equipo pueden cambiar.*
> *2. Incluimos una reunión de revisión intermedia (hito 2) para que ustedes validen los resultados antes de que generemos el informe final. Esto evita sorpresas.*
> *Quedo atento a sus comentarios o a una reunión de aclaraciones.*
> *Saludos,*
> *Felipe Wasaff*

---

## FASE 2 — Ejecución Técnica

### Principios de ejecución

1. **Visible progress.** El cliente no debe pasar más de 5 días sin saber qué está pasando. Un email de 2 líneas cada martes: *"Esta semana terminamos la caracterización del fluido y el mapeo de tramos. Avance: 40%. Sin bloqueos."*

2. **Versionado y reproducibilidad.** Todo código en Git. Todo modelo con parámetros documentados. Si el cliente pregunta "¿por qué usaron ese valor?", la respuesta debe tomar menos de 2 minutos.

3. **Validación intermedia obligatoria.** Antes de generar el informe final, presentar resultados preliminares en una reunión de 30 minutos. Esto reduce rework en un 70%.

### Estructura de carpetas de ejecución

Ver `03_PROYECTOS/_PLANTILLA_PROYECTO/`:
```
01_datos/          ← Datos crudos del cliente + README de fuentes
02_analisis/       ← Código + modelos + notebooks de exploración
03_resultados/     ← Figuras, tablas, datasets de salida
04_informe/        ← LaTeX + PDF + presentación ejecutiva
05_entrega/        ← Paquete final comprimido listo para enviar
```

### Ritmo de trabajo estándar

| Semana | Actividad | Cliente involucrado |
|--------|-----------|---------------------|
| 1 | Kickoff, revisión de datos, armado del modelo conceptual | Sí (reunión 1h) |
| 1-2 | Programación y corridas preliminares | No (solo updates por email) |
| 2 | Revisión intermedia: resultados preliminares + validación | Sí (reunión 1h) |
| 2-3 | Refinamiento, análisis de sensibilidad, redacción | No |
| 3 | Entrega de borrador + 1 ronda de revisiones del cliente | Sí (feedback por email) |
| 3 | Informe final + presentación ejecutiva | Sí (reunión 1h) |

### Gestión de cambios de alcance

Si el cliente pide algo fuera de la propuesta:
> *"Eso es factible. Déjame evaluar el impacto en plazo y precio y te envío un adendum mañana."*

Nunca digas "sí" en el momento. Nunca hagas el trabajo extra sin que firme el adendum. El scope creep es la forma más común de perder dinero en consultoría.

---

## FASE 3 — Entrega Formal

### El paquete de entrega

No entregues un PDF suelto. Entrega una **experiencia**:

1. **Email de entrega** (profesional, con estructura)
2. **Informe técnico PDF** (LaTeX, con portada, índice, numeración de páginas, control de versiones)
3. **Informe ejecutivo** (máximo 2 páginas, sin ecuaciones, solo conclusiones y recomendaciones)
4. **Código fuente** (comentado, con README de ejecución)
5. **Presentación de 20 minutos** (PowerPoint o PDF beamer, para presentar al cliente)

### La reunión de entrega

**Regla:** Tú presentas 15 minutos. Luego escuchas 45 minutos.

Estructura de la presentación:
1. **Contexto:** "Recordemos: la pregunta que nos hicieron fue..."
2. **Metodología en 1 diapositiva:** "Usamos esto, que es el estándar de la industria..."
3. **Resultados principales:** Máximo 3 hallazgos. Cada uno con implicación de negocio.
4. **Recomendaciones:** Accionables, con prioridad.
5. **Próximos pasos:** "Si quieren avanzar con la fase 2 (validación con datos de campo), podemos cotizarla por separado."

### El informe técnico

Ver `06_CONOCIMIENTO/metodologias/metodologia-informe-tecnico.md` (por crear).
Reglas:
- Portada con logo, nombre del proyecto, fecha, versión, confidencialidad.
- Índice automático.
- Numeración de ecuaciones, figuras y tablas.
- Sección de supuestos explícitos.
- Sección de limitaciones: "Este modelo no predice X porque..."
- Control de versiones en página 2.

---

## FASE 4 — Post-venta y Expansión de Cuenta

### Los 3 objetivos de la post-venta

1. **Asegurar que el cliente usó el entregable.** Un informe que no leyeron es un proyecto que no existió.
2. **Obtener un testimonio o caso de éxito.** Mínimo: 2 párrafos que puedas usar en tu web.
3. **Identificar la próxima oportunidad.** Cada proyecto debe dejar al menos una idea de siguiente proyecto.

### Email de seguimiento a los 7 días

> *[Nombre],*
> *Espero que el informe haya sido útil para su equipo.*
> *Tengo dos preguntas breves:*
> *1. ¿Hubo algún punto que necesite aclaración adicional?*
> *2. ¿Estaría dispuesto a compartir un breve testimonio (2-3 oraciones) sobre el trabajo para nuestro portafolio?*
> *Sin compromiso, claro está.*
> *Saludos,*
> *Felipe*

### Email de seguimiento a los 90 días

> *[Nombre],*
> *Han pasado 3 meses desde la entrega de [proyecto]. Me pregunto si han avanzado con la implementación de las recomendaciones.*
> *Si surgió alguna pregunta técnica o si hay una nueva fase en estudio, quedo atento.*
> *Saludos,*
> *Felipe*

### El cliente recurrente es 5x más barato que el cliente nuevo

Métrica clave: **Lifetime Value (LTV) por cliente.**
Un cliente que te contrata 3 veces en 2 años vale más que 5 clientes que te contratan una vez.

Estrategias de expansión:
- **Vertical:** Más profundidad en el mismo problema (validación con datos de campo, optimización).
- **Horizontal:** El mismo análisis aplicado a otro equipo o planta del cliente.
- **Educativa:** Capacitar al equipo interno del cliente para que usen tus modelos (workshop, bootcamp).

---

## Anexo A — Fórmula de precio rápido (calculadora mental)

```
Paso 1: ¿Cuántos días efectivos de trabajo requiere esto?
        (1 día = 6-8 horas productivas)

Paso 2: ¿Qué perfil lidera?
        - Director (magíster): $250.000 – $320.000/día
        - Analista: $110.000 – $130.000/día
        - PhD ad hoc: $380.000 – $480.000/día

Paso 3: Suma de (días × tarifa) = SUBTOTAL

Paso 4: Sumar gastos directos (software, viajes) = GASTOS

Paso 5: Aplicar contingencia 15% = (SUBTOTAL + GASTOS) × 1.15

Paso 6: ¿Urgencia < 2 semanas? × 1.25

Paso 7: Redondear al siguiente múltiplo de $100.000
        (psicología de precios: $3.800.000 se ve más negociado que $3.542.000)

Paso 8: Dividir en 3 cuotas: 40% / 30% / 30%
```

### Ejemplo mental: Proyecto Kaeser tipo

| Item | Cálculo | Subtotal |
|------|---------|----------|
| Director: 6 días | × $280.000 | $1.680.000 |
| Analista: 4 días | × $120.000 | $480.000 |
| Software + LaTeX | — | $100.000 |
| Subtotal | | $2.260.000 |
| Contingencia 15% | | $339.000 |
| **Precio final** | | **$2.600.000** |
| Cuota 1 (40%) | | $1.040.000 |
| Cuota 2 (30%) | | $780.000 |
| Cuota 3 (30%) | | $780.000 |

---

## Anexo B — Checklist de calidad antes de entregar

- [ ] El informe tiene portada, índice, numeración de páginas y control de versiones
- [ ] Cada figura tiene título, unidad y fuente de datos
- [ ] Cada tabla tiene título, unidad y referencia en el texto
- [ ] Los supuestos están explícitos y justificados
- [ ] Las limitaciones están declaradas (qué NO predice el modelo)
- [ ] El código corre en una máquina limpia (testeado)
- [ ] El cliente recibe tanto el informe técnico como el ejecutivo
- [ ] Hay al menos una recomendación accionable por hallazgo principal
- [ ] El email de entrega incluye próximos pasos sugeridos

---

## Anexo C — Red flags: cuándo NO aceptar un proyecto

| Señal de alerta | Por qué es peligrosa | Qué hacer |
|-----------------|---------------------|-----------|
| "Necesitamos esto para ayer y no tenemos datos" | Imposible entregar calidad; el cliente te culpará | Rechazar o proponer una fase de diagnóstico de datos por separado |
| "Nosotros hacemos la parte técnica, ustedes solo escriban el informe" | Riesgo de propiedad intelectual y reputación | Rechazar. Tu nombre en un informe que no controlaste es un riesgo legal. |
| "¿Puede hacer un análisis gratis y si nos gusta pagamos?" | El cliente no valora el trabajo técnico | Rechazar. Ofrecer una reunión diagnóstica de 30 min gratis, nunca trabajo gratis. |
| "El presupuesto es flexible, díganos ustedes" | Probablemente no tengan presupuesto o no sean decisores | Dar rango amplio y pedir confirmación por escrito antes de empezar |
| "Necesitamos que firmen una cláusula de resultado garantizado" | La simulación modela la realidad, no la garantiza | Negociar: "garantizamos metodología y reproducibilidad, no resultados de mercado" |

---

## Referencias

- `02_COMERCIAL/tarifas.md` — Estructura de precios detallada
- `02_COMERCIAL/playbook_venta_consultiva.md` — Tácticas de venta específicas
- `03_PROYECTOS/_PLANTILLA_PROYECTO/` — Templates operativos por fase
- `06_CONOCIMIENTO/lecciones_aprendidas.md` — Registro histórico de errores y aciertos
