import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: 'var(--bg)', paddingTop: '6rem' }}
    >
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--blue)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Error 404
      </p>
      <h1
        className="mb-4"
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text)',
          lineHeight: 1.1,
        }}
      >
        Página no encontrada
      </h1>
      <p className="mb-8" style={{ fontSize: '1rem', color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.7 }}>
        El recurso que busca no existe o ha sido movido. Si necesita asistencia, contáctenos directamente.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-solid">
          Volver al inicio →
        </Link>
        <Link href="#contacto" className="btn-ghost">
          Contactar soporte
        </Link>
      </div>
    </main>
  );
}
