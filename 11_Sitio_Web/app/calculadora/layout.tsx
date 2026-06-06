import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pre-calificación Técnica — Recuperación de Calor Industrial',
  description:
    '8 preguntas sobre su proceso industrial. En 24 horas Felipe Wasaff le contacta con una evaluación de factibilidad de recuperación de calor residual. Sin costo ni compromiso.',
  openGraph: {
    title: 'Pre-calificación Técnica | Wasaff Consulting',
    description: '¿Tiene su planta potencial de recuperación de calor? Responda 8 preguntas técnicas y reciba una evaluación de factibilidad en 24 horas.',
  },
};

export default function CalculadoraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
