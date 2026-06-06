'use client';
import Image from 'next/image';
import { useFadeIn } from '@/lib/useFadeIn';

const casos = [
  {
    label: 'Recuperación de Calor Residual',
    question: '«Nuestros compresores disipan calor a la atmósfera y el OPEX es insostenible.»',
    answer:
      'Wasaff Consulting desarrolla el modelo termodinámico completo: balance ε-NTU del intercambiador, red hidráulica por Colebrook-White, modelo dinámico del acumulador con Runge-Kutta 4 y análisis de degradación por fouling. El resultado es un dimensionamiento con números propios, independiente del proveedor de equipos.',
  },
  {
    label: 'Validación de Sistemas Térmicos',
    question: '«El proveedor entregó el diseño del intercambiador. Necesitamos verificarlo antes de comprar.»',
    answer:
      'Wasaff Consulting aplica ingeniería de contraparte independiente: reconstruye los cálculos térmicos e hidráulicos con métodos propios, audita los supuestos del proveedor y detecta sobredimensionamientos o condiciones de operación no declaradas.',
  },
  {
    label: 'Dimensionamiento de Equipos',
    question: '«Hay tres intercambiadores en oferta. No sabemos cuál conviene técnica ni económicamente.»',
    answer:
      'Wasaff Consulting evalúa las alternativas con criterios verificables: área requerida por ε-NTU, análisis de fouling según calidad del agua, pérdidas de carga y costo total de propiedad. La recomendación queda respaldada por cálculo propio, no por el catálogo del fabricante.',
  },
  {
    label: 'Factibilidad de Recuperación',
    question: '«¿Vale la pena invertir en recuperar el calor de nuestra planta?»',
    answer:
      'Wasaff Consulting elabora el estudio de factibilidad térmica: potencial de recuperación por punto operacional, energía anual recuperable (kWh/año) y ahorro estimado en sustitución de fuente primaria. Permite decidir la inversión con números propios antes de comprometerse con ningún proveedor de equipos.',
  },
];

export default function CasosUso() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', staggerMs: 80 });

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
          <Image
            src="/planta.png"
            alt="Planta industrial de manufactura"
            width={1200}
            height={260}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block', objectPosition: 'center 40%', userSelect: 'none' }}
          />
        </div>

        <div className="text-center mb-14">
          <span className="label-mono fade-in-item">Áreas de Intervención</span>
          <h2 className="sec-title fade-in-item">
            Los problemas térmicos<br />que sabemos resolver
          </h2>
          <p className="sec-sub fade-in-item mx-auto">
            Wasaff Consulting interviene cuando el OPEX energético requiere un modelo
            matemático riguroso — no solo una hoja de catálogo. Nuestro criterio es simple:
            si el problema es térmico e hidráulico, lo modelamos con física real.
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
