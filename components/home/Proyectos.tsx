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
  roi?: { inversion: string; ahorro: string; payback: string };
  image?: { src: string; alt: string };
}[] = [
  {
    badge: 'Recuperación Energética',
    badgeColor: 'gold',
    year: '2023',
    client: 'Industria manufacturera · Región Metropolitana',
    title: 'Recuperación de calor residual en sistema de compresores industriales',
    desc: 'Una planta manufacturera tenía un OPEX energético insostenible derivado de seis compresores de tornillo rotatorio que disipaban calor a la atmósfera. Wasaff Consulting desarrolló el modelo matemático completo: análisis ε-NTU de intercambiadores de placas, red hidráulica de 11 tramos (Darcy-Weisbach + Colebrook-White), verificación de acumuladores y dimensionamiento de bomba de circulación.',
    kpis: ['505 kW recuperados en operación normal', 'Bomba: solo 0,55 kW para todo el circuito', '27 m³/h · ΔP total 7,6 kPa', 'Entregado en 4 semanas'],
    roi: { inversion: 'CLP $3.200.000', ahorro: 'CLP $48.000.000/año', payback: '< 1 mes' },
    image: { src: '/compresores.png', alt: 'Compresores industriales de tornillo rotatorio' },
  },
  {
    badge: 'Hidráulica Industrial',
    badgeColor: 'red',
    year: '2024',
    client: 'Sector protección contra incendios · Chile',
    title: 'Análisis hidráulico que evitó reposición innecesaria de red crítica',
    desc: 'Un operador de red contra incendios desconocía las pérdidas de carga reales de su sistema. Un proveedor recomendó reemplazar toda la red por sobrediseño. Wasaff Consulting resolvió el comportamiento hidráulico completo — pérdidas de carga por fricción y accesorios bajo distintos caudales — y modeló la fuerza de impacto al caída libre de secciones, con aplicación directa en evaluación de riesgos.',
    kpis: ['Redimensionamiento evitó reposición innecesaria', 'Pérdidas de carga por diámetro y caudal calculadas', 'Fuerza de impacto en caída libre modelada', 'Informe con validez normativa'],
    roi: { inversion: 'CLP $1.800.000', ahorro: 'CLP $12.000.000 evitados', payback: 'Inmediato' },
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

                    {/* ROI box */}
                    {p.roi && (
                      <div
                        className="mt-auto flex flex-col gap-2 p-4"
                        style={{ background: 'rgba(10,122,101,0.06)', border: '1px solid rgba(10,122,101,0.2)', borderRadius: '2px' }}
                      >
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                          Resultado económico
                        </p>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Inversión estudio</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{p.roi.inversion}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Ahorro / beneficio</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--green)' }}>{p.roi.ahorro}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Payback</p>
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{p.roi.payback}</p>
                        </div>
                      </div>
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
