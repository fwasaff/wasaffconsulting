'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

// Validación teléfono Chile: +569XXXXXXXX o 9XXXXXXXX o variantes con espacios
const telefonoChile = z
  .string()
  .min(8, 'Ingrese un teléfono válido')
  .regex(/^(\+?56\s?)?9\s?\d{4}\s?\d{4}$/, 'Formato válido: +56 9 XXXX XXXX o 9XXXXXXXX');

const schema = z.object({
  consumo:   z.string().min(1, 'Ingrese su consumo mensual en kWh'),
  tarifa:    z.string().min(1, 'Ingrese su tarifa eléctrica'),
  industria: z.string().min(1, 'Seleccione su industria'),
  nombre:    z.string().min(2, 'Ingrese su nombre completo'),
  empresa:   z.string().min(2, 'Ingrese el nombre de su empresa'),
  cargo:     z.string().min(2, 'Ingrese su cargo'),
  email:     z.string().email('Email corporativo inválido'),
  telefono:  telefonoChile,
});

type FormData = z.infer<typeof schema>;

interface ResultadoCalculo {
  gastoAnual:       number;
  ahorroMin:        number;
  ahorroMax:        number;
  inversionEstudio: number;
  paybackMin:       string;
  paybackMax:       string;
}

// Lógica escalonada según el prompt
function calcularROI(consumo: number, tarifa: number): ResultadoCalculo {
  const gastoAnual = consumo * tarifa * 12;

  const ahorroMin = gastoAnual * 0.15;
  const ahorroMax = gastoAnual * 0.30;

  let inversionEstudio: number;
  if      (gastoAnual < 50_000_000)  inversionEstudio = 1_500_000;
  else if (gastoAnual < 150_000_000) inversionEstudio = 2_500_000;
  else if (gastoAnual < 300_000_000) inversionEstudio = 4_000_000;
  else                                inversionEstudio = 6_000_000;

  const paybackMin = (inversionEstudio / (ahorroMax / 12)).toFixed(1);
  const paybackMax = (inversionEstudio / (ahorroMin / 12)).toFixed(1);

  return { gastoAnual, ahorroMin, ahorroMax, inversionEstudio, paybackMin, paybackMax };
}

