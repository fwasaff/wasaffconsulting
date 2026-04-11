import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt     = 'Wasaff Consulting — Ingeniería Física Computacional';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#051c2c',
          padding: '64px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Gradiente decorativo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34,81,255,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Logo / marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          {/* Átomo SVG simplificado */}
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#3b82f6" strokeWidth="1.5"/>
            <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#3b82f6" strokeWidth="1.5" transform="rotate(60 16 16)"/>
            <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="#3b82f6" strokeWidth="1.5" transform="rotate(-60 16 16)"/>
            <circle cx="16" cy="16" r="2.2" fill="#3b82f6"/>
          </svg>
          <span style={{ color: '#f0f4f8', fontSize: '22px', fontStyle: 'italic', fontWeight: 500 }}>
            Wasaff Consulting
          </span>
        </div>

        {/* Titular principal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#8aa4bc',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a7a65' }} />
            Ingeniería Física Computacional · Santiago, Chile
          </div>

          <h1
            style={{
              fontSize: '58px',
              fontStyle: 'italic',
              color: '#f0f4f8',
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '800px',
            }}
          >
            Reduzca el OPEX energético{' '}
            <span style={{ color: '#6fa3e8' }}>15–30%</span>
          </h1>

          <p style={{ fontSize: '22px', color: '#8aa4bc', margin: 0, lineHeight: 1.5 }}>
            Simulación computacional validada · Minería, energía y manufactura
          </p>
        </div>

        {/* KPIs inferiores */}
        <div
          style={{
            display: 'flex',
            gap: '0px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '32px',
            position: 'relative',
          }}
        >
          {[
            { val: '505 kW',     label: 'Recuperación Energética' },
            { val: 'CLP $1.5M+', label: 'Inversión mínima estudio' },
            { val: '90 días',    label: 'Resultados medibles' },
            { val: '15–30%',     label: 'Reducción OPEX típica' },
          ].map((k, i) => (
            <div
              key={k.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                paddingLeft: i > 0 ? '32px' : '0',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                marginLeft: i > 0 ? '32px' : '0',
              }}
            >
              <span style={{ fontSize: '28px', fontStyle: 'italic', color: '#ffffff', fontWeight: 500 }}>{k.val}</span>
              <span style={{ fontSize: '14px', color: '#8aa4bc' }}>{k.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
