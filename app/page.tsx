import Hero      from '@/components/home/Hero';
import CasosUso  from '@/components/home/CasosUso';
import Servicios from '@/components/home/Servicios';
import Proyectos from '@/components/home/Proyectos';
import Quien     from '@/components/home/Quien';
import Contacto  from '@/components/home/Contacto';

export default function Home() {
  return (
    <>
      <Hero />
      <CasosUso />
      <Servicios />
      <Proyectos />
      <Quien />
      <Contacto />
    </>
  );
}
