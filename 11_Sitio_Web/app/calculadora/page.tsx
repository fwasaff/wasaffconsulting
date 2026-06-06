'use client';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackEvent } from '@/lib/gtag';

const schema = z.object({
  equipo_compresores:  z.boolean().optional(),
  equipo_calderas:     z.boolean().optional(),
  equipo_hornos:       z.boolean().optional(),
  equipo_motores:      z.boolean().optional(),
  equipo_quimicos:     z.boolean().optional(),
  equipo_otro:         z.boolean().optional(),
  temperatura:  z.string().min(1, 'Seleccione un rango de temperatura'),
  horas:        z.string().min(1, 'Seleccione horas de operación'),
  fuente:       z.string().min(1, 'Seleccione fuente de energía'),
  gasto:        z.string().min(1, 'Seleccione rango de gasto'),
  etapa:        z.string().min(1, 'Seleccione etapa del proyecto'),
  plazo:        z.string().min(1, 'Seleccione plazo estimado'),
  nombre:    z.string().min(2, 'Ingrese su nombre'),
  empresa:   z.string().min(2, 'Ingrese el nombre de su empresa'),
  cargo:     z.string().min(2, 'Ingrese su cargo'),
  email:     z.string().email('Email corporativo inválido'),
  telefono:  z.string().min(8, 'Ingrese un teléfono válido'),
}).refine(
  (d) => d.equipo_compresores || d.equipo_calderas || d.equipo_hornos || d.equipo_motores || d.equipo_quimicos || d.equipo_otro,
  { message: 'Seleccione al menos un equipo', path: ['equipo_compresores'] }
);

type FormData = z.infer<typeof schema>;

const equipos = [
  { name: 'equipo_compresores' as const, label: 'Compresores de tornillo / pistón' },
  { name: 'equipo_calderas'    as const, label: 'Calderas o generadores de vapor' },
  { name: 'equipo_hornos'      as const, label: 'Hornos industriales / combustión directa' },
  { name: 'equipo_motores'     as const, label: 'Grupos electrógenos / motores' },
  { name: 'equipo_quimicos'    as const, label: 'Procesos químicos o metalúrgicos' },
  { name: 'equipo_otro'        as const, label: 'Otro' },
];

const pasos = [
  { n: '01', titulo: 'Revisión en 24 h', desc: 'Felipe Wasaff revisa su pre-calificación y evalúa el potencial técnico.' },
  { n: '02', titulo: 'Evaluación de factibilidad', desc: 'Le contactamos con una estimación preliminar basada en las características de su planta.' },
  { n: '03', titulo: 'Diagnóstico en planta (gratis)', desc: '45 minutos de revisión técnica sin costo ni compromiso.' },
  { n: '04', titulo: 'Propuesta formal', desc: 'Alcance, cronograma y precio fijo. Sin sorpresas.' },
];

