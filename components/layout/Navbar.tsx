'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PHONE      = '+56 9 4612 5682';
const PHONE_HREF = 'tel:+56946125682';
const EMAIL_HREF = 'mailto:felipe.wasaff@uchile.cl';

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#servicios',       label: 'Servicios' },
    { href: '#casos',           label: 'Casos de éxito' },
    { href: '#diferenciadores', label: '¿Por qué Wasaff?' },
    { href: '#quien',           label: 'Director' },
    { href: '#blog',            label: 'Insights' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow:    scrolled ? '0 1px 12px rgba(5,28,44,0.06)' : 'none',
      }}
    >
      {/* Barra superior de contacto — solo desktop */}
      <div
        className="hidden lg:flex"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--panel)',
          padding: '0.35rem 0',
        }}
      >
        <div className="container-w flex items-center justify-end gap-6">
          <a
            href={PHONE_HREF}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
          >
            {/* phone icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18v-.08z" />
            </svg>
            {PHONE}
          </a>
          <a
            href={EMAIL_HREF}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
          >
            {/* mail icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
            </svg>
            felipe.wasaff@uchile.cl
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>
            Lunes–Viernes · 9:00–18:00
          </span>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <div className="container-w flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}
        >
          Wasaff Consulting
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/calculadora"
              className="btn-solid"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}
            >
              Calcular ahorro →
            </Link>
          </li>
        </ul>

        {/* Teléfono visible en tablet (md) sin menú completo */}
        <a
          href={PHONE_HREF}
          className="hidden sm:flex md:hidden items-center gap-1.5"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18v-.08z" />
          </svg>
          {PHONE}
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar Menú' : 'Abrir Menú'}
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 transition-all duration-200"
              style={{
                background: 'var(--text)',
                ...(mobileOpen && i === 0 ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}),
                ...(mobileOpen && i === 1 ? { opacity: 0 } : {}),
                ...(mobileOpen && i === 2 ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}),
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden flex flex-col"
          style={{ borderTop: '1px solid var(--border)', background: '#ffffff' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', fontSize: '0.95rem', color: 'var(--muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {/* Contacto en menú móvil */}
          <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href={PHONE_HREF}
              style={{ fontSize: '0.9rem', color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 23 18v-.08z" />
              </svg>
              {PHONE}
            </a>
            <a
              href={EMAIL_HREF}
              style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}
            >
              felipe.wasaff@uchile.cl
            </a>
          </div>

          <Link
            href="/calculadora"
            className="btn-solid"
            style={{ margin: '1rem 2rem', justifyContent: 'center', fontSize: '0.95rem' }}
            onClick={() => setMobileOpen(false)}
          >
            Calcular ahorro potencial →
          </Link>
        </div>
      )}
    </nav>
  );
}
