import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# **Parámetros del sistema**
V_tanque = 1.7  # Volumen del tanque en m³ (1700 litros)
densidad_glicol = 1050  # kg/m³ (aproximado)
Cp_glicol = 4.186  # kJ/kg·K (aproximado para mezcla de glicol)
flujo_m3_h = 85  # Flujo volumétrico en m³/h
flujo_m3_s = flujo_m3_h / 3600  # Conversión a m³/s
flujo_kg_s = flujo_m3_s * densidad_glicol  # Flujo másico en kg/s
Q_kW = 495  # Carga térmica en kW
Q_kJ_s = Q_kW * 1000  # Conversión a kJ/s

tiempo_simulacion = 300  # Simulación por 5 minutos (300 segundos)
intervalos = np.arange(0, tiempo_simulacion, 1)  # Paso de tiempo de 1 segundo

# **Condiciones iniciales**
m_tanque = V_tanque * densidad_glicol  # Masa total del glicol en el tanque en kg
temperatura_tanque = 12.0  # Temperatura inicial del glicol en °C
temperatura_retorno = 17.0  # Temperatura del glicol que regresa

temperaturas = []  # Lista para almacenar temperaturas en el tiempo

# **Simulación**
for t in intervalos:
    # Energía añadida al tanque en 1 segundo
    Q_in = Q_kJ_s  # Energía térmica aportada por los servidores en kJ
    
    # Masa total después de la entrada del flujo nuevo
    m_total = m_tanque + flujo_kg_s
    
    # Balance térmico: mezcla de glicol caliente con glicol del tanque
    energia_total = (m_tanque * Cp_glicol * temperatura_tanque) + (flujo_kg_s * Cp_glicol * temperatura_retorno) + Q_in
    nueva_temp = energia_total / (m_total * Cp_glicol)
    
    # Actualizar temperatura del tanque
    temperatura_tanque = nueva_temp
    temperaturas.append(temperatura_tanque)
    
    # Condición de salida si la temperatura excede 17°C
    if temperatura_tanque >= 17:
        break

print(temperaturas)

# **Generar gráfico**
plt.figure(figsize=(8, 5))
plt.plot(intervalos[:len(temperaturas)], temperaturas, label="Temperatura del Glicol", color='b')
plt.axhline(y=17, color='r', linestyle='--', label="Límite Máximo (17°C)")
plt.axhline(y=12, color='g', linestyle='--', label="Temperatura Inicial (12°C)")
plt.xlabel("Tiempo (segundos)")
plt.ylabel("Temperatura del Glicol (°C)")
plt.title("Evolución de la Temperatura del Glicol en el Tanque de 1700 L")
plt.legend()
plt.grid()
plt.show()

# **Generar tabla de datos**
df_simulacion = pd.DataFrame({"Tiempo (s)": intervalos[:len(temperaturas)], "Temperatura (°C)": temperaturas})

# Mostrar la tabla de simulación
print(df_simulacion.head(10))  # Mostrar primeras 10 filas

