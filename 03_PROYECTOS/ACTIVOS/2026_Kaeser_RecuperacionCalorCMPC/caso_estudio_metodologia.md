# Caso de Estudio: Kaeser Compresores / CMPC Puente Alto
## Cómo atacar este proyecto desde el diagnóstico hasta la post-venta

> **Proyecto:** 2026_Kaeser_RecuperacionCalorCMPC  
> **Cliente directo:** Kaeser Compresores de Chile SpA  
> **Cliente final:** Papeles Cordillera S.A. (CMPC Puente Alto)  
> **Tipo:** Ingeniería térmica e hidráulica — recuperación de calor residual  
> **Valor estimado:** $3.542.000 CLP (estándar) / $4.427.000 CLP (urgente)  
> **Precedente:** WC-2023-001 (Leycero SpA / CMPC, mismo sitio, 2023)

---

## Contexto estratégico

Este proyecto es **oro puro** para Wasaff Consulting porque:
1. **Ya tenemos precedente:** En 2023 hicimos un análisis similar para el mismo sitio (WC-2023-001). Tenemos código reutilizable, conocemos los equipos y las condiciones de operación.
2. **Cliente directo + cliente final:** Kaeser es el proveedor de equipos; CMPC es el usuario final. Kaeser nos contrata para darle un informe técnico a CMPC. Esto significa que **nuestro cliente real es Kaeser**, pero **nuestro usuario final es CMPC**.
3. **Escalabilidad:** Si este proyecto sale bien, Kaeser puede replicar el modelo en otras plantas de CMPC (Laja, Santa Fe, etc.).

---

## FASE 0 — Diagnóstico y Venta Consultiva

### Cómo probablemente fue el primer contacto

Kaeser tiene un problema: vendieron 6 compresores a CMPC, y CMPC quiere recuperar el calor residual. Pero los circuitos hidráulicos de compresores y agua industrial deben estar aislados. Kaeser no tiene el análisis térmico/hidráulico interno para dimensionar el intercambiador de aislamiento, la bomba y el acumulador.

Nilton Martínez (Ley Cero SpA, colaborador histórico) probablemente derivó el contacto, o Kaeser nos encontró por el caso de 2023.

### Simulación de la reunión diagnóstica

**Felipe:** *"Gracias por el tiempo. Antes de entrar en detalles de tuberías y temperaturas, quiero entender la decisión que necesitan tomar: ¿están dimensionando un intercambiador nuevo, validando uno que ya propuso un proveedor, o evaluando si el proyecto es viable técnica y económicamente?"*

**Kaeser:** *"Necesitamos un informe que le demos a CMPC para que aprueben la inversión. CMPC quiere saber cuánto calor recuperan, con qué caudal, y si su sistema de agua industrial aguanta."*

→ **Insight:** El decisor económico es CMPC (el que pone la plata), pero el que nos contrata es Kaeser. Nuestro informe debe convencer a **dos audiencias**: el ingeniero de CMPC (técnico) y el gerente de CMPC (económico).

**Felipe:** *"Perfecto. ¿Tienen datos históricos de operación de los compresores? Horas efectivas por equipo, temperaturas de salida, mantenimientos recientes."*

**Kaeser:** *"Tenemos las fichas técnicas. Los datos de operación real los tiene CMPC."*

→ **Riesgo identificado:** Si no conseguimos datos de operación real, el modelo se basa en especificaciones de fabricante (optimistas). Esto debe ser un supuesto explícito en la propuesta.

**Felipe:** *"¿Cuál es el plazo real? ¿Hay una parada programada o una licitación que depende de esto?"*

**Kaeser:** *"CMPC quiere tener el informe para la segunda quincena de mayo."*

→ Plazo realista: ~4 semanas. No amerita prima de urgencia, pero sí un cronograma ajustado.

**Felipe:** *"¿Tienen presupuesto definido para este estudio, o necesitan una cifra para gestionar internamente?"*

