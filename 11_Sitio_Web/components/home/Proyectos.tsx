'use client';
import { useEffect, useRef } from 'react';

type BadgeColor = 'gold' | 'red' | 'blue';

const proyectos: {
  badge: string;
  badgeColor: BadgeColor;
  year: string;
  client: string;
  title: string;
  desc: string;
  kpis: string[];
  disclaimer?: string;
  image?: { src: string; alt: string };
}[] = [
  {
    badge: 'Recuperación Energética',
    badgeColor: 'gold',
    year: '2023',
    client: 'Industria manufacturera · Región Metropolitana',
    title: 'Recuperación de calor residual en sistema de compresores industriales',
    desc: 'Una planta manufacturera tenía un OPEX energético insostenible derivado de seis compresores de tornillo rotatorio que disipaban calor a la atmósfera. Wasaff Consulting desarrolló el modelo matemático completo: análisis ε-NTU de intercambiadores de placas, red hidráulica de 11 tramos (Darcy-Weisbach + Colebrook-White), verificación de acumuladores y dimensionamiento de bomba de circulación.',
    kpis: ['505 kW de demanda térmica cubierta', 'Caudal: 21.396 kg/h', '11 tramos calculados · DN1"–DN3"', 'Informe LaTeX + código Python entregado'],
    image: { src: '/compresores.png', alt: 'Compresores industriales de tornillo rotatorio' },
  },
  {
    badge: 'Análisis Estructural',
    badgeColor: 'blue',
    year: '2024',
    client: 'Empresa de protección contra incendios · Sector industrial',
    title: 'Análisis de fuerzas de impacto en tuberías industriales',
    desc: 'Cálculo de fuerzas de impacto dinámico para tuberías SCH10/SCH40 a distintos diámetros y alturas de caída. Aplicación del método de Housner con análisis comparativo de schedules, reporte CSV automatizado y gráficas de resultados en Python. Desarrollado como análisis de metodología interna.',
    kpis: ['Método Housner implementado', 'SCH10 vs SCH40 comparados', 'Reporte CSV automatizado', 'Código Python entregable'],
    disclaimer: 'Análisis de metodología desarrollado como capacidad técnica interna. El cliente no ejecutó el proyecto.',
    image: { src: '/tuberias.png', alt: 'Red de tuberías industriales con válvulas y manómetros' },
  },
  {
    badge: 'I+D Científico',
    badgeColor: 'blue',
    year: '2012',
    client: 'Universidad de Chile · InTech Open',
    title: 'Inelastic Collisions and Hypervelocity Impacts at Nanoscopic Level',
    desc: 'Investigación computacional ejecutada con dinámica molecular no-equilibrio (NEMD) para caracterizar colisiones inelásticas e impactos de hipervelocidad a escala nanométrica. Publicado como capítulo en el libro "Molecular Dynamics – Theoretical Developments and Applications in Nanotechnology and Energy" (InTech Open, 2012). Directamente aplicable al I+D de materiales para minería e industria de alta exigencia mecánica.',
    kpis: ['Publicado en InTech Open (2012)', 'NEMD · Infraestructura HPC Linux', 'Aplicable a materiales de minería', 'Base para servicios de simulación de materiales'],
    image: { src: '/nanoimpacto.png', alt: 'Simulación de dinámica molecular: nanopartícula impactando superficie cristalina' },
  },
];

const badgeStyles: Record<BadgeColor, { bg: string; color: string; border: string }> = {
  gold: { bg: 'rgba(138,100,36,0.08)', color: 'var(--gold)', border: '1px solid rgba(138,100,36,0.25)' },
  red:  { bg: 'rgba(158,37,37,0.07)',  color: 'var(--red)',  border: '1px solid rgba(158,37,37,0.25)' },
  blue: { bg: 'rgba(34,81,255,0.07)',  color: 'var(--blue)', border: '1px solid rgba(34,81,255,0.2)' },
};

export default function Proyectos() {
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
      (item as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      io.observe(item);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="casos"
      className="section-base"
      style={{ background: 'var(--panel)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="text-center mb-14">
          <span className="label-mono fade-in-item">Casos de Éxito</span>
          <h2 className="sec-title fade-in-item">Resultados que operan<br />en plantas reales</h2>
          <p className="sec-sub fade-in-item mx-auto">
            Cada proyecto representa un compromiso técnico cerrado con resultados medibles.
            Aquí los números reales, no estimaciones de marketing.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {proyectos.map((p) => {
            const bs = badgeStyles[p.badgeColor];
            return (
              <article
                key={p.title}
                className="fade-in-item overflow-hidden"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                }}
              >
                {/* Imagen de cabecera */}
                {p.image && (
                  <div style={{ borderBottom: '1px solid var(--border)' }}>
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', userSelect: 'none' }}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* Sidebar izquierdo */}
                  <div
                    className="p-8 flex flex-col gap-3"
                    style={{ borderRight: '1px solid var(--border)' }}
                  >
                    <span
                      className="self-start px-2.5 py-1"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', borderRadius: '2px', ...bs }}
                    >
                      {p.badge}
                    </span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                      {p.year}
                    </p>
                    <p style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                      {p.client}
                    </p>

                    {/* Disclaimer metodología */}
                    {p.disclaimer && (
                      <p
                        className="mt-auto"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--muted)',
                          lineHeight: 1.5,
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border)',
                        }}
                      >
                        {p.disclaimer}
                      </p>
                    )}
                  </div>

                  {/* Contenido principal */}
                  <div className="p-8">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.9rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.93rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.kpis.map((k) => (
                        <span key={k} className="kpi-badge">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA post-proyectos */}
        <div className="fade-in-item text-center mt-10">
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            ¿Su planta tiene un desafío similar?
          </p>
          <a
            href="#contacto"
            className="btn-solid"
          >
            Evaluar mi caso →
          </a>
        </div>
      </div>
    </section>
  );
}
