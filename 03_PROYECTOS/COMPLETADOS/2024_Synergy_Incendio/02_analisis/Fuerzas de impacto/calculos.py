import math
import pandas as pd

# Constantes
g = 9.81  # Aceleración de la gravedad en m/s^2
density_steel = 7850  # Densidad del acero en kg/m^3
newton_to_kgf = 0.10197  # Conversión de Newton a kgf
mps_to_kmph = 3.6  # Conversión de m/s a km/h

# Datos de Schedule y Diámetros para Sch 10, 20, 30, 40
pipe_data = {
    "1/2": {"diameter_mm": 12.7, "sch": {10: 1.65, 20: 2.10, 30: 2.41, 40: 2.77}, "decimal_diameter": 0.5},
    "3/4": {"diameter_mm": 19.05, "sch": {10: 1.65, 20: 2.10, 30: 2.87, 40: 2.87}, "decimal_diameter": 0.75},
    "1": {"diameter_mm": 25.4, "sch": {10: 1.65, 20: 2.77, 30: 3.38, 40: 3.38}, "decimal_diameter": 1.0},
    "1-1/4": {"diameter_mm": 31.75, "sch": {10: 1.65, 20: 2.77, 30: 3.56, 40: 3.56}, "decimal_diameter": 1.25},
    "1-1/2": {"diameter_mm": 38.1, "sch": {10: 1.65, 20: 2.77, 30: 3.68, 40: 3.68}, "decimal_diameter": 1.5},
    "2": {"diameter_mm": 50.8, "sch": {10: 2.11, 20: 2.77, 30: 3.91, 40: 3.91}, "decimal_diameter": 2.0},
    "2-1/2": {"diameter_mm": 63.5, "sch": {10: 2.11, 20: 3.05, 30: 4.78, 40: 5.16}, "decimal_diameter": 2.5},
    "3": {"diameter_mm": 76.2, "sch": {10: 2.11, 20: 3.05, 30: 5.49, 40: 5.49}, "decimal_diameter": 3.0},
    "4": {"diameter_mm": 101.6, "sch": {10: 2.11, 20: 2.77, 30: 6.35, 40: 6.35}, "decimal_diameter": 4.0},
    "5": {"diameter_mm": 127.0, "sch": {10: 2.77, 20: 3.40, 30: 7.11, 40: 7.11}, "decimal_diameter": 5.0},
    "6": {"diameter_mm": 152.4, "sch": {10: 2.77, 20: 3.40, 30: 7.11, 40: 7.11}, "decimal_diameter": 6.0},
    "8": {"diameter_mm": 203.2, "sch": {10: 2.77, 20: 3.76, 30: 8.18, 40: 8.18}, "decimal_diameter": 8.0},
    "10": {"diameter_mm": 254.0, "sch": {10: 3.40, 20: 4.19, 30: 9.27, 40: 9.27}, "decimal_diameter": 10.0},
    "12": {"diameter_mm": 304.8, "sch": {10: 3.96, 20: 4.78, 30: 10.31, 40: 10.31}, "decimal_diameter": 12.0},
}

# Alturas de caída en metros
heights = range(1, 16)

# Función para calcular el volumen de la tubería
def calculate_volume(outer_diameter, thickness, length=1.0):
    inner_diameter = outer_diameter - 2 * thickness
    outer_volume = math.pi * (outer_diameter / 2)**2 * length
    inner_volume = math.pi * (inner_diameter / 2)**2 * length
    return outer_volume - inner_volume

# Función para calcular la masa de la tubería
def calculate_mass(volume, density=density_steel):
    return volume * density

# Función para calcular la velocidad de impacto
def calculate_impact_velocity(height, gravity=g):
    return math.sqrt(2 * gravity * height) * mps_to_kmph  # Convertir a km/h

# Función para calcular la fuerza de impacto
def calculate_impact_force(mass, velocity, stopping_distance=0.01):
    force_newtons = (mass * (velocity / mps_to_kmph)**2) / (2 * stopping_distance)  # Convertir de km/h a m/s para el cálculo
    return force_newtons * newton_to_kgf  # Convertir de Newtons a kgf

# Realizar los cálculos para cada combinación de tubería, sch, y altura
results = []

for size, properties in pipe_data.items():
    outer_diameter_m = properties["diameter_mm"] / 1000  # Convertir de mm a metros
    decimal_diameter = properties["decimal_diameter"]
    for sch, thickness_mm in properties["sch"].items():
        thickness_m = thickness_mm / 1000  # Convertir de mm a metros
        volume = calculate_volume(outer_diameter_m, thickness_m)
        mass = calculate_mass(volume)
        
        for height in heights:
            velocity = calculate_impact_velocity(height)
            force = calculate_impact_force(mass, velocity)
            
            results.append({
                "Schedule": sch,
                "Diámetro (pulgadas)": size,
                "Diámetro Decimal (pulgadas)": decimal_diameter,
                "Altura de caída (m)": height,
                "Masa (kg)": round(mass, 2),
                "Velocidad de impacto (km/h)": round(velocity, 2),
                "Fuerza de impacto (kgf)": round(force, 2)
            })

# Convertir resultados a DataFrame, ordenarlos por Schedule y guardarlos en un archivo CSV
df = pd.DataFrame(results)
df = df.sort_values(by=["Schedule", "Diámetro (pulgadas)", "Altura de caída (m)"])  # Ordenar por Schedule

# Guardar el DataFrame en un archivo CSV
df.to_csv('fuerza_impacto_tuberias_sch10_40_ordenado.csv', index=False)

# Mostrar los primeros registros del DataFrame ordenado
print(df.head(20))  # Muestra las primeras 20 filas para una mejor visualización

