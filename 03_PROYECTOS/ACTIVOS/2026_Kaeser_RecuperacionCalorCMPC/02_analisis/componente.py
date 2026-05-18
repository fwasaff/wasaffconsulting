# © WASAFF Consulting — Licencia de uso otorgada a Kaeser Compresores de Chile SpA
# para uso interno. Prohibida redistribución sin autorización escrita.

"""
componente.py — Clase base abstracta para componentes del sistema hidráulico-térmico.

Aplicación de Clase 01 MSC 005:
  ABC + método abstracto. El prof. Pizarro: "No me importa cómo lo implementa,
  me importa que implemente el método." — polimorfismo en acción.

Todos los componentes calculables del proyecto heredan de ComponenteHidraulico
y deben implementar calcular(). Esto garantiza que main.py pueda tratar
intercambiador, bomba y acumulador de forma uniforme.
"""

from abc import ABC, abstractmethod


class ComponenteHidraulico(ABC):
    """
    Clase base abstracta para componentes del sistema.

    Contrato:
        - Todo componente tiene un nombre descriptivo.
        - Todo componente expone un método calcular() que retorna un dataclass
          con sus resultados específicos.
        - Todo componente puede imprimirse con str() para mostrar un resumen.
    """

    @property
    @abstractmethod
    def nombre(self) -> str:
        """Nombre descriptivo del componente para logs y reportes."""

    @abstractmethod
    def calcular(self):
        """
        Ejecuta el cálculo del componente y retorna sus resultados.

        Returns:
            Dataclass específico del componente con todos los resultados.

        Raises:
            DatosInsuficientesError: si faltan datos del cliente.
            FueraDeRangoError: si algún parámetro está fuera del rango válido.
        """

    def __str__(self) -> str:
        return f"{self.__class__.__name__}(nombre='{self.nombre}')"

    def __repr__(self) -> str:
        return self.__str__()
