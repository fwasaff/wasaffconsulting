import math

class CalculosHidraulicos:

    @staticmethod
    def reynolds(tuberia):
        """Número de Reynolds adimensional."""
        v = tuberia.velocidad
        return (v * tuberia.diametro) / tuberia.fluido.viscosidad_cinematica

    @staticmethod
    def factor_friccion(tuberia):
        """
        Factor de fricción de Darcy-Weisbach via Colebrook-White (iterativo).
        Válido para flujo turbulento (Re > 4000).
        Para Re < 2300 usa f = 64/Re (Hagen-Poiseuille).
        """
        Re = CalculosHidraulicos.reynolds(tuberia)
        eps = tuberia.rugosidad
        D = tuberia.diametro

        if Re < 2300:
            return 64.0 / Re

        # Estimación inicial: Swamee-Jain
        f = 0.25 / (math.log10(eps / (3.7 * D) + 5.74 / Re**0.9))**2

        for _ in range(150):
            f_new = (-2.0 * math.log10(eps / (3.7 * D) + 2.51 / (Re * math.sqrt(f))))**-2
            if abs(f - f_new) < 1e-8:
                break
            f = f_new
        return f_new

    @staticmethod
    def perdida_friccion(tuberia):
        """
        Pérdida de carga por fricción en metros de columna de agua (mca).
        Ecuación de Darcy-Weisbach: hf = f * (L/D) * v²/(2g)
        """
        f = CalculosHidraulicos.factor_friccion(tuberia)
        v = tuberia.velocidad
        L = tuberia.longitud
        D = tuberia.diametro
        return f * (L / D) * (v**2 / (2 * 9.81))

    @staticmethod
    def caida_presion(tuberia):
        """Caída de presión en Pa. ΔP = ρ·g·hf"""
        hf = CalculosHidraulicos.perdida_friccion(tuberia)
        return tuberia.fluido.densidad * 9.81 * hf

    @staticmethod
    def caida_presion_kpa(tuberia):
        """Caída de presión en kPa."""
        return CalculosHidraulicos.caida_presion(tuberia) / 1000.0

    @staticmethod
    def resumen(tuberia):
        """Retorna dict con todos los resultados para un tramo."""
        if tuberia.flujo == 0.0:
            return {
                "nombre": tuberia.nombre, "DN": tuberia.diametro_nominal,
                "L_m": tuberia.longitud, "Q_m3h": 0.0, "v_ms": 0.0,
                "Re": 0.0, "regimen": "sin flujo", "f_darcy": 0.0,
                "hf_mca": 0.0, "dP_kPa": 0.0,
            }
        Re = CalculosHidraulicos.reynolds(tuberia)
        f  = CalculosHidraulicos.factor_friccion(tuberia)
        hf = CalculosHidraulicos.perdida_friccion(tuberia)
        dP = CalculosHidraulicos.caida_presion_kpa(tuberia)
        regimen = "laminar" if Re < 2300 else ("transición" if Re < 4000 else "turbulento")
        return {
            "nombre":           tuberia.nombre,
            "DN":               tuberia.diametro_nominal,
            "L_m":              tuberia.longitud,
            "Q_m3h":            tuberia.flujo * 3600,
            "v_ms":             tuberia.velocidad,
            "Re":               Re,
            "regimen":          regimen,
            "f_darcy":          f,
            "hf_mca":           hf,
            "dP_kPa":           dP,
        }
