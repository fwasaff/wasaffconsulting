'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        boxShadow: scrolled ? '0 1px 12px rgba(5,28,44,0.06)' : 'none',
      }}
    >
      <div className="container-w flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--text)',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Wasaff Consulting
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
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

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir Menú"
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
              style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculadora"
            className="btn-solid"
            style={{
              margin: '1rem 2rem',
              justifyContent: 'center',
              fontSize: '0.95rem',
            }}
            onClick={() => setMobileOpen(false)}
          >
            Calcular ahorro potencial →
          </Link>
        </div>
      )}
    </nav>
  );
}
