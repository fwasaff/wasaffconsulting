# Integración API SII Chile — Instrucciones

*Última actualización: 2026-03-16*

> **ADVERTENCIA:** La integración con SII requiere certificado digital vigente del contribuyente.
> Tramitar en sucursal SII o en línea en www.sii.cl antes de iniciar cualquier configuración técnica.

---

## Paso 1: Obtener certificado digital

El SII Chile requiere un certificado digital del contribuyente para autenticar las solicitudes de emisión de DTE (Documentos Tributarios Electrónicos).

**Opciones:**
1. **Token SII** (gratuito): Dispositivo físico entregado por el SII. Visitar sucursal con cédula de identidad.
2. **Certificado electrónico** (E-Cert o similar, ~$15.000-$40.000/año): Certificados de entidades como E-CertChile, Acepta.com, etc. Permiten integración más flexible.

**Resultado esperado:** Archivo `.p12` o `.pfx` con el certificado y clave privada.

---

## Paso 2: Registrar software emisor DTE en SII

1. Ingresar a www.sii.cl con RUT y clave tributaria
2. Ir a: **Factura electrónica > Software de facturación > Registro de software**
3. Registrar el software que se usará para emitir DTE
4. El SII asignará un `CAF` (Código de Autorización de Folios) para cada tipo de documento

---

## Paso 3: Ambiente de certificación

Antes de producción, probar en el ambiente de certificación:

```
Endpoint certificación: https://palena.sii.cl
Endpoint producción:    https://maullin.sii.cl
```

Documentación oficial de webservices SII:
- https://www.sii.cl/factura_electronica/factura_mercado/BSDTE.pdf
- https://www.sii.cl/factura_electronica/factura_mercado/manual_desarrollador.pdf

---

## Paso 4: Variables de entorno requeridas

```bash
# Agregar en ~/.bashrc o ~/.zshrc
export SII_RUT="XXXXXXXX-X"              # RUT sin puntos, con guión
export SII_CERT_PATH="/ruta/segura/certificado.p12"
export SII_KEY_PATH="/ruta/segura/clave_privada.key"
export SII_AMBIENTE="certificacion"       # o "produccion"

# NUNCA agregar contraseñas directamente — usar:
# read -s SII_CERT_PASS && export SII_CERT_PASS
```

---

## Paso 5: Bibliotecas Python recomendadas

```bash
# Opción A: biblioteca python-sii (PyPI)
pip install python-sii

# Opción B: implementación directa XML/SOAP
# Requiere: lxml, cryptography, zeep
pip install lxml cryptography zeep

# Opción C: sdk-sii-cl (más activa en GitHub)
pip install sii-sdk
```

---

## Paso 6: Ejemplo básico (boleta de honorarios)

```python
# SOLO A MODO REFERENCIAL — verificar con documentación SII actualizada
import os
from sii_sdk import BolstaHonorarios  # nombre hipotético

cert_path = os.environ['SII_CERT_PATH']
rut = os.environ['SII_RUT']

# Ver documentación de la biblioteca elegida para implementación real
```

---

## Tipos de DTE relevantes para Wasaff Consulting

| Tipo DTE | Código | Cuándo usar |
|----------|--------|-------------|
| Boleta de honorarios electrónica | 39/41 | Persona natural prestando servicios |
| Factura electrónica | 33 | Si se constituye empresa (SpA/EIRL) |
| Nota de débito | 56 | Corrección al alza de factura |
| Nota de crédito | 61 | Anulación o corrección a la baja |

---

## Estado actual de la integración

- [x] Instrucciones documentadas
- [ ] Certificado digital obtenido
- [ ] Software registrado en SII
- [ ] Ambiente certificación probado
- [ ] Primera emisión de prueba exitosa
- [ ] Paso a producción
