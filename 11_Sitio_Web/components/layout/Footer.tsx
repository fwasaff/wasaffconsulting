'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

const columnas = {
  servicios: [
    { label: 'Eficiencia Energética',   href: '#servicios' },
    { label: 'Validación de Diseño',    href: '#servicios' },
    { label: 'Monitoreo Predictivo',    href: '#servicios' },
    { label: 'Peritaje y Litigios',     href: '#servicios' },
    { label: 'Simulación de Materiales',href: '#servicios' },
  ],
  recursos: [
    { label: 'Calculadora de ahorro ROI', href: '/calculadora' },
    { label: 'Casos de éxito',            href: '#casos' },
    { label: 'Insights técnicos',         href: '#blog' },
    { label: 'Diagnóstico gratuito',      href: '#contacto' },
  ],
  legal: [
    { label: 'Política de privacidad', href: '/privacidad' },
    { label: 'Términos de servicio',   href: '/terminos' },
    { label: 'NDA disponible',         href: '#contacto' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--dark-border)' }}>
      {/* Newsletter banner */}
      <div style={{ borderBottom: '1px solid var(--dark-border)', padding: '2.5rem 0' }}>
        <div className="container-w">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'rgba(34,81,255,0.8)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.4rem',
                }}
              >
                Newsletter mensual
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--dark-text)', fontWeight: 500 }}>
                Análisis técnico de eficiencia energética industrial
              </p>
            </div>
            <Link
              href="#contacto"
              className="btn-solid"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', whiteSpace: 'nowrap' }}
            >
              Suscribirse al newsletter →
            </Link>
          </div>
        </div>
      </div>

      {/* Cuerpo del footer */}
      <div className="container-w py-14">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Columna 1: Marca */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--dark-text)',
                fontWeight: 500,
                display: 'block',
                marginBottom: '0.6rem',
              }}
            >
              Wasaff Consulting
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--dark-muted)',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              Ingeniería Física Computacional<br />
              Minería · Energía · Manufactura<br />
              Santiago, Chile
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:felipe@wasaffconsulting.cl"
                onClick={() => trackEvent('contact_email_click', { location: 'footer' })}
                style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ color: 'var(--dark-muted)' }}>✉</span>
                felipe@wasaffconsulting.cl
              </a>
              <a
                href="tel:+56920150897"
                onClick={() => trackEvent('contact_phone_click', { location: 'footer' })}
                style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ color: 'var(--dark-muted)' }}>✆</span>
                +56 9 2015 0897
              </a>
              <Link
                href="https://www.linkedin.com/in/felipewasaff"
                target="_blank"
                rel="noopener"
                style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>in</span>
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--dark-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              Servicios
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {columnas.servicios.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-text)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--dark-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              Recursos
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {columnas.recursos.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-text)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--dark-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
              }}
            >
              Legal
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {columnas.legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ fontSize: '0.85rem', color: 'var(--dark-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-text)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--dark-border)', padding: '1.25rem 0' }}>
        <div className="container-w flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--dark-muted)',
              opacity: 0.6,
            }}
          >
            © {new Date().getFullYear()} Wasaff Consulting · Todos los derechos reservados
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--dark-muted)',
              opacity: 0.5,
            }}
          >
            RUT disponible a solicitud · NDA desde el primer contacto
          </p>
        </div>
      </div>
    </footer>
  );
}
