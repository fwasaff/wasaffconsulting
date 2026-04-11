'use client';
import Link from 'next/link';

export default function Terminos() {
  return (
    <main className="min-h-screen pt-16" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-w py-14">
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--dark-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}
          >
            ← Volver al inicio
          </Link>
          <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Legal
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, color: 'var(--dark-text)', marginBottom: '0.75rem' }}>
            Términos de Servicio
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--dark-muted)' }}>
            Última actualización: abril 2026
          </p>
        </div>
      </div>

      <div className="container-w py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16">

          {/* Contenido */}
          <article style={{ maxWidth: '680px' }}>
            {[
              {
                titulo: '1. Identificación del prestador',
                contenido: `Wasaff Consulting es una consultoría de ingeniería física computacional operada por Felipe Wasaff González, con sede en Santiago, Región Metropolitana, Chile. Contacto: felipe.wasaff@uchile.cl.`,
              },
              {
                titulo: '2. Objeto de los servicios',
                contenido: `Wasaff Consulting presta servicios de consultoría técnica especializada en:

• Modelado termodinámico e hidráulico
• Simulación computacional de materiales
• Métodos numéricos y automatización de datos
• Ingeniería de contraparte e informes de peritaje
• Análisis de eficiencia energética industrial

Cada proyecto se rige por un contrato de prestación de servicios específico que prevalece sobre estos términos generales.`,
              },
              {
                titulo: '3. Presupuestos y contratación',
                contenido: `Los precios indicados en el sitio web corresponden a rangos referenciales. El valor definitivo de cada proyecto se establece en un presupuesto formal emitido por Wasaff Consulting, aceptado por el cliente mediante firma o confirmación escrita.

La vigencia de los presupuestos es de 30 días calendario desde su emisión.`,
              },
              {
                titulo: '4. Forma de pago',
                contenido: `Los proyectos se facturan por hitos acordados contractualmente. La estructura típica es:

• 30% al inicio del proyecto (kick-off)
• 40% al entregar resultados preliminares
• 30% al entregar el informe final

Los pagos se realizan mediante transferencia bancaria en CLP. Se emite boleta o factura electrónica según corresponda.`,
              },
              {
                titulo: '5. Propiedad intelectual y entregables',
                contenido: `Una vez cancelado el monto total acordado, el cliente recibe propiedad plena sobre los modelos, scripts y documentos entregados. Wasaff Consulting se reserva el derecho de mencionar el proyecto en su portfolio de forma anonimizada (industria y región, sin identificar al cliente).

El código fuente de herramientas desarrolladas con software open source (Python, OpenFOAM, LAMMPS) no está sujeto a restricciones de licencia adicionales.`,
              },
              {
                titulo: '6. Confidencialidad',
                contenido: `Wasaff Consulting trata toda información técnica, operacional y financiera del cliente como confidencial. Está disponible un Acuerdo de No Divulgación (NDA) estándar desde el primer contacto, sin costo adicional.

El incumplimiento de las obligaciones de confidencialidad se rige por las disposiciones del Código Civil chileno.`,
              },
              {
                titulo: '7. Garantía técnica',
                contenido: `Los modelos entregados incluyen documentación de los rangos de incertidumbre (±10–15%). Si los resultados medidos en terreno difieren de lo simulado más allá de dicho rango por causas atribuibles a errores de modelado, Wasaff Consulting revisará y corregirá el modelo sin costo adicional durante los 6 meses siguientes a la entrega final.

Esta garantía no aplica si las condiciones de operación del cliente difieren de las especificadas en el estudio.`,
              },
              {
                titulo: '8. Limitación de responsabilidad',
                contenido: `Wasaff Consulting no es responsable de las decisiones de inversión o implementación que el cliente tome basándose en los resultados del estudio. Los modelos son herramientas de apoyo a la decisión, no sustitutos de la evaluación de ingeniería de detalle para la ejecución de obras.

La responsabilidad máxima de Wasaff Consulting en cualquier caso está limitada al monto efectivamente pagado por el proyecto en cuestión.`,
              },
              {
                titulo: '9. Ley aplicable y jurisdicción',
                contenido: `Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia derivada de la prestación de servicios se somete a la jurisdicción de los Tribunales Ordinarios de Justicia de Santiago.`,
              },
              {
                titulo: '10. Modificaciones',
                contenido: `Wasaff Consulting puede actualizar estos términos. Los contratos en curso no se ven afectados por cambios posteriores a su firma. La fecha de última actualización se indica al inicio del documento.`,
              },
            ].map((s) => (
              <section key={s.titulo} style={{ marginBottom: '2.5rem' }}>
                <h2
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginBottom: '0.75rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {s.titulo}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {s.contenido}
                </p>
              </section>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start flex flex-col gap-4">
            <div style={{ padding: '1.25rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Consultas legales
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                ¿Preguntas sobre los términos o el contrato?
              </p>
              <a href="mailto:felipe.wasaff@uchile.cl?subject=Consulta legal" style={{ fontSize: '0.85rem', color: 'var(--blue)', textDecoration: 'none', display: 'block' }}>
                felipe.wasaff@uchile.cl →
              </a>
            </div>
            <div style={{ padding: '1.25rem', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Ver también
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/privacidad" style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}>
                  Política de privacidad →
                </Link>
                <Link href="/faq" style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}>
                  Preguntas frecuentes →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
