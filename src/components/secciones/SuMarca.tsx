"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { NEGOCIO, TICKET_VENTA, desglose, lempiras, porSku } from "@/lib/datos";
import { Corte, Linea, PapelTicket } from "@/components/ui/Ticket";
import { FacturaA4 } from "@/components/maquetas/FacturaA4";

const MAX = 32;

function iniciales(nombre: string) {
  const palabras = nombre
    .replace(/^(ferreter[ií]a|tienda|distribuidora|comercial|repuestos)\s+/i, "")
    .split(/\s+/)
    .filter((p) => p.length > 2 || /^[A-ZÁÉÍÓÚÑ]/.test(p));
  const letras = (palabras.length ? palabras : nombre.split(/\s+/)).map((p) => p[0]).join("");
  return (letras.slice(0, 2) || "SN").toUpperCase();
}

export function SuMarca() {
  const [nombre, setNombre] = useState(NEGOCIO.nombre);
  const diferido = useDeferredValue(nombre.trim() || "Su negocio");
  const [impreso, setImpreso] = useState(diferido);
  const [vuelta, setVuelta] = useState(0);
  const reducir = useReducedMotion();

  // Se reimprime cuando el visitante deja de escribir, no en cada tecla.
  useEffect(() => {
    if (diferido === impreso) return;
    const t = setTimeout(() => {
      setImpreso(diferido);
      setVuelta((v) => v + 1);
    }, 450);
    return () => clearTimeout(t);
  }, [diferido, impreso]);

  const lineas = TICKET_VENTA.map((l) => ({ ...porSku(l.sku), cantidad: l.cantidad }));
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);
  const { neto, isv } = desglose(total);

  return (
    <section id="marca" aria-labelledby="marca-titulo" className="border-y border-line bg-surface py-16 lg:py-28">
      <div className="mx-auto grid max-w-300 gap-12 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-12">
          <div className="flex flex-col gap-4">
            <h2 id="marca-titulo" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
              Sus tickets y facturas, con el nombre de su negocio.
            </h2>
            <p className="text-body text-ink-soft lg:text-body-lg">
              Configure una vez su logo, nombre, correo, dirección y teléfono. Desde ahí, cada documento sale con su marca.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nombre-negocio" className="text-small font-semibold text-ink">
              Escriba el nombre de su negocio
            </label>
            <input
              id="nombre-negocio"
              value={nombre}
              maxLength={MAX}
              onChange={(e) => setNombre(e.target.value)}
              onFocus={(e) => e.target.select()}
              autoComplete="organization"
              className="h-13 rounded-control border-[1.5px] border-line-strong bg-surface px-4 text-body text-ink outline-none transition-colors placeholder:text-ink-soft hover:border-muted focus-visible:border-brand"
              placeholder="Por ejemplo: Ferretería El Progreso"
            />
            <p className="text-small text-ink-soft">Vista previa de ejemplo. Su ticket real usa los datos que configure.</p>
          </div>

          <ul className="flex flex-col gap-3">
            {["Logo y datos del negocio en ticket y factura", "Ticket térmico y factura de página completa", "Catálogo en línea con su nombre y su WhatsApp"].map((t) => (
              <li key={t} className="flex gap-3 text-body text-ink">
                <Check weight="bold" className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative grid place-items-start sm:min-h-160 lg:col-span-6 lg:col-start-7">
          <div className="hidden w-3/4 max-w-sm justify-self-end sm:block">
            <FacturaA4 nombre={impreso} iniciales={iniciales(impreso)} />
          </div>
          <div className="relative mx-auto w-full max-w-80 sm:absolute sm:left-0 sm:top-12 sm:mx-0 sm:w-80" aria-live="polite">
            <motion.div
              key={vuelta}
              initial={reducir || vuelta === 0 ? false : { clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PapelTicket>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="grid size-12 place-items-center rounded-control bg-ink font-sans text-h3 font-bold text-white">
                    {iniciales(impreso)}
                  </span>
                  <p className="break-words font-bold uppercase">{impreso}</p>
                  <p className="text-ink-soft">
                    {NEGOCIO.direccion}
                    <br />
                    Tel. {NEGOCIO.telefono}
                  </p>
                </div>
                <Corte />
                <p className="text-center font-bold">TICKET DE VENTA · VNT-1046</p>
                <Corte />
                <div className="flex flex-col gap-2">
                  {lineas.map((l) => (
                    <div key={l.sku}>
                      <p>{l.nombre}</p>
                      <Linea etiqueta={`${l.cantidad} × ${lempiras(l.precio)}`} valor={lempiras(l.precio * l.cantidad)} />
                    </div>
                  ))}
                </div>
                <Corte doble />
                <div className="flex flex-col gap-1">
                  <Linea etiqueta="TOTAL A PAGAR" valor={lempiras(total)} fuerte />
                  <Linea etiqueta="ISV 15 % (incluido)" valor={lempiras(isv)} />
                  <Linea etiqueta="Subtotal neto" valor={lempiras(neto)} />
                  <Linea etiqueta="Pago" valor="EFECTIVO" />
                </div>
                <Corte />
                <p className="text-center font-bold">GRACIAS POR SU COMPRA</p>
              </PapelTicket>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
