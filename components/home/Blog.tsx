'use client';
import { useEffect, useRef } from 'react';

const articulos = [
  {
    numero: '01',
    categoria: 'Guía Técnica',
    tiempo: '8 min lectura',
    titulo: 'Cómo calcular el ROI de un proyecto de recuperación de calor residual',
    extracto: 'La mayoría de los gerentes de planta subestiman el potencial de recuperación energética de sus compresores. En este artículo explicamos la metodología ε-NTU paso a paso y cómo traducir kW recuperados a millones en ahorro anual.',
    temas: ['Termodinámica', 'ROI Energético', 'OPEX'],
    destacado: true,
  },
  {
    numero: '02',
    categoria: 'Análisis Comparativo',
    tiempo: '6 min lectura',
    titulo: 'Simulación computacional vs ensayos físicos: cuándo usar cada una',
    extracto: 'Un ensayo físico cuesta 10x más que una simulación bien calibrada. Pero no toda simulación es válida sin datos de calibración. Explicamos cuándo la simulación ahorra dinero y cuándo el ensayo físico es irremplazable.',
    temas: ['Simulación', 'Ensayos', 'Decisión de ingeniería'],
    destacado: false,
  },
  {
    numero: '03',
    categoria: 'Case Study',
    tiempo: '5 min lectura',
    titulo: 'Cómo redujimos el OPEX energético en 23% en planta manufacturera',
    extracto: 'Detalle técnico del proyecto de recuperación de calor de 505 kW: qué encontramos en la auditoría inicial, qué modelo construimos, qué resultados obtuvo el cliente y en qué tiempo recuperó la inversión.',
    temas: ['Caso Real', 'Manufactura', '505 kW'],
    destacado: false,
  },
];

export default function Blog() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -50px 0px' }
    );
    items.forEach((item, i) => {
      (item as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      io.observe(item);
    });
    return () => io.disconnect();
  }, []);

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

              {/* Proximamente */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--muted)',
                  padding: '0.4rem 0.75rem',
                  background: 'var(--panel)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                Publicación próxima · Suscríbase para ser notificado
              </div>
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
          <form
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            onSubmit={(e) => { e.preventDefault(); }}
          >
            <input
              type="email"
              placeholder="su-email@empresa.cl"
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                fontSize: '0.9rem',
                color: 'var(--text)',
                background: 'var(--bg)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-solid"
              style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
            >
              Suscribirse
            </button>
          </form>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
            Sin compromiso · Baja en cualquier momento
          </p>
        </div>
      </div>
    </section>
  );
}
