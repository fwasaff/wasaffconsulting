import math

class Tuberia:
    # Diccionario con las dimensiones de tuberías de acero cédula 80 en metros
    DIMENSIONES_CEDULA_80 = {
        "1 pulgada": {"interno": 0.957 * 0.0254, "externo": 1.315 * 0.0254},
        "1 pulgada y cuarto": {"interno": 1.278 * 0.0254, "externo": 1.660 * 0.0254},
        "1 pulgada y media": {"interno": 1.500 * 0.0254, "externo": 1.900 * 0.0254},
        "2 pulgadas": {"interno": 1.939 * 0.0254, "externo": 2.375 * 0.0254},
        "2 pulgadas y media": {"interno": 2.323 * 0.0254, "externo": 2.875 * 0.0254}
    }

    RUGOSIDAD_ACERO = 0.00015  # Rugosidad en metros





    def __init__(self, tamano_nominal, longitud, fluido):
        self.establecer_dimensiones(tamano_nominal)
        self.longitud = longitud
        self.material = "Acero"
        self.tipo = "Cédula 80"
        self.rugosidad = Tuberia.RUGOSIDAD_ACERO
        self.fluido = fluido

    def establecer_dimensiones(self, tamano_nominal):
        if tamano_nominal in Tuberia.DIMENSIONES_CEDULA_80:
            dimensiones = Tuberia.DIMENSIONES_CEDULA_80[tamano_nominal]
            self.diametro_interno = dimensiones["interno"]
            self.diametro_externo = dimensiones["externo"]
        else:
            raise ValueError("Tamaño nominal no soportado")

    def calcular_area_flujo(self):
        """Calcula el área de flujo interna de la tubería."""
        radio_interno = self.diametro_interno / 2
        area_flujo = 3.1416 * (radio_interno ** 2)
        return area_flujo
