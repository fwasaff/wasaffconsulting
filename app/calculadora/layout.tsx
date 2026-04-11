import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Ahorro Energético Industrial',
  description:
    'Estime en 60 segundos el potencial de reducción de OPEX energético en su planta. Calculadora gratuita basada en proyectos reales de recuperación de calor residual. Wasaff Consulting.',
  openGraph: {
    title: 'Calculadora ROI Energético | Wasaff Consulting',
    description: 'Calcule su ahorro potencial en costos energéticos industriales. Gratis, sin registro previo.',
  },
};

export default function CalculadoraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
