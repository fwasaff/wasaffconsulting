'use client';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '@/components/Breadcrumbs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

const schema = z.object({
  consumo: z.string().min(1, 'Ingrese su consumo mensual en kWh'),
  tarifa:  z.string().min(1, 'Ingrese su tarifa eléctrica'),
  industria: z.string().min(1, 'Seleccione su industria'),
  nombre: z.string().min(2, 'Ingrese su nombre'),
  empresa: z.string().min(2, 'Ingrese el nombre de su empresa'),
  cargo: z.string().min(2, 'Ingrese su cargo'),
  email: z.string().email('Email corporativo inválido'),
  telefono: z.string().min(8, 'Ingrese un teléfono válido'),
});

type FormData = z.infer<typeof schema>;

interface ResultadoCalculo {
  ahorroAnual: number;
  inversionEstimada: number;
  paybackMeses: number;
  porcentajeAhorro: number;
}

function calcularROI(consumo: number, tarifa: number): ResultadoCalculo {
  const porcentajeAhorro = 0.20; // 20% típico
  const gastoAnual = consumo * 12 * tarifa;
  const ahorroAnual = gastoAnual * porcentajeAhorro;
  const inversionEstimada = Math.max(1_500_000, ahorroAnual * 0.06);
  const paybackMeses = Math.round((inversionEstimada / ahorroAnual) * 12);
  return { ahorroAnual, inversionEstimada, paybackMeses, porcentajeAhorro: porcentajeAhorro * 100 };
}

function formatCLP(n: number): string {
  if (n >= 1_000_000) return `CLP $${(n / 1_000_000).toFixed(1)}M`;
  return `CLP $${n.toLocaleString('es-CL')}`;
}

