import { NextRequest, NextResponse } from 'next/server';

// ── Rate limiting en memoria (se reinicia con cada cold start en Vercel) ──
// Para producción robusta usar Upstash Redis + @upstash/ratelimit
const ipMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS  = 60_000; // 1 minuto
const MAX_REQS   = 5;      // max 5 envíos por IP por ventana

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQS) return true;
  entry.count++;
  return false;
}

// Limpiar entradas vencidas cada 100 requests para evitar memory leak
let cleanupCounter = 0;
function maybeCleanup() {
  if (++cleanupCounter % 100 !== 0) return;
  const now = Date.now();
  for (const [ip, entry] of ipMap.entries()) {
    if (now > entry.resetAt) ipMap.delete(ip);
  }
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  maybeCleanup();

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intente nuevamente en un minuto.' },
      { status: 429 }
    );
  }

  try {
    const data = await req.json();

    // ── Validación mínima según fuente ──
    const fuente = String(data.fuente ?? 'desconocido');
    const isNewsletter = fuente === 'newsletter';
    const isContacto   = fuente === 'sticky-form' || fuente === 'contacto';

    if (isNewsletter) {
      if (!data.email) {
        return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
      }
    } else if (isContacto) {
      if (!data.nombre || !data.email || !data.mensaje) {
        return NextResponse.json({ error: 'Nombre, email y mensaje requeridos' }, { status: 400 });
      }
    } else {
      // calculadora-roi u otro: requiere campos energéticos
      const required = ['nombre', 'empresa', 'email', 'consumo', 'tarifa', 'industria'];
      for (const field of required) {
        if (!data[field]) {
          return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 });
        }
      }
    }

    // ── Sanitización básica ──
    const sanitize = (v: unknown) =>
      typeof v === 'string' ? v.trim().slice(0, 500) : v;

    // ── Payload estructurado ──
    const lead = {
      timestamp: new Date().toISOString(),
      fuente,
      ip_hash: ip.replace(/\.\d+$/, '.xxx'), // no guardar IP completa
      contacto: {
        nombre:   sanitize(data.nombre)   ?? '',
        empresa:  sanitize(data.empresa)  ?? '',
        cargo:    sanitize(data.cargo)    ?? '',
        email:    typeof data.email === 'string' ? data.email.trim().toLowerCase().slice(0, 200) : '',
        telefono: sanitize(data.telefono) ?? '',
        mensaje:  sanitize(data.mensaje)  ?? '',
      },
      ...(data.consumo != null && {
        datos_energeticos: {
          consumo_kwh: Number(data.consumo),
          tarifa_clp:  Number(data.tarifa),
          industria:   String(data.industria ?? ''),
        },
        calculo_roi: {
          gasto_anual_clp:        Number(data.gastoAnual        ?? 0),
          ahorro_min_clp:         Number(data.ahorroMin         ?? 0),
          ahorro_max_clp:         Number(data.ahorroMax         ?? 0),
          inversion_estudio_clp:  Number(data.inversionEstudio  ?? 0),
          payback_min_meses:      data.paybackMin ?? '',
          payback_max_meses:      data.paybackMax ?? '',
        },
      }),
    };

    // ── Webhook opcional ──
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch(() => {/* no bloquear */});
    }

    // ── Log Vercel (visible en Functions → Logs) ──
    console.log('[LEAD]', JSON.stringify(lead));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[LEAD ERROR]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
