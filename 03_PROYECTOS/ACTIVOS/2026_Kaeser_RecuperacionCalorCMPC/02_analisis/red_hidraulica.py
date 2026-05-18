# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
red_hidraulica.py — Cálculo de pérdidas de carga por Darcy-Weisbach + Colebrook-White.

Fuente: White, F.M., Fluid Mechanics, 8ª ed., Cap. 6.
        Moody, L.F., Trans. ASME, 1944.

Aplicación MSC 005:
  - Herencia de ComponenteHidraulico (ABC, Clase 01)
  - Protocolo iterador __iter__/__next__ sobre los tramos (Clase 03)
  - @verificar_convergencia para Colebrook-White (Clase 02)
  - ConvergenciaError con diagnóstico claro (Clase 01)
"""

import numpy as np
from dataclasses import dataclass, field
from typing import List, Iterator

from componente import ComponenteHidraulico
from excepciones import ConvergenciaError, DatosInsuficientesError
from decoradores import registrar_calculo, verificar_convergencia


@dataclass
class Tramo:
    """Define un tramo de tubería de la red."""
    nombre: str
    diametro_nominal: str
    diametro_interno_m: float
    longitud_m: float
    rugosidad_m: float = 4.6e-5        # Acero comercial (White, Tabla 6.1)
    longitud_equiv_accesorios_m: float = 0.0  # TODO: Felipe — estimar de P&ID
    caudal_fijo_m3s: float = None      # None → usar caudal total del escenario

    @property
    def longitud_total_m(self) -> float:
        return self.longitud_m + self.longitud_equiv_accesorios_m


@dataclass
class ResultadoRed:
    dP_total_Pa: float
    dP_total_bar: float
    tramos: list = field(default_factory=list)


class RedHidraulica(ComponenteHidraulico):
    """
    Calcula la pérdida de carga total de la red hidráulica.

    Implementa el protocolo iterador para poder iterar sobre los tramos:
        for tramo_resultado in red:
            print(tramo_resultado)

    Args:
        compresores: IDs de compresores activos en el escenario
        datos_compresores: Dict con parámetros de cada compresor
    """

    NU_AGUA_m2_s = 6.9e-7  # viscosidad cinemática ~37.5 °C
    # TODO: Felipe — obtener de PropiedadesAgua a temperatura real de operación

    def __init__(self, compresores: List[str], datos_compresores: dict):
        self._compresores = compresores
        self._datos = datos_compresores
        self._resultados_tramos: list = []
        self.dP_total_bar: float = 0.0

    @property
    def nombre(self) -> str:
        return f"Red hidráulica ({len(self._compresores)} compresores activos)"

    # ── Protocolo iterador (Clase 03 MSC 005) ─────────────────────────────────
    # RedHidraulica es iterable sobre los resultados de sus tramos.
    # Patrón: __iter__ delega en iter() de la lista interna.

    def __iter__(self) -> Iterator[dict]:
        return iter(self._resultados_tramos)

    def __len__(self) -> int:
        return len(self._resultados_tramos)

    # ── Colebrook-White con @verificar_convergencia ───────────────────────────

    @verificar_convergencia(tolerancia=1e-8, max_iter=100)
    def _iterar_colebrook(
        self, Re: float, rugosidad_m: float, D_m: float
    ) -> tuple:
        """
        Resuelve Colebrook-White por Newton-Raphson.

        Returns:
            (f, residuo_final, iteraciones) — requerido por @verificar_convergencia
        """
        if Re < 2300:
            return 64.0 / Re, 0.0, 1

        # Estimación inicial: Swamee-Jain
        f = 0.25 / (np.log10(rugosidad_m / (3.7 * D_m) + 5.74 / Re**0.9))**2

        residuo = float("inf")
        k = 0
        for k in range(100):
            rhs = -2.0 * np.log10(rugosidad_m / (3.7 * D_m) + 2.51 / (Re * np.sqrt(f)))
            f_nuevo = 1.0 / rhs**2
            residuo = abs(f_nuevo - f)
            f = f_nuevo
            if residuo < 1e-8:
                break

        return f, residuo, k + 1

    def _calcular_tramo(self, tramo: Tramo, caudal_default_m3s: float) -> dict:
        caudal_m3s = tramo.caudal_fijo_m3s if tramo.caudal_fijo_m3s is not None else caudal_default_m3s
        A_m2 = np.pi * tramo.diametro_interno_m**2 / 4.0
        v_m_s = caudal_m3s / A_m2
        Re = v_m_s * tramo.diametro_interno_m / self.NU_AGUA_m2_s

        f = self._iterar_colebrook(Re, tramo.rugosidad_m, tramo.diametro_interno_m)

        rho_kg_m3 = 997.0  # TODO: Felipe — obtener de PropiedadesAgua a T real
        dP_Pa = f * (tramo.longitud_total_m / tramo.diametro_interno_m) * rho_kg_m3 * v_m_s**2 / 2.0

        return {
            "nombre": tramo.nombre,
            "v_m_s": v_m_s,
            "Re": Re,
            "regimen": "laminar" if Re < 2300 else "turbulento",
            "f_darcy": f,
            "dP_Pa": dP_Pa,
            "dP_bar": dP_Pa * 1e-5,
        }

    # Topología fija (plano P-645-CL-4-22_43-4853, 2023)
    # Bloque 1: FSD575 (izquierda) — Bloque 2: DSDX305 + ESD445 (derecha)
    _BLOQUE_1 = ("FSD575_1", "FSD575_2", "FSD575_3")
    _BLOQUE_2 = ("DSDX305_4", "DSDX305_5", "ESD445_6")

    # Diámetros ASME B36.10M Sch40 (m)
    _DN65_ID  = 2.469 * 0.0254   # = 0.06271 m — ramales individuales
    _DN100_ID = 4.026 * 0.0254   # = 0.10226 m — colectores y circuito principal

    @registrar_calculo
    def calcular(self) -> ResultadoRed:
        """
        Calcula ΔP total sobre el circuito primario (agua Kaeser).
        Topología real: 11 tramos del plano P-645-CL-4-22_43-4853.
        Longitudes estimadas; confirmar con medición en obra.
        Después del cálculo, la red es iterable: `for t in red: print(t)`.
        """
        caudal_total_m3h = sum(self._datos[c]["caudal_m3h"] for c in self._compresores)
        caudal_total_m3s = caudal_total_m3h / 3600.0

        # Flujos individuales por compresor activo
        Q_ind = {
            c: self._datos[c]["caudal_m3h"] / 3600.0
            for c in self._compresores
        }

        Q_b1 = sum(Q_ind.get(c, 0.0) for c in self._BLOQUE_1 if c in self._compresores)
        Q_b2 = sum(Q_ind.get(c, 0.0) for c in self._BLOQUE_2 if c in self._compresores)

        tramos = []

        # T1–T6: ramales individuales DN65 × 8 m (solo compresores activos)
        etiquetas = [
            ("FSD575_1",  1), ("FSD575_2",  2), ("FSD575_3",  3),
            ("DSDX305_4", 4), ("DSDX305_5", 5), ("ESD445_6",  6),
        ]
        for comp_id, idx in etiquetas:
            if comp_id in self._compresores:
                tramos.append(Tramo(
                    nombre=f"T{idx} — {comp_id} → colector",
                    diametro_nominal="DN65",
                    diametro_interno_m=self._DN65_ID,
                    longitud_m=8.0,
                    caudal_fijo_m3s=Q_ind[comp_id],
                ))

        # T7–T8: colectores de bloque DN100 × 12 m
        if Q_b1 > 0:
            tramos.append(Tramo(
                nombre="T7 — Colector bloque FSD575",
                diametro_nominal="DN100",
                diametro_interno_m=self._DN100_ID,
                longitud_m=12.0,
                caudal_fijo_m3s=Q_b1,
            ))
        if Q_b2 > 0:
            tramos.append(Tramo(
                nombre="T8 — Colector bloque DSDX/ESD",
                diametro_nominal="DN100",
                diametro_interno_m=self._DN100_ID,
                longitud_m=12.0,
                caudal_fijo_m3s=Q_b2,
            ))

        # T9–T11: circuito principal DN100
        tramos += [
            Tramo("T9 — Colector sala → acumuladores", "DN100",
                  self._DN100_ID, 20.0, caudal_fijo_m3s=caudal_total_m3s),
            Tramo("T10 — Acumuladores → bomba",        "DN100",
                  self._DN100_ID, 15.0, caudal_fijo_m3s=caudal_total_m3s),
            Tramo("T11 — Bomba → distribución",        "DN100",
                  self._DN100_ID,  8.0, caudal_fijo_m3s=caudal_total_m3s),
        ]

        self._resultados_tramos = []
        dP_total_Pa = 0.0

        for tramo in tramos:
            res = self._calcular_tramo(tramo, caudal_total_m3s)
            self._resultados_tramos.append(res)
            dP_total_Pa += res["dP_Pa"]

        dP_compresores_bar = max(self._datos[c]["dP_bar"] for c in self._compresores)
        dP_total_Pa += dP_compresores_bar * 1e5
        self.dP_total_bar = dP_total_Pa * 1e-5

        return ResultadoRed(
            dP_total_Pa=dP_total_Pa,
            dP_total_bar=self.dP_total_bar,
            tramos=self._resultados_tramos,
        )
