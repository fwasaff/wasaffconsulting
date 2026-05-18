# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# y Papeles Cordillera S.A. (CMPC) para uso interno.
# Prohibida la distribución o modificación sin autorización escrita.
#
# Proyecto: Sistema de Recuperación de Calor — Sala Compresores Kaeser
# Cliente:  Kaeser Compresores de Chile SpA / Papeles Cordillera (CMPC Puente Alto)
# Director: Felipe Wasaff — WASAFF Consulting
# Fecha:    2026-04-12
#
# Aplicación MSC 005 — Clase 03: Pipeline de generadores
#   Patrón del taller capstone (prof. Pizarro):
#     fuente → filtro → cálculo → reporte
#   Aquí:
#     escenarios_configurados() → calcular_escenario() → formatear_resultado()
#
#   Cada etapa es un generador: evaluación perezosa, O(1) en memoria,
#   fácil de extender sin tocar las otras etapas.

from pathlib import Path
from typing import Iterator

from fluido import PropiedadesAgua
from intercambiador import IntercambiadorPlacas
from red_hidraulica import RedHidraulica
from bomba import BombaCirculacion
from acumulador import Acumulador
from resultados import generar_reporte
from excepciones import WasaffError, DatosInsuficientesError

# ─────────────────────────────────────────────────────────────────────────────
# PARÁMETROS DE ENTRADA DEL CLIENTE
# Solo modificar este bloque para actualizar todos los cálculos.
# ─────────────────────────────────────────────────────────────────────────────

COMPRESORES = {
    "FSD575_1":  {"Q_kW": 246, "caudal_m3h": 8.61, "dP_bar": 0.40, "flange": "DN50"},
    "FSD575_2":  {"Q_kW": 246, "caudal_m3h": 8.61, "dP_bar": 0.40, "flange": "DN50"},
    "FSD575_3":  {"Q_kW": 246, "caudal_m3h": 8.61, "dP_bar": 0.40, "flange": "DN50",
                  "es_respaldo": True},
    "DSDX305_4": {"Q_kW": 130, "caudal_m3h": 4.50, "dP_bar": 0.25, "flange": "DN40"},
    "DSDX305_5": {"Q_kW": 130, "caudal_m3h": 4.50, "dP_bar": 0.25, "flange": "DN40"},
    "ESD445_6":  {"Q_kW": 196, "caudal_m3h": 6.71, "dP_bar": 0.40, "flange": "DN40"},
}

ESCENARIOS = {
    "normal":  ["FSD575_1", "FSD575_2", "DSDX305_4"],  # 80% del tiempo → 622 kW
    "minimo":  ["DSDX305_4"],                           # 1 compresor pequeño — confirmar con Kaeser
    "maximo":  ["FSD575_1", "FSD575_2", "DSDX305_4",   # todos excepto FSD575_3 (respaldo)
                "DSDX305_5", "ESD445_6"],               # → 948 kW
}

AGUA_CMPC = {
    "T_entrada_C": 6.0,       # temperatura mínima agua industrial (invierno)
    "caudal_m3h":  27.0,      # circuito secundario — Q_normal/(ρ·cp·ΔT), ΔT=20°C
    # Fuente: WC-2023-001 Leycero, plano P-645-CL-4-22_43-4853.
    # Confirmar con medición en planta antes de dimensionamiento definitivo.
}

T_KAESER_ENTRADA_C = 25.0   # temperatura entrada agua al colector Kaeser [°C]
T_KAESER_SALIDA_C  = 50.0   # temperatura salida colector — ΔT=25 K (datasheets Kaeser)

# ─────────────────────────────────────────────────────────────────────────────
# PIPELINE DE GENERADORES (Clase 03 MSC 005)
# ─────────────────────────────────────────────────────────────────────────────

def escenarios_configurados(escenarios: dict) -> Iterator[tuple]:
    """
    Generador — ETAPA 1: fuente del pipeline.

    Filtra los escenarios que tienen compresores definidos.
    Los no configurados se reportan y se omiten sin abortar el pipeline.

    Yields:
        (nombre_escenario, lista_compresores)
    """
    for nombre, compresores in escenarios.items():
        if compresores:
            yield nombre, compresores
        else:
            print(f"  [omitido] Escenario '{nombre}': sin compresores — completar ESCENARIOS en main.py")


