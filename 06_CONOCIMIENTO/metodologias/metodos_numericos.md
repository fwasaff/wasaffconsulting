# Metodología: Métodos Numéricos Aplicados a Física

**Versión:** 1.0
**Fecha:** 2026-03-16
**Aplicable a:** Solución numérica de EDOs, sistemas lineales y no lineales, integración, interpolación, implementación de modelos físicos
**Validada en:** Múltiples proyectos de docencia e investigación

---

## Selección del método por tipo de problema

| Problema | Método recomendado | Biblioteca Python |
|----------|--------------------|-------------------|
| EDO sistema de primer orden | RK45 adaptativo | `scipy.integrate.solve_ivp` |
| EDO stiff (escalas de tiempo muy diferentes) | BDF o Radau | `scipy.integrate.solve_ivp(method='BDF')` |
| Sistema lineal Ax = b (denso) | Descomposición LU | `scipy.linalg.lu_solve` |
| Sistema lineal (simétrico positivo definido) | Cholesky | `scipy.linalg.cho_solve` |
| Sistema lineal (sparse, grande) | GMRES / spsolve | `scipy.sparse.linalg` |
| Ecuación no lineal f(x) = 0 | Newton-Raphson | `scipy.optimize.fsolve` |
| Optimización sin restricciones | L-BFGS-B | `scipy.optimize.minimize` |
| Integración numérica | Cuadratura adaptativa | `scipy.integrate.quad` |
| Interpolación de datos | Spline cúbico | `scipy.interpolate.CubicSpline` |

---

## Pasos generales para implementar un modelo físico

### 1. Formular el problema matemáticamente
- Identificar las variables dependientes e independientes
- Escribir las ecuaciones (EDOs, ecuaciones algebraicas, condiciones de contorno)
- Listar las hipótesis y simplificaciones — dejarlas **explícitas**

### 2. Adimensionalizar (si aplica)
Reduce errores numéricos y facilita la interpretación:
```python
# Ejemplo: adimensionalizar tiempo con escala τ
t_nd = t / tau
x_nd = x / L
```

### 3. Implementar con SciPy
```python
from scipy.integrate import solve_ivp
import numpy as np

def sistema(t, y, params):
    """
    Descripción física del sistema.
    y: [variable1, variable2, ...]
    params: dict con parámetros físicos
    """
    dy0 = ...  # ecuación 1
    dy1 = ...  # ecuación 2
    return [dy0, dy1]

# Resolver
sol = solve_ivp(
    fun=lambda t, y: sistema(t, y, params),
    t_span=(t0, tf),
    y0=condiciones_iniciales,
    method='RK45',
    rtol=1e-6,
    atol=1e-9,
    dense_output=True
)
```

### 4. Validar el resultado
Siempre validar contra al menos uno de:
- Solución analítica exacta (si existe)
- Caso límite conocido
- Datos experimentales del cliente
- Resultado publicado en literatura

**Si no hay forma de validar, declararlo explícitamente en el informe.**

### 5. Análisis de sensibilidad
¿Cómo cambia el resultado si los parámetros de entrada varían ±10%?
```python
# Perturbación de parámetros
for delta in [-0.1, 0, 0.1]:
    params_mod = {k: v*(1+delta) for k,v in params.items()}
    sol_mod = solve_ivp(...)
    print(f"Δparam={delta*100}%: resultado={sol_mod.y[-1,-1]:.4f}")
```

---

## Parámetros clave de control numérico

| Parámetro | Recomendado | Nota |
|-----------|------------|------|
| `rtol` (tolerancia relativa) | 1e-6 | Bajar a 1e-8 para sistemas stiff |
| `atol` (tolerancia absoluta) | 1e-9 | Ajustar según escala de las variables |
| Paso máximo `max_step` | `(tf-t0)/1000` | Evitar pasos demasiado grandes |

---

## Advertencias

- **Overflow/underflow**: revisar escala de variables. Adimensionalizar si hay diferencias de orden de magnitud
- **Convergencia de Newton-Raphson**: requiere estimación inicial razonable. Probar con múltiples puntos de partida
- **Condicionamiento de matrices**: si `np.linalg.cond(A) > 1e10`, el sistema es mal condicionado — revisar formulación
- **RK45 no es para sistemas stiff**: si el solucionador tarda o falla, intentar BDF o Radau

---

## Scripts asociados
*(por crear)*
- `scripts_reutilizables/python/ode_solver_template.py`
- `scripts_reutilizables/python/newton_raphson.py`
- `scripts_reutilizables/python/sensitivity_analysis.py`

---

## Referencias
- Press et al. *Numerical Recipes*, 3rd ed. Cambridge University Press.
- SciPy documentation: https://docs.scipy.org/doc/scipy/reference/integrate.html
- Hairer, E. & Wanner, G. *Solving Ordinary Differential Equations II: Stiff Problems*, Springer.
