"""
Framework OOP para Sistema de Recuperacion de Calor
Wasaff Consulting — Proyecto 2026_Kaeser_RecuperacionCalorCMPC

Uso:
    from sistema import Compresor, Intercambiador, Bomba, Acumulador, RedHidraulica, SistemaRecuperacionCalor
    sistema = SistemaRecuperacionCalor.from_json('../01_datos/fichas_kaeser.json')
    resultado = sistema.resolver_estacionario(escenario='normal_B')
"""

import json
import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from pathlib import Path


# =============================================================================
# PROPIEDADES DEL AGUA (Kell + Vogel)
# =============================================================================
def cp_agua(T_C: float) -> float:
    """Calor específico del agua [J/kg·K] a temperatura T [°C]."""
    T = T_C + 273.15
    return 1000 * (5.328 - 9.76e-4 * T + 1.04e-6 * T**2)


def rho_agua(T_C: float) -> float:
    """Densidad del agua [kg/m3] a temperatura T [°C]."""
    T = T_C + 273.15
    a = -3.983035
    b = 301.797
    c = 522528.9
    d = 69.34881
    return (1 - (T + a)**2 * (T + b) / (c * (T + d))) * 999.84228


def mu_agua(T_C: float) -> float:
    """Viscosidad dinámica del agua [Pa·s] a temperatura T [°C]."""
    T = T_C + 273.15
    A = 2.414e-5
    B = 247.8
    C = 140.0
    return A * 10**(B / (T - C))


def k_agua(T_C: float) -> float:
    """Conductividad térmica del agua [W/m·K] a temperatura T [°C]."""
    T = T_C + 273.15
    return -0.5818 + 6.3556e-3 * T - 7.964e-6 * T**2


def Pr_agua(T_C: float) -> float:
    """Número de Prandtl del agua [-] a temperatura T [°C]."""
    return cp_agua(T_C) * mu_agua(T_C) / k_agua(T_C)


# =============================================================================
# CLASES DE COMPONENTES
# =============================================================================

@dataclass
class Compresor:
    numero: int
    modelo: str
    potencia_nominal_kW: float
    rendimiento_termico_kW: float
    caudal_agua_deltaT25K_m3h: float
    caida_presion_bar: float
    es_respaldo: bool = False
    operando: bool = True

    def caudal_masico(self, T_C: float) -> float:
        """Caudal másico de agua [kg/s] a temperatura T."""
        return self.caudal_agua_deltaT25K_m3h * rho_agua(T_C) / 3600.0

    def C_capacitancia(self, T_C: float) -> float:
        """Capacitancia térmica C = m_dot * cp [W/K]."""
        return self.caudal_masico(T_C) * cp_agua(T_C)


