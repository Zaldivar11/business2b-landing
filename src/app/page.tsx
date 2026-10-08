import { Navegacion } from "@/components/secciones/Navegacion";
import { Hero } from "@/components/secciones/Hero";
import { ParaQuien } from "@/components/secciones/ParaQuien";
import { Problema } from "@/components/secciones/Problema";
import { Video } from "@/components/secciones/Video";
import { Modulos } from "@/components/secciones/Modulos";
import { SuMarca } from "@/components/secciones/SuMarca";
import { Roles } from "@/components/secciones/Roles";
import { ComoEmpezar } from "@/components/secciones/ComoEmpezar";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Cierre } from "@/components/secciones/Cierre";
import { Pie } from "@/components/secciones/Pie";
import { WhatsAppFlotante } from "@/components/secciones/WhatsAppFlotante";

export default function Inicio() {
  return (
    <>
      <Navegacion />
      <main>
        <Hero />
        <ParaQuien />
        <Problema />
        <Video />
        <Modulos />
        <SuMarca />
        <Roles />
        <ComoEmpezar />
        <Preguntas />
        <Cierre />
      </main>
      <Pie />
      <WhatsAppFlotante />
    </>
  );
}
