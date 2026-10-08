import { CARRITO, CLIENTE_CREDITO, NEGOCIO, lempiras, porSku } from "@/lib/datos";
import { Escala } from "./Escala";

// Factura A4 de ejemplo con la estructura de la factura real del sistema, incluidos los datos
// fiscales del SAR (CAI, rango autorizado y fecha límite). Los números fiscales son ceros a
// propósito: no corresponden a ningún contribuyente.
const redondear = (n: number) => Math.round(n * 100) / 100;

export function FacturaA4({ nombre = NEGOCIO.nombre, iniciales = NEGOCIO.iniciales }: { nombre?: string; iniciales?: string }) {
  const lineas = CARRITO.map((c) => {
    const p = porSku(c.sku);
    const monto = p.precio * c.cantidad;
    const subtotal = redondear(monto / 1.15);
    return { ...p, cantidad: c.cantidad, monto, subtotal, isv: redondear(monto - subtotal) };
  });
  const total = lineas.reduce((s, l) => s + l.monto, 0);
  const gravado = redondear(lineas.reduce((s, l) => s + l.subtotal, 0));
  const isv = redondear(total - gravado);

  return (
    <div
      role="img"
      aria-label={`Factura de ejemplo de ${nombre} para ${CLIENTE_CREDITO.nombre}, total ${lempiras(total)} con ISV del 15 % y datos fiscales del SAR.`}
      className="overflow-hidden rounded-mock bg-surface shadow-raised ring-1 ring-line"
    >
      <Escala ancho={620}>
        <div aria-hidden="true" className="flex aspect-[1/1.414] flex-col gap-4 bg-white p-8 font-sans text-mock-xs text-ink">
          <div className="flex items-center gap-4 border border-ink p-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-mock bg-ink text-h3 font-bold text-white">{iniciales}</span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-mock-lg font-extrabold uppercase">{nombre}</span>
              <span>Dirección: {NEGOCIO.direccion}, {NEGOCIO.ciudad}</span>
              <span>Teléfono: {NEGOCIO.telefono} · RTN: {NEGOCIO.rtn}</span>
            </div>
          </div>

          <p className="text-center text-h3 font-extrabold tracking-tight">FACTURA</p>

          <div className="grid grid-cols-2 border border-ink">
            <div className="flex flex-col gap-1 border-r border-ink p-3">
              <span className="border-b border-ink pb-1 text-center font-bold">Datos cliente</span>
              <span><b>Cliente:</b> {CLIENTE_CREDITO.nombre}</span>
              <span><b>RTN:</b> {CLIENTE_CREDITO.rtn}</span>
              <span><b>Vendedor:</b> marta.reyes</span>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="border-b border-ink pb-1 text-center font-bold">Datos factura</span>
              <span className="cifras"><b>Factura:</b> 000-001-01-00000842</span>
              <span className="cifras"><b>Fecha:</b> 08/10/2026 10:42</span>
              <span><b>Cajero:</b> luis.castro</span>
            </div>
          </div>

          <div className="flex flex-col border border-ink">
            <div className="grid grid-cols-[0.5fr_2.6fr_1fr_1fr_0.9fr_1fr] border-b border-ink bg-ground font-bold">
              {["Cant", "Descripción", "Precio", "Subt.", "ISV", "Monto"].map((h, i) => (
                <span key={h} className={`px-2 py-1 ${i ? "border-l border-ink" : ""} ${i > 1 ? "text-right" : ""}`}>
                  {h}
                </span>
              ))}
            </div>
            {lineas.map((l) => (
              <div key={l.sku} className="cifras grid grid-cols-[0.5fr_2.6fr_1fr_1fr_0.9fr_1fr] border-b border-line last:border-b-0">
                <span className="px-2 py-1 text-center">{l.cantidad}</span>
                <span className="border-l border-ink px-2 py-1">{l.nombre}</span>
                <span className="border-l border-ink px-2 py-1 text-right">{l.precio.toFixed(2)}</span>
                <span className="border-l border-ink px-2 py-1 text-right">{l.subtotal.toFixed(2)}</span>
                <span className="border-l border-ink px-2 py-1 text-right">{l.isv.toFixed(2)}</span>
                <span className="border-l border-ink px-2 py-1 text-right">{l.monto.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] border border-ink">
            <div className="flex flex-col gap-1 border-r border-ink p-3">
              <span className="font-bold">Datos fiscales</span>
              <span className="cifras">CAI: 000000-000000-000000-000000-000000-00</span>
              <span className="cifras">Rango autorizado: 000-001-01-00000001 al 000-001-01-00001000</span>
              <span className="cifras">Fecha límite de emisión: 31/12/2026</span>
              <span className="mt-2 font-bold">Condiciones de pago</span>
              <span>Crédito a 30 días · 1 cuota de {lempiras(total)}</span>
            </div>
            <div className="cifras flex flex-col gap-1 p-3">
              {[
                ["Subtotal", lempiras(gravado)],
                ["Descuentos y rebajas", "L.0.00"],
                ["Importe exento", "L.0.00"],
                ["Gravado 15 %", lempiras(gravado)],
                ["ISV 15 %", lempiras(isv)],
              ].map(([t, v]) => (
                <span key={t} className="flex justify-between">
                  <span>{t}:</span>
                  <span>{v}</span>
                </span>
              ))}
              <span className="mt-1 flex justify-between border-t border-ink pt-1 text-mock-sm font-extrabold">
                <span>Total:</span>
                <span>{lempiras(total)}</span>
              </span>
            </div>
          </div>

          <p className="border border-ink px-3 py-2">MONTO EN LETRAS: CUATRO MIL TRESCIENTOS SETENTA Y CUATRO CON 00/100 LEMPIRAS</p>
          <p className="border border-ink px-3 py-2 text-center">¡Gracias por su preferencia!</p>
          <p className="mt-auto font-bold">Original: cliente · Copia: emisor</p>
        </div>
      </Escala>
    </div>
  );
}
