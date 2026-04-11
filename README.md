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
Cada agente tiene un archivo de activación en `00_SISTEMA/agentes/`. Decirle a Claude:
*"Actúa como [nombre], lee tu archivo en 00_SISTEMA/agentes/[archivo].md"*

### Equipo de agentes

| Nombre | Rol | Activación |
|--------|-----|------------|
| **Director** | Orquestador — única interfaz con Felipe | `agentes/orquestador.md` |
| **Adrián** | Comercial — pipeline, propuestas, clientes | `agentes/comercial.md` |
| **Catalina** | Legal — contratos, NDA, propiedad intelectual | `agentes/legal.md` |
| **Sofía** | Finanzas — flujo de caja, SII, facturación | `agentes/finanzas.md` |
| **Martín** | Proyectos — estructura, hitos, calidad | `agentes/proyectos.md` |
| **Valentina** | Marketing — LinkedIn, web, contenidos | `agentes/marketing.md` |
| **Leonardo** | I+D — metodologías, scripts, conocimiento | `agentes/ixd.md` |

### Cuándo interrumpir a Felipe (criterios del Orquestador)
Solo cuando:
- Propuesta o proyecto > $5.000.000 CLP
- Conflicto formal con cliente
- Riesgo legal o de propiedad intelectual
- Runway financiero < 3 meses

Todo lo demás: los agentes lo resuelven y reportan en el digest diario.

### Regla de oro
**Felipe no hace trabajo administrativo.** El Director resuelve el problema técnico real — física, simulación, modelos. Los agentes operan el resto.

---
*Sistema inicializado: 2026-03-16 · Agentes nombrados: 2026-04-11*
