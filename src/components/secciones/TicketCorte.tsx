import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CORTE, NEGOCIO, entero, lempiras } from "@/lib/datos";
import { Corte, Linea, PapelTicket } from "@/components/ui/Ticket";

// El momento firmado de la página: el ticket sale de la boca de la impresora una sola vez.
// Es animación CSS (.imprimir en globals.css): no depende de que cargue JavaScript.
export function TicketCorte() {
  return (
    <div className="relative mx-auto w-full max-w-80">
      <div className="relative z-10 -mx-3 h-3 rounded-full bg-ink shadow-card" aria-hidden="true" />
      <div className="-mt-2 overflow-hidden px-3 pb-12">
        <div className="imprimir">
          <PapelTicket>
            <p className="text-center font-bold uppercase">{NEGOCIO.nombre}</p>
            <p className="text-center text-ink-soft">{NEGOCIO.ciudad}</p>
            <Corte />
            <div className="flex justify-between font-bold">
              <span>CORTE DEL DÍA</span>
              <span>06:04 p. m.</span>
            </div>
            <Corte />
            <div className="flex flex-col gap-1">
              <Linea etiqueta="Ventas del día" valor={lempiras(CORTE.ventas)} fuerte />
              <Linea etiqueta="Transacciones" valor={CORTE.transacciones} />
              <Linea etiqueta="Abonos a crédito" valor={lempiras(CORTE.abonos)} />
              <Linea etiqueta="Por cobrar" valor={lempiras(CORTE.porCobrar)} />
              <Linea etiqueta="Inventario" valor={`${entero(CORTE.productos)} prod.`} />
              <Linea etiqueta="Stock bajo" valor={<span className="text-warn-ink">{CORTE.stockBajo} prod.</span>} />
            </div>
            <Corte />
            <div className="flex flex-col gap-1">
              <Linea etiqueta="Efectivo" valor={lempiras(CORTE.efectivo)} />
              <Linea etiqueta="Tarjeta" valor={lempiras(CORTE.tarjeta)} />
              <Linea etiqueta="Transferencias" valor={lempiras(CORTE.transferencias)} />
            </div>
            <Corte doble />
            <div className="flex items-center justify-between gap-2 font-bold">
              <span>CORTE DE CAJA</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-ok-wash px-2 py-1 text-ok-ink">
                <CheckCircle weight="fill" className="size-4 text-ok" aria-hidden="true" />
                CUADRA
              </span>
            </div>
            <Corte />
            <p className="text-center text-ink-soft">Generado por Business2B</p>
          </PapelTicket>
        </div>
      </div>
    </div>
  );
}
