import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar        from '@/components/layout/Navbar';
import Footer        from '@/components/layout/Footer';
import StickyContact from '@/components/layout/StickyContact';

const GA_ID = 'G-6DPM8LHP43';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wasaffconsulting.vercel.app'),
  title: {
    default: 'Simulación Computacional Industrial | Eficiencia Energética | Wasaff Consulting',
    template: '%s | Wasaff Consulting',
  },
  description:
    'Reduzca el OPEX energético 15–30% con modelos termodinámicos validados. Proyectos desde CLP $1.500.000 para minería, energía y manufactura en Chile. 505 kW recuperados en proyecto real.',
  keywords: [
    'simulación computacional Chile',
    'eficiencia energética industrial Chile',
    'recuperación calor residual',
    'ingeniería térmica Santiago',
    'modelado CFD Chile',
    'OPEX energético minería',
    'consultoría ingeniería computacional',
    'reducción costos energéticos planta',
    'auditoría energética industrial',
    'contraparte técnica licitaciones Chile',
  ],
  authors: [{ name: 'Felipe Wasaff', url: 'https://wasaffconsulting.vercel.app' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Wasaff Consulting',
    title: 'Reducción de OPEX Energético 15–30% | Wasaff Consulting',
    description:
      'Ingeniería física computacional para minería, energía y manufactura. Proyectos desde CLP $1.500.000 con resultados medibles en 90 días. 505 kW recuperados en caso real.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wasaff Consulting — Eficiencia Energética Industrial' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reducción de OPEX Energético 15–30% | Wasaff Consulting',
    description: 'Simulación computacional validada para reducir costos energéticos industriales en Chile.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 't8e4oxLXgfMxcB9RSMjiRCGwfj3Zt_ySXBFIm2bVK3U' },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none'/%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none' transform='rotate(60 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none' transform='rotate(-60 16 16)'/%3E%3Ccircle cx='16' cy='16' r='2.2' fill='%233b82f6'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: '#1a6fe0',
  width: 'device-width',
  initialScale: 1,
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Wasaff Consulting',
  description:
    'Consultoría boutique de ingeniería física computacional. Reducción de OPEX energético 15–30% mediante simulación computacional validada para minería, energía y manufactura en Chile.',
  url: 'https://wasaffconsulting.vercel.app',
  telephone: '+56946125682',
  email: 'felipe.wasaff@uchile.cl',
  priceRange: 'CLP $1.500.000 – $5.000.000',
  founder: {
    '@type': 'Person',
    name: 'Felipe Wasaff',
    jobTitle: 'Fundador y Director',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Chile' },
    sameAs: 'https://www.linkedin.com/in/felipewasaff',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL',
  },
  areaServed: { '@type': 'Country', name: 'Chile' },
  knowsAbout: [
    'Simulación Computacional',
    'Eficiencia Energética Industrial',
    'Recuperación de Calor Residual',
    'Modelado Termodinámico',
    'Dinámica Molecular',
    'Mecánica de Fluidos Computacional',
    'Ingeniería Física',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Ingeniería Computacional',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Eficiencia Energética' },
        price: '1500000',
        priceCurrency: 'CLP',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Validación de Diseño' },
        price: '800000',
        priceCurrency: 'CLP',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Peritaje y Litigios' },
        price: '2000000',
        priceCurrency: 'CLP',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body>
        {/* Calendly popup widget */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Schema.org estructurado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyContact />
      </body>
    </html>
  );
}
