import math
from fluido import Fluido  # Importar la clase Fluido desde el módulo fluido
from tuberia import Tuberia  # Importar la clase Tuberia desde el módulo tuberia

class CalculosHidraulicos:
    @staticmethod
    def calcular_velocidad(tuberia):
        # Calcular el área seccional de la tubería
        area_seccional = 3.1416 * (tuberia.diametro_interno / 2) ** 2
        # Calcular la velocidad del fluido en la tubería
        return tuberia.flujo / area_seccional

    @staticmethod
    def calcular_numero_reynolds(tuberia):
        # Calcular la velocidad del fluido en la tubería
        velocidad = CalculosHidraulicos.calcular_velocidad(tuberia)
        # Calcular el número de Reynolds para el flujo en la tubería
        return (tuberia.fluido.densidad * velocidad * tuberia.diametro) / tuberia.fluido.viscosidad_cinematica

    @staticmethod
    def calcular_factor_fraccion(tuberia):
        # Asumiendo una rugosidad absoluta típica para acero cédula 80
        epsilon = 0.000045
        Re = CalculosHidraulicos.calcular_numero_reynolds(tuberia)
        f = 0.02
        for _ in range(100):
            # Cálculo iterativo del factor de fricción utilizando la ecuación de Colebrook-White
            f_new = (-2 * math.log10((epsilon / tuberia.diametro) / 3.7 + 2.51 / (Re * math.sqrt(f))))**-2
            if abs(f - f_new) < 1e-6:  # Condición de convergencia
                break
            f = f_new
        return f

    @staticmethod
    def calcular_perdida_por_rozamiento(tuberia):
        # Calcular el factor de fricción para la tubería
        f = CalculosHidraulicos.calcular_factor_fraccion(tuberia)
        # Calcular la velocidad del fluido en la tubería
        velocidad = CalculosHidraulicos.calcular_velocidad(tuberia)
        # Calcular la pérdida por rozamiento en la tubería utilizando la ecuación de Darcy-Weisbach
        perdida_rozamiento = f * (tuberia.longitud / tuberia.diametro) * (velocidad**2 / (2 * 9.81))
        return perdida_rozamiento

    @staticmethod
    def calcular_caida_presion_por_longitud(tuberia):
        # Calcular la caída de presión por longitud en la tubería
        factor_fraccion = CalculosHidraulicos.calcular_factor_fraccion(tuberia)
        velocidad = CalculosHidraulicos.calcular_velocidad(tuberia)
        caida_presion = (factor_fraccion / tuberia.diametro) * ((tuberia.fluido.densidad * velocidad**2) / 2)
        return caida_presion

