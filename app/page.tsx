import Hero           from '@/components/home/Hero';
import CasosUso       from '@/components/home/CasosUso';
import Servicios      from '@/components/home/Servicios';
import Proyectos      from '@/components/home/Proyectos';
import Quien          from '@/components/home/Quien';
import Contacto       from '@/components/home/Contacto';
import ChapterDivider from '@/components/ChapterDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <ChapterDivider num="I"   title="Los Problemas Que Sabemos Resolver" />
      <CasosUso />
      <ChapterDivider num="II"  title="Capacidades Técnicas" />
      <Servicios />
      <ChapterDivider num="III" title="Compromisos Ejecutados" />
      <Proyectos />
      <ChapterDivider num="IV"  title="La Diferencia es el Rigor" />
      <Quien />
      <ChapterDivider num="V"   title="Iniciar un Proyecto" />
      <Contacto />
    </>
  );
}
