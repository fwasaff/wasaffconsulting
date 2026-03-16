# Plantilla: Propuesta de Dinámica Molecular

*Instrucciones al agente: reemplazar todos los campos [EN CORCHETES] antes de enviar*

---

**PROPUESTA TÉCNICO-ECONÓMICA**
**N° WC-[AÑO]-[NÚMERO]**

**Para:** [Nombre del contacto], [Cargo]
**Empresa:** [Razón social]
**Fecha:** [YYYY-MM-DD]
**Válida hasta:** [YYYY-MM-DD (+30 días)]

---

## 1. Resumen ejecutivo

[Ejemplo: "Para entender por qué [material] falla bajo [condición], necesitamos ver qué ocurre a escala atómica. La simulación de dinámica molecular permite predecir el comportamiento del material antes de hacer pruebas físicas costosas — entregando datos cuantificables sobre [propiedades relevantes] en [plazo]."]

---

## 2. Diagnóstico

**Pregunta científica o de ingeniería a responder:**
[Qué necesita saber el cliente exactamente]

**Por qué requiere simulación MD:**
[Por qué los métodos experimentales convencionales no son suficientes o son más costosos]

---

## 3. Alcance

**Esta simulación incluye:**
- [ ] Configuración del sistema de simulación (LAMMPS/LPMD)
- [ ] Definición del potencial interatómico apropiado
- [ ] Simulación de [N] trayectorias bajo condiciones [especificar]
- [ ] Análisis de [propiedades: mecánicas / térmicas / de fase / colisiones]
- [ ] Visualización de trayectorias (Paraview/OVITO)
- [ ] Informe con resultados, gráficos y análisis estadístico

**NO incluye:**
- Síntesis ni pruebas experimentales
- Validación experimental de los resultados
- [Otras exclusiones]

---

## 4. Metodología

1. **Definición del sistema:** composición, tamaño de la celda de simulación, condiciones de contorno
2. **Elección del potencial:** [tipo: EAM, Lennard-Jones, ReaxFF, etc.] — justificación
3. **Equilibrado del sistema:** NVT/NPT ensemble, temperatura de referencia
4. **Producción:** duración de la trayectoria, paso de tiempo
5. **Análisis:** [propiedades a calcular: RDF, MSD, energía, tensión, etc.]
6. **Validación:** comparación con datos experimentales o teóricos conocidos

---

## 5. Entregables

| Entregable | Formato | Fecha |
|------------|---------|-------|
| Informe técnico | PDF | [fecha] |
| Scripts de simulación documentados | Python/LAMMPS input | [fecha] |
| Datos procesados | CSV/Excel | [fecha] |
| Visualizaciones | MP4/PNG | [fecha] |

---

## 6. Inversión

**Honorarios totales:** $[MONTO] CLP + IVA (si aplica)
*(incluye cómputo en hardware local)*

**Forma de pago:**
- 50% al inicio: $[MONTO]
- 50% contra entrega: $[MONTO]

---

## 7. Felipe Wasaff
Físico Computacional, Universidad de Chile. Investigador en dinámica molecular (Springer, 2011). Artículo en revisión en Physica B (2025).

---

*Esta propuesta no constituye contrato. El inicio del trabajo requiere firma de contrato de servicios y pago del anticipo.*
