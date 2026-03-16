import math

# ==============================================================================
# CONFIGURACIÓN DEL ANÁLISIS HIDRÁULICO
# ==============================================================================
# --- CONSTANTES ---
G = 9.81
RHO_GLICOL = 1050
MU_GLICOL = 0.0015 # Viscosidad puede ser mayor a baja temp. (Pa·s)

# --- PARÁMETROS DEL CIRCUITO DE SERVIDORES (Estimaciones para el ejemplo) ---
Q_REQUERIDO_M3_S = 85 / 3600  # 85 m³/h
DIAMETRO_TUBERIA_M = 0.1023  # Tubería de 4 pulgadas (DN100)
LONGITUD_TUBERIA_M = 50      # Longitud total del circuito a través de los racks
RUGOSIDAD_ACERO_M = 0.000046
# Suma de coeficientes de pérdidas menores (muy importante, esto es solo un ejemplo)
# Incluye codos, expansiones, contracciones y la pérdida a través de los servidores.
SUM_K_ACCESORIOS = 25.0 

# ==============================================================================
# MÓDULO DE CÁLCULO DE PÉRDIDAS (DARCY-WEISBACH)
# ==============================================================================
# Nota: La función de Colebrook se omitió por brevedad, se usa un 'f' asumido.
# En un caso real, implementaríamos un solver para Colebrook como en el script anterior.

def calcular_altura_requerida_por_gravedad(caudal_m3_s, diametro_m, longitud_m, rugosidad_m, sum_k):
    """
    Calcula la altura (H) necesaria para mover un caudal (Q) por gravedad
    venciendo las pérdidas de carga de un sistema.
    """
    # 1. Calcular propiedades del flujo
    area = math.pi * (diametro_m**2) / 4
    velocidad = caudal_m3_s / area
    
    reynolds = (RHO_GLICOL * velocidad * diametro_m) / MU_GLICOL
    
    # En un script real, resolveríamos Colebrook para 'f'. 
    # Aquí asumimos un valor típico para flujo turbulento.
    if reynolds > 4000:
        factor_friccion = 0.02 # Asunción para flujo turbulento
    else:
        factor_friccion = 64 / reynolds # Flujo laminar
        
    # 2. Calcular las pérdidas de carga (h_L)
    perdida_friccion = factor_friccion * (longitud_m / diametro_m) * (velocidad**2) / (2 * G)
    perdida_accesorios = sum_k * (velocidad**2) / (2 * G)
    
    # La cabeza de velocidad a la salida (v²/2g)
    cabeza_velocidad_salida = (velocidad**2) / (2*G)
    
    # 3. Calcular la altura total requerida
    altura_total_m = perdida_friccion + perdida_accesorios + cabeza_velocidad_salida
    
    print("--- ANÁLISIS HIDRÁULICO POR GRAVEDAD ---")
    print(f"Caudal de diseño: {caudal_m3_s * 3600:.2f} m³/h")
    print(f"Velocidad del fluido: {velocidad:.2f} m/s")
    print(f"Número de Reynolds: {reynolds:,.0f}")
    print(f"Pérdida por fricción (tuberías): {perdida_friccion:.2f} m")
    print(f"Pérdida por accesorios (servidores, codos): {perdida_accesorios:.2f} m")
    print(f"Energía cinética a la salida: {cabeza_velocidad_salida:.2f} m")
    print("-" * 40)
    print(f"ALTURA TOTAL REQUERIDA (H): {altura_total_m:.2f} metros")
    print("-" * 40)
    
    return altura_total_m

# ==============================================================================
# EJECUCIÓN DEL ANÁLISIS
# ==============================================================================
if __name__ == "__main__":
    altura_necesaria = calcular_altura_requerida_por_gravedad(
        Q_REQUERIDO_M3_S, 
        DIAMETRO_TUBERIA_M, 
        LONGITUD_TUBERIA_M, 
        RUGOSIDAD_ACERO_M, 
        SUM_K_ACCESORIOS
    )
    
    # Conclusión para el cliente
    if altura_necesaria > 10:
        print("\nCONCLUSIÓN ESTRATÉGICA: La altura requerida es significativa.")
        print("Una solución por gravedad es técnicamente viable pero puede ser estructuralmente costosa.")
        print("Se debe evaluar contra alternativas como un sistema de bombeo con UPS dedicado.")
    else:
        print("\nCONCLUSIÓN ESTRATÉGICA: La altura requerida es moderada.")
        print("Una solución por gravedad es una opción robusta y altamente confiable a considerar.")
