'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const metrics = [
  { val: '505', unit: 'kW',  label: 'Recuperación Energética' },
  { val: '3',   unit: '/3',  label: 'Validación Normativa' },
  { val: 'HPC', unit: '',    label: 'Cómputo de Alto Rendimiento' },
  { val: '6',   unit: '+',   label: 'Años de Rigor Técnico' },
];

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
      (item as HTMLElement).style.transitionDelay = `${i * 110}ms`;
      io.observe(item);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
        paddingTop: '4rem',
      }}
    >
      {/* Imagen de fondo con opacidad baja */}
      <img
        src="/tuberias.png"
        aria-hidden
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Gradiente radial — punto de fuga central */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 85% 85% at 50% 48%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Contenido centrado */}
      <div
        className="relative z-10 text-center"
        style={{ maxWidth: '800px', width: '100%', padding: '0 2rem' }}
      >
        {/* Indicador de estado */}
        <div
          className="fade-in-item inline-flex items-center justify-center gap-2 mb-10"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.38)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          <span className="status-dot" style={{ background: 'var(--green)' }} />
          Consultoría de Ingeniería Computacional · Santiago, Chile
        </div>

        {/* H1 */}
        <h1
          className="fade-in-item mb-8"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            lineHeight: 1.06,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          Cuando el problema
          requiere física,{' '}
          <em style={{ color: 'var(--mustard)' }}>
            el modelo es la respuesta.
          </em>
        </h1>

        {/* Subtítulo */}
        <p
          className="fade-in-item"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.78,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '560px',
            margin: '0 auto 2.75rem',
          }}
        >
          Wasaff Consulting aplica simulación computacional avanzada y métodos numéricos
          rigurosos donde los proveedores genéricos no alcanzan. La física de sus procesos
          se convierte en decisiones técnicas confiables para minería, energía y manufactura.
        </p>

        {/* CTAs */}
        <div className="fade-in-item flex flex-wrap gap-4 justify-center">
          <Link href="#contacto" className="btn-solid">
            Solicitar diagnóstico técnico →
          </Link>
          <Link
            href="#casos"
            className="btn-ghost-dark"
          >
            Ver proyectos
          </Link>
        </div>
      </div>

      {/* Franja de métricas — anclada al fondo */}
      <div
        className="fade-in-item relative z-10 w-full"
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="container-w grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="py-6 text-center"
              style={{
                borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
                  color: 'var(--mustard)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {m.val}
                {m.unit && (
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.1rem' }}>
                    {m.unit}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.38)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  lineHeight: 1.35,
                }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
