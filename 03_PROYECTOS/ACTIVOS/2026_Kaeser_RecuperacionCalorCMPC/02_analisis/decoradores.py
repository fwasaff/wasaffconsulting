# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
decoradores.py — Decoradores de validación y registro para el proyecto.

Aplicación de Clase 02 MSC 005:
  - Decorador simple (@registrar_calculo)
  - Decorador con parámetros, 3 capas (@validar_temperatura, @validar_positivo)
  - @functools.wraps para preservar __name__ y __doc__

Patrón de 3 capas (Pizarro):
    def decorador_fabrica(param):       # capa 1: recibe parámetros
        def decorador(func):            # capa 2: recibe la función
            @wraps(func)
            def wrapper(*args, **kwargs):  # capa 3: envuelve la ejecución
                ...
            return wrapper
        return decorador
    return decorador_fabrica
"""

import functools
import time

from excepciones import FueraDeRangoError


# ─── Decorador simple ──────────────────────────────────────────────────────────

def registrar_calculo(func):
    """
    Registra inicio, fin y tiempo de ejecución de un método calcular().

    Uso:
        @registrar_calculo
        def calcular(self): ...
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        nombre = func.__qualname__
        print(f"  → {nombre} ...", end=" ", flush=True)
        t0 = time.perf_counter()
        resultado = func(*args, **kwargs)
        dt_ms = (time.perf_counter() - t0) * 1000
        print(f"OK ({dt_ms:.1f} ms)")
        return resultado
    return wrapper


# ─── Decoradores con parámetros (3 capas) ─────────────────────────────────────

def validar_temperatura(T_min: float = 0.0, T_max: float = 100.0):
    """
    Valida que todos los argumentos con nombre T_*_C estén en el rango [T_min, T_max].

    Uso:
        @validar_temperatura(T_min=0.0, T_max=100.0)
        def metodo(self, T_entrada_C, T_salida_C): ...
    """
    def decorador(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for nombre_arg, valor in kwargs.items():
                if nombre_arg.startswith("T_") and nombre_arg.endswith("_C"):
                    if not (T_min <= valor <= T_max):
                        raise FueraDeRangoError(
                            nombre=nombre_arg,
                            valor=valor,
                            rango=(T_min, T_max),
                            unidad="°C",
                        )
            return func(*args, **kwargs)
        return wrapper
    return decorador


def validar_positivo(*nombres_arg):
    """
    Valida que los argumentos indicados sean estrictamente positivos.

    Uso:
        @validar_positivo("caudal_m3h", "dP_total_bar")
        def __init__(self, caudal_m3h, dP_total_bar): ...
    """
    def decorador(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for nombre in nombres_arg:
                if nombre in kwargs and kwargs[nombre] <= 0:
                    raise FueraDeRangoError(
                        nombre=nombre,
                        valor=kwargs[nombre],
                        rango=(0, float("inf")),
                    )
            return func(*args, **kwargs)
        return wrapper
    return decorador


def verificar_convergencia(tolerancia: float = 1e-8, max_iter: int = 100):
    """
    Verifica que una función iterativa haya convergido.

    La función decorada debe retornar una tupla (resultado, residuo_final, iteraciones).
    Si residuo_final > tolerancia, lanza ConvergenciaError.

    Uso:
        @verificar_convergencia(tolerancia=1e-8, max_iter=100)
        def _iterar_colebrook(self, ...):
            ...
            return f, residuo, k  # (resultado, residuo, iteraciones)
    """
    from excepciones import ConvergenciaError

    def decorador(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            resultado, residuo, iteraciones = func(*args, **kwargs)
            if residuo > tolerancia:
                raise ConvergenciaError(
                    metodo=func.__qualname__,
                    iteraciones=iteraciones,
                    residuo=residuo,
                    tol=tolerancia,
                )
            return resultado
        return wrapper
    return decorador


if __name__ == "__main__":
    # Validación de los decoradores
    from excepciones import FueraDeRangoError, ConvergenciaError

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def funcion_test(T_entrada_C, T_salida_C):
        return T_entrada_C + T_salida_C

    print("Test validar_temperatura OK:", funcion_test(T_entrada_C=25.0, T_salida_C=50.0))

    try:
        funcion_test(T_entrada_C=130.0, T_salida_C=50.0)
    except FueraDeRangoError as e:
        print("FueraDeRangoError capturado correctamente:", e)

    @registrar_calculo
    def funcion_lenta():
        time.sleep(0.01)
        return 42

    result = funcion_lenta()
    print("registrar_calculo — resultado:", result)
