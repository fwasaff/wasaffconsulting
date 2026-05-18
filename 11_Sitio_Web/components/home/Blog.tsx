'use client';
import Link from 'next/link';
import { useFadeIn } from '@/lib/useFadeIn';
import { articulos } from '@/lib/blog';

export default function Blog() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.06, rootMargin: '0px 0px -50px 0px', staggerMs: 80 });

  return (
    <section
      ref={ref}
      id="blog"
      className="section-base"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="label-mono fade-in-item">Insights Técnicos</span>
            <h2 className="sec-title fade-in-item" style={{ marginBottom: '0.5rem' }}>
              Conocimiento que genera<br />decisiones más rentables
            </h2>
            <p
              className="fade-in-item"
              style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '500px' }}
            >
              Análisis técnico sin jargón. Explicamos la física detrás de los proyectos
              industriales para que su equipo tome mejores decisiones de inversión.
            </p>
          </div>
          <div className="fade-in-item shrink-0">
            <a
              href="#contacto"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--blue)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              Suscribirse al newsletter →
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articulos.map((a) => (
            <article
              key={a.numero}
              className="fade-in-item flex flex-col p-7 transition-all duration-200 relative"
              style={{
                background: a.destacado ? 'var(--panel)' : 'var(--bg)',
                border: a.destacado ? '1px solid rgba(34,81,255,0.2)' : '1px solid var(--border)',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,81,255,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = a.destacado ? 'rgba(34,81,255,0.2)' : 'var(--border)';
              }}
            >
              {a.destacado && (
                <span
                  className="absolute top-4 right-4 px-2 py-0.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    background: 'rgba(34,81,255,0.07)',
                    color: 'var(--blue)',
                    border: '1px solid rgba(34,81,255,0.2)',
                    borderRadius: '2px',
                  }}
                >
                  Destacado
                </span>
              )}

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--blue)',
                    padding: '0.15rem 0.5rem',
                    background: 'rgba(34,81,255,0.06)',
                    border: '1px solid rgba(34,81,255,0.15)',
                    borderRadius: '2px',
                  }}
                >
                  {a.categoria}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
                  {a.tiempo}
                </span>
              </div>

              {/* Número decorativo */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(34,81,255,0.25)',
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                }}
              >
                {a.numero}
              </p>

              {/* Título */}
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  lineHeight: 1.35,
                  marginBottom: '0.9rem',
                  flex: '0 0 auto',
                }}
              >
                {a.titulo}
              </h3>

              {/* Extracto */}
              <p
                className="flex-1"
                style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}
              >
                {a.extracto}
              </p>

              {/* Temas */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {a.temas.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>

              {/* Link al artículo */}
              <Link
                href={`/blog/${a.slug}`}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.55rem 1rem', textAlign: 'center', justifyContent: 'center' }}
              >
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div
          className="fade-in-item mt-12 p-8"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Newsletter mensual
          </p>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', maxWidth: '500px', lineHeight: 1.4 }}>
            Análisis técnico de eficiencia energética industrial, directo a su correo
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.6 }}>
            Sin spam. Solo cuando hay contenido técnico relevante para gerentes de planta,
            ingenieros y directores de operaciones en minería, manufactura y energía.
          </p>
          <a
            href="#contacto"
            className="btn-solid"
            style={{ fontSize: '0.88rem' }}
          >
            Suscribirse al newsletter →
          </a>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
            Próximamente · Déjenos su correo en contacto para ser notificado
          </p>
        </div>
      </div>
    </section>
  );
}
