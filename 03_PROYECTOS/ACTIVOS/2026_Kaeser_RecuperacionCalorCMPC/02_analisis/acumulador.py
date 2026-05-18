# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
acumulador.py — Dimensionamiento del vaso de expansión.

Fuente: Reflex Winkelmann, "Dimensionamiento de vasos de expansión", 2020.

Aplicación MSC 005:
  - Herencia de ComponenteHidraulico (ABC, Clase 01)
  - @registrar_calculo (Clase 02)
"""

from dataclasses import dataclass

from componente import ComponenteHidraulico
from decoradores import registrar_calculo


@dataclass
class ResultadoAcumulador:
    volumen_total_L: float
    volumen_util_L: float
    presion_precarga_bar: float
    presion_max_bar: float
    notas: str


class Acumulador(ComponenteHidraulico):
    """
    Dimensiona el vaso de expansión para el circuito cerrado.

    Args:
        Q_kW: Calor total del circuito [kW]
        caudal_m3h: Caudal de diseño [m³/h]
    """

    def __init__(self, Q_kW: float, caudal_m3h: float):
        self.Q_kW       = Q_kW
        self.caudal_m3h = caudal_m3h

    @property
    def nombre(self) -> str:
        return f"Acumulador hidráulico ({self.Q_kW:.0f} kW)"

    @registrar_calculo
    def calcular(self) -> ResultadoAcumulador:
        # PRELIMINAR — requiere volumen real del sistema
        # TODO: Felipe — obtener volumen total de tuberías + intercambiador del layout
        V_sistema_L       = self.caudal_m3h * 5.0   # estimación preliminar
        coef_expansion    = 0.035                    # agua 20 °C → 60 °C ≈ 3.5%
        V_expansion_L     = V_sistema_L * coef_expansion
        presion_precarga  = 1.5   # TODO: Felipe — confirmar con altura estática
        presion_max       = 4.0   # TODO: Felipe — confirmar con válvula de seguridad
        factor_aceptacion = 1.0 - presion_precarga / presion_max
        V_total_L         = V_expansion_L / factor_aceptacion * 1.3  # margen 30%

        return ResultadoAcumulador(
            volumen_total_L=V_total_L,
            volumen_util_L=V_expansion_L,
            presion_precarga_bar=presion_precarga,
            presion_max_bar=presion_max,
            notas=(
                "PRELIMINAR — requiere volumen real del sistema (geometría tuberías + "
                "intercambiador) y rango de temperatura de operación. "
                "TODO: Felipe — confirmar con layout definitivo."
            ),
        )
