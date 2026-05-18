'use client';
import { useFadeIn } from '@/lib/useFadeIn';
import { trackEvent } from '@/lib/gtag';

const filas = [
  {
    aspecto: 'Especialidad',
    wasaff: 'Físico computacional — director en cada proyecto',
    tradicional: 'Equipos junior rotativos, supervisión eventual',
  },
  {
    aspecto: 'Tiempo de entrega',
    wasaff: '2–4 semanas',
    tradicional: '2–3 meses promedio',
  },
  {
    aspecto: 'Inversión mínima',
    wasaff: 'Desde CLP $1.500.000',
    tradicional: 'Desde CLP $5.000.000',
  },
  {
    aspecto: 'Transparencia del modelo',
    wasaff: 'Modelo abierto: entregamos ecuaciones y código fuente',
    tradicional: 'Caja negra — dependencia perpetua',
  },
  {
    aspecto: 'Condiciones de pago',
    wasaff: 'Pago por hitos · sin anticipo total',
    tradicional: '50% anticipo obligatorio',
  },
  {
    aspecto: 'Confidencialidad',
    wasaff: 'NDA disponible desde el primer contacto',
    tradicional: 'NDA solo en contratos formales',
  },
  {
    aspecto: 'Comunicación',
    wasaff: 'Acceso directo al ingeniero responsable',
    tradicional: 'Account manager intermediario',
  },
];

export default function Diferenciadores() {
  const ref = useFadeIn<HTMLElement>({ threshold: 0.06, rootMargin: '0px 0px -50px 0px', staggerMs: 60 });

  return (
    <section
      ref={ref}
      id="diferenciadores"
      className="section-base"
      style={{ background: 'var(--dark)', borderTop: '1px solid var(--dark-border)' }}
    >
      <div className="container-w">
        <div className="text-center mb-14">
          <span
            className="fade-in-item"
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'rgba(34,81,255,0.8)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            Por qué Wasaff Consulting
          </span>
          <h2
            className="fade-in-item"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              lineHeight: 1.15,
              color: 'var(--dark-text)',
              marginBottom: '1rem',
            }}
          >
            La alternativa ágil y técnica<br />a las consultoras grandes
          </h2>
          <p
            className="fade-in-item"
            style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
          >
            Cuando necesita respuestas en semanas, no en meses. Con acceso directo
            al ingeniero que firma el informe, no a un intermediario.
          </p>
        </div>

        {/* Tabla comparativa */}
        <div className="fade-in-item overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--dark-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    borderBottom: '1px solid var(--dark-border)',
                    width: '22%',
                  }}
                >
                  Aspecto
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: '#6fa3e8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    borderBottom: '1px solid var(--dark-border)',
                    width: '39%',
                    background: 'rgba(34,81,255,0.06)',
                  }}
                >
                  Wasaff Consulting
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--dark-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    borderBottom: '1px solid var(--dark-border)',
                    width: '39%',
                  }}
                >
                  Consultoras Tradicionales
                </th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f, i) => (
                <tr key={f.aspecto}>
                  <td
                    style={{
                      padding: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--dark-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: i < filas.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      verticalAlign: 'top',
                    }}
                  >
                    {f.aspecto}
                  </td>
                  <td
                    style={{
                      padding: '1rem',
                      fontSize: '0.92rem',
                      color: 'var(--dark-text)',
                      lineHeight: 1.5,
                      borderBottom: i < filas.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      background: 'rgba(34,81,255,0.04)',
                      verticalAlign: 'top',
                    }}
                  >
                    <span className="flex items-start gap-2">
                      <span style={{ color: '#6ee7b7', flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                      {f.wasaff}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '1rem',
                      fontSize: '0.88rem',
                      color: 'var(--dark-muted)',
                      lineHeight: 1.5,
                      borderBottom: i < filas.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      verticalAlign: 'top',
                    }}
                  >
                    {f.tradicional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA bajo tabla */}
        <div className="fade-in-item flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
          <a href="/calculadora" className="btn-solid">
            Calcular mi ahorro potencial →
          </a>
          <button
            className="btn-ghost-dark"
            onClick={() => {
              trackEvent('calendly_click', { location: 'diferenciadores' });
              if (typeof window !== 'undefined' && (window as any).Calendly) {
                (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
              }
            }}
          >
            Diagnóstico gratuito 30 min
          </button>
        </div>
      </div>
    </section>
  );
}
