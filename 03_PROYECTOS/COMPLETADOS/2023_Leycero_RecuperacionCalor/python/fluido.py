import math

class Fluido:
    def __init__(self, temperatura):
        # Inicializar la instancia con la temperatura proporcionada
        self.temperatura = temperatura
        # Calcular y almacenar la densidad del fluido
        self.densidad = self.calcular_densidad()
        # Calcular y almacenar la viscosidad dinámica
        self.viscosidad_dinamica = self.calcular_viscosidad_dinamica()
        # Calcular y almacenar la viscosidad cinemática
        self.viscosidad_cinematica = self.calcular_viscosidad_cinematica()
    
    def calcular_densidad(self):
        # Coeficientes para una correlación polinómica de la densidad del agua
        # Estos coeficientes son específicos para una cierta gama de temperaturas
        A = 999.83952
        B = 16.945176
        C = -7.9870401e-3
        D = -46.170461e-6
        E = 105.56302e-9
        F = -280.54253e-12
        # Cálculo de la densidad usando la correlación polinómica
        densidad = A + B * self.temperatura + C * self.temperatura**2 + D * self.temperatura**3 + E * self.temperatura**4 + F * self.temperatura**5
        return densidad

    def calcular_viscosidad_dinamica(self):
        # Constantes empíricas para la correlación de Andrade
        G = 2.414e-5
        H = 247.8
        # Conversión de temperatura a Kelvin
        T_kelvin = self.temperatura + 273.15
        # Cálculo de la viscosidad dinámica
        mu = G * math.exp(H / T_kelvin)
        return mu

    def calcular_viscosidad_cinematica(self):
        # Calcular la viscosidad dinámica
        mu = self.calcular_viscosidad_dinamica()
        # Calcular la viscosidad cinemática dividiendo la viscosidad dinámica por la densidad
        nu = mu / self.densidad
        return nu


