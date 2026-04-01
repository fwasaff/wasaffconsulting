'use client';
import { useEffect, useRef } from 'react';

const servicios = [
  {
    num: '01',
    title: 'Modelado Térmico y Mecánica de Fluidos',
    desc: 'Análisis de transferencia de calor y pérdidas de carga hidráulica para optimización de plantas industriales. Auditorías energéticas respaldadas por cálculo analítico y verificación independiente.',
    tags: ['Termodinámica', 'Hidráulica', 'Python / SciPy'],
    dev: false,
  },
  {
    num: '02',
    title: 'Simulación de Materiales y Dinámica Molecular',
    desc: 'Investigación computacional para minería y manufactura avanzada. Estudio de colisiones inelásticas, transferencia de energía y comportamiento de redes atómicas bajo estrés mecánico y térmico.',
    tags: ['LAMMPS', 'LPMD', 'Paraview', 'Linux HPC'],
    dev: false,
  },
  {
    num: '03',
    title: 'Métodos Numéricos y Automatización de Datos',
    desc: 'Desarrollo de algoritmos ad-hoc para resolver ecuaciones diferenciales de procesos productivos. Digitalización de flujos de ingeniería pesada con Python y automatización de reportes técnicos.',
    tags: ['Pandas', 'Integradores RK45', 'Apps Script'],
    dev: false,
  },
  {
    num: '04',
    title: 'Ingeniería de Contraparte e Informes de Peritaje',
    desc: 'Documentación técnica redactada en LaTeX con rigor de nivel universitario. Para licitaciones, resolución de controversias técnicas y cumplimiento de normas ANSI/ISO ante organismos reguladores.',
    tags: ['LaTeX', 'Contraparte Independiente', 'Normas ANSI/ISO'],
    dev: false,
  },
  {
    num: '05',
    title: 'CFD Avanzado y Cómputo de Alto Rendimiento',
    desc: 'En desarrollo: solvers basados en Navier-Stokes y paralelización en GPU para modelamiento tridimensional de fluidos complejos en procesos industriales de alta demanda computacional.',
    tags: ['OpenFOAM', 'PETSc', 'JAX'],
    dev: true,
  },
];

export default function Servicios() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
      id="servicios"
      className="section-base"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="text-center mb-14">
          <span className="label-mono fade-in-item">Capacidades Técnicas</span>
          <h2 className="sec-title fade-in-item">
            Solo lo que podemos<br />demostrar y ejecutar
          </h2>
          <p className="sec-sub fade-in-item mx-auto">
            Transparencia técnica radical. Wasaff Consulting no ofrece desarrollo de software
            genérico ni marketing. Nuestra práctica se limita a ingeniería física computacional
            de alto rigor matemático.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <div
              key={s.num}
              className="fade-in-item p-8 flex flex-col gap-4 transition-all duration-200 relative"
              style={{
                background: 'var(--bg)',
                border: s.dev
                  ? '1px solid rgba(138,100,36,0.25)'
                  : '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                if (!s.dev) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,81,255,0.3)';
              }}
              onMouseLeave={(e) => {
                if (!s.dev) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              {s.dev && (
                <span
                  className="absolute top-4 right-4 px-2 py-0.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    background: 'rgba(138,100,36,0.07)',
                    color: 'var(--gold)',
                    border: '1px solid rgba(138,100,36,0.25)',
                    borderRadius: '2px',
                  }}
                >
                  En desarrollo · 2026
                </span>
              )}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: s.dev ? 'var(--gold)' : 'var(--blue)',
                }}
              >
                {s.num}
              </span>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.35 }}>
                {s.title}
              </h3>
              <p className="flex-1" style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {s.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
