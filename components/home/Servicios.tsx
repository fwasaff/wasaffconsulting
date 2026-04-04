'use client';
import { useEffect, useRef } from 'react';

const servicios = [
  {
    num: '01',
    title: 'Modelado Térmico y Mecánica de Fluidos',
    desc: 'Reduce el OPEX energético de su planta con un modelo matemático riguroso del sistema térmico e hidráulico. Cada decisión de inversión — intercambiadores, bombas, redes de distribución — queda respaldada por cálculo verificable e independiente.',
    tags: ['Termodinámica', 'Hidráulica', 'Python / SciPy'],
    dev: false,
  },
  {
    num: '02',
    title: 'Simulación de Materiales y Dinámica Molecular',
    desc: 'Anticipe fallas de material antes de que ocurran en planta. Wasaff Consulting modela el comportamiento atómico bajo estrés mecánico y térmico para reducir costos de reemplazo no planificado en minería y manufactura avanzada.',
    tags: ['LAMMPS', 'LPMD', 'Paraview', 'Linux HPC'],
    dev: false,
  },
  {
    num: '03',
    title: 'Métodos Numéricos y Automatización de Datos',
    desc: 'Convierte datos de proceso en métricas accionables para operaciones e ingeniería. Wasaff Consulting desarrolla algoritmos a medida para resolver las ecuaciones de su proceso productivo y automatiza los reportes técnicos que hoy se generan manualmente.',
    tags: ['Pandas', 'Integradores RK45', 'Apps Script'],
    dev: false,
  },
  {
    num: '04',
    title: 'Ingeniería de Contraparte e Informes de Peritaje',
    desc: 'Respaldo técnico independiente para licitaciones, controversias con proveedores y cumplimiento normativo. Informes redactados con rigor universitario, citación de normas ANSI/ISO y validez ante organismos reguladores.',
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
            genérico ni marketing. La práctica se limita a ingeniería física computacional
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
