# Lecciones Aprendidas — Wasaff Consulting

*Una entrada por proyecto cerrado. No editarlas — solo agregar.*

---

## Formato de entrada

```
### WC-YYYY-NNN — [Nombre corto proyecto]
**Fecha cierre:** YYYY-MM-DD
**Cliente:** [nombre]
**Tipo de proyecto:** [análisis térmico / MD / informe / etc.]

**Qué funcionó bien:**
- [punto 1]
- [punto 2]

**Qué no funcionó / qué cambiaría:**
- [punto 1]
- [punto 2]

**Aprendizaje técnico transferible:**
[descripción concisa del conocimiento generado que se puede reutilizar]

**Metodología actualizada:**
[indica si se actualizó algún archivo en metodologias/ o scripts_reutilizables/]
```

---

## Lecciones registradas

### WC-2023-001 — Recuperación Calor Papeles Cordillera
**Fecha cierre:** 2024
**Cliente:** Leycero SpA / CMPC
**Tipo de proyecto:** Análisis térmico e hidráulico

**Qué funcionó bien:**
- El modelo Q=mcΔT para calcular demanda térmica resultó exacto para las condiciones del sistema
- El relevamiento de 11 tramos independientes permitió identificar el tramo crítico (mayor caída de presión)
- La metodología iterativa para selección de bomba convergió en 2 iteraciones

**Qué no funcionó / qué cambiaría:**
- Los K-factors de las conexiones (codos, válvulas) no se incluyeron en el primer borrador — subestimó las pérdidas de presión en ~18%
- Verificar con el cliente los datos de placa de los equipos contra mediciones reales — los datos nominales de los compresores no coincidían exactamente con la operación real

**Aprendizaje técnico transferible:**
En sistemas industriales reales, las pérdidas menores (K-factors) representan entre 15-30% de la pérdida de presión total. Siempre modelarlas desde el inicio, no al final. El relevamiento debe incluir un croquis con todas las conexiones.

**Metodología actualizada:**
Sí — ver `metodologias/analisis_termico.md` v1.0, advertencia sobre K-factors.

---
