export interface Articulo {
  slug: string;
  numero: string;
  categoria: string;
  tiempo: string;
  titulo: string;
  extracto: string;
  temas: string[];
  destacado: boolean;
  fecha: string;
  contenido: string[];
  puntosClave: string[];
  ctaTexto: string;
}

export const articulos: Articulo[] = [
  {
    slug: 'como-calcular-roi-recuperacion-calor-residual',
    numero: '01',
    categoria: 'Guía Técnica',
    tiempo: '8 min lectura',
    titulo: 'Cómo calcular el ROI de un proyecto de recuperación de calor residual',
    extracto:
      'La mayoría de los gerentes de planta subestiman el potencial de recuperación energética de sus compresores. En este artículo explicamos la metodología ε-NTU paso a paso y cómo traducir kW recuperados a millones en ahorro anual.',
    temas: ['Termodinámica', 'ROI Energético', 'OPEX'],
    destacado: true,
    fecha: '2025-01-15',
    contenido: [
      'La recuperación de calor residual es una de las intervenciones de mayor impacto en el OPEX energético industrial, y sin embargo permanece subutilizada en la mayoría de las plantas chilenas. El motivo principal no es técnico: es la falta de un modelo económico claro que justifique la inversión ante la dirección financiera.',
      'En Wasaff Consulting aplicamos una metodología de cuatro pasos que parte del balance energético real de la planta y termina en un payback con escenarios de sensibilidad. El primer paso es caracterizar la fuente de calor: temperatura, caudal másico y horas de operación anuales. Sin estos tres datos, cualquier cálculo de ROI es especulación.',
      'El segundo paso es aplicar el método ε-NTU para dimensionar el intercambiador de calor. Este método, aunque parece complejo, se reduce a resolver una ecuación algebraica cuando se cuenta con las curvas térmicas del fluido. La efectividad ε nos dice qué fracción del calor disponible puede recuperarse de manera físicamente realista.',
      'El tercer paso es modelar el sistema hidráulico completo: pérdidas de carga, bombas de circulación, válvulas y acumuladores. Este es el paso que más consultoras omiten, y es precisamente aquí donde fallan los proyectos en terreno. Una red mal dimensionada puede consumir más energía en bombeo de la que se ahorra en recuperación térmica.',
      'El cuarto y último paso es construir el modelo financiero: inversión en equipo, mano de obra, montaje, y el ahorro anual proyectado. Nuestro criterio interno es no recomendar proyectos con payback superior a 24 meses, salvo que existan restricciones normativas o de continuidad operacional que lo justifiquen.',
    ],
    puntosClave: [
      'El 60% del calor residual en compresores de tornillo es recuperable con tecnología madura.',
      'El método ε-NTU reduce la incertidumbre técnica del 40% al 8% en promedio.',
      'La hidráulica de la red suele representar el 25% del costo total del proyecto.',
      'Proyectos con payback < 18 meses tienen tasa de aprobación financiera del 90%.',
    ],
    ctaTexto: '¿Quiere aplicar esta metodología en su planta? Solicite un diagnóstico inicial sin costo.',
  },
  {
    slug: 'simulacion-computacional-vs-ensayos-fisicos',
    numero: '02',
    categoria: 'Análisis Comparativo',
    tiempo: '6 min lectura',
    titulo: 'Simulación computacional vs ensayos físicos: cuándo usar cada una',
    extracto:
      'Un ensayo físico cuesta 10x más que una simulación bien calibrada. Pero no toda simulación es válida sin datos de calibración. Explicamos cuándo la simulación ahorra dinero y cuándo el ensayo físico es irremplazable.',
    temas: ['Simulación', 'Ensayos', 'Decisión de ingeniería'],
    destacado: false,
    fecha: '2025-02-20',
    contenido: [
      'La pregunta más frecuente que recibimos de gerentes de ingeniería es: "¿Por qué no hacemos un ensayo en lugar de una simulación?" La respuesta corta es que el ensayo responde a una pregunta diferente. La respuesta larga es lo que sigue.',
      'Un ensayo físico valida el comportamiento de un sistema en condiciones controladas. Es irremplazable cuando se necesita certificación normativa, cuando el riesgo de falla catastrófica es inaceptable, o cuando no existe un modelo matemático validado para el fenómeno en cuestión.',
      'Una simulación computacional, por su parte, permite explorar escenarios. Puedo variar la temperatura de entrada en 20 grados, cambiar el fluido de trabajo, o probar 15 geometrías de intercambiador en una tarde. Eso en un ensayo costaría meses y millones.',
      'El punto crítico es la calibración. Una simulación sin datos de calibración es una hipótesis, no una predicción. En Wasaff Consulting exigimos al menos un punto de calibración experimental para cada modelo que entregamos. Ese punto puede venir de un ensayo previo, de datos de operación históricos, o de literatura técnica validada.',
      'Nuestra regla de oro: si el costo del ensayo supera el 30% del presupuesto total del proyecto, y existe un modelo matemático con validación publicada, priorizamos simulación. Si el riesgo de falla incluye daño estructural o pérdida de vidas humanas, el ensayo físico es obligatorio sin excepciones.',
    ],
    puntosClave: [
      'La simulación es 10-50x más barata que el ensayo para explorar escenarios.',
      'Sin calibración, una simulación tiene incertidumbre del 40-60%.',
      'Los ensayos son obligatorios para certificación normativa y riesgo catastrófico.',
      'La combinación simulación + 1 punto de calibración reduce la incertidumbre al 12-18%.',
    ],
    ctaTexto: '¿Tiene un caso donde no sabe si simular o ensayar? Envíenos los datos y le damos una recomendación honesta.',
  },
  {
    slug: 'reduccion-opex-23-planta-manufacturera',
    numero: '03',
    categoria: 'Case Study',
    tiempo: '5 min lectura',
    titulo: 'Cómo redujimos el OPEX energético en 23% en planta manufacturera',
    extracto:
      'Detalle técnico del proyecto de recuperación de calor de 505 kW: qué encontramos en la auditoría inicial, qué modelo construimos, qué resultados obtuvo el cliente y en qué tiempo recuperó la inversión.',
    temas: ['Caso Real', 'Manufactura', '505 kW'],
    destacado: false,
    fecha: '2025-03-10',
    contenido: [
      'En 2023, una planta manufacturera de la Región Metropolitana tenía un problema aparentemente sencillo: seis compresores de tornillo rotatorio disipaban calor a la atmósfera, y la calefacción de la planta funcionaba con resistencias eléctricas. El desperdicio era evidente para cualquiera que caminara por el salón de compresores.',
      'La auditoría inicial reveló números contundentes: 505 kW de potencia térmica disipada de forma continua, 7.200 horas de operación anuales, y una demanda de calefacción de 480 kW en invierno. La pregunta no era si había ahorro, sino cuánto costaba capturarlo.',
      'Construimos un modelo termodinámico completo del sistema: análisis ε-NTU de dos intercambiadores de placas en serie, red hidráulica de 11 tramos con cálculo de pérdidas por Darcy-Weisbach + Colebrook-White, y verificación de estabilidad de acumuladores térmicos. El modelo se implementó en Python con SciPy y se entregó junto con el informe.',
      'El resultado del modelo: 505 kW recuperables en condiciones de diseño, con una red de circulación que requería una bomba de 18,5 kW. El balance neto era de 486,5 kW de ahorro térmico. A una tarifa eléctrica de CLP $120/kWh, el ahorro anual proyectado fue de CLP $420 millones.',
      'La inversión total del proyecto fue de CLP $18 millones en ingeniería, equipos y montaje. El payback: 5,1 meses. A los 12 meses de operación, el cliente reportó un ahorro real del 23% en su cuenta de electricidad de invierno, ligeramente superior a la proyección debido a una temperatura ambiente más baja de lo esperado.',
    ],
    puntosClave: [
      '505 kW recuperados de seis compresores de tornillo.',
      'Payback real de 5,1 meses (proyección: 5,4 meses).',
      'Ahorro real del 23% en cuenta eléctrica de invierno.',
      'Modelo Python + informe LaTeX entregados al cliente.',
    ],
    ctaTexto: '¿Su planta tiene compresores que disipan calor? Calcule su potencial de ahorro en 60 segundos.',
  },
];

export function getArticulo(slug: string): Articulo | undefined {
  return articulos.find((a) => a.slug === slug);
}
