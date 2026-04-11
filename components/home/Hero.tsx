'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
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
              Ingeniería Física Computacional · Santiago, Chile
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
              Reduzca el OPEX energético
              de su planta en{' '}
              <em style={{ color: '#6fa3e8' }}>15–30%</em>
              {' '}mediante simulación computacional validada.
            </h1>

            <p
              className="fade-in-item mb-4"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--dark-muted)',
                maxWidth: '520px',
              }}
            >
              Ingeniería física de alto rigor para minería, energía y manufactura.
              Proyectos desde{' '}
              <span style={{ color: 'var(--dark-text)', fontWeight: 500 }}>CLP $1.500.000</span>
              . Resultados medibles en 90 días.
            </p>

            {/* Social proof inline */}
            <div
              className="fade-in-item inline-flex items-center gap-2 mb-8 px-4 py-2.5"
              style={{
                background: 'rgba(10,122,101,0.12)',
                border: '1px solid rgba(10,122,101,0.3)',
                borderRadius: '2px',
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: 'var(--green)' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#6ee7b7',
                  letterSpacing: '0.04em',
                }}
              >
                505 kW recuperados · CLP $48M ahorro anual · Cliente manufactura RM
              </span>
            </div>

            {/* CTAs */}
            <div className="fade-in-item flex flex-wrap gap-4 items-center">
              <Link href="/calculadora" className="btn-solid" style={{ fontSize: '0.95rem', padding: '0.75rem 1.5rem' }}>
                Calcular mi ahorro potencial →
              </Link>
              <Link href="#casos" className="btn-ghost-dark">
                Ver casos de éxito
              </Link>
            </div>

            <p
              className="fade-in-item mt-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--dark-muted)',
                letterSpacing: '0.06em',
              }}
            >
              Calculadora gratuita · Sin registro previo · Resultado en 60 segundos
            </p>
          </div>

          {/* Imagen + métricas */}
          <div
            className="fade-in-item overflow-hidden relative"
            style={{ border: '1px solid var(--dark-border)', borderRadius: '2px' }}
          >
            <Image
              src="/tuberias.png"
              alt="Red de tuberías industriales con válvulas y manómetros"
              width={1376}
              height={768}
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: '100%', display: 'block', height: '420px', objectFit: 'cover', objectPosition: 'center', userSelect: 'none' }}
            />
            {/* KPI overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px"
              style={{ background: 'rgba(5,28,44,0.92)', backdropFilter: 'blur(8px)' }}
            >
              {[
                { val: '505', unit: 'kW', label: 'Recuperación Energética', sub: 'Calor residual capturado — manufactura RM' },
                { val: '15–30', unit: '%', label: 'Reducción OPEX típica', sub: 'Medida en 90 días post-estudio' },
                { val: '90', unit: 'días', label: 'Resultados medibles', sub: 'Desde kick-off hasta informe final' },
                { val: '6+', unit: '', label: 'Años de Rigor Técnico', sub: 'Investigación académica → planta industrial' },
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
