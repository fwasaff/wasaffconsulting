# Fase 2 — Ejecución Técnica

## Objetivo
Entregar el modelo, análisis e informe con la calidad y reproducibilidad de una firma Tier-1.

## Duración
1 – 6 semanas (según complejidad y contrato).

## Principios de ejecución

1. **Visible progress:** Email de 2 líneas cada martes con % de avance.
2. **Versionado:** Todo código en Git. Todo parámetro documentado.
3. **Validación intermedia:** Reunión de revisión preliminar antes del informe final.
4. **No scope creep:** Todo cambio requiere adendum firmado.

## Estructura de trabajo semanal tipo

| Semana | Actividad | Cliente involucrado | Entregable interno |
|--------|-----------|---------------------|-------------------|
| 1 | Kickoff, revisión de datos, armado del modelo conceptual | Sí (reunión 1h) | `01_datos/README.md` completo |
| 1-2 | Programación, corridas preliminares, debug | No | Resultados preliminares en `03_resultados/` |
| 2 | **Revisión intermedia:** presentar resultados preliminares + validar dirección | Sí (reunión 1h) | Minuta de reunión + feedback documentado |
| 2-3 | Refinamiento, análisis de sensibilidad, redacción | No | Borrador de informe en `04_informe/` |
| 3 | Entrega de borrador + 1 ronda de revisiones del cliente | Sí (feedback por email) | Informe v0.9 con track changes |
| 3 | **Informe final + presentación ejecutiva** | Sí (reunión 1h) | `05_entrega/` completo |

## Checklist de calidad técnica

### Código
- [ ] Cada función tiene docstring con inputs, outputs y unidades
- [ ] Hay un script `main.py` o notebook principal que reproduce todo el análisis
- [ ] Los parámetros clave están en un archivo de configuración separado (`config.json` o `params.py`)
- [ ] El código corre en una máquina limpia (testeado con entorno virtual fresco)
- [ ] Hay un `README.md` en `02_analisis/` explicando cómo ejecutar

### Modelo
- [ ] Todos los supuestos están documentados y justificados
- [ ] Se incluye análisis de sensibilidad o incertidumbre
- [ ] Se valida contra datos de referencia (experimentales, literatura o caso conocido)
- [ ] Las limitaciones están explícitas

### Figuras y tablas
- [ ] Cada figura tiene título, ejes etiquetados con unidades, leyenda si aplica
- [ ] Cada tabla tiene título, unidades en cada columna, notas al pie si aplica
- [ ] Las figuras son exportables en alta resolución (300 dpi mínimo para informe)

## Gestión de cambios de alcance

Si el cliente solicita algo fuera de la propuesta:

1. **Nunca digas "sí" en el momento.** Responde: *"Déjame evaluar el impacto técnico y comercial y te respondo mañana."*
2. Evaluar: ¿horas adicionales? ¿plazo extendido? ¿riesgo técnico nuevo?
3. Preparar adendum (1 página): alcance adicional, impacto en precio, impacto en plazo.
4. Cliente firma (o aprueba por email) antes de ejecutar.

## Output de esta fase

1. `02_analisis/` — Código completo y reproducible
2. `03_resultados/` — Figuras, tablas y datasets de salida
3. `04_informe/` — Borrador, informe final y presentación
4. Minuta de la reunión de revisión intermedia
5. Adendums (si aplica)
