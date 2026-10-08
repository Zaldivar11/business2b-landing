import type React from "react";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Revelar } from "@/components/ui/Revelar";
import { CuadernoFiados } from "./CuadernoFiados";

const DOLORES = [
  { antes: "Fiado sin anotar", ahora: "Cada crédito con su límite, su saldo y sus abonos." },
  { antes: "Inventario que no cuadra", ahora: "El stock baja solo con cada venta y le avisa lo que se acaba." },
  { antes: "¿Cuánto vendí hoy?", ahora: "El corte del día listo al cerrar, por efectivo, tarjeta y transferencia." },
  { antes: "Factura hecha a mano", ahora: "Ticket o factura impresos en segundos, con su logo y el ISV calculado." },
];

export function Problema() {
  return (
    <section aria-labelledby="problema" className="py-16 lg:py-28">
      <div className="mx-auto grid max-w-300 gap-12 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <CuadernoFiados className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none lg:self-center" />
        <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col gap-4">
            <h2 id="problema" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
              Cuando el negocio crece, el cuaderno ya no alcanza.
            </h2>
            <p className="max-w-[60ch] text-body text-ink-soft lg:text-body-lg">
              Ventas anotadas a mano, fiados que se olvidan y un inventario que nunca coincide con lo que hay en el estante.
            </p>
          </div>
          <Revelar as="ul" modo="grupo" className="flex flex-col gap-6">
            {DOLORES.map((d, i) => (
              <li key={d.antes} style={{ "--i": i } as React.CSSProperties} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <Etiqueta tachada className="sm:w-60 sm:justify-center">
                  {d.antes}
                </Etiqueta>
                <p className="text-body text-ink sm:pt-1">{d.ahora}</p>
              </li>
            ))}
          </Revelar>
        </div>
      </div>
    </section>
  );
}
