import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { articulos, getArticulo } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export async function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = getArticulo(params.slug);
  if (!a) return { title: 'Artículo no encontrado' };
  return {
    title: a.titulo,
    description: a.extracto,
    openGraph: {
      title: a.titulo,
      description: a.extracto,
      url: `${SITE_URL}/blog/${a.slug}`,
    },
  };
}

export default function ArticuloPage({ params }: { params: { slug: string } }) {
  const a = getArticulo(params.slug);
  if (!a) return notFound();

  return (
    <main className="min-h-screen pt-20 pb-20" style={{ background: 'var(--bg)' }}>
      <Breadcrumbs
        items={[
          { label: 'Insights', href: '/#blog' },
          { label: a.titulo },
        ]}
      />

      <article className="container-w" style={{ maxWidth: '720px' }}>
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--blue)',
              padding: '0.15rem 0.5rem',
              background: 'rgba(34,81,255,0.06)',
              border: '1px solid rgba(34,81,255,0.15)',
              borderRadius: '2px',
            }}
          >
            {a.categoria}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            {a.tiempo}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
            {a.fecha}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            lineHeight: 1.15,
            color: 'var(--text)',
            marginBottom: '1.5rem',
          }}
        >
          {a.titulo}
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}
        >
          {a.extracto}
        </p>

        {/* Contenido */}
        <div className="flex flex-col gap-6 mb-10">
          {a.contenido.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: '0.95rem',
                color: 'var(--text)',
                lineHeight: 1.75,
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Puntos clave */}
        <div
          className="p-6 mb-10"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            Puntos clave
          </p>
          <ul className="flex flex-col gap-2">
            {a.puntosClave.map((p) => (
              <li key={p} className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '0.15rem' }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div
          className="p-6 mb-10"
          style={{
            background: 'rgba(34,81,255,0.04)',
            border: '1px solid rgba(34,81,255,0.15)',
            borderRadius: '2px',
          }}
        >
          <p style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.65, marginBottom: '1rem' }}>
            {a.ctaTexto}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/calculadora" className="btn-solid" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              Calcular mi ahorro →
            </Link>
            <Link href="/#contacto" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>
              Contactar
            </Link>
          </div>
        </div>

        {/* Temas */}
        <div className="flex flex-wrap gap-1.5">
          {a.temas.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
