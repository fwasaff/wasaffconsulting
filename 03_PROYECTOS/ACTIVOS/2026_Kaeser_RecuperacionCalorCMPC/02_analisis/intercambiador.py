# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
intercambiador.py — Análisis ε-NTU del intercambiador de aislamiento hidráulico.

Método: ε-NTU contracorriente (Incropera & DeWitt, Cap. 11).

Aplicación MSC 005:
  - Herencia de ComponenteHidraulico (ABC, Clase 01)
  - DatosInsuficientesError cuando faltan TODOs del cliente (Clase 01)
  - @registrar_calculo (Clase 02)
  - @validar_temperatura como guardia de parámetros de entrada (Clase 02)
"""

import numpy as np
from dataclasses import dataclass

from componente import ComponenteHidraulico
from excepciones import DatosInsuficientesError
from decoradores import registrar_calculo, validar_temperatura
from fluido import PropiedadesAgua


@dataclass
class ResultadoIntercambiador:
    Q_real_kW: float
    Q_max_kW: float
    epsilon: float
    NTU: float
    C_min_W_K: float
    C_max_W_K: float
    C_r: float
    T_caliente_salida_C: float
    T_frio_salida_C: float
    UA_W_K: float


class IntercambiadorPlacas(ComponenteHidraulico):
    """
    Análisis ε-NTU de intercambiador de placas a contracorriente.

    Args:
        Q_kW: Calor disponible lado caliente [kW]
        T_caliente_entrada_C: Temperatura entrada lado caliente [°C]
        T_caliente_salida_C: Temperatura salida lado caliente [°C]
        T_frio_entrada_C: Temperatura entrada lado frío (agua CMPC) [°C]
        caudal_frio_m3h: Caudal lado frío [m³/h] — None si pendiente de confirmar
        fluido: Instancia de PropiedadesAgua
    """

    def __init__(
        self,
        Q_kW: float,
        T_caliente_entrada_C: float,
        T_caliente_salida_C: float,
        T_frio_entrada_C: float,
        fluido: PropiedadesAgua,
        caudal_frio_m3h: float = None,
    ):
        self.Q_kW = Q_kW
        self.T_h_in = T_caliente_entrada_C
        self.T_h_out = T_caliente_salida_C
        self.T_c_in = T_frio_entrada_C
        self.caudal_frio_m3h = caudal_frio_m3h
        self.fluido = fluido

    @property
    def nombre(self) -> str:
        return f"Intercambiador de placas ({self.Q_kW:.0f} kW)"

    @registrar_calculo
    @validar_temperatura(T_min=0.0, T_max=100.0)
    def calcular(self) -> ResultadoIntercambiador:
        """Ejecuta el análisis ε-NTU."""

        if self.caudal_frio_m3h is None:
            raise DatosInsuficientesError(
                campo="caudal_frio_m3h",
                instruccion="confirmar caudal de diseño del circuito de agua CMPC con Kaeser",
            )

        Q_W = self.Q_kW * 1e3

        T_h_media = (self.T_h_in + self.T_h_out) / 2.0

        rho_frio  = self.fluido.densidad_kg_m3(T_C=self.T_c_in)
        cp_frio   = self.fluido.cp_J_kgK(T_C=self.T_c_in)
        m_dot_frio = self.caudal_frio_m3h * rho_frio / 3600.0

        cp_caliente = self.fluido.cp_J_kgK(T_C=T_h_media)
        dT_caliente = self.T_h_in - self.T_h_out
        m_dot_caliente = Q_W / (cp_caliente * dT_caliente)

        C_caliente = m_dot_caliente * cp_caliente
        C_frio     = m_dot_frio     * cp_frio
        C_min = min(C_caliente, C_frio)
        C_max = max(C_caliente, C_frio)
        C_r   = C_min / C_max

        T_c_out  = self.T_c_in + Q_W / C_frio
        Q_max_W  = C_min * (self.T_h_in - self.T_c_in)
        epsilon  = Q_W / Q_max_W

        # NTU contracorriente (Incropera ec. 11.29, invertida)
        if abs(C_r - 1.0) < 1e-6:
            NTU = epsilon / (1.0 - epsilon)
        else:
            NTU = np.log((epsilon - 1.0) / (epsilon * C_r - 1.0)) / (C_r - 1.0)

        return ResultadoIntercambiador(
            Q_real_kW=Q_W / 1e3,
            Q_max_kW=Q_max_W / 1e3,
            epsilon=epsilon,
            NTU=NTU,
            C_min_W_K=C_min,
            C_max_W_K=C_max,
            C_r=C_r,
            T_caliente_salida_C=self.T_h_out,
            T_frio_salida_C=T_c_out,
            UA_W_K=NTU * C_min,
        )
