import type React from "react";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Revelar } from "@/components/ui/Revelar";

const NEGOCIOS = [
  "Ferreterías",
  "Repuestos",
  "Distribuidoras",
  "Tiendas y abarroterías",
  "Agroveterinarias",
  "Materiales de construcción",
];

export function ParaQuien() {
  return (
    <section aria-labelledby="para-quien" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-300 flex-col gap-4 py-8 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        <h2 id="para-quien" className="shrink-0 px-5 text-body font-semibold text-ink lg:px-0">
          Hecho para el comercio de todos los días
        </h2>
        <Revelar as="ul" modo="grupo" className="flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:px-0">
          {NEGOCIOS.map((n, i) => (
            <li key={n} style={{ "--i": i } as React.CSSProperties}>
              <Etiqueta ojal>{n}</Etiqueta>
            </li>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
