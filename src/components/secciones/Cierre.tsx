import { PapelTicket } from "@/components/ui/Ticket";
import { BotonWhatsApp } from "@/components/ui/Boton";
import { FormularioDemo } from "./FormularioDemo";

// El formulario de demo es otro ticket: "Solicitud de demo".
export function Cierre() {
  return (
    <section id="demo" aria-labelledby="demo-titulo" className="border-t border-line bg-brand-wash py-16 lg:py-28">
      <div className="mx-auto grid max-w-300 gap-12 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pt-12">
          <h2 id="demo-titulo" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
            Pida su demo y vea su negocio en orden.
          </h2>
          <p className="max-w-[48ch] text-lead text-ink-soft lg:text-lead-lg">
            Complete sus datos y se abrirá WhatsApp con su mensaje listo. Le respondemos para agendar la demo.
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-small font-semibold text-ink">¿Prefiere escribir directamente?</p>
            <BotonWhatsApp className="self-start" />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8">
          <PapelTicket>
            <p className="text-center font-bold">SOLICITUD DE DEMO</p>
            <p className="mb-6 text-center text-ink-soft">Business2B</p>
            <FormularioDemo />
          </PapelTicket>
        </div>
      </div>
    </section>
  );
}
