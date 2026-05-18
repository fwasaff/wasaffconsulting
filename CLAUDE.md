# Wasaff Consulting — Guía para Claude

## El negocio

Consultora boutique de **ingeniería física computacional** fundada por Felipe Wasaff.
Resuelve problemas industriales que requieren física rigurosa: simulación computacional,
métodos numéricos, modelado térmico/hidráulico, dinámica molecular.

**No es** consultoría de gestión, marketing ni desarrollo de software genérico.

### Estado actual (2026)
- **Operación:** Felipe Wasaff solo, tiempo parcial (también Coordinador de Labs UChile)
- **Magíster:** En curso — Simulación Computacional, PUCV. Al terminar: escalar el equipo.
- **Clientes activos:** PyMEs industriales Chile, ingeniería de contraparte, I+D
- **Sitio web:** `11_Sitio_Web/` — Next.js 14 + React + TypeScript + Tailwind CSS, desplegado en Vercel (`wasaffconsulting.vercel.app`)

### Ingresos objetivo
| Meta | Monto |
|------|-------|
| Retiro neto director | **$2.500.000 CLP/mes** |
| Proyectos necesarios | 1 proyecto grande o 2 medianos/mes |

---

## Modelo de equipo — cuándo y cómo contratar

### Gatillador para contratar
Solo cuando el **pipeline supere la capacidad individual por 2 meses seguidos**,
o cuando un proyecto exija capacidades ausentes. El magíster terminado es umbral
de credibilidad para cobrar más, no señal automática de escalar.

### Perfiles por nivel académico (todos de la DFC-UChile idealmente)

#### Licenciado en Física — *Analista Técnico*
Disponible en DFC, necesita 3–6 meses de inducción en contexto industrial.

**Puede hacer:**
- Correr simulaciones con protocolos ya definidos (LAMMPS, SciPy)
- Procesamiento y limpieza de datos de sensores
- Gráficas, tablas y secciones descriptivas en LaTeX
- Verificación numérica de cálculos del senior

**No puede hacer solo:**
- Formular el modelo físico desde cero
- Interpretar resultados ante el cliente
- Validar que el modelo es correcto para el caso

**Compensación 2026:**
- Honorarios: $40.000–60.000 CLP/día efectivo
- Contrato fijo: $800.000–1.100.000 bruto/mes (costo real firma: ~$1.350.000)

#### Licenciado + Magíster — *Consultor Senior* (nivel actual Felipe)
Autonomía real, formula modelos, habla con el cliente.

**Puede hacer:**
- Diseño completo de metodología de simulación
- Interpretación de resultados y conclusiones
- Supervisión del analista
- Desarrollo de herramientas internas reutilizables

**Compensación 2026:**
- Honorarios: $100.000–180.000 CLP/día efectivo
- Contrato fijo: $1.600.000–2.400.000 bruto/mes
- Compite con minería/energía → el trabajo debe ser intelectualmente estimulante

#### Doctor (PhD) — *Principal / Experto Especialista*
Escaso y caro. Modelo realista: **consultor externo ad hoc por proyecto**, no full-time.

**Puede hacer:**
- Liderazgo técnico en I+D con financiamiento ANID/CORFO
- Metodologías publicables (generan reputación a la firma)
- Peritajes ante organismos reguladores o arbitrajes
- Formación del equipo

**Compensación 2026:**
- Honorarios: $200.000–350.000 CLP/día
- Socio con participación en utilidades es más atractivo que sueldo fijo

### Canal de reclutamiento DFC-UChile
1. Profesores de física computacional → derivación a tesistas destacados
2. Tablero del DFC con oferta de honorarios/práctica
3. Contactos personales de pregrado de Felipe
4. Magisterandos de 2do año: necesitan financiamiento, 20h semanales disponibles

---

## Metodología de proyecto

### Fase 0: Diagnóstico inicial (gratis, 45 min)
Cuatro preguntas que definen si se acepta:
1. ¿Qué problema físico concreto necesitan resolver?
2. ¿Tienen datos de proceso disponibles?
3. ¿Cuál es el plazo real?
4. ¿Hay presupuesto definido?

### Fase 1: Propuesta técnica (2–4 páginas)
Contiene:
- **Alcance exacto**: qué se modela, qué NO se modela, supuestos explícitos
- **Entregables**: informe + código + datos + reunión de presentación
- **Equipo asignado** con rol de cada persona
- **Hitos y pagos** (siempre en tres cuotas — ver abajo)
- **Condiciones de cambio de alcance**

