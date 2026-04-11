# Registro de Agentes — Wasaff Consulting

*Última actualización: 2026-03-16*

| # | Agente | Carpeta | Estado | Responsabilidad principal | Última actualización |
|---|--------|---------|--------|---------------------------|----------------------|
| 0 | Orquestador | `/` (README.md raíz) | ACTIVO | Coordinación general, flujo entre agentes | 2026-03-16 |
| 1 | Arquitecto del Sistema | `00_SISTEMA/` | ACTIVO | Infraestructura, APIs, changelog | 2026-03-16 |
| 2 | Asesor Estratégico | `01_DIRECCION/` | ACTIVO | OKRs, decisiones estratégicas, visión | 2026-03-16 |
| 3 | Director Comercial | `02_COMERCIAL/` | ACTIVO | Pipeline, propuestas, clientes | 2026-03-16 |
| 4 | Director de Proyectos | `03_PROYECTOS/` | ACTIVO | Ejecución, plazos, entregables | 2026-03-16 |
| 5 | Director Financiero | `04_FINANZAS/` | ACTIVO | Facturación, SII, flujo de caja | 2026-03-16 |
| 6 | Asesor Legal | `05_LEGAL/` | ACTIVO | Contratos, compliance, PI | 2026-03-16 |
| 7 | Director de Conocimiento | `06_CONOCIMIENTO/` | ACTIVO | Metodologías, scripts, I+D | 2026-03-16 |
| 8 | Director de Comunicaciones | `07_COMUNICACIONES/` | ACTIVO | Web, LinkedIn, marca | 2026-03-16 |

## Cómo activar un agente (método actualizado)

Cada agente tiene un archivo de activación en `00_SISTEMA/agentes/` con instrucciones exactas de qué leer y cómo comportarse. El flujo es:

1. Abrir una sesión de Claude Code en este repositorio
2. Decir: *"Actúa como [nombre], lee tu archivo en 00_SISTEMA/agentes/[archivo].md"*
3. Claude lee el archivo, carga el contexto referenciado, y opera como ese agente

| Agente | Nombre | Archivo de activación |
|--------|--------|-----------------------|
| Orquestador | Director | `00_SISTEMA/agentes/orquestador.md` |
| Director Comercial | Adrián | `00_SISTEMA/agentes/comercial.md` |
| Asesor Legal | Catalina | `00_SISTEMA/agentes/legal.md` |
| Director Financiero | Sofía | `00_SISTEMA/agentes/finanzas.md` |
| Director de Proyectos | Martín | `00_SISTEMA/agentes/proyectos.md` |
| Director de Comunicaciones | Valentina | `00_SISTEMA/agentes/marketing.md` |
| Director de Conocimiento / I+D | Leonardo | `00_SISTEMA/agentes/ixd.md` |

Los READMEs de cada carpeta siguen siendo válidos como referencia de rol — los archivos en `agentes/` los complementan con instrucciones de activación, criterios de escalación y lista priorizada de archivos a leer.

## Notas de operación
- Los agentes no se comunican directamente entre sí — el Orquestador es el intermediario
- El Orquestador solo interrumpe a Felipe según los criterios en `agentes/orquestador.md`
- Cada agente se limita estrictamente a su área de responsabilidad
- *Última actualización: 2026-04-11*
