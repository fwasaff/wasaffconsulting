# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
excepciones.py — Jerarquía de excepciones personalizadas del proyecto.

Aplicación de Clase 01 MSC 005:
  Excepciones personalizadas con herencia. El prof. Pizarro lo motivó con
  "la simulación que corre 3 días y cae por una excepción no capturada" —
  aquí cada error tiene nombre propio para que el traceback sea diagnóstico.

Jerarquía:
  WasaffError (base)
    ├── DatosInsuficientesError   ← falta información del cliente
    ├── FueraDeRangoError         ← parámetro fuera de rango físico válido
    ├── ConvergenciaError         ← método iterativo no convergió
    └── EscenarioNoDefinidoError  ← escenario sin compresores asignados
"""


class WasaffError(Exception):
    """Excepción base de WASAFF Consulting. Todos los errores del proyecto heredan de aquí."""


class DatosInsuficientesError(WasaffError):
    """
    El cálculo no puede ejecutarse porque falta un dato del cliente.

    Cuándo usar: cuando un TODO: Felipe no ha sido completado y el código
    intenta usar ese valor. Mejor un error claro que un resultado silencioso errado.

    Ejemplo:
        raise DatosInsuficientesError(
            "caudal_frio_m3h", "confirmar caudal de diseño agua CMPC con Kaeser"
        )
    """

    def __init__(self, campo: str, instruccion: str = ""):
        self.campo = campo
        self.instruccion = instruccion
        msg = f"Dato faltante: '{campo}'."
        if instruccion:
            msg += f" Acción requerida: {instruccion}"
        super().__init__(msg)


class FueraDeRangoError(WasaffError):
    """
    Un parámetro físico está fuera del rango válido del modelo.

    Cuándo usar: temperatura fuera de las tablas de propiedades,
    Re < 0, caudal negativo, etc.

    Ejemplo:
        raise FueraDeRangoError("T_C", valor=130.0, rango=(0.0, 100.0), unidad="°C")
    """

    def __init__(self, nombre: str, valor: float, rango: tuple, unidad: str = ""):
        self.nombre = nombre
        self.valor = valor
        self.rango = rango
        self.unidad = unidad
        msg = (
            f"'{nombre}' = {valor} {unidad} fuera del rango válido "
            f"[{rango[0]}, {rango[1]}] {unidad}."
        )
        super().__init__(msg)


class ConvergenciaError(WasaffError):
    """
    Un método iterativo no convergió dentro de la tolerancia requerida.

    Cuándo usar: Colebrook-White no converge, Newton-Raphson diverge, etc.

    Ejemplo:
        raise ConvergenciaError("Colebrook-White", iteraciones=100, residuo=1e-4, tol=1e-8)
    """

    def __init__(self, metodo: str, iteraciones: int, residuo: float, tol: float):
        self.metodo = metodo
        self.iteraciones = iteraciones
        self.residuo = residuo
        self.tol = tol
        msg = (
            f"'{metodo}' no convergió en {iteraciones} iteraciones. "
            f"Residuo final: {residuo:.2e} (tolerancia: {tol:.2e})."
        )
        super().__init__(msg)


class EscenarioNoDefinidoError(WasaffError):
    """
    Se intentó calcular un escenario sin compresores asignados.

    Ejemplo:
        raise EscenarioNoDefinidoError("maximo")
    """

    def __init__(self, nombre_escenario: str):
        self.nombre_escenario = nombre_escenario
        super().__init__(
            f"Escenario '{nombre_escenario}' no tiene compresores definidos. "
            f"Completar ESCENARIOS en main.py."
        )