### Fase 2: Armado del equipo por tipo de proyecto
| Tipo | Equipo |
|------|--------|
| Auditoría energética (hidráulico/térmico) | Director + 1 analista para datos |
| Simulación MD de materiales | Director + 1 PhD ad hoc si requiere publicación |
| Validación normativa de diseño | Director solo o + 1 analista para documentación |
| Análisis masivo de datos de sensores | 1 analista Python + supervisión director |
| I+D con ANID/CORFO | Director + 1 PhD + 1–2 analistas |

### Fase 3: División de tareas (estructura fija)
```
Director (Felipe / senior):
  ├── Formula el modelo físico
  ├── Valida resultados intermedios
  ├── Redacta conclusiones y recomendaciones
  └── Presenta ante el cliente

Analista (licenciado):
  ├── Limpia y procesa datos de entrada
  ├── Corre simulaciones con parámetros definidos
  ├── Genera visualizaciones y tablas
  └── Redacta secciones descriptivas del informe
```

---

## Modelo de cobro

### Tarifas diarias (internas → facturadas al cliente)
| Nivel | Costo interno/día | Tarifa al cliente/día |
|-------|-------------------|----------------------|
| Analista (licenciado) | $55.000 | $110.000–130.000 |
| Senior / Director (magíster) | $130.000 | $250.000–320.000 |
| Experto ad hoc (PhD) | $220.000 | $380.000–480.000 |

Margen 2x entre costo y tarifa cubre overhead, software, revisiones y utilidad.

### Fórmula de precio por proyecto
```
Días de cada perfil × tarifa diaria del perfil
+ Gastos directos (software, viaje, instrumentación)
+ Contingencia 15–20%
+ Prima urgencia si plazo < 2 semanas (+20–30%)
= Precio final
```

### Ejemplo real: auditoría energética 3 semanas
- Director: 8 días × $280.000 = $2.240.000
- Analista: 10 días × $120.000 = $1.200.000
- Software + LaTeX: $150.000
- Contingencia 15%: $539.000
- **Total: ~$4.100.000 CLP**

### Estructura de pagos — siempre en tres cuotas
| Cuota | % | Gatillador |
|-------|---|-----------|
| 1ra | 40% | Al firmar la propuesta |
| 2da | 30% | Al entregar informe preliminar |
| 3ra | 30% | Al cierre y presentación final |

**Regla:** El cliente que no paga el 40% inicial es el cliente que no pagará al final.
Nunca 50/50 y nunca todo contra entrega.

### Ajustes al precio base
| Factor | Ajuste |
|--------|--------|
| Urgencia < 2 semanas | +20–30% |
| Alto riesgo técnico / dominio nuevo | +15–25% |
| Cliente recurrente | −10% |
| Informe con validación normativa | +20% |
| Proyecto con publicación / I+D | Negociar por separado |

---

## Estructura del repositorio
```
00_SISTEMA/      ← infraestructura, APIs, changelog
01_DIRECCION/    ← OKRs, visión, decisiones estratégicas
02_COMERCIAL/    ← pipeline, propuestas, tarifas, clientes
03_PROYECTOS/    ← proyectos activos y cerrados
04_FINANZAS/     ← estado financiero, facturas, impuestos
05_LEGAL/        ← contratos, NDA, compliance
06_CONOCIMIENTO/ ← metodologías, scripts, referencias técnicas
07_COMUNICACIONES/ ← sitio web, LinkedIn, marca
11_Sitio_Web/    ← Sitio web Next.js 14 (app router, TypeScript, Tailwind)
```

---

## Stack del sitio web (11_Sitio_Web/)
- **Next.js 14** (App Router) + **React 18** + **TypeScript** + **Tailwind CSS**
- **Fuentes:** Instrument Serif (títulos), Inter (cuerpo), JetBrains Mono (datos/código)
- **Paleta McKinsey:**
  - Cuerpo: fondo blanco `#ffffff`, paneles gris cálido `#f5f4f0`, texto `#111111`
  - Hero: navy oscuro `#0c1a35`
  - Azul eléctrico: `#2251ff`
- **Deploy:** Vercel vía GitHub (`fwasaff/wasaffconsulting`, rama `master`)
  - Cada `git push` al repo padre redespliega automáticamente
  - Git user del repo: `Felipe Wasaff <fegonzalezw@gmail.com>`
- **Desarrollo:** `cd 11_Sitio_Web && npm run dev`

## Reglas de desarrollo
- Cross-platform: Felipe en Linux, posibles colaboradores en otros OS → `path.join()`
- Respuestas cortas y directas. Sin emojis en código.
- Leer archivo antes de editar.
- La voz del sitio habla en nombre de la **firma** ("Wasaff Consulting aplica..."),
  no en primera persona ("yo hago...").
