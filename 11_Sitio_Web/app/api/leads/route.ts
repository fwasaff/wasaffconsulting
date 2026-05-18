import { NextRequest, NextResponse } from 'next/server';

/* ── Rate limiting in-memory (simple, por instancia serverless) ── */
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.ip ?? 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intente nuevamente en un minuto.' },
        { status: 429 }
      );
    }

    const data = await req.json();

    // Validate required fields
    const required = ['nombre', 'empresa', 'email', 'consumo', 'tarifa', 'industria'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 });
      }
    }

    // Format lead data for logging / webhook
    const lead = {
      timestamp: new Date().toISOString(),
      fuente: data.fuente ?? 'calculadora-roi',
      contacto: {
        nombre: String(data.nombre).trim(),
        empresa: String(data.empresa).trim(),
        cargo: String(data.cargo ?? '').trim(),
        email: String(data.email).trim().toLowerCase(),
        telefono: String(data.telefono ?? '').trim(),
      },
      datos_energeticos: {
        consumo_kwh: Number(data.consumo),
        tarifa_clp: Number(data.tarifa),
        industria: String(data.industria),
      },
      calculo_roi: {
        ahorro_anual_clp: Number(data.ahorroAnual ?? 0),
        inversion_estimada_clp: Number(data.inversionEstimada ?? 0),
        payback_meses: Number(data.paybackMeses ?? 0),
        porcentaje_ahorro: Number(data.porcentajeAhorro ?? 0),
      },
    };

    // ── Webhook opcional (ej. Make.com, Zapier, n8n) ──
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8_000);
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: controller.signal,
      }).catch(() => {
        // No bloquear si el webhook falla
      }).finally(() => clearTimeout(timeoutId));
    }

    // ── Log en consola (PII redactada por seguridad) ──
    const redacted = {
      ...lead,
      contacto: {
        ...lead.contacto,
        email: '[REDACTED]',
        telefono: '[REDACTED]',
      },
    };
    console.log('[LEAD]', JSON.stringify(redacted, null, 2));

    return NextResponse.json({ ok: true, message: 'Lead registrado correctamente' });
  } catch (err) {
    console.error('[LEAD ERROR]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
