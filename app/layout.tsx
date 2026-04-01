import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wasaffconsulting.cl'),
  title: {
    default: 'Wasaff Consulting — Simulación Computacional e Ingeniería Física',
    template: '%s | Wasaff Consulting',
  },
  description:
    'Simulación computacional, métodos numéricos y análisis térmico para optimización industrial en Chile. Traducimos física compleja en reducción de riesgo operativo y OPEX.',
  keywords: [
    'simulación computacional', 'ingeniería física', 'análisis térmico', 'métodos numéricos',
    'dinámica molecular', 'LAMMPS', 'optimización industrial', 'consultoría ingeniería Chile',
    'minería', 'manufactura', 'energía',
  ],
  authors: [{ name: 'Felipe Wasaff', url: 'https://wasaffconsulting.cl' }],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Wasaff Consulting',
    title: 'Wasaff Consulting — Simulación Computacional e Ingeniería Física',
    description: 'Simulación computacional y modelado matemático avanzado para continuidad operacional en minería, manufactura y energía.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none'/%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none' transform='rotate(60 16 16)'/%3E%3Cellipse cx='16' cy='16' rx='13' ry='4.5' stroke='%233b82f6' stroke-width='1.5' fill='none' transform='rotate(-60 16 16)'/%3E%3Ccircle cx='16' cy='16' r='2.2' fill='%233b82f6'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: '#1a6fe0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
