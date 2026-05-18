# Ficha de Proyecto — 2026_Kaeser_RecuperacionCalorCMPC

## Datos generales

| Campo | Valor |
|-------|-------|
| **ID** | 2026_Kaeser_RecuperacionCalorCMPC |
| **Estado** | EN DIAGNÓSTICO — esperando confirmación de plazo y presupuesto |
| **Cliente directo** | Kaeser Compresores de Chile SpA |
| **Cliente final** | Papeles Cordillera S.A. (CMPC Puente Alto) |
| **Tipo** | Ingeniería térmica e hidráulica — recuperación de calor |
| **Fecha apertura** | 2026-04-11 |
| **Fecha entrega estimada** | Por confirmar |
| **Director técnico** | Felipe Wasaff |
| **Colaborador externo** | Nilton Martínez Villa (Ley Cero SpA) — opcional según alcance |

---

## Descripción del problema

Sala de compresores Kaeser en planta Papeles Cordillera (CMPC Puente Alto) con 6 compresores
de tornillo rotatorio equipados con intercambiadores de placas propios. El calor residual
disponible debe trasladarse al circuito de agua industrial de CMPC, pero los dos circuitos
deben estar hidráulicamente aislados.

Kaeser solicita a WASAFF Consulting el modelo matemático completo del sistema.

---

## Equipos involucrados

| Modelo | Cant. | P_nom (kW) | Q_térmico (kW) | Caudal ΔT25K (m³/h) | ΔP (bar) | Flange |
|--------|-------|-----------|----------------|----------------------|----------|--------|
| FSD575 | 3 | 315 | 246 | 8,61 | 0,40 | DN50 PN16 |
| DSDX305 | 2 | 160 | 130 | 4,50 | 0,25 | DN40 PN16 |
| ESD445 | 1 | 250 | 196 | 6,71 | 0,40 | DN40 PN16 |

**Nota:** FSD575 N°3 es 100% de respaldo — no opera simultáneamente con N°1 o N°2.

**Operación normal (80% del tiempo):** Compresores 1-2-4 → 622 kW / 21,72 m³/h

---

## Datos agua industrial (circuito CMPC)

| Parámetro | Mínimo | Máximo |
|-----------|--------|--------|
| Temperatura | 6 °C | 16 °C |
| Presión | 3,7 bar | 4,2 bar |
| Caudal | 27 m³/h | 50 m³/h |

---

## Alcance técnico (propuesto)

1. **Análisis ε-NTU** del intercambiador de aislamiento entre circuito de compresores y agua industrial
2. **Selección y dimensionamiento** del intercambiador de aislamiento (recomendación: placa)
3. **Red hidráulica completa** — Darcy-Weisbach + Colebrook-White iterativo
   - Tramos: colectores por modelo + circuito general + retorno
   - Diámetros a confirmar según layout (piping a 3606 mm de altura)
   - Flanges de entrada: DN50/DN40 según modelo
4. **Dimensionamiento de bomba de circulación** (individual vs. central — recomendación)
5. **Dimensionamiento de acumulador** (volumen y presión de trabajo)
6. **Verificación de escenarios de operación** (mínimo, normal, máximo)

**Fuera de alcance:** diseño estructural de soportes, selección de proveedor específico, especificación de instrumentación.

---

## Entregables

- [ ] Informe técnico en PDF (LaTeX) con modelo completo
- [ ] Código Python comentado con todas las funciones de cálculo
- [ ] Memoria de cálculo: red hidráulica, ε-NTU, pump curve matching
- [ ] Tabla de resultados por escenario de operación
- [ ] Reunión de presentación de resultados (1h)

---

## Hitos y pagos

| Hito | Entregable | Pago |
|------|-----------|------|
| Firma de propuesta | — | 40% ($1.417.000) |
| Informe preliminar | Resultados ε-NTU + red hidráulica | 30% ($1.063.000) |
| Cierre | Informe final + código + presentación | 30% ($1.062.000) |
| **Total** | | **$3.542.000 CLP** |

*Prima urgencia +25% si plazo < 2 semanas → total $4.427.000*

---

## Pendientes para avanzar a propuesta formal

- [ ] Confirmar plazo de entrega con Kaeser
- [ ] Confirmar presupuesto de referencia
- [ ] Obtener datos históricos de operación (horas efectivas por compresor)
- [ ] Confirmar si el alcance incluye recomendación de proveedor de intercambiador
- [ ] Revisar si Nilton (Ley Cero SpA) participa como contraparte técnica en terreno

---

## Riesgos identificados

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|-----------|
| Datos de operación real difieren de ficha Kaeser | Media | Plantear como supuesto explícito en propuesta |
| Plazo exigido < 2 semanas | Media | Prima urgencia en precio |
| CMPC solicita visita a terreno | Baja | Coordinación vía Kaeser, cotizar por separado |
| Kaeser no tiene presupuesto definido | Baja | Anchor price en primera reunión |

---

## Comunicaciones

| Fecha | Acción | Responsable |
|-------|--------|------------|
| 2026-04-11 | Recepción de brief Kaeser — proyecto en evaluación | Orquestador |
| Pendiente | Email de diagnóstico a Kaeser (borrador listo) | Felipe |
| Pendiente | Propuesta técnica formal (2-4 páginas) | Felipe + Adrián |
