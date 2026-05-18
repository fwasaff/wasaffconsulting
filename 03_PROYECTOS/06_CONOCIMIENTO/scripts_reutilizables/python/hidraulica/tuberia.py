import math

class Tuberia:
    # Dimensiones internas/externas en metros (acero cédula 40 — estándar hidráulico industrial)
    # Fuente: ASME B36.10M, Schedule 40
    DIMENSIONES_CEDULA_40 = {
        "1 pulgada":        {"interno": 1.049 * 0.0254, "externo": 1.315 * 0.0254},
        "1.25 pulgadas":    {"interno": 1.380 * 0.0254, "externo": 1.660 * 0.0254},
        "1.5 pulgadas":     {"interno": 1.610 * 0.0254, "externo": 1.900 * 0.0254},
        "2 pulgadas":       {"interno": 2.067 * 0.0254, "externo": 2.375 * 0.0254},
        "2.5 pulgadas":     {"interno": 2.469 * 0.0254, "externo": 2.875 * 0.0254},
        "3 pulgadas":       {"interno": 3.068 * 0.0254, "externo": 3.500 * 0.0254},
        "4 pulgadas":       {"interno": 4.026 * 0.0254, "externo": 4.500 * 0.0254},
        "6 pulgadas":       {"interno": 6.065 * 0.0254, "externo": 6.625 * 0.0254},
    }

    # Cédula 80 mantenida por compatibilidad con cálculos originales
    DIMENSIONES_CEDULA_80 = {
        "1 pulgada":        {"interno": 0.957 * 0.0254, "externo": 1.315 * 0.0254},
        "1.25 pulgadas":    {"interno": 1.278 * 0.0254, "externo": 1.660 * 0.0254},
        "1.5 pulgadas":     {"interno": 1.500 * 0.0254, "externo": 1.900 * 0.0254},
        "2 pulgadas":       {"interno": 1.939 * 0.0254, "externo": 2.375 * 0.0254},
        "2.5 pulgadas":     {"interno": 2.323 * 0.0254, "externo": 2.875 * 0.0254},
        "3 pulgadas":       {"interno": 2.900 * 0.0254, "externo": 3.500 * 0.0254},
        "4 pulgadas":       {"interno": 3.826 * 0.0254, "externo": 4.500 * 0.0254},
        "6 pulgadas":       {"interno": 5.761 * 0.0254, "externo": 6.625 * 0.0254},
    }

    RUGOSIDAD_ACERO = 0.000046  # metros — acero comercial (ASHRAE Handbook)

    def __init__(self, nombre, longitud, fluido, cedula=40, flujo=None, diametro_nominal=None):
        """
        nombre         : str  — etiqueta del tramo (ej: "T1 - Compresor C1 a colector")
        longitud       : float — metros
        fluido         : Fluido
        cedula         : int  — 40 o 80 (default 40)
        flujo          : float — m³/s (requerido)
        diametro_nominal: str — clave en el diccionario de dimensiones (ej: "2.5 pulgadas")
        """
        self.nombre = nombre
        self.longitud = longitud
        self.fluido = fluido
        self.material = "Acero"
        self.cedula = cedula
        self.rugosidad = self.RUGOSIDAD_ACERO

        tabla = self.DIMENSIONES_CEDULA_40 if cedula == 40 else self.DIMENSIONES_CEDULA_80

        if diametro_nominal is not None:
            if diametro_nominal not in tabla:
                raise ValueError(f"Diámetro '{diametro_nominal}' no está en cédula {cedula}. "
                                 f"Opciones: {list(tabla.keys())}")
            dims = tabla[diametro_nominal]
            self.diametro_nominal = diametro_nominal
            self.diametro_interno = dims["interno"]
            self.diametro_externo = dims["externo"]
        else:
            raise ValueError("Se debe especificar 'diametro_nominal'.")

        # diametro es el diámetro hidráulico (= interno para tuberías circulares)
        self.diametro = self.diametro_interno

        if flujo is None:
            raise ValueError(f"Se debe especificar 'flujo' en m³/s para el tramo '{nombre}'.")
        self.flujo = flujo  # m³/s

    @property
    def area_flujo(self):
        return math.pi * (self.diametro_interno / 2) ** 2

    @property
    def velocidad(self):
        return self.flujo / self.area_flujo

    def __repr__(self):
        return (f"Tuberia('{self.nombre}', "
                f"DN={self.diametro_nominal}, "
                f"L={self.longitud}m, "
                f"Q={self.flujo*3600:.1f} m³/h, "
                f"v={self.velocidad:.2f} m/s)")
