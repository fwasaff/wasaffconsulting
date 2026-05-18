import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Wasaff Consulting conforme a la Ley 19.628 y Ley 21.719 de Chile.',
  robots: { index: false, follow: false },
};

const SECCION = {
  titulo: { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'var(--blue)', marginBottom: '0.5rem' },
  h2: { fontFamily: 'var(--font-serif)', fontStyle: 'italic' as const, fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text)' },
  p: { fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '0.75rem' },
  li: { fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '0.35rem' },
};

export default function PoliticaPrivacidad() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container-w" style={{ maxWidth: '740px' }}>
        <Breadcrumbs items={[{ label: 'Legal', href: '#' }, { label: 'Política de privacidad' }]} />

        {/* Encabezado */}
        <p style={SECCION.titulo}>Legal · Privacidad</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text)' }}>
          Política de Privacidad
        </h1>
        <p style={{ ...SECCION.p, marginBottom: '2.5rem' }}>
          Vigente desde el 1 de enero de 2025 · Conforme a la <strong>Ley 19.628</strong> sobre
          Protección de la Vida Privada y la <strong>Ley 21.719</strong> de Protección de Datos
          Personales (promulgada el 13 de diciembre de 2024).
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '2.5rem' }} />

        {/* 1. Responsable */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>1</p>
          <h2 style={SECCION.h2}>Responsable del tratamiento</h2>
          <p style={SECCION.p}>
            El responsable del tratamiento de sus datos personales es <strong>Felipe Wasaff González</strong>,
            persona natural que ejerce actividades profesionales bajo la marca comercial
            <em> Wasaff Consulting</em>, con domicilio en Santiago de Chile.
          </p>
          <p style={SECCION.p}>
            Contacto del responsable:{' '}
            <a href="mailto:felipe@wasaffconsulting.cl" style={{ color: 'var(--blue)' }}>
              felipe@wasaffconsulting.cl
            </a>{' '}
            · +56 9 2015 0897
          </p>
        </section>

        {/* 2. Datos recopilados */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>2</p>
          <h2 style={SECCION.h2}>Datos personales que recopilamos</h2>
          <p style={SECCION.p}>Recopilamos únicamente los datos necesarios para las finalidades declaradas:</p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}><strong>Formulario de contacto y diagnóstico:</strong> nombre, correo electrónico, teléfono, empresa y descripción del proyecto.</li>
            <li style={SECCION.li}><strong>Newsletter:</strong> correo electrónico (con consentimiento expreso).</li>
            <li style={SECCION.li}><strong>Datos de navegación:</strong> dirección IP anonimizada, páginas visitadas, duración de sesión, recopilados a través de Google Analytics 4 (identificadores no vinculados a persona identificada).</li>
          </ul>
          <p style={SECCION.p}>No recopilamos datos sensibles en los términos del Art. 2 letra g) de la Ley 19.628.</p>
        </section>

        {/* 3. Finalidad y base legal */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>3</p>
          <h2 style={SECCION.h2}>Finalidad y base legal del tratamiento</h2>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li style={SECCION.li}>
              <strong>Responder consultas y gestionar propuestas técnicas.</strong> Base legal: consentimiento
              del titular (Art. 4 Ley 19.628) manifestado al enviar el formulario.
            </li>
            <li style={SECCION.li}>
              <strong>Envío de newsletter técnico.</strong> Base legal: consentimiento expreso y revocable en
              cualquier momento.
            </li>
            <li style={SECCION.li}>
              <strong>Análisis estadístico de uso del sitio.</strong> Base legal: interés legítimo en mejorar
              el servicio; datos procesados de forma anonimizada o seudonimizada.
            </li>
            <li style={SECCION.li}>
              <strong>Cumplimiento de obligaciones contractuales.</strong> Una vez firmada una propuesta,
              los datos se utilizan para la ejecución del servicio contratado (Art. 4 N°3 Ley 19.628).
            </li>
          </ul>
        </section>

        {/* 4. Conservación */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>4</p>
          <h2 style={SECCION.h2}>Plazo de conservación</h2>
          <p style={SECCION.p}>
            Los datos de contacto se conservan mientras exista una relación comercial activa o potencial,
            y por un máximo de <strong>3 años</strong> desde el último contacto, plazo compatible con la
            prescripción ordinaria de acciones civiles del Código Civil chileno.
          </p>
          <p style={SECCION.p}>
            Los datos asociados a contratos firmados se conservan por <strong>5 años</strong> desde el
            cierre del proyecto, conforme a exigencias tributarias (Art. 58 del Código Tributario).
          </p>
          <p style={SECCION.p}>
            Las suscripciones al newsletter se eliminan dentro de los 30 días siguientes a la
            solicitud de baja.
          </p>
        </section>

        {/* 5. Transferencia */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>5</p>
          <h2 style={SECCION.h2}>Transferencia a terceros</h2>
          <p style={SECCION.p}>
            No cedemos ni vendemos datos personales a terceros. Los únicos destinatarios son:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li style={SECCION.li}>
              <strong>Google LLC</strong> (Google Analytics 4): datos de navegación anonimizados para
              análisis de uso. Google actúa como encargado de tratamiento bajo los Términos de Servicio de
              Google Analytics. Datos procesados en servidores de Estados Unidos bajo cláusulas
              contractuales estándar.
            </li>
            <li style={SECCION.li}>
              <strong>Vercel Inc.</strong>: proveedor de infraestructura del sitio web. No accede al
              contenido de los formularios; únicamente procesa logs de servidor.
            </li>
            <li style={SECCION.li}>
              <strong>Calendly LLC</strong>: plataforma de agendamiento. Si el usuario inicia una
              reunión de diagnóstico, el nombre y correo se comparten con Calendly conforme a su
              propia política de privacidad.
            </li>
          </ul>
        </section>

        {/* 6. Derechos ARCO */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>6</p>
          <h2 style={SECCION.h2}>Derechos del titular</h2>
          <p style={SECCION.p}>
            Conforme a los Arts. 12 y siguientes de la Ley 19.628 (y las disposiciones concordantes
            de la Ley 21.719 en la medida que entren en vigencia), usted tiene derecho a:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}><strong>Acceso:</strong> conocer qué datos suyos tratamos y con qué finalidad.</li>
            <li style={SECCION.li}><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li style={SECCION.li}><strong>Cancelación / supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad declarada.</li>
            <li style={SECCION.li}><strong>Oposición:</strong> oponerse al tratamiento para finalidades de marketing o newsletter en cualquier momento.</li>
          </ul>
          <p style={SECCION.p}>
            Para ejercer estos derechos, envíe un correo a{' '}
            <a href="mailto:felipe@wasaffconsulting.cl" style={{ color: 'var(--blue)' }}>
              felipe@wasaffconsulting.cl
            </a>{' '}
            indicando el derecho que desea ejercer y adjuntando un medio de verificación de identidad.
            Responderemos dentro de los <strong>15 días hábiles</strong> siguientes a la recepción.
          </p>
          <p style={SECCION.p}>
            En caso de no obtener respuesta satisfactoria, puede presentar un reclamo ante el
            <strong> Consejo para la Transparencia</strong> (CPLT) o ante el Tribunal competente,
            según el Art. 16 de la Ley 19.628.
          </p>
        </section>

        {/* 7. Cookies */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>7</p>
          <h2 style={SECCION.h2}>Cookies y tecnologías similares</h2>
          <p style={SECCION.p}>
            El sitio utiliza cookies de análisis de Google Analytics 4. Estas cookies almacenan
            identificadores anonimizados de sesión para medir el tráfico. No se utilizan cookies
            publicitarias ni de seguimiento entre sitios.
          </p>
          <p style={SECCION.p}>
            Puede deshabilitar las cookies de Analytics mediante la extensión oficial
            «Google Analytics Opt-out Add-on» o configurando su navegador para bloquear cookies
            de terceros.
          </p>
        </section>

        {/* 8. Modificaciones */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>8</p>
          <h2 style={SECCION.h2}>Modificaciones a esta política</h2>
          <p style={SECCION.p}>
            Wasaff Consulting se reserva el derecho de modificar esta política para adaptarla a
            cambios legislativos o de procedimiento. La versión vigente siempre estará disponible en
            esta página con su fecha de actualización.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', opacity: 0.6 }}>
          Última actualización: enero 2025 · Domicilio legal: Santiago, Chile
        </p>
      </div>
    </div>
  );
}
