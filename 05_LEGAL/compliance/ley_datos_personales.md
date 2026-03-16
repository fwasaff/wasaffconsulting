# Ley 19.628 — Guía Práctica para Wasaff Consulting

*Última revisión: 2026-03-16*

---

## Resumen en una línea
No almacenes datos personales de clientes ni terceros sin una razón válida, y protégelos cuando los tengas.

---

## ¿Qué datos personales maneja Wasaff Consulting?

| Tipo de dato | Origen | Justificación | Riesgo |
|-------------|--------|---------------|--------|
| Nombre y email de contactos | Clientes | Necesario para ejecutar el contrato | Bajo |
| RUT del contratante | Clientes | Obligatorio para documentos tributarios | Bajo |
| Datos técnicos de procesos industriales | Proyectos | Confidencialidad contractual | Medio-Alto |
| Datos de terceros (empleados del cliente) | Proyectos | Solo si el cliente los proporciona | Alto — evitar |

---

## Qué datos puedes almacenar

**Puedes almacenar sin problema:**
- Datos de la empresa cliente (razón social, RUT, dirección, contacto comercial)
- Datos necesarios para la ejecución del contrato y facturación
- Información técnica del proceso industrial del cliente (cubre el NDA)

**Debes tener cuidado con:**
- Datos de empleados del cliente que no sean el contacto designado
- Datos de personas naturales que no sean parte del contrato
- Fotografías, datos biométricos o información sensible de trabajadores

---

## Cómo obtener consentimiento (cuando aplica)
Si necesitas tratar datos personales de terceros (no solo del contacto del contratante):
1. Indicarlo explícitamente en el contrato
2. El contratante declara tener autorización para compartir esos datos
3. Usar solo para los fines declarados en el contrato

---

## Dónde NO guardar datos personales

- **NO** en repositorios git públicos (GitHub, GitLab público)
- **NO** en emails sin cifrar si contienen datos sensibles
- **NO** en carpetas compartidas sin control de acceso
- **NO** en `10_INBOX/` por más de una semana

---

## Qué hacer si un cliente pide eliminar sus datos
1. Identificar todos los archivos que contienen datos del cliente
2. Eliminarlos de `02_COMERCIAL/clientes/NOMBRE_CLIENTE/`
3. Verificar que no queden copias en `03_PROYECTOS/` (datos del proyecto se pueden anonimizar)
4. Confirmar la eliminación por escrito al cliente
5. Plazo máximo: 10 días hábiles desde la solicitud

---

## Checklist de seguridad de datos por proyecto
- [ ] Los datos del cliente están solo en carpetas bajo `03_PROYECTOS/ACTIVOS/[proyecto]/01_datos/`
- [ ] No hay datos personales de empleados del cliente que no sean necesarios
- [ ] Al cierre del proyecto, los datos brutos se archivan o eliminan según lo acordado en contrato
- [ ] El repositorio git no tiene datos sensibles en el historial

---

## Referencia legal
- **Ley 19.628** sobre protección de la vida privada (datos personales) — Chile
- **Nota:** En 2026, Chile está en proceso de actualizar su ley de datos personales para alinearse con estándares GDPR. Revisar novedades legislativas.
