'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useFadeIn } from '@/lib/useFadeIn';

export default function Hero() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.1, staggerMs: 80 });

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
      style={{ background: 'var(--dark)' }}
    >
      {/* Gradiente de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 70% 60%, rgba(34,81,255,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="container-w w-full py-20 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">

          {/* Copy */}
          <div>
            <div
              className="fade-in-item inline-flex items-center gap-2 mb-8"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--dark-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              <span className="status-dot" style={{ background: 'var(--green)' }} />
              Especialista técnico · Ingeniería de detalle · Santiago, Chile
            </div>

            <h1
              className="fade-in-item mb-6"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                lineHeight: 1.1,
                color: 'var(--dark-text)',
                letterSpacing: '-0.01em',
              }}
            >
              Ingeniería térmica computacional para la energía residual{' '}
              <em style={{ color: '#6fa3e8' }}>que su planta está perdiendo.</em>
            </h1>

            <p
              className="fade-in-item mb-8"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--dark-muted)',
                maxWidth: '520px',
              }}
            >
              Modelado termodinámico e hidráulico de sistemas de recuperación de calor.
              Dimensionamiento de intercambiadores, redes de distribución y acumuladores
              térmicos — código fuente entregado junto al informe.
            </p>

            {/* CTA */}
            <div className="fade-in-item flex flex-wrap gap-4 items-center">
              <Link href="#contacto" className="btn-solid" style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}>
                Solicitar factibilidad técnica →
              </Link>
            </div>
          </div>

          {/* Imagen + métricas */}
          <div
            className="fade-in-item overflow-hidden relative"
            style={{ border: '1px solid var(--dark-border)', borderRadius: '2px' }}
          >
            <Image
              src="/tuberias.png"
              alt="Red de tuberías industriales con válvulas y manómetros"
              width={800}
              height={420}
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: '100%', height: 'clamp(200px, 35vw, 420px)', objectFit: 'cover', objectPosition: 'center', userSelect: 'none', display: 'block' }}
            />
            {/* KPI overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px"
              style={{ background: 'rgba(5,28,44,0.92)', backdropFilter: 'blur(8px)' }}
            >
              {[
                { val: '622', unit: 'kW', label: 'Potencia térmica de diseño', sub: 'Sistema de compresores — industria pulp' },
                { val: '9', unit: '', label: 'Tramos hidráulicos calculados', sub: 'Colebrook-White · Newton-Raphson' },
                { val: '306', unit: 'MM', label: 'CLP en ahorro anual estimado', sub: '5,45 GWh/año · industria pulp' },
                { val: '6+', unit: '', label: 'Años de rigor técnico', sub: 'Universidad de Chile + consultoría' },
              ].map((m) => (
                <div key={m.label} className="p-5 flex flex-col gap-1">
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', color: '#ffffff', lineHeight: 1 }}>
                    {m.val}
                    {m.unit && (
                      <span style={{ fontSize: '0.8rem', color: '#6fa3e8', marginLeft: '0.15rem' }}>{m.unit}</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--dark-text)', lineHeight: 1.3 }}>{m.label}</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--dark-muted)', lineHeight: 1.3 }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
