import Hero            from '@/components/home/Hero';
import Servicios       from '@/components/home/Servicios';
import Proyectos       from '@/components/home/Proyectos';
import Diferenciadores from '@/components/home/Diferenciadores';
import Quien           from '@/components/home/Quien';
import Blog            from '@/components/home/Blog';
import Contacto        from '@/components/home/Contacto';

export default function Home() {
  return (
    <>
      <Hero />
      <Proyectos />
      <Servicios />
      <Diferenciadores />
      <Quien />
      <Blog />
      <Contacto />
    </>
  );
}