**Kaeser:** *"Necesitamos la cifra para incluirla en la propuesta que le hacemos a CMPC."*

→ **Alerta:** Kaeser está cotizando a CMPC un paquete que incluye equipos + nuestro estudio. Si nuestro precio es muy alto, Kaeser puede marginaernos. Pero si es muy bajo, parecemos "baratos". Anchor pricing: *"Proyectos de esta complejidad, con modelo hidráulico completo + ε-NTU + selección de equipo, suelen estar entre $3.000.000 y $5.000.000. Les envío la propuesta formal en 48 horas con el número fijo."*

### Resultado de la Fase 0

| Campo | Valor |
|-------|-------|
| Decisión a tomar | CMPC debe aprobar inversión en recuperación de calor |
| Datos disponibles | Fichas técnicas Kaeser sí; datos operacionales CMPC pendientes |
| Plazo | ~4 semanas (segunda quincena de mayo) |
| Presupuesto | A gestionar; rango informado $3M – $5M |
| Decisor económico | Gerencia CMPC (indirecto) |
| Decisor técnico | Ingeniero de planta CMPC + Kaeser |
| Riesgo principal | Datos operacionales reales vs. especificaciones de ficha |
| Resultado | **GO** — Preparar propuesta formal |

---

## FASE 1 — Propuesta Formal

### Estrategia de precio

**Base:**
- Director (Felipe): 6 días × $280.000 = $1.680.000
- Colaborador (Nilton, si participa): 2 días × $150.000 = $300.000
- Software + LaTeX: $100.000
- Subtotal: $2.080.000
- Contingencia 15%: $312.000
- **Total base: $2.392.000**

**Pero:** Este proyecto tiene un valor estratégico alto (Kaeser puede traer más proyectos). Sin embargo, **no descontemos por estrategia**. Mejor: precio de mercado con condiciones favorables.

**Precio propuesto: $3.542.000 CLP**
- Justificación: incluye análisis completo (ε-NTU + red hidráulica + selección de bomba + acumulador + 3 escenarios de operación) + informe técnico + ejecutivo + código + presentación.
- Estructura de pago: 40% / 30% / 30%.
- Si CMPC/Kaeser pide urgencia real (< 2 semanas): prima +25% → $4.427.000.

### Alcance propuesto (Página 2 de la propuesta)

**Incluye:**
1. Análisis ε-NTU del intercambiador de aislamiento (circuito compresores ↔ agua industrial)
2. Dimensionamiento de la red hidráulica completa (Darcy-Weisbach + Colebrook-White iterativo, 11 tramos)
3. Selección y curva de bomba de circulación (individual vs. central)
4. Dimensionamiento de acumulador térmico (volumen y presión de trabajo)
5. Verificación de 3 escenarios de operación: mínimo, normal (80% del tiempo), máximo
6. Informe técnico PDF + informe ejecutivo 2 páginas + código Python + presentación

**No incluye:**
- Diseño estructural de soportes ni piping
- Selección de proveedor específico de intercambiador (solo recomendación de especificación)
- Especificación de instrumentación y control
- Visita a terreno (cotizable por separado si CMPC la solicita)

**Supuestos clave:**
- Temperatura de salida de compresores: 60°C (asumido; validar con ficha o medición)
- Operación normal: compresores 1-2-4 (622 kW / 21,72 m³/h)
- Propiedades del agua industrial: según tabla proporcionada por CMPC
- Rugosidad de tuberías: acero comercial (ε = 0.046 mm)

### Email de envío de propuesta

> *Asunto: Propuesta técnica — Recuperación de calor residual Kaeser/CMPC | Wasaff Consulting*
> 
> *Estimados,*
> *Adjunto propuesta formal para el análisis térmico e hidráulico del sistema de recuperación de calor residual de la sala de compresores Kaeser en planta CMPC Puente Alto.*
> *Dos puntos importantes:*
> *1. La vigencia de esta oferta es de 30 días.*
> *2. Incluimos una reunión de revisión intermedia (hito 2) para que validen los resultados antes de que generemos el informe final. Esto evita sorpresas y permite ajustar supuestos.*
> *Quedo atento a sus comentarios o a una reunión de aclaraciones.*
> *Saludos,*
> *Felipe Wasaff*