@dataclass
class Intercambiador:
    area: float = 0.0  # m2, a calcular
    U_global: float = 3000.0  # W/m2K, estimado inicial para placas
    tipo: str = "placa_counterflow"
    eficiencia: float = 0.0
    Q_transferido: float = 0.0

    def calcular_e_ntu(self, C_hot: float, C_cold: float, T_hot_in: float, T_cold_in: float) -> Dict:
        """
        Método ε-NTU para flujo contracorriente.
        C_hot, C_cold en [W/K].
        Retorna dict con area, epsilon, Q, T_out.
        """
        C_min = min(C_hot, C_cold)
        C_max = max(C_hot, C_cold)
        Cr = C_min / C_max
        UA = self.U_global * self.area
        NTU = UA / C_min

        if C_hot < C_cold:
            # C_min = C_hot
            epsilon = (1 - np.exp(-NTU * (1 - Cr))) / (1 - Cr * np.exp(-NTU * (1 - Cr)))
        else:
            # C_min = C_cold
            epsilon = (1 - np.exp(-NTU * (1 - Cr))) / (1 - Cr * np.exp(-NTU * (1 - Cr)))

        Q_max = C_min * (T_hot_in - T_cold_in)
        Q = epsilon * Q_max
        T_hot_out = T_hot_in - Q / C_hot
        T_cold_out = T_cold_in + Q / C_cold

        return {
            'NTU': NTU,
            'Cr': Cr,
            'epsilon': epsilon,
            'Q_W': Q,
            'Q_kW': Q / 1000.0,
            'T_hot_out_C': T_hot_out,
            'T_cold_out_C': T_cold_out,
            'Q_max_W': Q_max
        }

    def dimensionar(self, C_hot: float, C_cold: float, T_hot_in: float, T_cold_in: float,
                    epsilon_objetivo: float = 0.85) -> Dict:
        """Calcula el área necesaria para alcanzar una eficiencia objetivo."""
        C_min = min(C_hot, C_cold)
        C_max = max(C_hot, C_cold)
        Cr = C_min / C_max

        # Despejar NTU desde epsilon objetivo para counter-flow
        # epsilon = (1 - exp(-NTU*(1-Cr))) / (1 - Cr*exp(-NTU*(1-Cr)))
        # Resolver numéricamente
        def f(ntu):
            eps = (1 - np.exp(-ntu * (1 - Cr))) / (1 - Cr * np.exp(-ntu * (1 - Cr)))
            return eps - epsilon_objetivo

        from scipy.optimize import brentq
        try:
            NTU_req = brentq(f, 1e-6, 50.0)
        except ValueError:
            NTU_req = 10.0  # fallback

        UA_req = NTU_req * C_min
        area_req = UA_req / self.U_global
        self.area = area_req

        return self.calcular_e_ntu(C_hot, C_cold, T_hot_in, T_cold_in)


@dataclass
class TramoTuberia:
    nombre: str
    longitud_m: float
    diametro_mm: float
    rugosidad_mm: float = 0.046
    accesorios: List[Tuple[str, float]] = field(default_factory=list)
    # accesorios: [("codo_90", 1.5), ("valvula", 0.3)]

    def area_transversal(self) -> float:
        D = self.diametro_mm / 1000.0
        return np.pi * D**2 / 4.0

    def velocidad(self, caudal_m3h: float) -> float:
        return (caudal_m3h / 3600.0) / self.area_transversal()

    def reynolds(self, caudal_m3h: float, T_C: float) -> float:
        v = self.velocidad(caudal_m3h)
        D = self.diametro_mm / 1000.0
        return rho_agua(T_C) * v * D / mu_agua(T_C)

    def factor_friccion(self, caudal_m3h: float, T_C: float) -> float:
        Re = self.reynolds(caudal_m3h, T_C)
        rr = self.rugosidad_mm / self.diametro_mm
        # Colebrook-White implícita
        # 1/sqrt(f) = -2*log10( rr/3.7 + 2.51/(Re*sqrt(f)) )
        from scipy.optimize import brentq
        def fw(f):
            if f <= 0:
                return 1e10
            return 1.0/np.sqrt(f) + 2.0*np.log10(rr/3.7 + 2.51/(Re*np.sqrt(f)))
        try:
            f = brentq(fw, 1e-6, 1.0)
        except ValueError:
            f = 0.02  # laminar/turbulento transition fallback
        return f

    def deltaP_friccion(self, caudal_m3h: float, T_C: float) -> float:
        v = self.velocidad(caudal_m3h)
        f = self.factor_friccion(caudal_m3h, T_C)
        L = self.longitud_m
        D = self.diametro_mm / 1000.0
        return f * (L / D) * (rho_agua(T_C) * v**2 / 2.0)

    def deltaP_accesorios(self, caudal_m3h: float, T_C: float) -> float:
        v = self.velocidad(caudal_m3h)
        K_total = sum(k for _, k in self.accesorios)
        return K_total * (rho_agua(T_C) * v**2 / 2.0)

    def deltaP_total(self, caudal_m3h: float, T_C: float) -> float:
        return self.deltaP_friccion(caudal_m3h, T_C) + self.deltaP_accesorios(caudal_m3h, T_C)


