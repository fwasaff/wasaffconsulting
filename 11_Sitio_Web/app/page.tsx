import Hero            from '@/components/home/Hero';
import Servicios       from '@/components/home/Servicios';
import Proyectos       from '@/components/home/Proyectos';
import CasosUso        from '@/components/home/CasosUso';
import Diferenciadores from '@/components/home/Diferenciadores';
import Quien           from '@/components/home/Quien';
import Colaboradores   from '@/components/home/Colaboradores';
import Blog            from '@/components/home/Blog';
import Contacto        from '@/components/home/Contacto';

export default function Home() {
  return (
    <>
      <Hero />
      <Proyectos />
      <Servicios />
      <CasosUso />
      <Diferenciadores />
      <Quien />
      <Colaboradores />
      <Blog />
      <Contacto />
    </>
  );
}
