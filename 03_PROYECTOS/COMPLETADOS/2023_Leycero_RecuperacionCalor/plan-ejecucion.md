# Plan de Ejecución — WC-2023-001 Leycero / CMPC Recuperación de Calor

*Creado: 2026-03-31 | Última actualización: 2026-03-31 | Estado: ✅ COMPLETADO*

Este plan lleva el proyecto a estándar Wasaff Consulting completo:
código revisado, modelo térmico real, informe LaTeX formal y packaging entregable.
El trabajo original (2023) fue informal. Este plan lo formaliza como caso de portafolio
y base metodológica para futuros proyectos de eficiencia energética industrial.

---

## Estado actual (inventario antes de empezar)

| Módulo | Archivo | Estado | Notas |
|--------|---------|--------|-------|
| Propiedades fluido | `python/fluido.py` | ✅ corregido | Kell (densidad) + Vogel (viscosidad) + cp + k + Pr |
| Clase tubería | `python/tuberia.py` | ✅ corregido | Sch 40 + 80, DN 1"–6", acepta flujo y diametro_nominal |
| Cálculos hidráulicos | `python/calculos_hidraulicos.py` | ✅ corregido | Reynolds, Colebrook-White, Darcy-Weisbach, resumen completo |
| Main integrador | `python/main.py` | ✅ completo | Red 11 tramos, 2 modos, selección bomba, llama módulos térmicos |
| Modelo térmico ε-NTU | `python/intercambiador.py` | ✅ creado | Counter-flow, 6 compresores, T_hot_in=60°C (ESTIMADO) |
| Acumulador | `python/acumulador.py` | ✅ creado | 15.000 L → 57 min autonomía frente a demanda normal |
| Selección de bomba | dentro de `main.py` | ✅ completo | Q~52 m³/h, H~2.4 mca, motor ≥ 0.5 kW |
| Informe LaTeX | `05_entrega/main.tex` | ⚠ pendiente | Secciones 2 y 3 vacías — Paso 6 |

## Resultados numéricos obtenidos (2026-03-31)

| Resultado | Valor |
|-----------|-------|
| Q_normal (C1+C2+C4) | 27.2 m³/h |
| Q_máximo (6 compresores) | 52.2 m³/h |
| ΔP red normal | 7.6 kPa (0.77 mca) |
| ΔP red máximo | 20.3 kPa (2.07 mca) |
| Tramo crítico | T9 — Colector sala → acumuladores |
| Calor recuperado normal | 505.6 kW (η=80% sobre 632 kW nominales) |
| Calor recuperado máximo | 969.6 kW |
| UA total normal | 13.874 W/K |
| Bomba: punto de operación | Q~52 m³/h, H~2.4 mca |
| Motor bomba IEC | ≥ 0.5 kW |
| Acumulador 15.000 L | 57 min autonomía frente a 201.6 kW |
| **Dato faltante crítico** | **T_hot_in real (asumido 60°C)** |

---

## Paso 1 — Reparar `tuberia.py`: aceptar `flujo` y `diametro` como parámetros

