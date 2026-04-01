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
}[] = [
  {
    badge: 'Recuperación Energética',
    badgeColor: 'gold',
    year: '2023',
    client: 'Industria manufacturera · Región Metropolitana',
    title: 'Modelado Térmico e Hidráulico para Sistema de Recuperación de Calor Residual',
    desc: 'Wasaff Consulting desarrolló el modelo matemático completo de un sistema de recuperación de calor residual generado por seis compresores industriales de tornillo rotatorio. El trabajo incluyó análisis ε-NTU de intercambiadores de placas, red hidráulica de 11 tramos (Darcy-Weisbach + Colebrook-White), verificación de acumuladores térmicos y dimensionamiento de bomba de circulación.',
    kpis: ['505 kW recuperados en operación normal', '27 m³/h · ΔP total 7,6 kPa', 'Bomba: 0,55 kW para todo el circuito'],
  },
  {
    badge: 'Hidráulica Industrial',
    badgeColor: 'red',
    year: '2024',
    client: 'Análisis técnico exploratorio · Sector protección contra incendios',
    title: 'Análisis de Pérdidas de Carga e Impacto Mecánico en Redes de Tuberías',
    desc: 'Wasaff Consulting resolvió el comportamiento hidráulico de redes de tuberías en distintos diámetros nominales, calculando las pérdidas de carga por fricción y accesorios bajo distintos caudales. Complementariamente, se modeló la fuerza de impacto al caída libre de secciones de tubería desde diferentes alturas, con aplicación directa en evaluación de riesgos en faenas.',
    kpis: ['Pérdidas de carga por diámetro y caudal', 'Fuerza de impacto en caída libre', 'Aplicación en evaluación de riesgos'],
  },
  {
    badge: 'I+D Científico',
    badgeColor: 'blue',
    year: '2010 – 2013 · Publicación 2011',
    client: 'Universidad de Chile · Editorial Springer',
    title: 'Simulación Nanoscópica de Impactos de Alta Velocidad mediante Dinámica Molecular',
    desc: 'Investigación computacional ejecutada con LPMD en infraestructura HPC Linux para interpretar transiciones de fase estructural producidas por impactos inelásticos a escala nanométrica. La metodología, publicada en Springer, es directamente aplicable al I+D de nuevos materiales para minería e industria de alta exigencia mecánica.',
    kpis: ['Publicado en Springer (2011)', 'Infraestructura HPC Linux', 'Aplicable a I+D minería'],
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
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
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
          <span className="label-mono fade-in-item">Compromisos Ejecutados</span>
          <h2 className="sec-title fade-in-item">Resultados que operan<br />en plantas reales</h2>
          <p className="sec-sub fade-in-item mx-auto">
            Cada proyecto representa un compromiso técnico cerrado. Wasaff Consulting
            participó como equipo principal de cálculo e investigación en cada uno de los
            siguientes casos.
          </p>
        </div>

        <div className="flex flex-col gap-4">
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
                <div className="grid md:grid-cols-[300px_1fr]">
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
                    <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                      {p.client}
                    </p>
                  </div>

                  <div className="p-8">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.9rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
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
      </div>
    </section>
  );
}
