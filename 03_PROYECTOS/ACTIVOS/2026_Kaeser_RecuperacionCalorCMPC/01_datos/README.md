# Datos del cliente — 2026_Kaeser_RecuperacionCalorCMPC

**REGLA: No modificar ningún archivo en esta carpeta.**
Son los datos originales entregados por Kaeser / CMPC. Cualquier procesamiento va en `02_analisis/`.

## Datos recibidos

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| *(pendiente)* | Datasheet compresores FSD575, DSDX305, ESD445 | Pendiente |
| *(pendiente)* | Registros históricos de operación (horas por compresor) | Pendiente — solicitar a Kaeser |
| *(pendiente)* | Layout / P&ID de la sala de compresores | Pendiente |
| *(pendiente)* | Datos agua industrial CMPC: T, P, Q (min/max) | Confirmados en ficha: ver 00_ficha.md |

## Datos confirmados en ficha (00_ficha.md)

### Compresores
| Modelo | Cant. | P_nom (kW) | Q_térmico (kW) | Caudal ΔT25K (m³/h) | ΔP (bar) | Flange |
|--------|-------|-----------|----------------|----------------------|----------|--------|
| FSD575 | 3 | 315 | 246 | 8,61 | 0,40 | DN50 PN16 |
| DSDX305 | 2 | 160 | 130 | 4,50 | 0,25 | DN40 PN16 |
| ESD445 | 1 | 250 | 196 | 6,71 | 0,40 | DN40 PN16 |

FSD575 N°3 = 100% respaldo (no opera con N°1 o N°2 simultáneamente)

### Escenarios de operación
| Escenario | Compresores activos | Q_térmico (kW) | Caudal (m³/h) |
|-----------|--------------------|--------------------|----------------|
| Normal (80%) | 1-2-4 (FSD×2 + DSDX305) | 622 | 21,72 |
| Mínimo | Por confirmar | — | — |
| Máximo | Por confirmar | — | — |

### Agua industrial CMPC
| Parámetro | Mínimo | Máximo |
|-----------|--------|--------|
| Temperatura | 6 °C | 16 °C |
| Presión | 3,7 bar | 4,2 bar |
| Caudal | 27 m³/h | 50 m³/h |