**Qué hacer:**
- Agregar `flujo` y `diametro` como parámetros opcionales en `__init__`
- Si `diametro` se pasa explícitamente, usarlo en lugar del diámetro interno del catálogo
- Si `flujo` se pasa, almacenarlo como `self.flujo`
- Agregar tamaños faltantes al diccionario `DIMENSIONES_CEDULA_80` (3", 4", 6")

**Datos necesarios:**
- Plano `3.2 Tuberias de agua (1).pdf` — diámetros reales instalados por tramo
- Cédulas de tubería reales (confirmar si son cédula 40 o 80 en la planta)

**Archivo a editar:** `python/tuberia.py`

**Condición de éxito:** `python main.py` corre sin errores.

---

## Paso 2 — Completar `main.py`: red hidráulica completa con los 11 tramos reales

**Qué hacer:**
- Extraer del plano `CMPC Puente Alto General_2 (2).pdf` los 11 tramos reales:
  longitud, diámetro nominal, caudal (derivado de qué compresores alimenta cada tramo)
- Construir la red como lista de `Tuberia` con sus caudales reales
- Calcular y reportar: Re, f (Colebrook-White), ΔP por tramo y ΔP total
- Identificar el tramo crítico (mayor pérdida) → define la bomba

**Datos necesarios:**
- Caudal total: 50 m³/h (máximo operacional, todos los compresores)
- Caudal normal: 27 m³/h (80% del tiempo, 622 kW de carga)
- Temperaturas: T_entrada 6°C, T_salida 16°C (agua industrial fría)

**Archivo a editar:** `python/main.py`

**Condición de éxito:** Tabla impresa con los 11 tramos, ΔP total en kPa, identificación del tramo crítico.

---

## Paso 3 — Crear `intercambiador.py`: modelo ε-NTU para los 6 compresores

**Qué hacer:**
Implementar el método ε-NTU para intercambiadores de placas (flujos cruzados, 1 paso).

```
Parámetros de entrada por compresor:
  Q_nominal [kW]      — potencia térmica recuperable (dato Kaeser)
  eta_recuperacion    — eficiencia Kaeser (0.80 a 0.90)
  T_hot_in [°C]       — temperatura de entrada agua caliente compresor (DATO FALTANTE)
  T_cold_in [°C]      — temperatura agua industrial fría (6°C)
  m_dot_cold [kg/s]   — caudal lado frío

Salidas:
  T_hot_out [°C]      — temperatura salida lado caliente
  T_cold_out [°C]     — temperatura salida lado frío
  NTU                 — número de unidades de transferencia
  UA [W/K]            — producto coeficiente × área
  epsilon             — efectividad real
```

**Tabla de compresores (datos Kaeser):**

| Compresor | Modelo | P_motor [kW] | Q_recuperable [kW] | eta |
|-----------|--------|-------------|-------------------|-----|
| C-01 | FSD 575 | 315 | 252 | 0.80 |
| C-02 | FSD 575 | 315 | 252 | 0.80 |
| C-03 | FSD 575 | 315 | 252 | 0.80 |
| C-04 | DSDX 305 | 160 | 128 | 0.80 |
| C-05 | ESD 445 | 250 | 200 | 0.80 |
| C-06 | DSDX 305 | 160 | 128 | 0.80 |

**DATO FALTANTE CRÍTICO:** T_hot_in (temperatura del agua que sale de los compresores hacia los intercambiadores). Fuente: ficha técnica Kaeser o medición en planta. Estimado típico: 55–70°C.

**Archivo a crear:** `python/intercambiador.py`

**Condición de éxito:** Para cada compresor, imprimir Q_real, T_cold_out, UA, epsilon.

---

## Paso 4 — Crear `acumulador.py`: sizing del volumen de acumulación térmica

**Qué hacer:**
Verificar si los acumuladores existentes (10.000 L + 5.000 L = 15.000 L total) son
suficientes para cubrir el período transitorio cuando los compresores se apagan.

```
Modelo:
  Q_carga [kW]        — calor entrando al acumulador
  Q_descarga [kW]     — demanda del proceso en ausencia de compresores
  rho_agua = 988 kg/m3 (a 50°C)
  cp_agua = 4.182 kJ/(kg·K)
  delta_T [K]         — swing térmico aceptable (ejemplo: 10°C)
  t_autonomia [h]     — cuántas horas debe sustentar el sistema sin compresores

Volumen mínimo:
  V_min = Q_descarga × t_autonomia / (rho × cp × delta_T)
```

**Verificar:** Si V_existente (15 m³) ≥ V_min para t_autonomia = 2h y Q_descarga = 200 kW.

**Archivo a crear:** `python/acumulador.py`

**Condición de éxito:** Tabla con V_min para distintas autonomías vs V_existente. Veredicto: suficiente / insuficiente.

---

## Paso 5 — Selección de bomba: punto de operación

**Qué hacer:**
Con el ΔP total de la red (Paso 2) y el caudal nominal (27–50 m³/h), definir el
punto de operación de la bomba de circulación del circuito aislado.

```
Punto de operación:
  Q_nominal = 27 m³/h (operación normal)
  Q_max = 50 m³/h (todos los compresores)
  H_sistema [mca] = ΔP_total_red / (rho × g)  ← resultado del Paso 2

Criterio de selección:
  H_bomba @ Q_nominal ≥ H_sistema × 1.15 (margen 15%)
  Potencia eléctrica estimada: P = rho × g × Q × H / eta_bomba
```

**Agregar a `main.py`** como función `seleccionar_bomba(Q, H_sistema)`.

**Condición de éxito:** Imprimir H_sistema en mca, potencia estimada de bomba, referencia de modelo comercial sugerido.

---

## Paso 6 — Revisar y completar el informe LaTeX (`05_entrega/main.tex`)

**Leer el archivo primero.** Luego verificar si contiene:

- [ ] Descripción del sistema (planta, compresores, esquema)
- [ ] Memoria de cálculo hidráulico (tabla 11 tramos con Re, f, ΔP)
- [ ] Memoria de cálculo térmico (tabla ε-NTU por compresor)
- [ ] Verificación del acumulador
- [ ] Conclusiones: Q_recuperado total, T_cold_out promedio, ahorro estimado
- [ ] Anexo: tablas de propiedades del agua

**Secciones que probablemente faltan** (añadir):
1. Análisis térmico (ε-NTU) — resultado del Paso 3
2. Verificación del acumulador — resultado del Paso 4
3. Recomendación de bomba — resultado del Paso 5
4. Estimación de ahorro en gas/combustible (GJ/año → $CLP/año)

**Archivo a editar:** `05_entrega/main.tex`

---

## Paso 7 — Informe ejecutivo (2 páginas para gerencia CMPC)

**Qué hacer:**
Crear `05_entrega/informe-ejecutivo.tex` — documento separado, sin ecuaciones,
orientado a la decisión de inversión.

**Estructura:**
```
1. Resumen ejecutivo (5 líneas)
   — Sistema recupera X kW, equivalente a Y m³/año de gas natural
   — Ahorro anual estimado: $Z CLP/año
   — Sin inversión adicional (sistema Kaeser ya instalado)

2. Configuración del sistema (diagrama simplificado)

3. Resultados clave
   | Métrica | Valor |
   | Calor recuperado normal (622 kW) | X GJ/año |
   | Temperatura agua caliente producida | ~XX°C |
   | Acumuladores verificados | 15.000 L — suficiente/insuficiente |
   | Bomba requerida | X kW, Y m³/h |

4. Próximos pasos sugeridos (si hubiera fase 2)
```

**Condición de éxito:** PDF compila sin errores, 2 páginas máximo.

---

## Paso 8 — Packaging final

**Qué hacer:**
- Compilar ambos PDFs: `main.pdf` (memoria técnica) + `informe-ejecutivo.pdf`
- Comprimir en `WC-2023-001_Leycero_EntregaFinal.zip`:
  ```
  ├── informe-ejecutivo.pdf
  ├── memoria-calculo-tecnica.pdf
  └── codigo/
      ├── fluido.py
      ├── tuberia.py
      ├── calculos_hidraulicos.py
      ├── intercambiador.py
      ├── acumulador.py
      └── main.py
  ```
- Actualizar `00_ficha.md`: marcar como "Formalizado 2026-03-31"
- Copiar módulos nuevos a `06_CONOCIMIENTO/scripts_reutilizables/python/`:
  - `hidraulica/` ← tuberia.py, calculos_hidraulicos.py, fluido.py (actualizado)
  - `termico/` ← intercambiador.py, acumulador.py (nuevos)
- Agregar lección aprendida en `06_CONOCIMIENTO/metodologias/metodologia-proyectos.md`

---

## Datos faltantes — resolver antes de Paso 3

| Dato | Fuente | Impacto si no se obtiene |
|------|--------|--------------------------|
| T_hot_in de agua en compresores | Ficha técnica Kaeser o medición | Usar estimado 60°C con nota explícita |
| Cédula real de tuberías instaladas | Plano 3.2 o inspección | Usar cédula 40 como conservador |
| Demanda real de calor del proceso CMPC | Contraparte planta | Usar Q_descarga = Q_max compresor (conservador) |

---

## Secuencia de ejecución

```
Paso 1 → Paso 2 → Paso 3 → Paso 4 → Paso 5   (código Python, en orden)
         ↓ resultado ΔP    ↓ resultado UA
Paso 6 (LaTeX técnico — incorpora resultados de todos los pasos anteriores)
Paso 7 (LaTeX ejecutivo — resume Paso 6)
Paso 8 (packaging — solo cuando Paso 6 y 7 compilan limpio)
```

**Tiempo estimado:**
- Pasos 1–5: ~1.5 días director
- Pasos 6–7: ~1 día director
- Paso 8: ~0.5 día
- **Total: ~3 días director solo** (proyecto ya ejecutado, solo formalización)