---

## FASE 2 — Ejecución Técnica

### Plan de trabajo (4 semanas)

| Semana | Actividad | Entregable interno | Cliente |
|--------|-----------|-------------------|---------|
| 1 | Kickoff. Revisar fichas Kaeser. Armar modelo conceptual ε-NTU. Solicitar datos CMPC. | `01_datos/README.md` | Reunión 1h |
| 1-2 | Codificar red hidráulica completa. Correr escenarios preliminares. | `02_analisis/red_hidraulica.py` | Update martes |
| 2 | **Revisión intermedia:** Presentar ε-NTU + red hidráulica preliminar. Validar supuestos. | Minuta + feedback | Reunión 1h |
| 2-3 | Refinar bomba + acumulador. Análisis de sensibilidad. Redactar informe. | `04_informe/borrador.tex` | — |
| 3 | Entregar borrador del informe. 1 ronda de revisiones. | PDF v0.9 | Feedback email |
| 4 | Informe final. Presentación ejecutiva. Reunión de cierre. | `05_entrega/` completo | Reunión 1h |

### Cómo atacar cada componente técnico

#### 1. Análisis ε-NTU del intercambiador
- **Método:** NTU-effectiveness para flujo contracorriente (counter-flow)
- **Datos:** C_hot (compresores), C_cold (agua industrial), U estimado, A a calcular
- **Output:** Área requerida, temperaturas de salida, efectividad
- **Validación:** Cruzar con método LMTD. Si difieren > 5%, revisar supuestos.

#### 2. Red hidráulica (11 tramos)
- **Método:** Darcy-Weisbach + Colebrook-White iterativo
- **Datos:** Longitudes, diámetros, accesorios, rugosidad, viscosidad, densidad
- **Output:** ΔP por tramo, caudal por rama, velocidad, Reynolds, régimen
- **Validación:** Verificar que la suma de ΔP = ΔP disponible de la bomba

#### 3. Selección de bomba
- **Método:** Curva del sistema (H vs. Q) + curvas de bombas comerciales
- **Output:** Punto de operación, NPSH disponible vs. requerido, potencia de freno
- **Decisión:** Bomba individual por compresor vs. bomba central. Analizar ambas.

#### 4. Acumulador
- **Método:** Balance de energía en transitorio. Volumen para autonomía térmica.
- **Supuesto:** Tiempo de autonomía requerido (ej. 5 minutos de parada total)
- **Output:** Volumen mínimo, presión de trabajo, recomendación de diseño

### Reuniones de progreso (email de los martes)

> *Asunto: Avance semanal — Kaeser/CMPC*
> 
> *Estimados,*
> *Avance del proyecto: 60%.*
> *Esta semana completamos:*
> *- Modelo ε-NTU validado con método LMTD (diferencia < 2%).*
> *- Red hidráulica completa con 11 tramos calculados.*
> *- Primer escenario (operación normal) resuelto.*
> *Próxima semana:*
> *- Escenarios mínimo y máximo.*
> *- Dimensionamiento de bomba y acumulador.*
> *- Preparación de la revisión intermedia (miércoles 28/04).*
> *Sin bloqueos. Quedo atento a los datos de operación de CMPC si los consiguen.*
> *Saludos,*
> *Felipe*

### Gestión del riesgo: datos de operación reales

Si CMPC no entrega datos operacionales:
1. Documentar en el informe: *"Este análisis se basa en las especificaciones de fabricante proporcionadas por Kaeser. Los valores reales pueden variar ±10% dependiendo del estado de mantenimiento de los equipos. Se recomienda validar con mediciones de campo en la primera semana de operación."*
2. No es un bloqueo. Es una limitación declarada.

