# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
bomba.py — Dimensionamiento de la bomba de circulación.

Aplicación MSC 005:
  - Herencia de ComponenteHidraulico (ABC, Clase 01)
  - @validar_positivo en __init__ (Clase 02)
  - @registrar_calculo (Clase 02)
"""

from dataclasses import dataclass

from componente import ComponenteHidraulico
from decoradores import registrar_calculo, validar_positivo


@dataclass
class ResultadoBomba:
    caudal_m3h: float
    altura_manometrica_m: float
    potencia_hidraulica_W: float
    potencia_electrica_estimada_W: float
    eficiencia_estimada: float
    configuracion_recomendada: str
    notas: str


class BombaCirculacion(ComponenteHidraulico):
    """
    Dimensiona la bomba de circulación del circuito Kaeser.

    Args:
        caudal_m3h: Caudal requerido [m³/h]
        dP_total_bar: Pérdida de carga total de la red [bar]
        eficiencia_bomba: Eficiencia hidráulica estimada [-]
    """

    RHO_AGUA_kg_m3 = 997.0
    G_m_s2 = 9.81

    @validar_positivo("caudal_m3h", "dP_total_bar")
    def __init__(
        self,
        caudal_m3h: float,
        dP_total_bar: float,
        eficiencia_bomba: float = 0.65,
    ):
        self.caudal_m3h   = caudal_m3h
        self.dP_total_bar = dP_total_bar
        self.eficiencia   = eficiencia_bomba

    @property
    def nombre(self) -> str:
        return f"Bomba de circulación ({self.caudal_m3h:.1f} m³/h)"

    @registrar_calculo
    def calcular(self) -> ResultadoBomba:
        caudal_m3s       = self.caudal_m3h / 3600.0
        dP_Pa            = self.dP_total_bar * 1e5
        altura_m         = dP_Pa / (self.RHO_AGUA_kg_m3 * self.G_m_s2)
        P_hidraulica_W   = dP_Pa * caudal_m3s
        P_electrica_W    = P_hidraulica_W / self.eficiencia

        return ResultadoBomba(
            caudal_m3h=self.caudal_m3h,
            altura_manometrica_m=altura_m,
            potencia_hidraulica_W=P_hidraulica_W,
            potencia_electrica_estimada_W=P_electrica_W,
            eficiencia_estimada=self.eficiencia,
            configuracion_recomendada="central",  # TODO: Felipe — decidir individual vs central
            notas=(
                "Punto de operación para escenario normal (comp. 1-2-4). "
                "TODO: Felipe — verificar curva de bomba para escenarios mínimo y máximo, "
                "y confirmar configuración individual vs. central con Kaeser."
            ),
        )
