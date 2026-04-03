'use client';
import { useEffect, useRef } from 'react';

interface Props {
  num: string;
  title: string;
}

export default function ChapterDivider({ num, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); io.unobserve(el); }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fade-in-item"
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid rgba(255,219,88,0.25)',
        borderBottom: '1px solid rgba(255,219,88,0.25)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--mustard)',
          textTransform: 'uppercase',
          letterSpacing: '0.32em',
          marginBottom: '0.8rem',
        }}
      >
        CAPÍTULO {num}
      </p>
      <div
        style={{
          width: '36px',
          height: '1px',
          background: 'rgba(255,219,88,0.45)',
          margin: '0 auto 1rem',
        }}
      />
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