---

## FASE 3 — Entrega Formal

### El paquete de entrega

| Ítem | Descripción |
|------|-------------|
| Informe técnico | 20-30 páginas, LaTeX, portada profesional, índice, numeración, control de versiones |
| Informe ejecutivo | 2 páginas, sin ecuaciones. Conclusiones: "Recuperan 622 kW, necesitan intercambiador de X m², bomba de Y kW, acumulador de Z litros." |
| Código Python | Scripts comentados: `fluido.py`, `tuberia.py`, `intercambiador.py`, `bomba.py`, `acumulador.py`, `main.py` |
| Presentación | 10 diapositivas. Para que Kaeser la presente a CMPC si lo estima conveniente. |

### La reunión de entrega (simulación)

**Diapositiva 1 — Contexto:**
> *"CMPC Puente Alto tiene 6 compresores Kaeser con intercambiadores de placas. El calor residual disponible es de hasta 622 kW en operación normal. La pregunta que nos hicieron fue: ¿cómo trasladamos ese calor al circuito de agua industrial de forma segura y eficiente?"*

**Diapositiva 2 — Metodología:**
> *"Usamos el método ε-NTU para el intercambiador (estándar en diseño térmico, ver Incropera & DeWitt) y Darcy-Weisbach con Colebrook-White para la red hidráulica. Todo implementado en Python con validación cruzada."*

**Diapositiva 3-5 — Resultados principales:**
1. **Intercambiador:** Se requieren X m² de superficie. Recomendación: placas soldadas, acero inoxidable 316L.
2. **Red hidráulica:** ΔP total del sistema = Y bar. Diámetro óptimo de colector = Z mm.
3. **Bomba:** Punto de operación en Q = X m³/h, H = Y m.c.a. Potencia de freno = Z kW.
4. **Acumulador:** Volumen mínimo = X litros para 5 min de autonomía.

**Diapositiva 6 — Escenarios:**
| Escenario | Carga térmica | Caudal | Nota |
|-----------|--------------|--------|------|
| Mínimo | 350 kW | 12 m³/h | 1 compresor operando |
| Normal | 622 kW | 21,7 m³/h | 3 compresores, 80% del tiempo |
| Máximo | 780 kW | 27 m³/h | 4 compresores + respaldo |

**Diapositiva 7 — Limitaciones:**
> *"Este modelo predice el comportamiento en estado estacionario. No predice el fouling a 6 meses. No incluye análisis de vibraciones en tuberías. Los valores de temperatura de salida de compresores se basan en especificaciones de fabricante."*

**Diapositiva 8 — Próximos pasos:**
> *"1. Validar temperaturas con mediciones de campo. 2. Solicitar cotización de intercambiadores con los especificados. 3. Si necesitan, podemos cotizar la fase 2: modelo de transitorios y optimización del control."*

### Preguntas que esperar de CMPC/Kaeser

**"¿Y si el agua industrial llega a 16°C en verano?"**
> *"Eso está cubierto en el escenario máximo. A 16°C el ΔT es menor, por lo que necesitaríamos verificar si el intercambiador especificado sigue siendo suficiente. En el informe técnico, página 18, hay un análisis de sensibilidad con eso. Spoiler: con el área que recomendamos, sí aguanta, pero el margen se reduce al 8%."*

**"¿Están seguros de que no necesitamos una bomba más grande?"**
> *"La curva del sistema está calculada con el peor escenario hidráulico (válvulas semiabiertas, envejecimiento de tuberías). La bomba que recomendamos tiene un 15% de margen sobre ese punto. Si CMPC prefiere un margen del 30%, podemos recalcular en 24 horas; implicaría una bomba de la siguiente curva, con un costo aproximado de $X adicionales."*

