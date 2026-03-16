# Wasaff Consulting — Sistema de Operaciones

**Director:** Felipe Wasaff, Físico Computacional
**Contacto:** felipe.wasaff@uchile.cl · +56 9 4612 5682
**Estado:** Activo · Santiago, Chile

---

## Para el Director: cómo usar este sistema

Este repositorio es la empresa. Cada carpeta es un departamento con un agente Claude asignado.
Tú solo necesitas leer este README y los de cada área cuando sea relevante.

### Flujo semanal (15 minutos)
1. Revisa `10_INBOX/` — clasifica lo que llegó
2. Revisa `03_PROYECTOS/ACTIVOS/` — actualiza estado de proyectos
3. Revisa `02_COMERCIAL/pipeline.md` — ¿hay propuestas pendientes?
4. Revisa `04_FINANZAS/estado_financiero.md` — ¿hay facturas por emitir?

### Para activar un agente Claude
Abre el README.md de la carpeta correspondiente y pégalo como contexto inicial al agente.
Cada README contiene el rol, las reglas y las tareas exactas de ese agente.

### Jerarquía de agentes

| Agente | Carpeta | Responsabilidad |
|--------|---------|-----------------|
| Orquestador | / (este archivo) | Coordinación general, flujo entre agentes |
| Arquitecto del Sistema | 00_SISTEMA/ | Mantiene la infraestructura y APIs |
| Asesor Estratégico | 01_DIRECCION/ | OKRs, decisiones, visión |
| Director Comercial | 02_COMERCIAL/ | Pipeline, propuestas, clientes |
| Director de Proyectos | 03_PROYECTOS/ | Ejecución, plazos, entregables |
| Director Financiero | 04_FINANZAS/ | Facturación, SII, flujo de caja |
| Asesor Legal | 05_LEGAL/ | Contratos, compliance, PI |
| Director de Conocimiento | 06_CONOCIMIENTO/ | Metodologías, scripts, I+D |
| Director de Comunicaciones | 07_COMUNICACIONES/ | Web, LinkedIn, marca |

### Regla de oro
**El Director no hace trabajo administrativo.** Si algo puede ser hecho por un agente, está en este sistema para eso. El Director resuelve el problema técnico real.

---
*Sistema inicializado: 2026-03-16*