@dataclass
class RedHidraulica:
    tramos: List[TramoTuberia] = field(default_factory=list)

    def deltaP_total(self, caudal_m3h: float, T_C: float) -> float:
        return sum(t.deltaP_total(caudal_m3h, T_C) for t in self.tramos)

    def resumen(self, caudal_m3h: float, T_C: float) -> Dict:
        res = []
        for t in self.tramos:
            res.append({
                'tramo': t.nombre,
                'v_ms': t.velocidad(caudal_m3h),
                'Re': t.reynolds(caudal_m3h, T_C),
                'f': t.factor_friccion(caudal_m3h, T_C),
                'dP_friccion_Pa': t.deltaP_friccion(caudal_m3h, T_C),
                'dP_accesorios_Pa': t.deltaP_accesorios(caudal_m3h, T_C),
                'dP_total_Pa': t.deltaP_total(caudal_m3h, T_C)
            })
        return res


@dataclass
class Bomba:
    nombre: str = "Bomba_circulacion"
    caudal_nominal_m3h: float = 25.0
    altura_nominal_m: float = 15.0
    eficiencia: float = 0.75
    NPSH_req_m: float = 3.0

    def potencia_freno_kW(self, caudal_m3h: float, altura_m: float) -> float:
        rho = 1000.0  # kg/m3 aprox
        g = 9.81
        Q = caudal_m3h / 3600.0
        H = altura_m
        return (rho * g * Q * H) / (self.eficiencia * 1000.0)


@dataclass
class Acumulador:
    volumen_m3: float = 1.0
    T_inicial_C: float = 20.0
    presion_trabajo_bar: float = 4.0

    def tiempo_autonomia(self, Q_requerida_kW: float, deltaT_max_K: float) -> float:
        """Tiempo de autonomía [s] ante pérdida de fuente térmica."""
        rho = 1000.0
        cp = 4180.0
        masa = self.volumen_m3 * rho
        Q_W = Q_requerida_kW * 1000.0
        # Q = m*cp*dT/dt  -> dt = m*cp*dT / Q
        return masa * cp * deltaT_max_K / Q_W


# =============================================================================
# SISTEMA COMPLETO
# =============================================================================

