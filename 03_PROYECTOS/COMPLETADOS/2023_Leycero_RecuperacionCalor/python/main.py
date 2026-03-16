import math
from fluido import Fluido
from tuberia import Tuberia
from calculos_hidraulicos import CalculosHidraulicos

def main():
    # Crear un objeto Fluido con una temperatura específica (por ejemplo, 25 °C)
    fluido = Fluido(25)

    # Longitudes de los tramos de tubería
    longitud_AB = 10  # metros
    longitud_BC = 15  # metros
    longitud_CD = 8   # metros

    # Crear tramo de tubería AB con velocidad deseada de 3.6 m/s
    diametro_AB = 0.0635  # Diámetro en metros (equivalente a 1 pulgada)
    flujo_AB = 3.6 * (3.1416 * (diametro_AB / 2) ** 2)  # Calcular flujo en función de la velocidad deseada y el área de flujo
    tramo_AB = Tuberia("1 pulgada", longitud_AB, fluido, diametro=diametro_AB, flujo=flujo_AB)

    # Calcular otros parámetros hidráulicos para el tramo AB
    numero_reynolds_AB = CalculosHidraulicos.calcular_numero_reynolds(tramo_AB)
    factor_fraccion_AB = CalculosHidraulicos.calcular_factor_fraccion(tramo_AB)
    perdida_rozamiento_AB = CalculosHidraulicos.calcular_perdida_por_rozamiento(tramo_AB)
    caida_presion_AB = CalculosHidraulicos.calcular_caida_presion_por_longitud(tramo_AB)

    # Imprimir información del tramo AB
    print("Tramo AB:")
    print("Velocidad: {} m/s".format(3.6))  # Velocidad deseada
    print("Número de Reynolds: {}".format(numero_reynolds_AB))
    print("Factor de fricción: {}".format(factor_fraccion_AB))
    print("Pérdida por rozamiento: {} Pa".format(perdida_rozamiento_AB))
    print("Caida de presión por longitud: {} Pa/m".format(caida_presion_AB))

    # Repite el proceso para otros tramos de tubería (BC y CD) si es necesario

if __name__ == "__main__":
    main()

