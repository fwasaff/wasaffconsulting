'use client';
import Image from 'next/image';
import { useFadeIn } from '@/lib/useFadeIn';

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
    year: '2026',
    client: 'Industria manufacturera · Región Metropolitana',
    title: 'Recuperación de calor residual en sistema de compresores industriales',
    desc: 'Una planta manufacturera tenía un OPEX energético insostenible derivado de seis compresores de tornillo rotatorio que disipaban calor a la atmósfera. Wasaff Consulting desarrolló el modelo matemático completo: balance ε-NTU del intercambiador externo, red hidráulica de 9 tramos con Colebrook-White resuelto por Newton-Raphson, modelo dinámico del acumulador (15.000 L) integrado con Runge-Kutta 4, y análisis de degradación por fouling que determinó la selección del intercambiador tubular shell-and-tube.',
    kpis: ['622 kW de potencia térmica de diseño', '5.448.720 kWh/año · 19,6 TJ/año', '9 tramos · DN65/DN100 Sch 40 · Bomba 0,55 kW', '306 MM CLP/año en ahorro estimado'],
    image: { src: '/compresores.png', alt: 'Compresores industriales de tornillo rotatorio' },
  },
];

const badgeStyles: Record<BadgeColor, { bg: string; color: string; border: string }> = {
  gold: { bg: 'rgba(138,100,36,0.08)', color: 'var(--gold)', border: '1px solid rgba(138,100,36,0.25)' },
  red:  { bg: 'rgba(158,37,37,0.07)',  color: 'var(--red)',  border: '1px solid rgba(158,37,37,0.25)' },
  blue: { bg: 'rgba(34,81,255,0.07)',  color: 'var(--blue)', border: '1px solid rgba(34,81,255,0.2)' },
};

export default function Proyectos() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.06, rootMargin: '0px 0px -50px 0px', staggerMs: 100 });

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
            El caso que define nuestra especialidad: recuperación de calor residual con
            modelo matemático completo y números verificables.
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
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={800}
                      height={220}
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
