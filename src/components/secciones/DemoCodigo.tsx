"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowCounterClockwise, CheckCircle } from "@phosphor-icons/react";
import { MaquetaInventario, SKU_NUEVO } from "@/components/maquetas/MaquetaInventario";
import { lempiras, porSku } from "@/lib/datos";
import { useEnVista } from "@/lib/useEnVista";

// Demostración del módulo Controlar, en fases que el CSS (.demo-codigo) convierte en movimiento:
// 1 las barras se dibujan · 2 aparecen el número y el precio · 3 la marca "Listo" ·
// 4 el producto entra al inventario y el conteo sube. Corre una vez al verse; se puede repetir.
const TIEMPOS = [450, 2100, 2800, 3600];

export function DemoCodigo() {
  const [ref, visible] = useEnVista<HTMLDivElement>();
  const reducir = useReducedMotion();
  const [fase, setFase] = useState(0);
  const relojes = useRef<Set<number>>(new Set());
  const p = porSku(SKU_NUEVO);

  // Programa las fases; con movimiento reducido salta directo al resultado final.
  const programar = useCallback(() => {
    const pendientes = relojes.current;
    pendientes.forEach(clearTimeout);
    pendientes.clear();
    if (reducir) {
      pendientes.add(window.setTimeout(() => setFase(4), 0));
      return;
    }
    TIEMPOS.forEach((t, i) => pendientes.add(window.setTimeout(() => setFase(i + 1), t)));
  }, [reducir]);

  // Al entrar en pantalla corre la demo; al salir vuelve al inicio para repetirse la próxima vez.
  useEffect(() => {
    const pendientes = relojes.current;
    if (visible) programar();
    else pendientes.add(window.setTimeout(() => setFase(0), 0));
    return () => pendientes.forEach(clearTimeout);
  }, [visible, programar]);

  function repetir() {
    setFase(0);
    programar();
  }

  return (
    <div ref={ref} className="demo-codigo relative" data-fase={fase}>
      <MaquetaInventario agregado={fase === 4} />

      <div
        className="relative mx-auto mt-6 w-64 rounded-control border border-line bg-surface p-4 shadow-raised sm:absolute sm:-bottom-8 sm:right-4 sm:mt-0 lg:-right-6"
        role="img"
        aria-label={`Etiqueta con código de barras generada para ${p.nombre}, precio ${lempiras(p.precio)}.`}
      >
        <div aria-hidden="true" className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-small font-semibold text-ink">{p.nombre}</p>
            <span className="listo-codigo inline-flex shrink-0 items-center gap-1 text-small font-semibold text-ok-ink">
              <CheckCircle weight="fill" className="size-4 text-ok" />
              Listo
            </span>
          </div>
          <div className="relative h-12 w-full rounded-mock bg-ground">
            <div className="barras barras-reveal absolute inset-0" />
          </div>
          <div className="cifras flex items-center justify-between font-mono text-ticket">
            <span className="digitos text-ink-soft">7 501234 001101</span>
            <span className="precio-codigo rounded-full bg-ink px-2 py-1 font-semibold text-white">{lempiras(p.precio)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={repetir}
        disabled={fase > 0 && fase < 4}
        className="mx-auto mt-4 flex h-11 items-center gap-2 rounded-control px-4 text-small font-semibold text-brand transition-[opacity,scale,background-color] duration-300 ease-out hover:bg-brand-wash active:scale-[0.97] disabled:opacity-0 sm:mx-0 sm:mt-12"
      >
        <ArrowCounterClockwise weight="bold" className="size-4" aria-hidden="true" />
        Ver de nuevo cómo se agrega un producto
      </button>
    </div>
  );
}
