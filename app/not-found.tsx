'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      style={{ background: 'var(--dark)' }}
    >
      {/* Gradiente decorativo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(34,81,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="container-w relative z-10 py-24 text-center flex flex-col items-center gap-8">
        {/* Número decorativo */}
        <p
          aria-hidden
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(5rem, 18vw, 12rem)',
            color: 'rgba(255,255,255,0.05)',
            lineHeight: 1,
            userSelect: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        >
          404
        </p>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '1rem',
            }}
          >
            Error 404 — Página no encontrada
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--dark-text)',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Esta página no existe
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '420px', lineHeight: 1.75, margin: '0 auto 2rem' }}>
            Es posible que la URL haya cambiado o que el contenido haya sido movido.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" className="btn-solid" style={{ fontSize: '0.95rem' }}>
            ← Volver al inicio
          </Link>
          <Link href="/calculadora" className="btn-ghost-dark" style={{ fontSize: '0.95rem' }}>
            Calcular mi ahorro potencial
          </Link>
        </div>

        {/* Links útiles */}
        <nav
          aria-label="Links útiles"
          className="flex flex-wrap justify-center gap-8 mt-2"
          style={{ borderTop: '1px solid var(--dark-border)', paddingTop: '2rem', width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}
        >
          {[
            { href: '/#servicios', label: 'Servicios' },
            { href: '/#casos',     label: 'Casos de éxito' },
            { href: '/faq',        label: 'FAQ' },
            { href: '/#contacto',  label: 'Contacto' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--dark-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--dark-muted)')}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
