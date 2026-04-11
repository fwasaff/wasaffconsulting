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

## Scripts reutilizables
Copiados a `06_CONOCIMIENTO/scripts_reutilizables/python/hidraulica/`:
- `calculos_hidraulicos.py`
- `fluido.py`
- `tuberia.py`

## Notas
Primer trabajo de consultoría. Sin empresa formal constituida. Sirve como caso de portafolio y base metodológica para futuros proyectos de eficiencia energética industrial. Ver metodología documentada en `06_CONOCIMIENTO/metodologias/analisis_termico.md`.
