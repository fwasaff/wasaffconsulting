'use client';
import Link from 'next/link';
import { useState } from 'react';

const faqs: { pregunta: string; respuesta: string; categoria: string }[] = [
  {
    categoria: 'Plazos y proceso',
    pregunta: '¿Cuánto tiempo toma un proyecto típico?',
    respuesta:
      'Los estudios de viabilidad toman 2–4 semanas. Los proyectos completos de modelado termodinámico e hidráulico tardan 4–8 semanas. El plazo depende directamente de la disponibilidad de datos del cliente: si los consumos energéticos históricos, planos y especificaciones de equipos están disponibles desde el inicio, el proyecto puede comenzar y cerrarse en el rango inferior. Si hay que recopilar datos en terreno, los plazos se extienden.',
  },
  {
    categoria: 'Datos requeridos',
    pregunta: '¿Qué datos necesitan para comenzar?',
    respuesta:
      'Para un proyecto de eficiencia energética se requiere: consumos eléctricos históricos (idealmente 12 meses), planos de planta con layout de equipos, especificaciones técnicas de los equipos principales (compresores, intercambiadores, bombas), y acceso a operadores para entender el proceso real. Sin datos de consumo histórico el modelo no puede calibrarse — las simulaciones sin calibración tienen incertidumbre superior al 30%, lo que las hace poco útiles para decisiones de inversión.',
  },
  {
    categoria: 'Alcance del servicio',
    pregunta: '¿El modelo incluye la implementación física?',
    respuesta:
      'No. Wasaff Consulting entrega el diseño conceptual, especificaciones técnicas, dimensionamiento de equipos y roadmap de implementación. La ejecución física la realiza el cliente o un contratista EPC. Esto no es una limitación: permite al cliente obtener cotizaciones competitivas de múltiples proveedores con especificaciones precisas, en lugar de depender de una sola empresa para diseño y ejecución. Podemos supervisar la implementación como servicio adicional, verificando que los equipos instalados cumplan las especificaciones del modelo.',
  },
  {
    categoria: 'Garantías',
    pregunta: '¿Qué pasa si los resultados reales no coinciden con la simulación?',
    respuesta:
      'El modelo incluye rangos de incertidumbre explícitos (±10–15%) documentados en el informe. Si la desviación entre el resultado simulado y el medido en terreno excede ese rango por errores de modelado — no por cambios en el proceso del cliente — ajustamos el modelo sin costo adicional dentro de los 6 meses posteriores a la entrega. Esta garantía requiere que las condiciones de operación sean equivalentes a las del estudio.',
  },
  {
    categoria: 'Tamaño de empresa',
    pregunta: '¿Trabajan con empresas de cualquier tamaño?',
    respuesta:
      'El mínimo de facturación es CLP $800.000 por proyecto. Trabajamos con plantas desde 50 kW de consumo instalado. Para proyectos menores, recomendamos una auditoría energética estándar antes de considerar simulación computacional — la simulación tiene valor cuando la complejidad del sistema justifica el costo del modelo. Si su consumo mensual es inferior a 20.000 kWh, es probable que una auditoría convencional sea más costo-efectiva.',
  },
  {
    categoria: 'Licencias y software',
    pregunta: '¿El software utilizado requiere licencias adicionales por parte del cliente?',
    respuesta:
      'No. Trabajamos exclusivamente con software open source (Python/SciPy, OpenFOAM, LAMMPS) o herramientas desarrolladas internamente. El cliente recibe los archivos fuente — ecuaciones, scripts y datos — y puede ejecutar, modificar o auditar el modelo sin costos de licenciamiento. Esta es una diferencia crítica respecto a consultoras que entregan resultados en software propietario: con Wasaff Consulting el modelo es suyo.',
  },
  {
    categoria: 'Confidencialidad',
    pregunta: '¿Cómo manejan la confidencialidad de los datos del cliente?',
    respuesta:
      'Un NDA (acuerdo de no divulgación) está disponible desde el primer contacto, antes de compartir cualquier dato técnico. Los proyectos se mencionan en el portfolio solo de forma anónima — industria y región — sin identificar al cliente. Los datos de proceso se eliminan de los archivos de trabajo una vez entregado el informe final, salvo que el cliente solicite retenerlos para proyectos futuros.',
  },
  {
    categoria: 'Forma de trabajo',
    pregunta: '¿Cómo se estructura el pago de un proyecto?',
    respuesta:
      'Los proyectos se pagan por hitos, no con anticipo total. La estructura típica es: 30% al inicio (kick-off y definición de alcance), 40% al entregar el modelo preliminar con resultados parciales, 30% al entregar el informe final. Para estudios de viabilidad cortos (1–2 semanas) puede aplicarse 50/50. No se exige anticipo del 100% como es común en consultoras más grandes.',
  },
];

