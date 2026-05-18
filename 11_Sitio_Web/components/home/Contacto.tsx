'use client';
import Link from 'next/link';
import { useFadeIn } from '@/lib/useFadeIn';
import { trackEvent } from '@/lib/gtag';

const infoRows = [
  { key: 'Sede',               val: 'Santiago, Chile' },
  { key: 'Modalidad',          val: 'B2B · Proyectos cerrados y asesorías' },
  { key: 'Sectores',           val: 'Minería · Energía · Manufactura' },
  { key: 'Cobertura',          val: 'Chile · Proyectos internacionales a solicitud' },
  { key: 'Confidencialidad',   val: 'NDA disponible desde el primer contacto' },
];

export default function Contacto() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', staggerMs: 80 });

  return (
    <section
      ref={ref}
      id="contacto"
      className="section-base"
      style={{ background: 'var(--panel)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <span className="label-mono fade-in-item">Iniciar un Proyecto</span>
            <h2
              className="fade-in-item mb-5"
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                lineHeight: 1.1,
                color: 'var(--text)',
              }}
            >
              Evaluemos la viabilidad<br />técnica de su desafío.
            </h2>

            {/* Diagnóstico gratuito */}
            <div
              className="fade-in-item inline-flex items-center gap-3 mb-6 px-4 py-3"
              style={{
                background: 'rgba(34,81,255,0.05)',
                border: '1px solid rgba(34,81,255,0.18)',
                borderRadius: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                }}
              >
                Diagnóstico inicial · 30 min · Sin costo · Sin compromiso
              </span>
            </div>

            <p
              className="fade-in-item"
              style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '2.5rem' }}
            >
              La primera conversación es una evaluación honesta del alcance técnico y la
              viabilidad del proyecto. Si la solución requiere capacidades fuera de nuestra
              práctica, lo comunicamos en ese mismo intercambio.
            </p>

            <div className="fade-in-item mb-5">
              <button
                className="btn-solid w-full justify-center"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  trackEvent('calendly_click', { location: 'contacto' });
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                  }
                }}
              >
                Agendar diagnóstico gratuito →
              </button>
            </div>

            <div className="flex flex-col gap-3 fade-in-item">
              <Link
                href="mailto:felipe@wasaffconsulting.cl"
                className="flex items-center gap-5 p-5 transition-all duration-200"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}
                onClick={() => trackEvent('contact_email_click')}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
                </svg>
                <div>
                  <span
                    className="block mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Correo · Dirección General
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                    felipe@wasaffconsulting.cl
                  </span>
                </div>
              </Link>

              <Link
                href="tel:+56920150897"
                className="flex items-center gap-5 p-5 transition-all duration-200"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}
                onClick={() => trackEvent('contact_phone_click')}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18v-.08z" />
                </svg>
                <div>
                  <span
                    className="block mb-0.5"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Teléfono · Horario Hábil
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)' }}>
                    +56 9 2015 0897
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right — Ficha técnica */}
          <div
            className="fade-in-item p-8"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
              }}
            >
              Ficha de la Firma
            </p>
            {infoRows.map((row, i) => (
              <div
                key={row.key}
                className="flex justify-between items-start py-4"
                style={{ borderBottom: i < infoRows.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    marginRight: '1rem',
                  }}
                >
                  {row.key}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)', textAlign: 'right' }}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