**"¿Cuánto nos ahorramos con esto?"**
> *"Esa es la pregunta del millón. El análisis técnico les dice CUÁNTO calor pueden recuperar (622 kW en operación normal). El análisis económico lo tienen que hacer ustedes con el costo del gas o electricidad que dejan de usar. Lo que sí les puedo decir: un sobredimensionamiento del 20% en el intercambiador les costaría ~$8M adicionales en CAPEX. Nuestro estudio cuesta $3,5M y evita eso."*

---

## FASE 4 — Post-venta

### Email de seguimiento a los 7 días

> *Asunto: Seguimiento — Recuperación de calor Kaeser/CMPC*
> 
> *Estimados,*
> *Espero que el informe y la presentación hayan sido útiles para la gestión interna con CMPC.*
> *Tengo dos preguntas breves:*
> *1. ¿Hubo algún punto que necesite aclaración adicional?*
> *2. ¿Estarían dispuestos a compartir un breve testimonio (2-3 oraciones) sobre el trabajo? Claro está, sin datos sensibles.*
> *Adicionalmente, si CMPC avanza con la implementación y necesitan validar los datos de campo contra el modelo, podemos cotizar una fase 2 de ajuste y refinamiento.*
> *Saludos,*
> *Felipe*

### Expansión de cuenta: oportunidades identificadas

1. **Vertical — Fase 2:** Validación con datos de campo + ajuste del modelo (precio: $1.500.000 – $2.000.000)
2. **Horizontal — Otras plantas CMPC:** Laja, Santa Fe, otro sitio con compresores Kaeser
3. **Horizontal — Otros clientes de Kaeser:** Kaeser puede referirnos a otros clientes que necesiten análisis térmico
4. **Educativa:** Workshop de 1 día para ingenieros de Kaeser sobre "Cómo dimensionar sistemas de recuperación de calor" (precio: $800.000 – $1.200.000)

### Lección aprendida para registrar

- **Lo que salió bien:** El precedente de 2023 aceleró la ejecución en un 40%. El código reutilizable (`fluido.py`, `tuberia.py`, `intercambiador.py`, `acumulador.py`) fue clave.
- **Lo que se podría mejorar:** Solicitar datos operacionales de CMPC desde la Fase 0, no en la semana 2. Preparar un checklist de datos que enviar al cliente antes de firmar.
- **Reusable:** El análisis de bomba (individual vs. central) es un patrón que se repite en todo proyecto hidráulico. Documentar como "patrón de decisión" en `06_CONOCIMIENTO/`.

---

## Checklist maestro del proyecto

### Pre-venta
- [ ] Reunión diagnóstica realizada
- [ ] 4 Preguntas Diagnósticas respondidas
- [ ] Propuesta formal enviada (máx. 4 páginas)
- [ ] Propuesta aprobada y 40% pagado

### Ejecución
- [ ] Kickoff realizado
- [ ] `01_datos/README.md` completo
- [ ] Revisión intermedia realizada
- [ ] Informe borrador entregado y feedback recibido
- [ ] Informe final generado

### Entrega
- [ ] Paquete completo enviado (informe + ejecutivo + código + presentación)
- [ ] Reunión de entrega realizada
- [ ] Factura final (30%) emitida
- [ ] Pago final recibido

### Post-venta
- [ ] Email de 7 días enviado
- [ ] Email de 90 días enviado
- [ ] Testimonio obtenido
- [ ] Caso publicado en portafolio
- [ ] Próxima oportunidad registrada en pipeline
- [ ] Proyecto movido a `COMPLETADOS/`

---

## Referencias internas

- Precedente: `03_PROYECTOS/COMPLETADOS/2023_Leycero_RecuperacionCalor/`
- Código reutilizable: `06_CONOCIMIENTO/scripts_reutilizables/python/`
- Metodología general: `06_CONOCIMIENTO/metodologias/metodologia-proyectos-wasaff.md`
- Playbook de venta: `02_COMERCIAL/playbook_venta_consultiva.md`
