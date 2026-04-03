'use client';
import { useEffect, useRef } from 'react';

const casos = [
  {
    label: 'Eficiencia Energética',
    question: '«Estamos perdiendo calor residual y el OPEX es insostenible.»',
    answer:
      'Wasaff Consulting desarrolla el modelo termodinámico completo y dimensiona la ingeniería conceptual: intercambiadores, hidráulica (Darcy-Weisbach) y redes de distribución, justificando matemáticamente la rentabilidad de la inversión.',
  },
  {
    label: 'Validación de Diseño',
    question: '«Un proveedor entregó este diseño. Necesitamos saber si fallará.»',
    answer:
      'Wasaff Consulting aplica ingeniería de contraparte independiente, reconstruyendo los cálculos mediante métodos numéricos propios para auditar factores de seguridad, cumplimiento normativo y tolerancias de operación.',
  },
  {
    label: 'Comportamiento de Materiales',
    question: '«El material no rinde como especifica el fabricante ante impactos.»',
    answer:
      'Wasaff Consulting ejecuta simulaciones de dinámica molecular a escala nanométrica para caracterizar propiedades mecánicas, transiciones de fase y mecanismos de falla que los ensayos macroscópicos no detectan.',
  },
  {
    label: 'Inteligencia de Proceso',
    question: '«Los sensores arrojan gigabytes de datos, pero no hay métricas accionables.»',
    answer:
      'Wasaff Consulting diseña pipelines de ingesta, limpieza y análisis para datos industriales de alta frecuencia, transformando señales de sensor en indicadores predictivos de mantenimiento y control de proceso.',
  },
];

export default function CasosUso() {
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
      id="casos-uso"
      className="section-base"
      style={{ background: 'var(--panel)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div
          className="fade-in-item overflow-hidden mb-14"
          style={{ borderRadius: '2px', border: '1px solid var(--border)' }}
        >
          <img
            src="/planta.png"
            alt="Planta industrial de manufactura"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block', objectPosition: 'center 40%', userSelect: 'none' }}
          />
        </div>

        <div className="text-center mb-14">
          <span className="label-mono fade-in-item">Áreas de Intervención</span>
          <h2 className="sec-title fade-in-item">
            Los problemas que<br />sabemos resolver
          </h2>
          <p className="sec-sub fade-in-item mx-auto">
            Wasaff Consulting interviene cuando los métodos convencionales no alcanzan la
            complejidad del proceso. Nuestro criterio de entrada es simple: si la solución
            requiere física rigurosa, trabajamos en ella.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {casos.map((c) => (
            <div
              key={c.label}
              className="fade-in-item p-8 rounded-sm transition-all duration-200"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,81,255,0.3)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
            >
              <span
                className="block mb-4"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {c.label}
              </span>
              <p
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  lineHeight: 1.4,
                  color: 'var(--text)',
                }}
              >
                {c.question}
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                {c.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
