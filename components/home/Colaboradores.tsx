'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Colaboradores() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.fade-in-item');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    items.forEach((item, i) => {
      (item as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      io.observe(item);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="colaboradores"
      className="section-base"
      style={{ background: 'var(--panel)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container-w">

        <div className="text-center mb-12">
          <span className="label-mono fade-in-item">Red técnica</span>
          <h2
            className="sec-title fade-in-item"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            Alianza técnica en sistemas<br />térmicos industriales
          </h2>
          <p className="sec-sub fade-in-item mx-auto">
            Proyectos que requieren tanto el modelo matemático como el dominio
            del sistema físico en operación real se ejecutan en colaboración
            con Ley Cero SpA.
          </p>
        </div>

        <div className="fade-in-item grid gap-px md:grid-cols-2" style={{ border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>

          {/* Columna WASAFF */}
          <div className="p-8" style={{ background: 'var(--bg)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Wasaff Consulting
            </p>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem' }}>
              Felipe Wasaff
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Físico · U. Chile · Magíster (c) Simulación Computacional
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {[
                'Modelado físico-matemático del sistema',
                'Cálculo térmico e hidráulico (Python)',
                'Métodos numéricos e implementación',
                'Informe técnico (LaTeX) + código entregado',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span style={{ color: 'var(--blue)', flexShrink: 0, fontSize: '0.75rem', marginTop: '0.15rem' }}>·</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="https://www.linkedin.com/in/felipewasaff"
              target="_blank"
              rel="noopener"
              className="btn-ghost"
              style={{ fontSize: '0.78rem', padding: '0.5rem 1rem' }}
            >
              LinkedIn →
            </Link>
          </div>

          {/* Columna Nilton */}
          <div className="p-8" style={{ background: 'var(--bg)', borderLeft: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Ley Cero SpA
            </p>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem' }}>
              Nilton Martínez Villa
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
              Ing. Refrigeración y Climatización · Ing. Automatización y Control Industrial
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {[
                'Sistemas RAC: diagnóstico y eficiencia en terreno',
                'Centrales térmicas y refrigerantes naturales',
                'Automatización y control de sistemas industriales',
                '13 años de docencia técnica · INACAP',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '0.75rem', marginTop: '0.15rem' }}>·</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="https://www.linkedin.com/in/nilton-mart%C3%ADnez-villa-a0168131/"
              target="_blank"
              rel="noopener"
              className="btn-ghost"
              style={{ fontSize: '0.78rem', padding: '0.5rem 1rem' }}
            >
              LinkedIn →
            </Link>
          </div>

        </div>

        {/* Nota del proyecto conjunto */}
        <div
          className="fade-in-item mt-6 p-5 flex items-start gap-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold)', flexShrink: 0, paddingTop: '0.1rem' }}>▸</span>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>
            El proyecto de recuperación de calor residual en sistema de compresores industriales
            (505 kW · 2023) fue ejecutado en colaboración entre ambas firmas: Ley Cero SpA
            como contraparte técnica en terreno y Wasaff Consulting como responsable del
            modelo matemático y el informe de ingeniería.
          </p>
        </div>

      </div>
    </section>
  );
}