function fmtM(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${n.toLocaleString('es-CL')}`;
}
function fmtCLP(n: number): string {
  return `CLP ${fmtM(n)}`;
}

export default function CalculadoraPage() {
  const [resultado, setResultado]   = useState<ResultadoCalculo | null>(null);
  const [enviando, setEnviando]     = useState(false);
  const [enviado, setEnviado]       = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const consumo = watch('consumo');
  const tarifa  = watch('tarifa');

  const consumoNum = Number(consumo);
  const tarifaNum  = Number(tarifa);
  const preview =
    consumoNum >= 1_000 && consumoNum <= 10_000_000 &&
    tarifaNum  >= 50    && tarifaNum  <= 300
      ? calcularROI(consumoNum, tarifaNum)
      : null;

  const onSubmit = async (data: FormData) => {
    const c = Number(data.consumo);
    const t = Number(data.tarifa);
    if (isNaN(c) || c < 1_000 || c > 10_000_000) return;
    if (isNaN(t) || t < 50   || t > 300)          return;
    setEnviando(true);
    setErrorEnvio('');
    const calc = calcularROI(c, t);
    setResultado(calc);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          consumo: c,
          tarifa: t,
          ...calc,
          fuente: 'calculadora-roi',
          fecha: new Date().toISOString(),
          utm_source: typeof document !== 'undefined' ? document.referrer : '',
        }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setEnviado(true);
    } catch {
      setErrorEnvio('No pudimos registrar sus datos. Contáctenos directamente: felipe.wasaff@uchile.cl');
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    padding: '0.65rem 0.9rem',
    border: hasError ? '1px solid var(--red)' : '1px solid var(--border)',
    borderRadius: '2px',
    fontSize: '0.95rem',
    color: 'var(--text)',
    background: 'var(--bg)',
    outline: 'none',
    width: '100%',
  });

  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      {/* Header oscuro */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-16">
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--dark-muted)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem',
            }}
          >
            ← Volver al inicio
          </Link>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Herramienta gratuita · Sin registro previo
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--dark-text)', marginBottom: '1rem' }}>
            Calculadora de ahorro<br />energético industrial
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--dark-muted)', maxWidth: '560px', lineHeight: 1.75 }}>
            Estime en 60 segundos el potencial de reducción de OPEX energético en su planta.
            Basado en proyectos reales: 505 kW recuperados en manufactura RM.
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 items-start">

          {/* ── Formulario ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>

            {/* Paso 1 */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                Paso 1 — Datos energéticos
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">

                {/* Consumo kWh */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="consumo" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Consumo eléctrico mensual (kWh)
                  </label>
                  <input
                    id="consumo" type="number" min="1000" max="10000000"
                    placeholder="Ej: 150 000"
                    {...register('consumo')}
                    style={{ ...inputStyle(!!errors.consumo), fontFamily: 'var(--font-mono)' }}
                    aria-describedby="consumo-hint consumo-error"
                  />
                  {errors.consumo
                    ? <span id="consumo-error" role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.consumo.message}</span>
                    : <span id="consumo-hint" style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Entre 1.000 y 10.000.000 kWh/mes · revise su boleta</span>
                  }
                </div>

                {/* Tarifa */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tarifa" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Tarifa eléctrica promedio ($/kWh)
                  </label>
                  <input
                    id="tarifa" type="number" min="50" max="300" step="0.1"
                    placeholder="Ej: 120"
                    {...register('tarifa')}
                    style={{ ...inputStyle(!!errors.tarifa), fontFamily: 'var(--font-mono)' }}
                    aria-describedby="tarifa-hint tarifa-error"
                  />
                  {errors.tarifa
                    ? <span id="tarifa-error" role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.tarifa.message}</span>
                    : <span id="tarifa-hint" style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>CLP/kWh · tarifa BT4 típica: 100–140 · AT4: 80–120</span>
                  }
                </div>

                {/* Industria */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="industria" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>
                    Tipo de industria
                  </label>
                  <select
                    id="industria"
                    {...register('industria')}
                    style={{ ...inputStyle(!!errors.industria), appearance: 'none', cursor: 'pointer' }}
                    aria-describedby="industria-error"
                  >
                    <option value="">Seleccionar industria...</option>
                    <option value="mineria">Minería</option>
                    <option value="manufactura">Manufactura</option>
                    <option value="energia">Energía / Utilities</option>
                    <option value="alimentos">Industria Alimentaria</option>
                    <option value="quimica">Química / Petroquímica</option>
                    <option value="construccion">Construcción</option>
                    <option value="otra">Otra</option>
                  </select>
                  {errors.industria && (
                    <span id="industria-error" role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.industria.message}</span>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Paso 2 */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                Paso 2 — Datos de contacto
              </legend>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Para enviarle el informe de ahorro detallado y personalizar el resultado a su planta.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                {([
                  { name: 'nombre'  as const, label: 'Nombre completo',   placeholder: 'Juan Pérez',          type: 'text' },
                  { name: 'empresa' as const, label: 'Empresa',           placeholder: 'Minera XYZ S.A.',      type: 'text' },
                  { name: 'cargo'   as const, label: 'Cargo',             placeholder: 'Jefe de Planta',       type: 'text' },
                  { name: 'telefono'as const, label: 'Teléfono',          placeholder: '+56 9 1234 5678',      type: 'tel'  },
                ] as const).map((f) => (
                  <div key={f.name} className="flex flex-col gap-1.5">
                    <label htmlFor={f.name} style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>{f.label}</label>
                    <input
                      id={f.name} type={f.type} placeholder={f.placeholder}
                      {...register(f.name)}
                      style={inputStyle(!!errors[f.name])}
                      aria-describedby={`${f.name}-error`}
                    />
                    {errors[f.name] && (
                      <span id={`${f.name}-error`} role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>
                        {(errors[f.name] as { message?: string })?.message}
                      </span>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>Email corporativo</label>
                  <input
                    id="email" type="email" placeholder="juan@empresa.cl"
                    {...register('email')}
                    style={inputStyle(!!errors.email)}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" style={{ fontSize: '0.78rem', color: 'var(--red)' }}>{errors.email.message}</span>
                  )}
                </div>
              </div>
            </fieldset>

            {/* Error de envío */}
            {errorEnvio && (
              <div role="alert" style={{ padding: '0.75rem 1rem', background: 'rgba(158,37,37,0.07)', border: '1px solid rgba(158,37,37,0.25)', borderRadius: '2px', fontSize: '0.88rem', color: 'var(--red)' }}>
                {errorEnvio}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={enviando || enviado}
                className="btn-solid"
                style={{ fontSize: '1rem', padding: '0.85rem 2rem', alignSelf: 'flex-start', opacity: enviando ? 0.7 : 1 }}
              >
                {enviando ? 'Calculando...' : enviado ? 'Resultado generado ✓' : 'Calcular mi ahorro potencial →'}
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Sus datos son confidenciales · No se comparten con terceros · NDA disponible desde el primer contacto
              </p>
            </div>
          </form>

          {/* ── Panel lateral de resultados ── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">

            {/* Preview en tiempo real */}
            {preview && !resultado && (
              <div style={{ padding: '1.5rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  Estimación preliminar
                </p>
                <ResultBox resultado={preview} />
              </div>
            )}

            {/* Resultado definitivo */}
            {resultado && enviado && (
              <div style={{ padding: '1.5rem', background: 'rgba(10,122,101,0.05)', border: '2px solid rgba(10,122,101,0.3)', borderRadius: '2px' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Resultado personalizado
                  </p>
                </div>
                <ResultBox resultado={resultado} />
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    className="btn-solid"
                    style={{ justifyContent: 'center' }}
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).Calendly) {
                        (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/fegonzalezw/30min' });
                      }
                    }}
                  >
                    Agendar diagnóstico técnico →
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ justifyContent: 'center', fontSize: '0.85rem' }}
                    onClick={() => window.print()}
                  >
                    Imprimir / Guardar como PDF
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
                    30 minutos · sin costo · revisamos su caso específico
                  </p>
                </div>
              </div>
            )}

            {/* Box metodología */}
            <div style={{ padding: '1.25rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Base del cálculo
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  'Rango de ahorro: 15–30% del consumo total (conservador–optimista)',
                  'Inversión escalonada según tamaño de operación',
                  'Payback típico ejecutado: 1–6 meses',
                  'Caso referencia: 505 kW recuperados en manufactura RM',
                  'Resultado definitivo requiere auditoría energética en planta',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ fontSize: '0.81rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Link a FAQ */}
            <Link
              href="/faq"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.9rem 1rem',
                background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '0.85rem', color: 'var(--muted)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,81,255,0.3)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
            >
              <span>Preguntas frecuentes sobre proyectos</span>
              <span style={{ color: 'var(--blue)' }}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultBox({ resultado }: { resultado: ResultadoCalculo }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Gasto anual */}
      <div style={{ padding: '0.75rem', background: 'rgba(5,28,44,0.04)', border: '1px solid var(--border)', borderRadius: '2px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>
          Gasto energético anual actual
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
          {fmtCLP(resultado.gastoAnual)}
        </p>
      </div>

      {/* Ahorro potencial — dato destacado */}
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
          Potencial de ahorro anual
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--green)', lineHeight: 1.1 }}>
          {fmtM(resultado.ahorroMin)} – {fmtM(resultado.ahorroMax)}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
          Rango conservador (15%) → optimista (30%)
        </p>
      </div>

      {/* Inversión + Payback */}
      <div className="grid grid-cols-2 gap-3">
        <div style={{ padding: '0.75rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Inversión en estudio</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{fmtCLP(resultado.inversionEstudio)}</p>
        </div>
        <div style={{ padding: '0.75rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Payback estimado</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>
            {resultado.paybackMin}–{resultado.paybackMax} meses
          </p>
        </div>
      </div>

      <div style={{ padding: '0.6rem 0.8rem', background: 'rgba(34,81,255,0.05)', border: '1px solid rgba(34,81,255,0.15)', borderRadius: '2px', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55 }}>
        Estimación basada en proyectos ejecutados. Resultado definitivo requiere auditoría energética en planta.
      </div>
    </div>
  );
}
