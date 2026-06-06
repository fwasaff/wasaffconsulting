import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import { SITE_URL } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const GA_ID = 'G-6DPM8LHP43';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ingeniería Térmica Computacional | Recuperación de Calor Industrial | Wasaff Consulting',
    template: '%s | Wasaff Consulting',
  },
  description:
    'Recuperación de calor residual y eficiencia térmica para la industria chilena. Dimensionamiento de intercambiadores, redes hidráulicas y acumuladores con modelos validados. 622 kW recuperados en proyecto real.',
  keywords: [
    'recuperación calor residual Chile',
    'eficiencia energética industrial Chile',
    'ingeniería térmica Santiago',
    'dimensionamiento intercambiadores calor',
    'OPEX energético manufactura',
    'consultoría térmica computacional',
    'reducción costos energéticos planta',
    'auditoría energética industrial',
    'validación sistemas térmicos',
    'contraparte técnica intercambiadores Chile',
  ],
  authors: [{ name: 'Felipe Wasaff', url: 'https://wasaffconsulting.cl' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Wasaff Consulting',
    title: 'Recuperación de Calor Industrial | Wasaff Consulting',
    description:
      'Ingeniería térmica computacional para plantas industriales en Chile. 622 kW recuperados, 306 MM CLP en ahorro anual. Dimensionamiento de intercambiadores, hidráulica y acumuladores térmicos.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wasaff Consulting — Ingeniería Térmica Industrial' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recuperación de Calor Industrial | Wasaff Consulting',
    description: 'Ingeniería térmica computacional para reducir el OPEX energético en plantas industriales chilenas.',
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
    'Consultoría especializada en ingeniería térmica computacional. Recuperación de calor residual, dimensionamiento de intercambiadores y validación de sistemas térmicos e hidráulicos para la industria chilena.',
  url: SITE_URL,
  telephone: '+56920150897',
  email: 'felipe@wasaffconsulting.cl',
  priceRange: 'CLP $800.000 – $5.000.000',
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
    'Recuperación de Calor Residual',
    'Ingeniería Térmica Computacional',
    'Dimensionamiento de Intercambiadores',
    'Modelado Termodinámico',
    'Hidráulica Industrial',
    'Método ε-NTU',
    'Eficiencia Energética Industrial',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Ingeniería Térmica',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Recuperación de Calor' },
        price: '1500000',
        priceCurrency: 'CLP',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Validación de Sistemas Térmicos' },
        price: '800000',
        priceCurrency: 'CLP',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Peritaje Energético' },
        price: '3000000',
        priceCurrency: 'CLP',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <noscript>
          <style>{`.fade-in-item { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        {/* Calendly popup widget — carga lazy para no bloquear LCP */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />

        <Analytics />

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
