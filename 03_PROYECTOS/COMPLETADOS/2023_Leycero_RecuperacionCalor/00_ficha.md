# Ficha de Proyecto — WC-2023-001

---

| Campo | Valor |
|-------|-------|
| **ID** | WC-2023-001 |
| **Cliente** | Leycero SpA (representando a Papeles Cordillera S.A., Grupo CMPC) |
| **Colaborador** | Nilton Martínez (Leycero SpA) — niltonmartinez@gmail.com |
| **Estado** | COMPLETADO |
| **Factura emitida** | NO — trabajo informal previo a constitución de Wasaff Consulting |

## Alcance
Análisis térmico y diseño de sistema de recuperación de calor residual de compresores de aire, planta Puente Alto.

## Fecha de entrega
2023-12-01

## KPIs técnicos

| Parámetro | Valor |
|-----------|-------|
| Demanda térmica | 622 kW |
| Caudal másico | 21.396 kg/h |
| Compresores modelados | 6 (Kaeser FSD 575 ×3, DSDX 305 ×1, ESD 445 ×1) |
| Tramos de tubería calculados | 11 (Darcy-Weisbach) |
| Eficiencia de recuperación | 80–90% |

## Pago
$1.000.000 CLP recibido vía Leycero SpA (informal, sin boleta de honorarios).

## Estructura del proyecto
```
01_datos/     ← planos y especificaciones técnicas CMPC y Kaeser
05_entrega/   ← informe técnico PDF final (main.pdf)
python/       ← scripts de cálculo específicos del caso
```

## Scripts reutilizables (actualizado 2026-03-31)
`06_CONOCIMIENTO/scripts_reutilizables/python/hidraulica/`:
- `fluido.py` — propiedades agua (Kell + Vogel + cp + k + Pr) [corregido]
- `tuberia.py` — clase tubería Sch40/80 DN1"–6" [corregido]
- `calculos_hidraulicos.py` — Reynolds, Colebrook-White, Darcy-Weisbach [corregido]

`06_CONOCIMIENTO/scripts_reutilizables/python/termico/`:
- `intercambiador.py` — análisis ε-NTU counter-flow [nuevo]
- `acumulador.py` — verificación autonomía térmica [nuevo]

## Entregables finalizados (formalización 2026-03-31)
- `05_entrega/main.pdf` — Memoria de cálculo técnica, 9 páginas
- `05_entrega/informe-ejecutivo.pdf` — Informe ejecutivo 2 páginas (para gerencia CMPC)
- `WC-2023-001_EntregaFinal/` — Paquete listo para compartir

## Dato faltante crítico
`T_hot_in` asumida en 60°C. Verificar con ficha técnica Kaeser o medición directa.
Afecta el UA calculado y la selección definitiva de los intercambiadores.

## Notas
Primer trabajo de consultoría. Sin empresa formal constituida al momento de ejecución (2023).
Formalizado como caso de portafolio Wasaff Consulting en marzo 2026.
