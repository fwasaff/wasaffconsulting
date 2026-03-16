import pygame
import sys
import math
import matplotlib.pyplot as plt

# Inicialización de Pygame
pygame.init()

# Dimensiones de la ventana de Pygame
width, height = 800, 600
window = pygame.display.set_mode((width, height))
pygame.display.set_caption("Simulación de Caída de Tubería")

# Colores
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)

# Variables de la simulación
g = 9.81  # Aceleración de la gravedad en m/s^2
time_step = 0.05  # Intervalo de tiempo en segundos, más pequeño para una simulación más lenta
velocity = 0  # Velocidad inicial
y_position = 0  # Posición inicial de la tubería en metros (altura máxima)
y_max_position = 16  # Altura máxima de caída en metros
mass = 10  # Masa de la tubería en kg (esto puede cambiarse)
stopping_distance = 0.01  # Distancia de detención en metros
newton_to_kgf = 0.10197  # Conversión de Newton a kgf
mps_to_kmph = 3.6  # Conversión de m/s a km/h

# Datos para gráficos
heights = []
velocities = []
forces = []

# Función para calcular la fuerza de impacto
def calculate_impact_force(mass, velocity, stopping_distance):
    force_newtons = (mass * velocity**2) / (2 * stopping_distance)
    return force_newtons * newton_to_kgf  # Convertir de Newton a kgf

# Función para calcular la velocidad y posición
def update_physics(y_position, velocity, time_step):
    velocity += g * time_step
    y_position += velocity * time_step
    return y_position, velocity

# Bucle principal de la simulación
running = True
while running:
    window.fill(white)

    # Procesar eventos
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Actualizar la física de la tubería
    y_position, velocity = update_physics(y_position, velocity, time_step)
    force = calculate_impact_force(mass, velocity, stopping_distance)

    # Dibujar la tubería de manera horizontal (convertir altura a píxeles)
    y_pixel_position = (y_position / y_max_position) * 500
    pygame.draw.rect(window, red, pygame.Rect(350, y_pixel_position, 100, 20))

    # Almacenar datos para gráficos
    heights.append(y_position)
    velocities.append(velocity * mps_to_kmph)  # Convertir de m/s a km/h
    forces.append(force)

    # Actualizar la pantalla
    pygame.display.flip()

    # Introducir un pequeño retraso para ralentizar la simulación
    pygame.time.delay(50)  # Retardo en milisegundos

    # Si la tubería llega al suelo (por ejemplo, 16 metros de caída), detener la simulación
    if y_position >= y_max_position:
        running = False

# Terminar la simulación y cerrar Pygame
pygame.quit()

# Mostrar los gráficos de Fuerza vs Altura y Velocidad vs Altura
plt.figure(figsize=(12, 6))

# Gráfico 1: Fuerza de Impacto (kgf) vs Altura de Caída (m)
plt.subplot(1, 2, 1)
plt.plot(heights, forces, label='Fuerza de Impacto (kgf)', color='orange')
plt.title('Fuerza de Impacto vs Altura')
plt.xlabel('Altura (m)')
plt.ylabel('Fuerza de Impacto (kgf)')
plt.grid(True)

# Gráfico 2: Velocidad (km/h) vs Altura de Caída (m)
plt.subplot(1, 2, 2)
plt.plot(heights, velocities, label='Velocidad (km/h)', color='blue')
plt.title('Velocidad vs Altura')
plt.xlabel('Altura (m)')
plt.ylabel('Velocidad (km/h)')
plt.grid(True)

plt.tight_layout()
plt.show()

