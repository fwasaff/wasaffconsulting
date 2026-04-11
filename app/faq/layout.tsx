import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Respuestas técnicas honestas sobre proyectos de simulación computacional y eficiencia energética industrial. Plazos, datos requeridos, garantías y costos reales. Wasaff Consulting.',
  openGraph: {
    title: 'FAQ Técnico | Wasaff Consulting',
    description: 'Preguntas frecuentes sobre proyectos de eficiencia energética industrial: plazos, costos, garantías y metodología.',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
