import type React from "react";
import { Revelar } from "@/components/ui/Revelar";
import { ChatCircleText, PresentationChart, Storefront } from "@phosphor-icons/react/dist/ssr";

const PASOS = [
  {
    titulo: "Escríbanos",
    texto: "Cuéntenos qué vende y cómo trabaja, por WhatsApp o con el formulario.",
    Icono: ChatCircleText,
  },
  {
    titulo: "Vea la demo",
    texto: "Le mostramos el sistema con productos y ventas como los de su negocio.",
    Icono: PresentationChart,
  },
  {
    titulo: "Empiece a vender",
    texto: "Le capacitamos por Zoom para cargar su logo, sus productos y sus empleados, y abrir caja.",
    Icono: Storefront,
  },
];

export function ComoEmpezar() {
  return (
    <section id="empezar" aria-labelledby="empezar-titulo" className="border-t border-line bg-surface py-16 lg:py-28">
      <div className="mx-auto flex max-w-300 flex-col gap-12 px-5 lg:px-8">
        <h2 id="empezar-titulo" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
          Empezar es sencillo.
        </h2>
        <Revelar as="ol" modo="grupo" className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            className="absolute left-6 top-6 h-[calc(100%-3rem)] border-l-2 border-dashed border-line-strong md:left-6 md:right-6 md:h-auto md:w-[calc(100%-3rem)] md:border-l-0 md:border-t-2"
            aria-hidden="true"
          />
          {PASOS.map((p, i) => (
            <li key={p.titulo} style={{ "--i": i + 1 } as React.CSSProperties} className="relative flex gap-4 md:flex-col">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-brand bg-surface text-brand">
                <p.Icono className="size-6" weight="bold" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h3 font-bold text-ink lg:text-h3-lg">{p.titulo}</h3>
                <p className="max-w-[36ch] text-body text-ink-soft">{p.texto}</p>
              </div>
            </li>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
