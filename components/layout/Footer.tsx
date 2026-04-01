'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--dark-border)' }}>
      <div className="container-w py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <Link
              href="#"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--dark-text)',
                fontWeight: 500,
              }}
            >
              Wasaff Consulting
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--dark-muted)',
                marginTop: '0.4rem',
                letterSpacing: '0.04em',
              }}
            >
              Modelado Matemático · Ingeniería Física · Santiago, Chile
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex gap-6">
              {[
                { href: '#casos-uso', label: 'Diagnóstico' },
                { href: '#servicios', label: 'Capacidades' },
                { href: '#casos',     label: 'Proyectos' },
                { href: '#contacto',  label: 'Contacto' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--dark-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-text)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--dark-muted)',
                opacity: 0.6,
              }}
            >
              © {new Date().getFullYear()} Wasaff Consulting
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
