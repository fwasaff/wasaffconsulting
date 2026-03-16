# Scripts: Análisis Hidráulico de Tuberías

**Origen:** Proyecto WC-2023-001, Papeles Cordillera S.A. (Leycero SpA)
**Validados en:** Sistema de recuperación de calor, planta Puente Alto, Grupo CMPC (2023)

---

## Archivos

- `calculos_hidraulicos.py` — Cálculo de pérdidas de presión (Darcy-Weisbach), velocidades y caudales
- `fluido.py` — Propiedades del fluido (agua industrial): densidad, viscosidad, calor específico
- `tuberia.py` — Clase Tubería: diámetros nominales, rugosidades, factor de fricción (Colebrook-White)

*`main.py` es específico del caso Papelera — queda en el proyecto, no aquí.*

## Uso típico
Dimensionamiento de redes de tuberías para sistemas de transferencia de calor.
Aplicable a: agua caliente industrial, sistemas de recuperación de calor, circuitos de enfriamiento.

## Parámetros clave validados
- Velocidad máxima agua: 3.6 m/s (evitar erosión y ruido)
- Rango de diámetros: 1″ a 3″ (estándar industrial chileno)
- Temperatura de trabajo: 16°C – 65°C
- Modelo de fricción: Colebrook-White (flujo turbulento, Re > 4000)

## Proyecto de origen
Ver `03_PROYECTOS/COMPLETADOS/2023_Leycero_RecuperacionCalor/` para contexto completo.
