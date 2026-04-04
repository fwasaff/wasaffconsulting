'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const competencias = [
  'Python / SciPy', 'LAMMPS / LPMD', 'Bash / Linux HPC',
  'LaTeX', 'Pandas', 'OpenFOAM',
];

const timeline = [
  {
    years: '2025 – Presente',
    rol: 'Coordinador de Laboratorios de Física',
    org: 'Universidad de Chile · Facultad de Ciencias',
  },
  {
    years: '2023 – 2024',
    rol: 'Ingeniero de Simulación y Modelado Térmico',
    org: 'Leycero SpA · Industria manufactura, Región Metropolitana',
  },
  {
    years: '2018 – 2024',
    rol: 'Docencia de Ingeniería Aplicada — Termofluidos y Control',
    org: 'INACAP',
  },
];

export default function Quien() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
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
      id="quien"
      className="section-base"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="grid gap-16 lg:grid-cols-[300px_1fr] lg:gap-20">

          {/* Tarjeta de dirección */}
          <div
            className="fade-in-item self-start lg:sticky lg:top-28 p-8"
            style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}
          >
            <img
              src="/felipe.png"
              alt="Felipe Wasaff — Fundador y Director de Wasaff Consulting"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: '100%', borderRadius: '50%', display: 'block', marginBottom: '1.5rem', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center top', userSelect: 'none' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
              }}
            >
              Fundador y Director
            </p>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.2rem' }}>
              Felipe Wasaff
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Físico · Universidad de Chile<br />
              Magíster (c) Simulación Computacional, PUCV
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {competencias.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(34,81,255,0.06)',
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              href="https://www.linkedin.com/in/felipewasaff"
              target="_blank"
              rel="noopener"
              className="btn-ghost w-full justify-center"
              style={{ fontSize: '0.8rem', padding: '0.6rem' }}
            >
              Perfil LinkedIn
            </Link>
          </div>

          {/* Contenido */}
          <div>
            <span className="label-mono fade-in-item">Liderazgo</span>

            <h2
              className="fade-in-item mb-6"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                lineHeight: 1.15,
                color: 'var(--text)',
              }}
            >
              La diferencia entre un paper académico
              y una herramienta industrial es su capacidad
              de reducir riesgo en terreno.
            </h2>

            <p
              className="fade-in-item"
              style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}
            >
              Wasaff Consulting fue fundada para cerrar la brecha entre la investigación
              física avanzada y la ingeniería industrial aplicada en Chile. Nuestra práctica
              combina el rigor matemático de nivel universitario con la experiencia directa
              en proyectos para la industria manufacturera, energética y de protección industrial.
            </p>

            <p
              className="fade-in-item"
              style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}
            >
              La dirección de cada proyecto recae en Felipe Wasaff, Físico egresado de la
              Universidad de Chile e investigador activo — con publicación en
              <em> Physica B</em> (Springer). Su trayectoria en docencia técnica a nivel superior
              garantiza que la complejidad matemática se traduzca en informes accionables,
              comprensibles para equipos de operaciones, ingeniería y dirección financiera.
            </p>

            {/* Timeline */}
            <div className="fade-in-item">
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                }}
              >
                Trayectoria del Director
              </p>
              {timeline.map((t, i) => (
                <div
                  key={t.years}
                  className="grid gap-6 py-5"
                  style={{
                    gridTemplateColumns: '160px 1fr',
                    borderBottom: i < timeline.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div
                    className="flex items-start gap-2 mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)' }}
                  >
                    <span
                      className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--blue)' }}
                    />
                    {t.years}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                      {t.rol}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                      {t.org}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
