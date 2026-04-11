import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
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
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch(() => {
        // No bloquear si el webhook falla
      });
    }

    // ── Log en consola (servidor Vercel → visible en logs) ──
    console.log('[LEAD]', JSON.stringify(lead, null, 2));

    return NextResponse.json({ ok: true, message: 'Lead registrado correctamente' });
  } catch (err) {
    console.error('[LEAD ERROR]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
