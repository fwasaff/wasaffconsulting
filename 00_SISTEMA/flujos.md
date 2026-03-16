# Flujos de Información — Wasaff Consulting

*Última actualización: 2026-03-16*

## Flujo principal: de oportunidad a conocimiento

```
┌─────────────┐
│  10_INBOX   │  ← Todo lo nuevo llega aquí primero
└──────┬──────┘
       │ Clasificación semanal (lunes)
       ▼
┌─────────────────────────────────────────────────────────────┐
│                     DIRECTOR (Felipe)                        │
│                   toma todas las decisiones                  │
└──┬──────────┬──────────┬──────────┬──────────┬─────────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
02_COMERCIAL  03_PROYECTOS 04_FINANZAS 05_LEGAL 01_DIRECCION
(prospecto)   (ejecución)  (cobro)    (contrato) (estrategia)
   │
   │ propuesta aceptada
   ▼
05_LEGAL ──── contrato firmado ────► 03_PROYECTOS
                                          │
                                          │ proyecto iniciado
                                          ▼
                                     04_FINANZAS
                                     (factura al cierre)
                                          │
                                          │ proyecto cerrado
                                          ▼
                                     06_CONOCIMIENTO
                                     (lección aprendida)
```

## Flujo de un proyecto nuevo

```
[Cliente contacta]
       │
       ▼
02_COMERCIAL: crear ficha cliente, registrar en pipeline
       │
       ▼
Director: evalúa viabilidad técnica
       │
       ├─ NO VIABLE → registrar en pipeline como PERDIDO, notificar cliente
       │
       └─ VIABLE ──► 02_COMERCIAL: redactar propuesta
                           │
                           ▼
                     Director: revisar y enviar propuesta
                           │
                           ├─ NO ACEPTADA → actualizar pipeline, follow-up en 7 días
                           │
                           └─ ACEPTADA ──► 05_LEGAL: revisar/firmar contrato
                                                 │
                                                 ▼
                                         03_PROYECTOS: crear carpeta proyecto
                                                 │
                                                 ▼
                                         [Director ejecuta trabajo técnico]
                                                 │
                                                 ▼
                                         03_PROYECTOS: informe → entrega
                                                 │
                                                 ▼
                                         04_FINANZAS: emitir factura/boleta
                                                 │
                                                 ▼
                                         06_CONOCIMIENTO: documentar lección
                                                 │
                                                 ▼
                                         03_PROYECTOS: mover a COMPLETADOS/
```

## Flujo semanal del Director (15 min)

```
LUNES
  1. 10_INBOX/ → clasificar archivos nuevos (5 min)
  2. 03_PROYECTOS/ACTIVOS/ → revisar estado (3 min)
  3. 02_COMERCIAL/pipeline.md → propuestas pendientes (3 min)
  4. 04_FINANZAS/estado_financiero.md → facturas pendientes (2 min)
  5. Inbox email → ¿hay algo para este sistema? → clasificar
```

## Flujo mensual (primer día hábil)

```
1. 04_FINANZAS: actualizar estado_financiero.md con mes anterior
2. 04_FINANZAS: verificar F29 (vence el 12)
3. 02_COMERCIAL: revisar oportunidades sin movimiento (+14 días)
4. 01_DIRECCION: ¿algún OKR requiere ajuste?
```

## Dependencias entre agentes

| Si necesitas... | Consulta primero a... | Luego coordina con... |
|----------------|----------------------|----------------------|
| Iniciar un proyecto | 02_COMERCIAL (propuesta aceptada) | 05_LEGAL (contrato), 03_PROYECTOS (ficha) |
| Emitir una factura | 03_PROYECTOS (entrega confirmada) | 04_FINANZAS (emisión) |
| Publicar en LinkedIn | 07_COMUNICACIONES | 06_CONOCIMIENTO (si es sobre un proyecto) |
| Contratar proveedor | 05_LEGAL (contrato) | 04_FINANZAS (presupuesto) |
