import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GA_ID = 'G-6DPM8LHP43';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wasaffconsulting.cl'),
  title: {
    default: 'Wasaff Consulting — Simulación Computacional e Ingeniería Física',
    template: '%s | Wasaff Consulting',
  },
  description:
    'Consultoría de ingeniería física computacional en Chile. Simulación computacional, métodos numéricos y análisis térmico para reducción de OPEX y continuidad operacional en minería, energía y manufactura.',
  keywords: [
    'simulación computacional Chile', 'ingeniería física industrial', 'análisis térmico plantas',
    'métodos numéricos ingeniería', 'dinámica molecular materiales', 'consultoría ingeniería Santiago',
    'OPEX energético minería', 'modelado matemático procesos', 'auditoría energética industrial',
    'contraparte técnica Chile', 'optimización plantas industriales',
  ],
  authors: [{ name: 'Felipe Wasaff', url: 'https://wasaffconsulting.cl' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Wasaff Consulting',
    title: 'Wasaff Consulting — Ingeniería Física Computacional para la Industria',
    description: 'Reducción de OPEX y continuidad operacional mediante simulación computacional y modelado matemático riguroso. Minería, manufactura y energía en Chile.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wasaff Consulting — Ingeniería Física Computacional' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
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
    'Consultoría boutique de ingeniería física computacional. Simulación computacional, métodos numéricos y análisis térmico para reducción de OPEX y continuidad operacional en minería, energía y manufactura.',
  url: 'https://wasaffconsulting.cl',
  telephone: '+56946125682',
  email: 'felipe.wasaff@uchile.cl',
  founder: {
    '@type': 'Person',
    name: 'Felipe Wasaff',
    jobTitle: 'Fundador y Director',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Chile' },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL',
  },
  areaServed: { '@type': 'Country', name: 'Chile' },
  knowsAbout: [
    'Simulación Computacional', 'Ingeniería Física', 'Análisis Térmico',
    'Dinámica Molecular', 'Métodos Numéricos', 'Mecánica de Fluidos',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Ingeniería Computacional',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modelado Térmico y Mecánica de Fluidos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Simulación de Materiales y Dinámica Molecular' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Métodos Numéricos y Automatización de Datos' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ingeniería de Contraparte e Informes de Peritaje' } },
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
      </body>
    </html>
  );
}
