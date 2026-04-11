'use client';
import Link from 'next/link';

export default function Privacidad() {
  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-14">
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}
          >
            ← Volver al inicio
          </Link>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Legal
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, color: 'var(--dark-text)', marginBottom: '0.75rem' }}>
            Política de Privacidad
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--dark-muted)' }}>
            Última actualización: abril 2026
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16">

          {/* Contenido */}
          <article style={{ maxWidth: '680px' }}>
            {[
              {
                titulo: '1. Responsable del tratamiento',
                contenido: `Wasaff Consulting, representada por Felipe Wasaff González, es responsable del tratamiento de los datos personales recopilados a través del sitio wasaffconsulting.vercel.app. Contacto: felipe.wasaff@uchile.cl · +56 9 4612 5682.`,
              },
              {
                titulo: '2. Datos que recopilamos',
                contenido: `Recopilamos únicamente los datos que usted nos proporciona voluntariamente mediante los formularios del sitio:

• Nombre completo
• Nombre de empresa y cargo
• Correo electrónico corporativo
• Número de teléfono
• Datos energéticos de su planta (consumo kWh, tarifa eléctrica, tipo de industria)
• Mensaje o consulta libre

No recopilamos datos de pago, no utilizamos cookies de seguimiento publicitario ni integramos redes publicitarias de terceros.`,
              },
              {
                titulo: '3. Finalidad del tratamiento',
                contenido: `Los datos recopilados se utilizan exclusivamente para:

• Responder a sus consultas técnicas y comerciales
• Enviarle el resultado de la Calculadora de Ahorro Energético
• Hacer seguimiento de proyectos en curso
• Enviar el newsletter mensual de eficiencia energética (solo si lo solicitó)

No vendemos, arrendamos ni cedemos sus datos personales a terceros con fines comerciales.`,
              },
              {
                titulo: '4. Base legal del tratamiento',
                contenido: `El tratamiento de sus datos se basa en su consentimiento explícito al completar los formularios del sitio, de conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada (Chile) y las disposiciones aplicables de la normativa de protección de datos.`,
              },
              {
                titulo: '5. Almacenamiento y seguridad',
                contenido: `Los datos se registran en los logs de la plataforma de hosting (Vercel) y pueden enviarse a herramientas de gestión de clientes (CRM) mediante webhooks seguros HTTPS. Los datos no se almacenan en bases de datos públicas ni se transmiten sin cifrado. Vercel cumple con SOC 2 Type 2 y GDPR.`,
              },
              {
                titulo: '6. Plazo de conservación',
                contenido: `Los datos se conservan durante el tiempo necesario para gestionar la relación comercial y no más de 3 años desde el último contacto, salvo obligación legal de conservación mayor.`,
              },
              {
                titulo: '7. Sus derechos',
                contenido: `Usted tiene derecho a:

• Acceder a sus datos personales en nuestro poder
• Rectificar datos inexactos o incompletos
• Solicitar la eliminación de sus datos
• Oponerse al tratamiento para fines de marketing

Para ejercer cualquiera de estos derechos, contacte a: felipe.wasaff@uchile.cl con el asunto "Protección de datos". Responderemos en un plazo máximo de 15 días hábiles.`,
              },
              {
                titulo: '8. Cookies',
                contenido: `Este sitio utiliza Google Analytics 4 para analizar el tráfico de forma anónima y agregada. GA4 no recopila datos personales identificables sin consentimiento previo. Puede desactivar el seguimiento de GA4 mediante extensiones de navegador como "Google Analytics Opt-out".`,
              },
              {
                titulo: '9. Modificaciones',
                contenido: `Wasaff Consulting puede actualizar esta política periódicamente. La fecha de última actualización se indica al inicio del documento. Le recomendamos revisarla ocasionalmente.`,
              },
            ].map((s) => (
              <section key={s.titulo} style={{ marginBottom: '2.5rem' }}>
                <h2
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {s.titulo}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {s.contenido}
                </p>
              </section>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start flex flex-col gap-4">
            <div style={{ padding: '1.25rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Contacto legal
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Para solicitudes de acceso, rectificación o eliminación de datos:
              </p>
              <a href="mailto:felipe.wasaff@uchile.cl?subject=Protección de datos" style={{ fontSize: '0.85rem', color: 'var(--blue)', textDecoration: 'none', display: 'block', marginBottom: '0.4rem' }}>
                felipe.wasaff@uchile.cl →
              </a>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
                Asunto: "Protección de datos"
              </p>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Ver también
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/terminos" style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}>
                  Términos de servicio →
                </Link>
                <Link href="/faq" style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}>
                  Preguntas frecuentes →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
