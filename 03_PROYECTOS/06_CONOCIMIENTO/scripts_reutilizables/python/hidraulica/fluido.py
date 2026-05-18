import math

class Fluido:
    """
    Propiedades termofísicas del agua líquida en función de la temperatura.

    Fuentes:
      - Densidad: Kell (1975) — válida 0–100°C, error < 0.003 kg/m³
      - Viscosidad dinámica: Vogel-Fulcher-Tammann (ASHRAE Handbook of Fundamentals)
      - Conductividad térmica: correlación polinómica NIST (0–100°C)
      - Calor específico: correlación NIST (0–100°C)
    """

    def __init__(self, temperatura):
        self.temperatura = temperatura          # °C
        self.densidad                = self._densidad()
        self.viscosidad_dinamica     = self._viscosidad_dinamica()
        self.viscosidad_cinematica   = self.viscosidad_dinamica / self.densidad
        self.cp                      = self._cp()          # J/(kg·K)
        self.conductividad_termica   = self._conductividad_termica()  # W/(m·K)
        self.prandtl                 = (self.viscosidad_dinamica * self.cp) / self.conductividad_termica

    def _densidad(self):
        """
        Fórmula de Kell (1975):
          ρ = (A + B·T + C·T² + D·T³ + E·T⁴ + F·T⁵) / (1 + G·T)
        Válida 0–100°C, presión atmosférica. Unidades: kg/m³.
        """
        T = self.temperatura
        num = (999.83952
               + 16.945176   * T
               - 7.9870401e-3 * T**2
               - 46.170461e-6 * T**3
               + 105.56302e-9 * T**4
               - 280.54253e-12 * T**5)
        den = 1.0 + 16.87985e-3 * T
        return num / den

    def _viscosidad_dinamica(self):
        """
        Ecuación de Andrade modificada (Vogel):
          μ [Pa·s] = 2.414×10⁻⁵ × 10^(247.8 / (T_K - 140))
        Válida 0–370°C.
        """
        T_K = self.temperatura + 273.15
        return 2.414e-5 * (10.0 ** (247.8 / (T_K - 140.0)))

    def _cp(self):
        """
        Calor específico del agua [J/(kg·K)].
        Correlación polinómica ajustada a datos NIST (0–100°C).
        """
        T = self.temperatura
        return (4217.6
                - 3.820 * T
                + 0.0537 * T**2
                - 2.31e-4 * T**3)

    def _conductividad_termica(self):
        """
        Conductividad térmica del agua [W/(m·K)].
        Correlación ASHRAE (0–100°C).
        """
        T = self.temperatura
        return 0.5650 + 1.858e-3 * T - 7.95e-6 * T**2

    def __repr__(self):
        return (f"Fluido(T={self.temperatura}°C, "
                f"ρ={self.densidad:.2f} kg/m³, "
                f"μ={self.viscosidad_dinamica*1000:.4f} mPa·s, "
                f"cp={self.cp:.1f} J/(kg·K), "
                f"k={self.conductividad_termica:.4f} W/(m·K), "
                f"Pr={self.prandtl:.2f})")
