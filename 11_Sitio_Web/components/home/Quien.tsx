'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useFadeIn } from '@/lib/useFadeIn';

const competencias = [
  'Python / SciPy', 'LAMMPS / LPMD', 'Bash / Linux HPC',
  'LaTeX', 'Pandas', 'OpenFOAM', 'React / Next.js', 'Apps Script',
];

const timeline = [
  {
    years: '2025 – Presente',
    rol: 'Coordinador de Laboratorios de Física',
    org: 'Universidad de Chile · Facultad de Ciencias',
    icono: '🎓',
  },
  {
    years: '2023 – 2024',
    rol: 'Ingeniero de Simulación y Modelado Térmico',
    org: 'Leycero SpA · Industria manufactura, Región Metropolitana',
    icono: '⚙️',
  },
  {
    years: '2018 – 2024',
    rol: 'Docencia de Ingeniería Aplicada — Termofluidos y Control',
    org: 'INACAP',
    icono: '📐',
  },
];

export default function Quien() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.08, rootMargin: '0px 0px -50px 0px', staggerMs: 80 });

  return (
    <section
      ref={ref}
      id="quien"
      className="section-base"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="grid gap-16 lg:grid-cols-[300px_1fr] lg:gap-20">

          {/* Tarjeta director */}
          <div
            className="fade-in-item self-start lg:sticky lg:top-28 p-8"
            style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}
          >
            <Image
              src="/felipe.png"
              alt="Felipe Wasaff — Fundador y Director de Wasaff Consulting"
              width={300}
              height={300}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                width: '100%',
                borderRadius: '50%',
                display: 'block',
                marginBottom: '1.5rem',
                aspectRatio: '1/1',
                objectFit: 'cover',
                objectPosition: 'center top',
                userSelect: 'none',
              }}
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
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>
              Felipe Wasaff
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              Físico · Universidad de Chile<br />
              Magíster (c) Simulación Computacional · PUCV
            </p>

            {/* Logros destacados */}
            <div
              className="flex flex-col gap-2 mb-5 p-4"
              style={{ background: 'rgba(34,81,255,0.04)', border: '1px solid rgba(34,81,255,0.12)', borderRadius: '2px' }}
            >
              {[
                'Publicación InTech Open 2012',
                'Ex coordinador laboratorios Física · U. Chile',
                'Ex ingeniero simulación · Leycero SpA',
                '505 kW recuperados en proyecto industrial',
              ].map((logro) => (
                <div key={logro} className="flex items-start gap-2">
                  <span style={{ color: 'var(--blue)', flexShrink: 0, fontSize: '0.75rem', marginTop: '0.1rem' }}>·</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>{logro}</span>
                </div>
              ))}
            </div>

            {/* Competencias */}
            <div className="flex flex-wrap gap-1.5 mb-5">
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
              style={{ fontSize: '0.8rem', padding: '0.6rem', textAlign: 'center' }}
            >
              Perfil LinkedIn →
            </Link>
          </div>

          {/* Contenido derecho */}
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
              "La diferencia entre un paper académico
              y una herramienta industrial es su capacidad
              de reducir riesgo en terreno."
            </h2>

            <p
              className="fade-in-item"
              style={{ fontSize: '1.02rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}
            >
              Wasaff Consulting fue fundada para cerrar la brecha entre la investigación
              física avanzada y la ingeniería industrial aplicada en Chile. La práctica combina
              el rigor matemático de nivel universitario con experiencia directa en proyectos
              para minería, manufactura y energía.
            </p>

            <p
              className="fade-in-item"
              style={{ fontSize: '1.02rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}
            >
              Cada proyecto es dirigido personalmente por Felipe Wasaff, Físico egresado de
              la Universidad de Chile, con publicación en{' '}
              <em>Molecular Dynamics – Theoretical Developments and Applications in Nanotechnology
              and Energy</em> (InTech Open, 2012). Su trayectoria garantiza que la complejidad
              matemática se traduzca en informes accionables para operaciones, ingeniería
              y dirección financiera.
            </p>

            {/* Propuesta alianzas */}
            <div
              className="fade-in-item p-6 mb-8"
              style={{
                background: 'rgba(138,100,36,0.05)',
                border: '1px solid rgba(138,100,36,0.2)',
                borderRadius: '2px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Para EPC, Integradores y Consultoras
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
                ¿Su empresa necesita respaldo técnico en modelado computacional para un proyecto?
                Wasaff Consulting opera como subcontratista técnico especializado con NDA y
                entregables en su formato.
              </p>
              <Link href="#contacto" className="btn-ghost" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}>
                Hablar sobre colaboración →
              </Link>
            </div>

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
                  className="grid gap-2 py-5 md:grid-cols-[160px_1fr] md:gap-6"
                  style={{
                    borderBottom: i < timeline.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div
                    className="flex items-center gap-2 md:items-start md:mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)' }}
                  >
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
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