export default function PreCalificacionPage() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const baseId = useId();
  const errId = (name: string) => `${baseId}-${name}-error`;

  const onSubmit = async (data: FormData) => {
    setEnviando(true);
    setErrorEnvio('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fuente: 'pre-calificacion' }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setEnviado(true);
      trackEvent('precalificacion_submit', { etapa: data.etapa, fuente: data.fuente });
    } catch {
      setErrorEnvio('No pudimos registrar sus datos. Por favor contáctenos directamente a felipe@wasaffconsulting.cl');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      <Breadcrumbs items={[{ label: 'Pre-calificación técnica' }]} />

      {/* Header */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-16">
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Herramienta gratuita
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--dark-text)', marginBottom: '1rem' }}>
            Pre-calificación técnica<br />de recuperación de calor
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '560px', lineHeight: 1.7 }}>
            8 preguntas sobre su proceso industrial. En 24 horas hábiles Felipe Wasaff
            le contacta con una evaluación de factibilidad técnica sin costo ni compromiso.
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-16 items-start">

          {/* Formulario */}
          {!enviado ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

              {/* Bloque 1: Fuentes de calor */}
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  Paso 1 — Fuentes de calor residual
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  ¿Qué equipos generan calor residual en su planta? (seleccione todos los que correspondan)
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
                  {equipos.map((eq) => (
                    <label
                      key={eq.name}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                      style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--panel)' }}
                    >
                      <input type="checkbox" {...register(eq.name)} style={{ accentColor: 'var(--blue)', width: '15px', height: '15px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.4 }}>{eq.label}</span>
                    </label>
                  ))}
                </div>
                {errors.equipo_compresores && (
                  <span role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>
                    {errors.equipo_compresores.message}
                  </span>
                )}

                <div className="grid sm:grid-cols-2 gap-5 mt-6">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      Temperatura aproximada del fluido caliente
                    </label>
                    <select
                      {...register('temperatura')}
                      aria-invalid={!!errors.temperatura}
                      aria-describedby={errors.temperatura ? errId('temperatura') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.temperatura ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="lt60">{'< 60°C — agua de enfriamiento'}</option>
                      <option value="60-120">60 – 120°C — agua caliente / vapor flash</option>
                      <option value="120-250">120 – 250°C — vapor de baja presión</option>
                      <option value="gt250">{'> 250°C — gases de combustión / vapor MP'}</option>
                      <option value="unknown">No tengo el dato con certeza</option>
                    </select>
                    {errors.temperatura && (
                      <span id={errId('temperatura')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.temperatura.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      Horas de operación diaria
                    </label>
                    <select
                      {...register('horas')}
                      aria-invalid={!!errors.horas}
                      aria-describedby={errors.horas ? errId('horas') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.horas ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="lt8">{'< 8 h/día — turno único'}</option>
                      <option value="8-16">8 – 16 h/día — doble turno</option>
                      <option value="gt16">{'> 16 h/día — semicontinuo o continuo'}</option>
                    </select>
                    {errors.horas && (
                      <span id={errId('horas')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.horas.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloque 2: Contexto energético */}
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                  Paso 2 — Contexto energético
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      Energía que busca sustituir o reducir
                    </label>
                    <select
                      {...register('fuente')}
                      aria-invalid={!!errors.fuente}
                      aria-describedby={errors.fuente ? errId('fuente') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.fuente ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="gas">Gas natural / GLP</option>
                      <option value="electricidad">Electricidad</option>
                      <option value="ambas">Ambas</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.fuente && (
                      <span id={errId('fuente')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.fuente.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      Gasto mensual aproximado en energía
                    </label>
                    <select
                      {...register('gasto')}
                      aria-invalid={!!errors.gasto}
                      aria-describedby={errors.gasto ? errId('gasto') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.gasto ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="lt5">{'< CLP $5 MM / mes'}</option>
                      <option value="5-20">CLP $5 – $20 MM / mes</option>
                      <option value="20-50">CLP $20 – $50 MM / mes</option>
                      <option value="gt50">{'> CLP $50 MM / mes'}</option>
                      <option value="nd">Prefiero no indicar</option>
                    </select>
                    {errors.gasto && (
                      <span id={errId('gasto')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.gasto.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloque 3: Etapa */}
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                  Paso 3 — Etapa del proyecto
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      ¿En qué etapa se encuentra?
                    </label>
                    <select
                      {...register('etapa')}
                      aria-invalid={!!errors.etapa}
                      aria-describedby={errors.etapa ? errId('etapa') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.etapa ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="exploracion">Exploración — quiero saber si tiene sentido</option>
                      <option value="evaluacion">Evaluación — necesito cifras para el directorio</option>
                      <option value="decision">Decisión — tenemos presupuesto, buscamos ejecutor</option>
                    </select>
                    {errors.etapa && (
                      <span id={errId('etapa')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.etapa.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                      Plazo estimado para iniciar
                    </label>
                    <select
                      {...register('plazo')}
                      aria-invalid={!!errors.plazo}
                      aria-describedby={errors.plazo ? errId('plazo') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.plazo ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.92rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="gt6">Sin urgencia — más de 6 meses</option>
                      <option value="3-6">Mediano plazo — 3 a 6 meses</option>
                      <option value="lt3">Urgente — menos de 3 meses</option>
                    </select>
                    {errors.plazo && (
                      <span id={errId('plazo')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.plazo.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloque 4: Contacto */}
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  Paso 4 — Sus datos de contacto
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Para enviarle la evaluación de factibilidad personalizada.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { name: 'nombre'   as const, label: 'Nombre completo',  placeholder: 'Juan Pérez' },
                    { name: 'empresa'  as const, label: 'Empresa',          placeholder: 'Manufactura XYZ S.A.' },
                    { name: 'cargo'    as const, label: 'Cargo',            placeholder: 'Jefe de Planta' },
                    { name: 'telefono' as const, label: 'Teléfono',         placeholder: '+56 9 1234 5678' },
                  ].map((f) => {
                    const hasError = !!errors[f.name];
                    return (
                      <div key={f.name} className="flex flex-col gap-1.5">
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>{f.label}</label>
                        <input
                          type="text"
                          placeholder={f.placeholder}
                          {...register(f.name)}
                          aria-invalid={hasError}
                          aria-describedby={hasError ? errId(f.name) : undefined}
                          style={{ padding: '0.65rem 0.9rem', border: hasError ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.95rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none' }}
                        />
                        {hasError && (
                          <span id={errId(f.name)} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>
                            {(errors[f.name] as { message?: string })?.message}
                          </span>
                        )}
                      </div>
                    );
                  })}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>Email corporativo</label>
                    <input
                      type="email"
                      placeholder="juan@empresa.cl"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? errId('email') : undefined}
                      style={{ padding: '0.65rem 0.9rem', border: errors.email ? '1px solid var(--red)' : '1px solid var(--border)', borderRadius: '2px', fontSize: '0.95rem', color: 'var(--text)', background: 'var(--bg)', outline: 'none' }}
                    />
                    {errors.email && (
                      <span id={errId('email')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.email.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {errorEnvio && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(158,37,37,0.07)', border: '1px solid rgba(158,37,37,0.25)', borderRadius: '2px', fontSize: '0.88rem', color: 'var(--red)' }}>
                  {errorEnvio}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={enviando}
                  className="btn-solid"
                  style={{ fontSize: '1rem', padding: '0.85rem 2rem', alignSelf: 'flex-start', opacity: enviando ? 0.7 : 1 }}
                >
                  {enviando ? 'Enviando...' : 'Enviar pre-calificación →'}
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  Sus datos son confidenciales. NDA disponible desde el primer contacto.
                </p>
              </div>
            </form>
          ) : (
            /* Estado enviado */
            <div
              className="p-8"
              style={{ background: 'rgba(10,122,101,0.05)', border: '2px solid rgba(10,122,101,0.25)', borderRadius: '2px' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-3 h-3 rounded-full" style={{ background: 'var(--green)', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Pre-calificación recibida
                </p>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.6rem', color: 'var(--text)', lineHeight: 1.2, marginBottom: '1rem' }}>
                Felipe Wasaff revisará su caso en las próximas 24 horas hábiles.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Le contactaremos con una evaluación de factibilidad técnica preliminar
                basada en las características de su planta. Si prefiere agendar
                directamente una reunión de 30 minutos:
              </p>
              <button
                className="btn-solid"
                onClick={() => {
                  trackEvent('calendly_click', { location: 'precalificacion_resultado' });
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                  }
                }}
              >
                Agendar reunión de revisión →
              </button>
            </div>
          )}

          {/* Panel lateral */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Proceso */}
            <div style={{ padding: '1.5rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                Qué pasa después
              </p>
              <div className="flex flex-col gap-4">
                {pasos.map((p) => (
                  <div key={p.n} className="flex gap-3">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue)', flexShrink: 0, paddingTop: '0.15rem', minWidth: '1.5rem' }}>
                      {p.n}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{p.titulo}</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caso de referencia */}
            <div style={{ padding: '1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Proyecto de referencia
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  '622 kW de potencia térmica de diseño',
                  '5.448.720 kWh/año recuperables',
                  '306 MM CLP/año en ahorro estimado',
                  'Industria pulp · intercambiador shell-and-tube',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span style={{ color: 'var(--blue)', flexShrink: 0, fontSize: '0.75rem', marginTop: '0.15rem' }}>·</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacto directo */}
            <div style={{ padding: '1.25rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Contacto directo
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Si prefiere hablar antes de completar el formulario:
              </p>
              <Link
                href="mailto:felipe@wasaffconsulting.cl"
                style={{ fontSize: '0.88rem', color: 'var(--blue)', textDecoration: 'none', display: 'block', marginBottom: '0.4rem' }}
              >
                felipe@wasaffconsulting.cl
              </Link>
              <Link
                href="tel:+56920150897"
                style={{ fontSize: '0.88rem', color: 'var(--muted)', textDecoration: 'none' }}
              >
                +56 9 2015 0897
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
