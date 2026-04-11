import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de contratación de Wasaff Consulting conforme al derecho chileno.',
  robots: { index: false, follow: false },
};

const SECCION = {
  titulo: { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.5rem' },
  h2: { fontFamily: 'var(--font-serif)', fontStyle: 'italic' as const, fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.75rem', color: 'var(--text)' },
  p: { fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '0.75rem' },
  li: { fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '0.35rem' },
};

export default function TerminosServicio() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container-w" style={{ maxWidth: '740px' }}>

        {/* Encabezado */}
        <p style={SECCION.titulo}>Legal · Contratación</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text)' }}>
          Términos de Servicio
        </h1>
        <p style={{ ...SECCION.p, marginBottom: '2.5rem' }}>
          Vigentes desde el 1 de enero de 2025 · Conforme al <strong>Código Civil de Chile</strong>,
          la <strong>Ley 19.496</strong> de Protección al Consumidor y demás legislación aplicable.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '2.5rem' }} />

        {/* 1. Identificación */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>1</p>
          <h2 style={SECCION.h2}>Identificación del prestador</h2>
          <p style={SECCION.p}>
            El prestador de los servicios es <strong>Felipe Wasaff González</strong>, persona natural
            que ejerce actividades profesionales de consultoría de ingeniería bajo la marca
            <em> Wasaff Consulting</em>, con domicilio en Santiago, Región Metropolitana, Chile.
          </p>
          <p style={SECCION.p}>
            Contacto:{' '}
            <a href="mailto:felipe.wasaff@uchile.cl" style={{ color: 'var(--accent)' }}>
              felipe.wasaff@uchile.cl
            </a>{' '}
            · +56 9 4612 5682
          </p>
          <p style={SECCION.p}>
            RUT disponible a solicitud del contratante para efectos de facturación. NDA disponible
            desde el primer contacto.
          </p>
        </section>

        {/* 2. Objeto */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>2</p>
          <h2 style={SECCION.h2}>Objeto de los servicios</h2>
          <p style={SECCION.p}>
            Wasaff Consulting presta servicios profesionales de ingeniería física computacional,
            incluyendo, sin limitarse a:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}>Auditorías y optimización de eficiencia energética industrial.</li>
            <li style={SECCION.li}>Simulación computacional (CFD, dinámica molecular, métodos numéricos).</li>
            <li style={SECCION.li}>Validación normativa y contraparte técnica en licitaciones.</li>
            <li style={SECCION.li}>Monitoreo predictivo y análisis de datos de proceso.</li>
            <li style={SECCION.li}>Peritajes técnicos y apoyo en litigios de ingeniería.</li>
          </ul>
          <p style={SECCION.p}>
            El alcance exacto de cada encargo queda definido en la <strong>Propuesta Técnica</strong>
            {' '}firmada por ambas partes, la cual prevalece sobre estos términos generales en
            caso de discrepancia.
          </p>
        </section>

        {/* 3. Proceso de contratación */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>3</p>
          <h2 style={SECCION.h2}>Proceso de contratación</h2>
          <p style={SECCION.p}>La relación contractual se perfecciona en las siguientes etapas:</p>
          <ol style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}>
              <strong>Diagnóstico inicial (gratuito, 45 min):</strong> reunión de evaluación sin costo
              ni compromiso para determinar la viabilidad técnica del encargo.
            </li>
            <li style={SECCION.li}>
              <strong>Propuesta técnica:</strong> documento de 2 a 4 páginas que especifica alcance,
              entregables, equipo, hitos y precio. La propuesta tiene validez de <strong>15 días corridos</strong>
              {' '}desde su emisión.
            </li>
            <li style={SECCION.li}>
              <strong>Aceptación y primer pago:</strong> el contrato queda perfeccionado conforme al
              Art. 1438 del Código Civil mediante la firma de la propuesta y el pago de la primera cuota
              (40% del valor total). Sin este pago, Wasaff Consulting no inicia la ejecución.
            </li>
          </ol>
          <p style={SECCION.p}>
            Cualquier expansión de alcance posterior debe formalizarse mediante una adenda escrita
            antes de su ejecución. Los trabajos adicionales no formalizados no generan obligación
            de pago para el cliente ni de entrega para el prestador.
          </p>
        </section>

        {/* 4. Precios y pagos */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>4</p>
          <h2 style={SECCION.h2}>Precios, impuestos y forma de pago</h2>
          <p style={SECCION.p}>
            Los precios se expresan en <strong>pesos chilenos (CLP)</strong> y se facturan con
            IVA cuando corresponda según la naturaleza del servicio y la condición tributaria de
            las partes. Los proyectos siguen una estructura de tres cuotas:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}><strong>1.ª cuota — 40%:</strong> al firmar la propuesta técnica. Gatilla el inicio del proyecto.</li>
            <li style={SECCION.li}><strong>2.ª cuota — 30%:</strong> al entregar el informe preliminar o hito intermedio pactado.</li>
            <li style={SECCION.li}><strong>3.ª cuota — 30%:</strong> al cierre y presentación final de resultados.</li>
          </ul>
          <p style={SECCION.p}>
            El pago se realiza mediante transferencia bancaria a la cuenta indicada en la
            propuesta. En caso de mora en el pago de cualquier cuota, Wasaff Consulting podrá
            suspender la ejecución hasta regularización, sin que ello constituya incumplimiento
            de su parte. La mora devenga el interés máximo convencional vigente conforme a la
            Ley 18.010.
          </p>
        </section>

        {/* 5. Entregables y aceptación */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>5</p>
          <h2 style={SECCION.h2}>Entregables y procedimiento de aceptación</h2>
          <p style={SECCION.p}>
            Los entregables son los especificados en la propuesta técnica (informe técnico en PDF,
            código fuente, datos procesados y reunión de presentación de resultados, salvo
            exclusión expresa).
          </p>
          <p style={SECCION.p}>
            El cliente dispone de <strong>5 días hábiles</strong> desde la recepción de cada
            entregable para formular observaciones escritas. Transcurrido ese plazo sin observaciones,
            el entregable se entiende aceptado conforme. Las observaciones deben ser concretas y
            referirse al alcance pactado; no incluyen cambios de alcance ni nueva información
            aportada tras la entrega.
          </p>
        </section>

        {/* 6. Propiedad intelectual */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>6</p>
          <h2 style={SECCION.h2}>Propiedad intelectual</h2>
          <p style={SECCION.p}>
            Una vez pagada la totalidad del precio, el cliente adquiere licencia irrevocable,
            no exclusiva y no transferible para usar los entregables en su operación interna.
          </p>
          <p style={SECCION.p}>
            Wasaff Consulting retiene la titularidad de las metodologías, algoritmos, modelos
            genéricos y herramientas de software desarrolladas durante el proyecto en la medida
            en que no sean específicas del proceso del cliente. El código desarrollado
            específicamente para el proceso del cliente se cede en uso exclusivo al cliente
            conforme a lo indicado en la propuesta.
          </p>
          <p style={SECCION.p}>
            Salvo autorización expresa del cliente, Wasaff Consulting no publicará ni revelará
            los resultados del proyecto. Con autorización, podrá referenciar el trabajo en su
            portafolio sin divulgar información confidencial.
          </p>
        </section>

        {/* 7. Confidencialidad */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>7</p>
          <h2 style={SECCION.h2}>Confidencialidad</h2>
          <p style={SECCION.p}>
            Ambas partes se obligan a mantener estricta confidencialidad respecto de la
            información técnica, comercial y operacional que se intercambie durante la relación.
            Esta obligación se extiende por <strong>5 años</strong> desde el cierre del proyecto,
            independientemente de si se firmó un NDA separado.
          </p>
          <p style={SECCION.p}>
            No se considera información confidencial aquella que sea de dominio público, que una
            parte conociera previamente de fuente lícita, o que deba revelarse por mandato legal
            o judicial.
          </p>
        </section>

        {/* 8. Limitación de responsabilidad */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>8</p>
          <h2 style={SECCION.h2}>Limitación de responsabilidad</h2>
          <p style={SECCION.p}>
            Los servicios de Wasaff Consulting son de <strong>medios</strong>, no de resultado,
            salvo que la propuesta técnica establezca expresamente una garantía de resultado
            específica. La responsabilidad de Wasaff Consulting por daños directos queda
            limitada al valor total efectivamente pagado por el cliente en el proyecto que originó
            el daño.
          </p>
          <p style={SECCION.p}>
            Wasaff Consulting no responde por lucro cesante, daño emergente indirecto ni pérdidas
            consecuenciales, salvo dolo o culpa grave conforme al Art. 44 del Código Civil.
          </p>
          <p style={SECCION.p}>
            La exactitud de los modelos depende de la calidad de los datos de proceso aportados
            por el cliente. Wasaff Consulting no asume responsabilidad por resultados derivados
            de datos incorrectos, incompletos o no representativos suministrados por el cliente.
          </p>
        </section>

        {/* 9. Terminación */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>9</p>
          <h2 style={SECCION.h2}>Terminación anticipada</h2>
          <p style={SECCION.p}>
            Cualquiera de las partes puede poner término anticipado al proyecto mediante aviso
            escrito con <strong>10 días hábiles</strong> de anticipación. En tal caso:
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
            <li style={SECCION.li}>El cliente deberá pagar el trabajo efectivamente realizado hasta la fecha de término, prorrateado según los hitos del proyecto.</li>
            <li style={SECCION.li}>Wasaff Consulting entregará los avances realizados hasta dicha fecha en formato utilizable.</li>
            <li style={SECCION.li}>Las cuotas ya pagadas no son reembolsables salvo incumplimiento grave imputable a Wasaff Consulting.</li>
          </ul>
        </section>

        {/* 10. Ley aplicable */}
        <section style={{ marginBottom: '2.5rem' }}>
          <p style={SECCION.titulo}>10</p>
          <h2 style={SECCION.h2}>Ley aplicable y jurisdicción</h2>
          <p style={SECCION.p}>
            Estos términos y los contratos que de ellos deriven se rigen por el
            <strong> derecho chileno</strong>. Para toda controversia que no se resuelva por
            acuerdo directo entre las partes, estas se someten a la jurisdicción de los
            <strong> Tribunales Ordinarios de Justicia de Santiago</strong>, renunciando
            expresamente a cualquier otro fuero que pudiera corresponderles.
          </p>
          <p style={SECCION.p}>
            Las partes acuerdan intentar resolver cualquier discrepancia mediante negociación
            directa por un plazo de 15 días hábiles antes de recurrir a la vía judicial.
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
