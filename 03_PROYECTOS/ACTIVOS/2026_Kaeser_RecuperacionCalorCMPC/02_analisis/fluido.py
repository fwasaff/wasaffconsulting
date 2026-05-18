# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
fluido.py — Propiedades termofísicas del agua líquida en función de temperatura.

Fuente de correlaciones: ASHRAE Fundamentals Handbook (2021).
Rango válido: 0 °C – 100 °C a presión atmosférica.

Aplicación MSC 005:
  - Encapsulación: tabla de datos privada (_TABLA), acceso solo por métodos públicos.
  - FueraDeRangoError en lugar de ValueError genérico (excepciones.py).
  - @validar_temperatura (decoradores.py) como guardia de rango en cada propiedad.
"""

import numpy as np

from excepciones import FueraDeRangoError
from decoradores import validar_temperatura


class PropiedadesAgua:
    """Propiedades termofísicas del agua líquida por interpolación lineal sobre tabla ASHRAE."""

    # T [°C] | rho [kg/m³] | mu [mPa·s] | cp [J/(kg·K)] | k [W/(m·K)] | Pr [-]
    _TABLA = np.array([
        [  0,  999.8, 1.792, 4218, 0.561, 13.47],
        [  5,  999.9, 1.519, 4202, 0.571, 11.21],
        [ 10,  999.7, 1.308, 4192, 0.580,  9.45],
        [ 15,  999.1, 1.138, 4186, 0.589,  8.09],
        [ 20,  998.2, 1.002, 4182, 0.598,  7.01],
        [ 25,  997.0, 0.890, 4180, 0.607,  6.13],
        [ 30,  995.7, 0.798, 4178, 0.615,  5.42],
        [ 40,  992.2, 0.653, 4175, 0.631,  4.32],
        [ 50,  988.1, 0.547, 4181, 0.644,  3.55],
        [ 60,  983.2, 0.467, 4184, 0.654,  2.99],
        [ 70,  977.8, 0.404, 4190, 0.663,  2.55],
        [ 80,  971.8, 0.355, 4196, 0.670,  2.22],
        [ 90,  965.3, 0.315, 4205, 0.675,  1.96],
        [100,  958.4, 0.282, 4216, 0.679,  1.75],
    ])
    _T_REF = _TABLA[:, 0]
    _T_MIN, _T_MAX = 0.0, 100.0

    def _interpolar(self, T_C: float, col: int) -> float:
        if not (self._T_MIN <= T_C <= self._T_MAX):
            raise FueraDeRangoError("T_C", T_C, (self._T_MIN, self._T_MAX), "°C")
        return float(np.interp(T_C, self._T_REF, self._TABLA[:, col]))

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def densidad_kg_m3(self, T_C: float) -> float:
        """Densidad [kg/m³]."""
        return self._interpolar(T_C, 1)

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def viscosidad_Pa_s(self, T_C: float) -> float:
        """Viscosidad dinámica [Pa·s]."""
        return self._interpolar(T_C, 2) * 1e-3

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def cp_J_kgK(self, T_C: float) -> float:
        """Calor específico [J/(kg·K)]."""
        return self._interpolar(T_C, 3)

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def conductividad_W_mK(self, T_C: float) -> float:
        """Conductividad térmica [W/(m·K)]."""
        return self._interpolar(T_C, 4)

    @validar_temperatura(T_min=0.0, T_max=100.0)
    def prandtl(self, T_C: float) -> float:
        """Número de Prandtl [-]."""
        return self._interpolar(T_C, 5)

    def temperatura_media_C(self, T_entrada_C: float, T_salida_C: float) -> float:
        """Temperatura media aritmética [°C]."""
        return (T_entrada_C + T_salida_C) / 2.0


if __name__ == "__main__":
    agua = PropiedadesAgua()
    print("Validación PropiedadesAgua a 25 °C:")
    print(f"  rho = {agua.densidad_kg_m3(T_C=25.0):.1f} kg/m³   (ref: 997.0)")
    print(f"  mu  = {agua.viscosidad_Pa_s(T_C=25.0)*1e3:.3f} mPa·s (ref: 0.890)")
    print(f"  cp  = {agua.cp_J_kgK(T_C=25.0):.0f} J/(kg·K)   (ref: 4180)")
    print(f"  Pr  = {agua.prandtl(T_C=25.0):.2f}           (ref: 6.13)")

    try:
        agua.densidad_kg_m3(T_C=130.0)
    except Exception as e:
        print(f"\nFueraDeRangoError capturado: {e}")