@dataclass
class SistemaRecuperacionCalor:
    compresores: List[Compresor]
    intercambiador: Intercambiador
    red: RedHidraulica
    bomba: Bomba
    acumulador: Acumulador
    T_hot_in_C: float = 60.0
    T_cold_in_C: float = 11.0

    @classmethod
    def from_json(cls, path: str) -> 'SistemaRecuperacionCalor':
        with open(path, 'r') as f:
            data = json.load(f)

        comps = [Compresor(**c) for c in data['compresores']]
        interc = Intercambiador(**data.get('intercambiador_aislamiento', {}))
        red = RedHidraulica()
        bomba = Bomba()
        acum = Acumulador()

        # Crear tramos de red hidráulica básica
        # Valores estimados; en proyecto real vienen del layout
        red.tramos = [
            TramoTuberia("colector_salida", 15.0, 80.0, accesorios=[("codo_90", 1.5)]),
            TramoTuberia("intercambiador_aislamiento", 3.0, 65.0, accesorios=[("valvula", 0.3)]),
            TramoTuberia("linea_bomba", 8.0, 65.0, accesorios=[("codo_90", 3.0)]),
            TramoTuberia("acumulador", 2.0, 80.0),
            TramoTuberia("retorno_CMPC", 20.0, 80.0, accesorios=[("codo_90", 2.0), ("valvula", 0.3)])
        ]

        return cls(
            compresores=comps,
            intercambiador=interc,
            red=red,
            bomba=bomba,
            acumulador=acum,
            T_hot_in_C=data['fluido_proceso'].get('T_hot_in_assumed_C', 60.0),
            T_cold_in_C=data['fluido_agua_industrial'].get('T_cold_in_nominal_C', 11.0)
        )

    def escenario(self, equipos_operando: List[int]) -> Dict:
        """Configura compresores operando y retorna capacidades agregadas."""
        for c in self.compresores:
            c.operando = c.numero in equipos_operando

        Q_total = sum(c.rendimiento_termico_kW for c in self.compresores if c.operando)
        caudal_total_m3h = sum(c.caudal_agua_deltaT25K_m3h for c in self.compresores if c.operando)
        C_hot = sum(c.C_capacitancia(self.T_hot_in_C) for c in self.compresores if c.operando)
        return {
            'Q_total_kW': Q_total,
            'caudal_total_m3h': caudal_total_m3h,
            'C_hot_WK': C_hot,
            'equipos': equipos_operando
        }

    def resolver_estacionario(self, equipos_operando: List[int], epsilon_obj: float = 0.85) -> Dict:
        """Resuelve el sistema completo en estado estacionario."""
        esc = self.escenario(equipos_operando)
        C_hot = esc['C_hot_WK']
        caudal_cold_m3h = esc['caudal_total_m3h'] * 1.1  # 10% margen
        T_cold = self.T_cold_in_C
        C_cold = caudal_cold_m3h * rho_agua(T_cold) / 3600.0 * cp_agua(T_cold)

        # Dimensionar intercambiador
        dim = self.intercambiador.dimensionar(C_hot, C_cold, self.T_hot_in_C, T_cold, epsilon_obj)

        # Red hidráulica
        dP_red_Pa = self.red.deltaP_total(caudal_cold_m3h, T_cold)
        dP_red_mca = dP_red_Pa / (rho_agua(T_cold) * 9.81)
        res_red = self.red.resumen(caudal_cold_m3h, T_cold)

        # Bomba: altura = dP_red + altura estática (asumida 2m)
        H_bomba = dP_red_mca + 2.0
        P_bomba_kW = self.bomba.potencia_freno_kW(caudal_cold_m3h, H_bomba)

        # Acumulador: autonomía 5 min con deltaT = 5K
        t_autonomia = self.acumulador.tiempo_autonomia(esc['Q_total_kW'], 5.0)

        return {
            'escenario': esc,
            'intercambiador': dim,
            'red_hidraulica': {
                'dP_total_Pa': dP_red_Pa,
                'dP_total_mca': dP_red_mca,
                'resumen_tramos': res_red
            },
            'bomba': {
                'caudal_m3h': caudal_cold_m3h,
                'altura_m': H_bomba,
                'potencia_freno_kW': P_bomba_kW
            },
            'acumulador': {
                'tiempo_autonomia_s': t_autonomia,
                'tiempo_autonomia_min': t_autonomia / 60.0,
                'volumen_m3': self.acumulador.volumen_m3
            }
        }

    def resolver_todos_escenarios(self, escenarios: List[Dict], epsilon_obj: float = 0.85) -> Dict:
        """Resuelve todos los escenarios definidos en el JSON."""
        resultados = {}
        for esc in escenarios:
            nombre = esc['nombre']
            equipos = esc['equipos_operando']
            resultados[nombre] = self.resolver_estacionario(equipos, epsilon_obj)
        return resultados


if __name__ == '__main__':
    # Test rápido
    import json
    with open('../01_datos/fichas_kaeser.json') as f:
        data = json.load(f)

    sis = SistemaRecuperacionCalor.from_json('../01_datos/fichas_kaeser.json')
    res = sis.resolver_estacionario([1, 2, 4], epsilon_obj=0.85)
    print(f"Q total: {res['escenario']['Q_total_kW']:.1f} kW")
    print(f"Area intercambiador: {sis.intercambiador.area:.3f} m2")
    print(f"Epsilon: {res['intercambiador']['epsilon']:.3f}")
    print(f"T_hot_out: {res['intercambiador']['T_hot_out_C']:.2f} C")
    print(f"T_cold_out: {res['intercambiador']['T_cold_out_C']:.2f} C")
    print(f"dP red: {res['red_hidraulica']['dP_total_mca']:.3f} m.c.a.")
    print(f"Potencia bomba: {res['bomba']['potencia_freno_kW']:.3f} kW")