def calcular_escenario(
    nombre: str,
    compresores_activos: list,
    fluido: PropiedadesAgua,
) -> Iterator[tuple]:
    """
    Generador — ETAPA 2: cálculo.

    Para cada escenario recibido, instancia y calcula todos los componentes.
    Captura DatosInsuficientesError para reportar TODOs sin abortar el pipeline.

    Yields:
        (nombre_escenario, dict_resultados)
    """
    Q_total_kW     = sum(COMPRESORES[c]["Q_kW"]      for c in compresores_activos)
    caudal_total   = sum(COMPRESORES[c]["caudal_m3h"] for c in compresores_activos)

    componentes = {
        "intercambiador": IntercambiadorPlacas(
            Q_kW=Q_total_kW,
            T_caliente_entrada_C=T_KAESER_SALIDA_C,
            T_caliente_salida_C=T_KAESER_ENTRADA_C,
            T_frio_entrada_C=AGUA_CMPC["T_entrada_C"],
            caudal_frio_m3h=AGUA_CMPC["caudal_m3h"],
            fluido=fluido,
        ),
        "red": RedHidraulica(compresores_activos, COMPRESORES),
        "bomba": None,      # se instancia después de conocer dP de la red
        "acumulador": Acumulador(Q_kW=Q_total_kW, caudal_m3h=caudal_total),
    }

    resultados = {"Q_total_kW": Q_total_kW, "caudal_total_m3h": caudal_total}

    for nombre_comp, comp in componentes.items():
        if comp is None:
            continue
        try:
            resultados[nombre_comp] = comp.calcular()
        except DatosInsuficientesError as e:
            print(f"    [pendiente] {nombre_comp}: {e}")
            resultados[nombre_comp] = None

    # Bomba requiere dP de la red — se calcula solo si la red tuvo éxito
    if resultados.get("red") is not None:
        bomba = BombaCirculacion(
            caudal_m3h=caudal_total,
            dP_total_bar=resultados["red"].dP_total_bar,
        )
        try:
            resultados["bomba"] = bomba.calcular()
        except DatosInsuficientesError as e:
            print(f"    [pendiente] bomba: {e}")
            resultados["bomba"] = None

    yield nombre, resultados


def formatear_resultado(nombre: str, res: dict) -> Iterator[str]:
    """
    Generador — ETAPA 3: formato para consola.

    Convierte el dict de resultados en líneas de texto para el log.

    Yields:
        str — una línea del reporte por vez
    """
    yield f"\n{'='*60}"
    yield f"ESCENARIO: {nombre.upper()}"
    yield f"  Calor disponible : {res['Q_total_kW']:.1f} kW"
    yield f"  Caudal circuito  : {res['caudal_total_m3h']:.2f} m³/h"

    if res.get("intercambiador"):
        ix = res["intercambiador"]
        yield f"  Intercambiador   : ε={ix.epsilon:.3f}  NTU={ix.NTU:.3f}  UA={ix.UA_W_K:.0f} W/K"
        yield f"                     T_fría_salida={ix.T_frio_salida_C:.1f} °C"

    if res.get("red"):
        yield f"  Red hidráulica   : ΔP_total={res['red'].dP_total_bar*1e3:.1f} mbar"
        # Iterador sobre los tramos (protocolo __iter__ de RedHidraulica)
        for tramo in res["red"].tramos:
            yield f"    {tramo['nombre']:<40} Re={tramo['Re']:.0f}  ΔP={tramo['dP_bar']*1e3:.1f} mbar"

    if res.get("bomba"):
        b = res["bomba"]
        yield f"  Bomba            : {b.caudal_m3h:.1f} m³/h  H={b.altura_manometrica_m:.2f} mca  P={b.potencia_electrica_estimada_W/1e3:.2f} kW"

    if res.get("acumulador"):
        ac = res["acumulador"]
        yield f"  Acumulador       : {ac.volumen_total_L:.1f} L  (PRELIMINAR)"


# ─────────────────────────────────────────────────────────────────────────────
# EJECUCIÓN — encadenar el pipeline
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print("WASAFF Consulting — Recuperación de Calor Kaeser / CMPC")
    print(f"{'='*60}")

    fluido = PropiedadesAgua()
    todos_resultados = {}

    # Pipeline: fuente → cálculo → formato → consola
    for nombre_esc, compresores_activos in escenarios_configurados(ESCENARIOS):
        for nombre, resultados in calcular_escenario(nombre_esc, compresores_activos, fluido):
            todos_resultados[nombre] = resultados
            for linea in formatear_resultado(nombre, resultados):
                print(linea)

    # Reporte final (figuras y tablas)
    if todos_resultados:
        generar_reporte(todos_resultados, output_dir=Path(__file__).parent.parent / "03_figuras")

    print(f"\n{'='*60}")
    print("Ejecución completada. Revisar TODOs pendientes arriba.")


if __name__ == "__main__":
    main()
