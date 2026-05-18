# Metodología de Proyectos — Wasaff Consulting

*Versión: 1.0 | Fecha: 2026-03-31*

---

## Principio rector
Un proyecto de Wasaff Consulting termina cuando el cliente puede tomar una decisión
de ingeniería que antes no podía tomar. No termina con un PDF entregado — termina
con comprensión transferida y resultados verificables.

---

## Fase 0 — Diagnóstico inicial

**Duración:** 45 minutos máximo. Gratuito siempre.
**Formato:** Llamada o reunión presencial.

### Las cuatro preguntas de calificación
1. ¿Qué problema físico concreto necesitan resolver?
2. ¿Tienen datos de proceso disponibles, o necesitan instrumentación previa?
3. ¿Cuál es el plazo real (no el ideal)?
4. ¿Hay presupuesto definido o es abierto?

### Criterios de aceptación
Aceptar si:
- El problema involucra física que requiere modelado formal
- El cliente tiene datos o puede generarlos en el plazo
- El plazo es técnicamente posible

Rechazar (con derivación honesta) si:
- El problema no requiere física computacional
- El plazo es imposible para hacer bien
- El cliente pide resultados predefinidos (no análisis independiente)

---

## Fase 1 — Propuesta Técnica

**Duración de elaboración:** 1–3 días según complejidad.
**Longitud:** 2–4 páginas. Nunca más.

### Estructura obligatoria de la propuesta

```
1. Resumen ejecutivo (3–5 líneas)
2. Descripción del problema a resolver
3. Alcance exacto
   — Qué se modela
   — Qué NO se modela (explícito)
   — Supuestos adoptados
4. Metodología (describir el enfoque físico-matemático)
5. Entregables
   — Informe técnico (LaTeX/PDF)
   — Código comentado (Python/repositorio)
   — Datos de salida procesados
   — Reunión de presentación (1 hr)
6. Equipo asignado con rol
7. Cronograma por hitos
8. Valor y condiciones de pago
9. Condiciones de modificación de alcance
```

### Condición de cambio de alcance
Cualquier modificación al alcance acordado genera una addenda con nuevo presupuesto.
No existe el "ya que estamos, agrega esto".

---

## Fase 2 — Armado del equipo

### Matriz de asignación por tipo de proyecto
| Tipo de proyecto | Director | Analista | PhD ad hoc |
|-----------------|----------|----------|-----------|
| Auditoría energética | ✓ lidera | ✓ datos | — |
| Validación normativa | ✓ lidera | ✓ documentación | — |
| Simulación MD materiales | ✓ lidera | ✓ corre sims | ✓ si requiere publicación |
| Análisis datos sensores | ✓ supervisa | ✓ lidera ejecución | — |
| I+D con ANID/CORFO | ✓ director | ✓ 1–2 | ✓ obligatorio |

### Regla de supervisión
El Director revisa el 100% de lo que firma. Nunca se entrega trabajo de un analista
sin revisión técnica del Director. La firma de la propuesta es del Director.

---

## Fase 3 — Ejecución

### División de responsabilidades

**Director (Felipe / consultor senior):**
- Formular el modelo físico completo
- Definir los parámetros de entrada y rangos de validez
- Validar resultados intermedios del analista
- Redactar secciones de metodología, resultados y conclusiones
- Presentar ante el cliente

**Analista (licenciado):**
- Limpiar y estructurar los datos de entrada
- Correr simulaciones con los parámetros definidos por el director
- Generar visualizaciones, gráficas y tablas
- Redactar secciones descriptivas (introducción, datos, procedimiento)
- Documentar el código

### Check-ins internos
- **Al 25% del proyecto:** ¿Los datos de entrada son válidos? ¿El modelo está bien planteado?
- **Al 60% del proyecto:** Reunión interna de revisión de resultados preliminares
- **Al 90% del proyecto:** Revisión completa del informe antes de enviar al cliente

---

## Fase 4 — Entrega y cierre

### Entrega preliminar (gatilla 2da cuota)
- Informe borrador con todos los resultados
- Reunión de revisión con el cliente (45–60 min)
- Registro de comentarios → lista de ajustes acordados

### Entrega final (gatilla 3ra cuota)
- Informe corregido en PDF
- Repositorio de código con README
- Datos de salida en formato acordado
- Reunión de presentación y transferencia de conocimiento

### Archivo del proyecto
Una vez cerrado, archivar en `03_PROYECTOS/CERRADOS/`:
- Propuesta firmada
- Informe final
- Código (o link al repositorio)
- Lección aprendida (una página máximo) → también en `06_CONOCIMIENTO/lecciones_aprendidas.md`

---

## Gestión de riesgos técnicos

| Riesgo | Señal de alerta | Acción |
|--------|----------------|--------|
| Datos de entrada inconsistentes | Valores fuera de rango físico | Detener y comunicar al cliente antes de continuar |
| Modelo no converge | Error numérico creciente | Revisar supuestos, reformular antes de seguir corriendo |
| Plazo en riesgo | 40% del tiempo consumido, <30% del trabajo hecho | Comunicar al cliente proactivamente, proponer ajuste |
| Cambio de alcance no autorizado | Cliente pide algo fuera de propuesta | Responder por escrito: "Esto requiere addenda" |

---

## Lecciones aprendidas acumuladas
*(agregar una línea por proyecto cerrado)*

| Proyecto | Fecha | Lección |
|---------|-------|---------|
| — | — | — |