type Categoria = string | 'Todas';

export default function FaqPage() {
  const categorias: Categoria[] = ['Todas', ...Array.from(new Set(faqs.map((f) => f.categoria)))];
  const [activa, setActiva]       = useState<Categoria>('Todas');
  const [abierta, setAbierta]     = useState<string | null>(null);

  const filtradas = activa === 'Todas' ? faqs : faqs.filter((f) => f.categoria === activa);

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-16">
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}
          >
            ← Volver al inicio
          </Link>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Preguntas Frecuentes
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--dark-text)', marginBottom: '1rem' }}>
            Respuestas técnicas,<br />sin marketing
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '540px', lineHeight: 1.75 }}>
            Preguntas reales de clientes industriales sobre cómo funcionan
            los proyectos de simulación computacional y eficiencia energética.
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16 items-start">

          {/* Sidebar de categorías */}
          <nav aria-label="Categorías FAQ" className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiva(cat)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '2px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  border: activa === cat ? '1px solid rgba(34,81,255,0.4)' : '1px solid var(--border)',
                  background: activa === cat ? 'rgba(34,81,255,0.07)' : 'transparent',
                  color: activa === cat ? 'var(--blue)' : 'var(--muted)',
                }}
              >
                {cat}
              </button>
            ))}

            {/* Box contacto */}
            <div
              className="hidden lg:flex flex-col gap-3 mt-6 p-5"
              style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}
            >
              <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                ¿No encontró su pregunta?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                Pregúntenos directamente. La primera consulta es sin costo.
              </p>
              <Link
                href="mailto:felipe.wasaff@uchile.cl"
                style={{ fontSize: '0.8rem', color: 'var(--blue)', textDecoration: 'none' }}
              >
                felipe.wasaff@uchile.cl →
              </Link>
              <button
                className="btn-ghost"
                style={{ fontSize: '0.78rem', padding: '0.5rem 0.75rem', justifyContent: 'center' }}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                  }
                }}
              >
                Agendar 30 min gratis →
              </button>
            </div>
          </nav>

          {/* Acordeón de preguntas */}
          <div className="flex flex-col gap-2">
            {filtradas.map((faq) => {
              const isOpen = abierta === faq.pregunta;
              return (
                <div
                  key={faq.pregunta}
                  style={{
                    background: 'var(--bg)',
                    border: isOpen ? '1px solid rgba(34,81,255,0.25)' : '1px solid var(--border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => setAbierta(isOpen ? null : faq.pregunta)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      padding: '1.25rem 1.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--blue)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {faq.categoria}
                      </span>
                      <span style={{ fontSize: '0.97rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>
                        {faq.pregunta}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '1.2rem',
                        color: 'var(--muted)',
                        flexShrink: 0,
                        marginTop: '0.25rem',
                        transition: 'transform 0.2s',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        lineHeight: 1,
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
                      <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, paddingTop: '1.25rem' }}>
                        {faq.respuesta}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA inferior */}
        <div
          className="mt-16 p-10 text-center"
          style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Siguiente paso
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Evalúe el potencial de su planta
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
            La calculadora de ahorro estima en 60 segundos el potencial de reducción
            de OPEX energético específico para su operación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculadora" className="btn-solid">
              Calcular mi ahorro potencial →
            </Link>
            <button
              className="btn-ghost"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                }
              }}
            >
              Diagnóstico gratuito 30 min
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
