# Metodología: Análisis Térmico e Hidráulico para Sistemas Industriales

**Versión:** 1.0
**Fecha:** 2026-03-16
**Aplicable a:** Sistemas de recuperación de calor, dimensionamiento de redes de tuberías, intercambiadores, auditorías energéticas industriales
**Validada en:** WC-2023-001 (Papeles Cordillera / CMPC, 622 kW)

---

## Pasos

### 1. Levantamiento de datos de operación
Solicitar al cliente:
- Temperaturas de entrada y salida del fluido (°C)
- Caudal másico o volumétrico (kg/h o m³/h)
- Presión de operación (bar o kPa)
- Composición del fluido (agua, aceite térmico, aire, etc.)
- Plano o croquis de la instalación existente
- Datos de placa de los equipos (compresores, intercambiadores, etc.)

**Verificar:** que las unidades son consistentes. Convertir todo a SI antes de calcular.

### 2. Cálculo de demanda térmica (Q = mcΔT)

```
Q [W] = ṁ [kg/s] × Cp [J/kg·K] × ΔT [K]
```

Donde:
- `ṁ` = caudal másico
- `Cp` = calor específico del fluido (agua líquida: 4.186 kJ/kg·K)
- `ΔT` = diferencia entre temperatura de entrada y salida del proceso que se quiere satisfacer

**Para múltiples fuentes:** calcular Q de cada equipo por separado, luego sumar (verificar simultaneidad de operación).

### 3. Cálculo de pérdidas de presión (Darcy-Weisbach)

```
ΔP [Pa] = f × (L/D) × (ρv²/2)
```

Donde:
- `f` = factor de fricción (Moody chart o ecuación de Colebrook-White para flujo turbulento)
- `L` = longitud del tramo [m]
- `D` = diámetro interior de la tubería [m]
- `ρ` = densidad del fluido [kg/m³]
- `v` = velocidad del fluido [m/s]

**Pérdidas menores (K-factors):**
```
ΔP_menor = K × (ρv²/2)
```
Valores típicos de K: codo 90° = 0.9, válvula globo abierta = 10, tee = 1.8

**Modelar TODOS los tramos.** No subestimar pérdidas menores — en sistemas cortos pueden ser ≥30% del total.

### 4. Dimensionamiento de componentes

**Tuberías:**
- Velocidad recomendada: 1–3 m/s para líquidos, 15–25 m/s para vapor
- Seleccionar diámetro que satisfaga velocidad y pérdida de presión admisible

**Intercambiadores de calor:**
- Método LMTD o método ε-NTU
- Calcular área de transferencia: `Q = U × A × LMTD`
- Factor de incrustación (fouling): aplicar según fluido y temperatura

**Acumuladores/tanques:**
- Volumen según tiempo de autonomía requerido
- `V = Q_demanda × t_autonomía / (ρ × Cp × ΔT_útil)`

**Bomba:**
- Punto de operación: caudal requerido + presión diferencial total
- Incluir margen del 10–15% sobre el cálculo teórico

### 5. Validación del balance energético

```
Q_fuentes ≥ Q_demanda × factor_seguridad (1.10 – 1.20)
```

Verificar:
- El balance de energía cierra
- La bomba seleccionada puede vencer la pérdida de presión total
- Los materiales de tuberías e intercambiadores son compatibles con el fluido y temperatura

---

## Parámetros clave

| Parámetro | Valor típico | Unidad | Nota |
|-----------|-------------|--------|------|
| Cp agua líquida (50°C) | 4.182 | kJ/kg·K | Varía levemente con temperatura |
| Densidad agua (60°C) | 983 | kg/m³ | |
| Velocidad fluido en tuberías | 1 – 3 | m/s | Para agua en sistemas industriales |
| Factor seguridad Q | 1.10 – 1.20 | — | Aplicar sobre demanda calculada |
| Eficiencia intercambiador | 0.70 – 0.90 | — | Depende de tipo y condiciones |

---

## Advertencias

- **No asumir Cp constante** en rangos amplios de temperatura — usar tablas de propiedades
- **Relevamiento in situ** es siempre mejor que datos de placa: los equipos envejecen y sus rendimientos reales difieren
- **Simultaneidad de operación**: si los equipos no operan todos al mismo tiempo, calcular el peor caso y el caso promedio
- **Pérdidas al ambiente**: en instalaciones con tuberías largas o mal aisladas, incluir pérdidas por conducción/convección al entorno
- **Compatibilidad química**: verificar que el fluido no ataque las juntas, intercambiadores o acumuladores

---

## Scripts asociados
*(por crear)*
- `scripts_reutilizables/python/darcy_weisbach.py`
- `scripts_reutilizables/python/balance_termico.py`

---

## Referencias
- Incropera, F.P. et al. *Fundamentals of Heat and Mass Transfer*, 7th ed. Wiley, 2011.
- Crane Co. *Flow of Fluids Through Valves, Fittings and Pipes* (Technical Paper 410)
- Norma ASHRAE para sistemas de transferencia de calor
