'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const metrics = [
  {
    val: '505',
    unit: 'kW',
    label: 'Recuperación Energética',
    desc: 'Calor residual capturado en operación normal — industria manufacturera',
  },
  {
    val: '2011',
    unit: '',
    label: 'Publicación Springer',
    desc: 'Investigación publicada en editorial científica internacional',
  },
  {
    val: 'HPC',
    unit: '',
    label: 'Cómputo de Alto Rendimiento',
    desc: 'Dinámica molecular y simulación paralela en Linux',
  },
  {
    val: '6',
    unit: '+',
    label: 'Años de Rigor Técnico',
    desc: 'Desde la investigación académica hasta la planta industrial',
  },
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
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 70% 60%, rgba(34,81,255,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="container-w w-full py-20 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">

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
              Consultoría de Ingeniería Computacional · Santiago, Chile
            </div>

            <h1
              className="fade-in-item mb-7"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                lineHeight: 1.08,
                color: 'var(--dark-text)',
                letterSpacing: '-0.01em',
              }}
            >
              Cuando el problema
              requiere física,{' '}
              <em style={{ color: '#a0c0e8' }}>
                el modelo es la respuesta.
              </em>
            </h1>

            <p
              className="fade-in-item mb-10"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--dark-muted)',
                maxWidth: '500px',
              }}
            >
              Wasaff Consulting aplica simulación computacional avanzada y métodos numéricos
              rigurosos donde los proveedores genéricos no alcanzan. La física de sus procesos
              se convierte en decisiones técnicas confiables para minería, energía y manufactura.
            </p>

            <div className="fade-in-item flex flex-wrap gap-4">
              <Link href="#contacto" className="btn-solid">
                Solicitar diagnóstico técnico →
              </Link>
              <Link href="#casos" className="btn-ghost-dark">
                Ver proyectos
              </Link>
            </div>
          </div>

          <div
            className="fade-in-item overflow-hidden relative"
            style={{ border: '1px solid var(--dark-border)', borderRadius: '2px' }}
          >
            <img
              src="/tuberias.png"
              alt="Red de tuberías industriales con válvulas y manómetros"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: '100%', display: 'block', height: '420px', objectFit: 'cover', objectPosition: 'center', userSelect: 'none' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px"
              style={{ background: 'rgba(10,22,48,0.88)', backdropFilter: 'blur(6px)' }}
            >
              {metrics.map((m) => (
                <div key={m.label} className="p-5 flex flex-col gap-1.5">
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#ffffff', lineHeight: 1 }}>
                    {m.val}
                    {m.unit && <span style={{ fontSize: '0.8rem', color: 'var(--blue)', marginLeft: '0.1rem' }}>{m.unit}</span>}
                  </div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--dark-text)', lineHeight: 1.3 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
