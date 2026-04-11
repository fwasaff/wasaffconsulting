# Registro de APIs — Wasaff Consulting

*Última actualización: 2026-03-16*

| API | Estado | Documentación oficial | Variables de entorno requeridas | Prioridad |
|-----|--------|----------------------|--------------------------------|-----------|
| SII Chile (DTE) | PENDIENTE DE CONFIGURAR | https://www.sii.cl/servicios_online/1039-.html | `SII_RUT`, `SII_CERT_PATH`, `SII_KEY_PATH` | ALTA — facturación electrónica |
| Gmail API | PENDIENTE DE CONFIGURAR | https://developers.google.com/gmail/api | `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN` | MEDIA — envío automático propuestas/facturas |
| Google Drive API | PENDIENTE DE CONFIGURAR | https://developers.google.com/drive/api | `GDRIVE_SERVICE_ACCOUNT_JSON` o OAuth2 credentials | MEDIA — respaldo entregables |
| Anthropic API | PENDIENTE DE CONFIGURAR | https://docs.anthropic.com/en/api | `ANTHROPIC_API_KEY` | BAJA — automatización agentes |

## Instrucciones generales de seguridad
```bash
# Agregar variables de entorno (editar ~/.bashrc o ~/.zshrc)
export SII_RUT="TU_RUT_SIN_PUNTOS"
export ANTHROPIC_API_KEY="sk-ant-..."

# NUNCA hacer esto:
# - Escribir credenciales en archivos del repositorio
# - Hacer commit de archivos .env, config.json o *.key
# - Compartir tokens por email o chat
```

## Hoja de ruta de integración

### Fase 1 (Q1 2026) — Configuración básica
- [ ] Obtener certificado digital SII
- [ ] Registrar software emisor DTE en SII
- [ ] Configurar variables de entorno en el equipo de trabajo
- [ ] Probar conexión con ambiente de certificación SII

### Fase 2 (Q2 2026) — Automatización parcial
- [ ] Implementar emisión automática de boletas de honorarios via SII API
- [ ] Configurar Gmail API para envío de propuestas desde agente comercial
- [ ] Configurar Google Drive para respaldo automático de entregables

### Fase 3 (Q3 2026) — Automatización completa
- [ ] Integrar Anthropic API para invocación programática de agentes
- [ ] Pipeline automático: proyecto cerrado → factura emitida → Drive respaldado
