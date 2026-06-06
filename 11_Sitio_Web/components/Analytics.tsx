'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GA_ID, gtag } from '@/lib/gtag';

const CONSENT_KEY = 'wasaff-analytics-consent';

type Consent = 'granted' | 'denied' | null;

function useConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent;
    setConsent(stored);
    setReady(true);
  }, []);

  const grant = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
  };

  const deny = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
  };

  return { consent, ready, grant, deny };
}

function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    gtag('config', GA_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}

export default function Analytics() {
  const { consent, ready, grant, deny } = useConsent();

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
          <PageTracker />
        </>
      )}

      {ready && consent === null && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: 'rgba(5,28,44,0.97)',
            borderTop: '1px solid var(--dark-border)',
            padding: '0.65rem 0',
          }}
          role="dialog"
          aria-label="Configuración de cookies"
        >
          <div className="container-w flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p style={{ fontSize: '0.78rem', color: 'var(--dark-muted)', lineHeight: 1.5, maxWidth: '640px' }}>
              Utilizamos cookies de análisis (Google Analytics) para entender cómo se usa el sitio
              y mejorar la experiencia. No recopilamos datos personales sensibles.
              <Link
                href="/privacidad"
                style={{ color: '#6fa3e8', textDecoration: 'underline', marginLeft: '0.3rem' }}
              >
                Política de privacidad
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={deny}
                className="btn-ghost-dark"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={grant}
                className="btn-solid"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
