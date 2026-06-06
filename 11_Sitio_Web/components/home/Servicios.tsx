'use client';
import Link from 'next/link';
import { useFadeIn } from '@/lib/useFadeIn';

const servicios = [
  {
    num: '01',
    title: 'Recuperación de Calor',
    badge: 'Core',
    badgeColor: 'green',
    price: 'Desde CLP $1.500.000 · precio final por alcance',
    entregable: 'Modelo termodinámico + roadmap de implementación',
    roi: '200–400% primer año',
    desc: 'Reduzca el OPEX energético de su planta con un modelo matemático riguroso del sistema térmico e hidráulico. Dimensionamiento de intercambiadores, redes de distribución de agua caliente y acumuladores. Cada decisión de inversión queda respaldada por cálculo verificable e independiente del proveedor de equipos. Proyectos de ingeniería de detalle completa se cotizan por alcance.',
    tags: ['ε-NTU', 'Hidráulica', 'Runge-Kutta 4', 'Python / SciPy'],
    anchor: '#casos',
    anchorLabel: 'Ver caso 622 kW',
    dev: false,
  },
  {
    num: '02',
    title: 'Validación de Sistemas Térmicos',
    badge: '',
    badgeColor: '',
    price: 'Desde CLP $800.000',
    entregable: 'Informe de contraparte técnica independiente',
    roi: 'Evita sobrediseños de $5M+',
    desc: 'Respaldo técnico independiente para diseños de intercambiadores, redes de distribución y sistemas de recuperación de calor. Verificación de supuestos de diseño, detección de sobredimensionamiento y contraparte ante proveedores de equipos térmicos.',
    tags: ['Verificación ε-NTU', 'Hidráulica', 'Normas ANSI/ISO'],
    anchor: '#contacto',
    anchorLabel: 'Solicitar cotización',
    dev: false,
  },
  {
    num: '03',
    title: 'Peritaje Energético',
    badge: '',
    badgeColor: '',
    price: 'Desde CLP $3.000.000',
    entregable: 'Informe pericial con validez legal',
    roi: 'Protección ante controversias técnicas',
    desc: 'Informes periciales técnicos sobre sistemas térmicos e hidráulicos para procesos legales, controversias con proveedores de equipos o seguros. Redacción con rigor universitario, citación de normas ANSI/ISO y validez ante organismos reguladores.',
    tags: ['Peritaje Energético', 'Sistemas Térmicos', 'Normas internacionales'],
    anchor: '#contacto',
    anchorLabel: 'Consultar disponibilidad',
    dev: false,
  },
];

const badgeMap: Record<string, { bg: string; color: string; border: string }> = {
  green: { bg: 'rgba(10,122,101,0.08)', color: 'var(--green)', border: '1px solid rgba(10,122,101,0.25)' },
  blue:  { bg: 'rgba(34,81,255,0.07)',  color: 'var(--blue)',  border: '1px solid rgba(34,81,255,0.2)' },
  gold:  { bg: 'rgba(138,100,36,0.07)', color: 'var(--gold)',  border: '1px solid rgba(138,100,36,0.25)' },
};

export default function Servicios() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.08, rootMargin: '0px 0px -50px 0px', staggerMs: 80 });

  return (
    <section
      ref={ref}
      id="servicios"
      className="section-base"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="text-center mb-14">
          <span className="label-mono fade-in-item">Servicios y Precios</span>
          <h2 className="sec-title fade-in-item">
            Ingeniería a precio transparente,<br />resultados medibles
          </h2>
          <p className="sec-sub fade-in-item mx-auto">
            Sin letra chica. Precios desde el primer contacto, entregables definidos,
            ROI estimado antes de firmar. Solo ingeniería física computacional de alto rigor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => {
            const bs = s.badgeColor ? badgeMap[s.badgeColor] : null;
            return (
              <div
                key={s.num}
                className="fade-in-item p-8 flex flex-col gap-4 transition-all duration-200 relative"
                style={{
                  background: 'var(--bg)',
                  border: s.dev ? '1px solid rgba(138,100,36,0.25)' : '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  if (!s.dev) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,81,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  if (!s.dev) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }}
              >
                {/* Badge superior */}
                {s.badge && bs && (
                  <span
                    className="absolute top-4 right-4 px-2 py-0.5"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      borderRadius: '2px',
                      ...bs,
                    }}
                  >
                    {s.badge}
                  </span>
                )}

                {/* Número */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: s.dev ? 'var(--gold)' : 'var(--blue)',
                  }}
                >
                  {s.num}
                </span>

                {/* Título */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
                  {s.title}
                </h3>

                {/* Precio */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: s.dev ? 'var(--gold)' : 'var(--text)',
                    fontWeight: 500,
                    padding: '0.4rem 0.75rem',
                    background: s.dev ? 'rgba(138,100,36,0.06)' : 'rgba(34,81,255,0.05)',
                    border: `1px solid ${s.dev ? 'rgba(138,100,36,0.2)' : 'rgba(34,81,255,0.15)'}`,
                    borderRadius: '2px',
                    display: 'inline-block',
                  }}
                >
                  {s.price}
                </div>

                {/* Descripción */}
                <p className="flex-1" style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                  {s.desc}
                </p>

                {/* Entregable + ROI */}
                <div
                  className="flex flex-col gap-2 pt-3"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: '72px' }}>Entregable</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.4 }}>{s.entregable}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: '72px' }}>ROI típico</span>
                    <span style={{ fontSize: '0.8rem', color: s.dev ? 'var(--muted)' : 'var(--green)', fontWeight: 500 }}>{s.roi}</span>
                  </div>
                </div>

                {/* Tags técnicos */}
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>

                {/* CTA */}
                <Link
                  href={s.anchor}
                  className="btn-ghost mt-auto"
                  style={{ fontSize: '0.82rem', padding: '0.55rem 1rem', textAlign: 'center', justifyContent: 'center' }}
                >
                  {s.anchorLabel} →
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA pre-calificación */}
        <div
          className="fade-in-item mt-12 p-8 text-center"
          style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 500, marginBottom: '0.5rem' }}>
            ¿Tiene su planta potencial de recuperación de calor?
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
            Responda 8 preguntas técnicas. En 24 horas le contactamos con una evaluación de factibilidad sin costo.
          </p>
          <Link href="/calculadora" className="btn-solid">
            Solicitar pre-calificación →
          </Link>
        </div>
      </div>
    </section>
  );
}