export default function CalculadoraPage() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const baseId = useId();
  const errId = (name: string) => `${baseId}-${name}-error`;

  const consumo = watch('consumo');
  const tarifa  = watch('tarifa');

  // Preview en tiempo real
  const consumoNum = Number(consumo);
  const tarifaNum  = Number(tarifa);
  const preview = (consumoNum >= 1000 && tarifaNum >= 10) ? calcularROI(consumoNum, tarifaNum) : null;

  const onSubmit = async (data: FormData) => {
    const consumoNum = Number(data.consumo);
    const tarifaNum  = Number(data.tarifa);
    if (isNaN(consumoNum) || consumoNum < 1000) return;
    if (isNaN(tarifaNum)  || tarifaNum < 10)   return;
    setEnviando(true);
    setErrorEnvio('');
    const calc = calcularROI(consumoNum, tarifaNum);
    setResultado(calc);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consumo: consumoNum, tarifa: tarifaNum, ...calc, fuente: 'calculadora-roi' }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setEnviado(true);
      trackEvent('calculadora_submit', {
        industria: data.industria,
        consumo_kwh: consumoNum,
        ahorro_estimado: calc.ahorroAnual,
      });
    } catch {
      setErrorEnvio('No pudimos registrar sus datos. Por favor contáctenos directamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      <Breadcrumbs items={[{ label: 'Calculadora de ahorro' }]} />
      {/* Header */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-16">
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            Herramienta gratuita
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: 'var(--dark-text)',
              marginBottom: '1rem',
            }}
          >
            Calculadora de ahorro<br />energético industrial
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '540px', lineHeight: 1.7 }}>
            Estime en 60 segundos el potencial de reducción de OPEX energético en su planta.
            Basado en proyectos reales ejecutados por Wasaff Consulting.
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 items-start">

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

            {/* Bloque 1: Datos energéticos */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.25rem',
                }}
              >
                Paso 1 — Datos energéticos
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Consumo eléctrico mensual (kWh)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 150000"
                    {...register('consumo')}
                    aria-invalid={!!errors.consumo}
                    aria-describedby={errors.consumo ? errId('consumo') : undefined}
                    style={{
                      padding: '0.65rem 0.9rem',
                      border: errors.consumo ? '1px solid var(--red)' : '1px solid var(--border)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                      background: 'var(--bg)',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                  {errors.consumo && (
                    <span id={errId('consumo')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.consumo.message}</span>
                  )}
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Revise su última boleta de electricidad</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Tarifa eléctrica promedio ($/kWh)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 120"
                    {...register('tarifa')}
                    aria-invalid={!!errors.tarifa}
                    aria-describedby={errors.tarifa ? errId('tarifa') : undefined}
                    style={{
                      padding: '0.65rem 0.9rem',
                      border: errors.tarifa ? '1px solid var(--red)' : '1px solid var(--border)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                      background: 'var(--bg)',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  />
                  {errors.tarifa && (
                    <span id={errId('tarifa')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.tarifa.message}</span>
                  )}
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>CLP por kWh (BT4, AT4, etc.)</span>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Tipo de industria
                  </label>
                  <select
                    {...register('industria')}
                    aria-invalid={!!errors.industria}
                    aria-describedby={errors.industria ? errId('industria') : undefined}
                    style={{
                      padding: '0.65rem 0.9rem',
                      border: errors.industria ? '1px solid var(--red)' : '1px solid var(--border)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                      background: 'var(--bg)',
                      outline: 'none',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Seleccionar industria...</option>
                    <option value="mineria">Minería</option>
                    <option value="manufactura">Manufactura</option>
                    <option value="energia">Energía / Utilities</option>
                    <option value="alimentaria">Industria Alimentaria</option>
                    <option value="quimica">Química / Petroquímica</option>
                    <option value="construccion">Construcción</option>
                    <option value="otra">Otra</option>
                  </select>
                  {errors.industria && (
                    <span id={errId('industria')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.industria.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bloque 2: Datos de contacto */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1.25rem',
                }}
              >
                Paso 2 — Datos de contacto
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Para personalizar el resultado y enviarle un informe detallado de ahorro potencial.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { name: 'nombre' as const,  label: 'Nombre completo',    placeholder: 'Juan Pérez' },
                  { name: 'empresa' as const, label: 'Empresa',            placeholder: 'Minera XYZ S.A.' },
                  { name: 'cargo' as const,   label: 'Cargo',              placeholder: 'Jefe de Planta' },
                  { name: 'telefono' as const,label: 'Teléfono',           placeholder: '+56 9 1234 5678' },
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
                        style={{
                          padding: '0.65rem 0.9rem',
                          border: hasError ? '1px solid var(--red)' : '1px solid var(--border)',
                          borderRadius: '2px',
                          fontSize: '0.95rem',
                          color: 'var(--text)',
                          background: 'var(--bg)',
                          outline: 'none',
                        }}
                      />
                      {hasError && (
                        <span id={errId(f.name)} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{(errors[f.name] as { message?: string })?.message}</span>
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
                    style={{
                      padding: '0.65rem 0.9rem',
                      border: errors.email ? '1px solid var(--red)' : '1px solid var(--border)',
                      borderRadius: '2px',
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                      background: 'var(--bg)',
                      outline: 'none',
                    }}
                  />
                  {errors.email && (
                    <span id={errId('email')} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.email.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Error de envío */}
            {errorEnvio && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(158,37,37,0.07)',
                  border: '1px solid rgba(158,37,37,0.25)',
                  borderRadius: '2px',
                  fontSize: '0.88rem',
                  color: 'var(--red)',
                }}
              >
                {errorEnvio}
              </div>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={enviando || enviado}
              className="btn-solid"
              style={{ fontSize: '1rem', padding: '0.85rem 2rem', alignSelf: 'flex-start', opacity: enviando ? 0.7 : 1 }}
            >
              {enviando ? 'Calculando...' : enviado ? 'Resultado generado ✓' : 'Calcular mi ahorro potencial →'}
            </button>

            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              Sus datos son confidenciales y no se comparten con terceros.
              Al enviar, acepta recibir el resultado y posibles comunicaciones de Wasaff Consulting.
              <br />NDA disponible desde el primer contacto.
            </p>
          </form>

          {/* Panel de resultados */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            {/* Preview en tiempo real */}
            {preview && !resultado && (
              <div
                style={{
                  padding: '1.5rem',
                  background: 'var(--panel)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  Preview (complete el formulario para resultado definitivo)
                </p>
                <ResultBox resultado={preview} />
              </div>
            )}

            {/* Resultado definitivo */}
            {resultado && enviado && (
              <div
                style={{
                  padding: '1.5rem',
                  background: 'rgba(10,122,101,0.05)',
                  border: '2px solid rgba(10,122,101,0.3)',
                  borderRadius: '2px',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Resultado personalizado
                  </p>
                </div>
                <ResultBox resultado={resultado} />
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    className="btn-solid w-full justify-center"
                    style={{ justifyContent: 'center' }}
                    onClick={() => {
                      trackEvent('calendly_click', { location: 'calculadora_resultado' });
                      if (typeof window !== 'undefined' && (window as any).Calendly) {
                        (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                      }
                    }}
                  >
                    Agendar diagnóstico técnico →
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center' }}>
                    30 minutos · sin costo · revisamos su caso específico
                  </p>
                </div>
              </div>
            )}

            {/* Box informativo (siempre visible) */}
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Base del cálculo
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  'Potencial de recuperación: 15–25% del consumo total',
                  'Payback típico de proyectos ejecutados: 1–6 meses',
                  'Basado en caso real: 505 kW recuperados en manufactura RM',
                  'El resultado definitivo requiere auditoría energética en planta',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '0.15rem' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultBox({ resultado }: { resultado: ResultadoCalculo }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
          Ahorro potencial anual
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--green)', lineHeight: 1 }}>
          {formatCLP(resultado.ahorroAnual)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>Inversión en estudio</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{formatCLP(resultado.inversionEstimada)}</p>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>Payback estimado</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{resultado.paybackMeses} meses</p>
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem 0.8rem',
          background: 'rgba(34,81,255,0.05)',
          border: '1px solid rgba(34,81,255,0.15)',
          borderRadius: '2px',
          fontSize: '0.8rem',
          color: 'var(--muted)',
          lineHeight: 1.5,
        }}
      >
        Estimación conservadora (20% recuperación). Proyectos reales han logrado hasta 30%.
      </div>
    </div>
  );
}
