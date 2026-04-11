'use client';
import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'wc_sticky_dismissed';
const DISMISS_HOURS = 24;

export default function StickyContact() {
  const [visible,    setVisible]    = useState(false);
  const [expanded,   setExpanded]   = useState(false);
  const [enviando,   setEnviando]   = useState(false);
  const [enviado,    setEnviado]    = useState(false);
  const [error,      setError]      = useState('');
  const triggerRef = useRef<number | null>(null);

  // Mostrar tras scroll >50% o 8 segundos, si no fue descartado recientemente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = Number(dismissed);
      const hoursAgo = (Date.now() - dismissedAt) / 3_600_000;
      if (hoursAgo < DISMISS_HOURS) return;
    }

    const showBar = () => setVisible(true);

    // Por tiempo
    triggerRef.current = window.setTimeout(showBar, 8_000);

    // Por scroll
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct > 0.5) {
        showBar();
        window.removeEventListener('scroll', onScroll);
        if (triggerRef.current) clearTimeout(triggerRef.current);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (triggerRef.current) clearTimeout(triggerRef.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setExpanded(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd  = new FormData(e.currentTarget);
    const body = {
      nombre:   fd.get('nombre'),
      email:    fd.get('email'),
      telefono: fd.get('telefono'),
      mensaje:  fd.get('mensaje'),
      fuente:   'sticky-form',
      fecha:    new Date().toISOString(),
    };
    setEnviando(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Error');
      setEnviado(true);
      setTimeout(dismiss, 3_000);
    } catch {
      setError('Error al enviar. Contáctenos en felipe.wasaff@uchile.cl');
    } finally {
      setEnviando(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop semitransparente cuando está expandido */}
      {expanded && (
        <div
          className="fixed inset-0 md:hidden"
          style={{ background: 'rgba(5,28,44,0.4)', zIndex: 998, backdropFilter: 'blur(2px)' }}
          onClick={() => setExpanded(false)}
          aria-hidden
        />
      )}

      {/* ── MÓVIL: sticky bottom ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0"
        style={{
          zIndex: 999,
          background: '#ffffff',
          borderTop: '1px solid var(--border)',
          boxShadow: '0 -4px 24px rgba(5,28,44,0.12)',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
          maxHeight: expanded ? '480px' : '72px',
          overflow: 'hidden',
        }}
        role="dialog"
        aria-label="Formulario de contacto rápido"
      >
        {/* Barra colapsada */}
        <div
          className="flex items-center justify-between px-5"
          style={{ height: '72px', cursor: expanded ? 'default' : 'pointer' }}
          onClick={() => !expanded && setExpanded(true)}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)', animation: 'pulseGreen 2s infinite', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                ¿Consulta rápida?
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                Respondemos en menos de 24 horas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!expanded && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                className="btn-solid"
                style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
              >
                Consultar
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); dismiss(); }}
              aria-label="Cerrar"
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'var(--panel)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1rem', color: 'var(--muted)',
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Formulario expandido */}
        {expanded && (
          <div style={{ padding: '0 1.25rem 1.5rem', borderTop: '1px solid var(--border)' }}>
            {enviado ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span style={{ fontSize: '2rem' }}>✓</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>
                  Mensaje enviado
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Responderemos en menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="nombre" type="text" placeholder="Nombre" required
                    style={inputSt()}
                    aria-label="Nombre"
                  />
                  <input
                    name="email" type="email" placeholder="Email corporativo" required
                    style={inputSt()}
                    aria-label="Email"
                  />
                </div>
                <input
                  name="telefono" type="tel" placeholder="Teléfono (opcional)"
                  style={inputSt()}
                  aria-label="Teléfono"
                />
                <textarea
                  name="mensaje" placeholder="Describa brevemente su necesidad (máx. 500 caracteres)"
                  maxLength={500} rows={3} required
                  style={{ ...inputSt(), resize: 'none' }}
                  aria-label="Mensaje"
                />
                {error && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={enviando}
                  className="btn-solid"
                  style={{ justifyContent: 'center', opacity: enviando ? 0.7 : 1 }}
                >
                  {enviando ? 'Enviando...' : 'Enviar consulta →'}
                </button>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center' }}>
                  Sus datos son confidenciales. NDA disponible.
                </p>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ── DESKTOP: sidebar derecho fijo ── */}
      <div
        className="hidden md:flex fixed right-0 top-1/2"
        style={{
          zIndex: 997,
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {!expanded ? (
          /* Tab lateral */
          <button
            onClick={() => setExpanded(true)}
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              padding: '1rem 0.6rem',
              background: 'var(--dark)',
              color: 'var(--dark-text)',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '-2px 0 12px rgba(5,28,44,0.15)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)', animation: 'pulseGreen 2s infinite', display: 'inline-block', transform: 'rotate(180deg)' }} />
            Consulta rápida
          </button>
        ) : (
          /* Panel expandido desktop */
          <div
            style={{
              width: '320px',
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              boxShadow: '-4px 0 24px rgba(5,28,44,0.12)',
              overflow: 'hidden',
            }}
          >
            {/* Header panel */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--panel)' }}
            >
              <div>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>Consulta rápida</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Respuesta en &lt; 24 horas hábiles</p>
              </div>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Minimizar"
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--muted)', padding: '0.25rem' }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem' }}>
              {enviado ? (
                <div className="text-center py-4">
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</p>
                  <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.4rem' }}>Mensaje enviado</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Respondemos en &lt;24 horas hábiles.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input name="nombre"   type="text"  placeholder="Nombre *"             required style={inputSt()} aria-label="Nombre" />
                  <input name="email"    type="email" placeholder="Email corporativo *"   required style={inputSt()} aria-label="Email" />
                  <input name="telefono" type="tel"   placeholder="Teléfono (opcional)"           style={inputSt()} aria-label="Teléfono" />
                  <textarea
                    name="mensaje" placeholder="Describa su necesidad *"
                    maxLength={500} rows={4} required
                    style={{ ...inputSt(), resize: 'none' }}
                    aria-label="Mensaje"
                  />
                  {error && <p style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{error}</p>}
                  <button
                    type="submit" disabled={enviando} className="btn-solid"
                    style={{ justifyContent: 'center', opacity: enviando ? 0.7 : 1, fontSize: '0.88rem' }}
                  >
                    {enviando ? 'Enviando...' : 'Enviar consulta →'}
                  </button>
                  <p style={{ fontSize: '0.68rem', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.5 }}>
                    Confidencial · NDA disponible · Sin compromiso
                  </p>
                </form>
              )}
            </div>

            {/* Footer dismiss */}
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <button
                onClick={dismiss}
                style={{ fontSize: '0.72rem', color: 'var(--muted)', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                No mostrar por 24 horas
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function inputSt(): React.CSSProperties {
  return {
    padding: '0.6rem 0.8rem',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    fontSize: '0.88rem',
    color: 'var(--text)',
    background: '#ffffff',
    outline: 'none',
    width: '100%',
  };
}
