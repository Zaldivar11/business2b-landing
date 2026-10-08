import type React from "react";
import { Revelar } from "@/components/ui/Revelar";
import { BotonDemo, BotonWhatsApp } from "@/components/ui/Boton";
import { MaquetaDashboard } from "@/components/maquetas/MaquetaDashboard";
import { TicketCorte } from "./TicketCorte";

export function Hero() {
  return (
    <Revelar as="section" modo="escena" inicial id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-300 gap-8 px-5 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12 lg:gap-6 lg:px-8">
        <div className="flex flex-col gap-6 pt-12 lg:col-span-7 lg:justify-center lg:pb-24 lg:pt-0">
          <h1 style={{ "--i": 0 } as React.CSSProperties} className="entrada text-display font-extrabold tracking-display text-ink lg:text-display-lg">
            Todo lo que hoy anota a mano, ahora cuadra solo.
          </h1>
          <p style={{ "--i": 1 } as React.CSSProperties} className="entrada max-w-[34ch] text-lead text-ink-soft lg:text-lead-lg">
            Inventario, ventas, facturas y créditos en un solo sistema. Sin Excel, sin cuaderno, sin programas sueltos.
          </p>
          <div style={{ "--i": 2 } as React.CSSProperties} className="entrada flex flex-col gap-3 sm:flex-row">
            <BotonDemo />
            <BotonWhatsApp />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="pointer-events-none entrada-panel absolute left-24 top-24 hidden w-200 lg:block">
            <MaquetaDashboard />
          </div>
          <div className="relative lg:w-80">
            <TicketCorte />
          </div>
        </div>
      </div>
    </Revelar>
  );
}
