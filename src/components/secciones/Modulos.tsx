"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChartLineUp, Check, HandCoins, Package, Storefront } from "@phosphor-icons/react";
import { MaquetaPOS } from "@/components/maquetas/MaquetaPOS";
import { MaquetaDashboard } from "@/components/maquetas/MaquetaDashboard";
import { MaquetaCreditos } from "@/components/maquetas/MaquetaCreditos";
import { DemoCodigo } from "./DemoCodigo";
import { Revelar } from "@/components/ui/Revelar";

type Modulo = {
  id: string;
  verbo: string;
  resumen: string;
  Icono: typeof Storefront;
  funciones: string[];
  visual: ReactNode;
};

const MODULOS: Modulo[] = [
  {
    id: "vender",
    verbo: "Vender",
    resumen: "Cobre rápido en el mostrador y entregue ticket o factura al momento.",
    Icono: Storefront,
    funciones: [
      "Punto de venta con búsqueda por nombre, SKU o código de barras",
      "Ticket térmico y factura A4 con el ISV desglosado",
      "Cotizaciones para enviar a sus clientes",
      "Catálogo en línea para compartir por WhatsApp",
    ],
    visual: <MaquetaPOS />,
  },
  {
    id: "controlar",
    verbo: "Controlar",
    resumen: "Sepa qué tiene, qué se acaba y cuánto hay en caja, sin contar a mano.",
    Icono: Package,
    funciones: [
      "Inventario con códigos de barras generados automáticamente",
      "Alertas de stock bajo según el mínimo de cada producto",
      "Compras y proveedores en el mismo sistema",
      "Cajas con entradas, retiros y corte del día",
    ],
    visual: <DemoCodigo />,
  },
  {
    id: "cobrar",
    verbo: "Cobrar",
    resumen: "Venda al crédito sin perder la cuenta de quién le debe y cuánto.",
    Icono: HandCoins,
    funciones: [
      "Límite de crédito por cliente",
      "Saldo al día y abonos que entran directo a la caja",
      "Directorio de clientes y proveedores",
      "Importe y exporte su lista de clientes",
    ],
    visual: <MaquetaCreditos />,
  },
  {
    id: "analizar",
    verbo: "Analizar",
    resumen: "Vea cómo va su negocio hoy y en el mes, con números que se entienden.",
    Icono: ChartLineUp,
    funciones: [
      "Dashboard con ventas del día y de los últimos 30 días",
      "Producto más vendido y ventas por categoría",
      "Reportes de ventas, compras y productos",
      "Historial de cajas para revisar cualquier día",
    ],
    visual: <MaquetaDashboard />,
  },
];

export function Modulos() {
  const [activo, setActivo] = useState(0);
  const reducir = useReducedMotion();
  const base = useId();
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const modulo = MODULOS[activo];

  function teclado(e: KeyboardEvent) {
    const paso = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    const siguiente = (activo + paso + MODULOS.length) % MODULOS.length;
    setActivo(siguiente);
    pestanas.current[siguiente]?.focus();
  }

  return (
    <section id="modulos" aria-labelledby="modulos-titulo" className="py-16 lg:py-28">
      <div className="mx-auto flex max-w-300 flex-col gap-8 px-5 lg:gap-12 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 id="modulos-titulo" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
            Un solo sistema para todo el mostrador.
          </h2>
          <p className="text-body text-ink-soft lg:text-body-lg">
            Lo que hoy reparte entre el cuaderno, el Excel y varios programas, ordenado en cuatro tareas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <Revelar
            modo="grupo"
            role="tablist"
            aria-label="Módulos de Business2B"
            aria-orientation="vertical"
            onKeyDown={teclado}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
          >
            {MODULOS.map((m, i) => {
              const sel = i === activo;
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    pestanas.current[i] = el;
                  }}
                  role="tab"
                  id={`${base}-tab-${m.id}`}
                  aria-selected={sel}
                  aria-controls={`${base}-panel`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => setActivo(i)}
                  style={{ "--i": i } as React.CSSProperties}
                  className={`relative flex shrink-0 items-center gap-3 rounded-control px-4 py-3 text-left transition-[background-color,scale] duration-300 ease-out active:scale-[0.97] lg:items-start lg:px-6 lg:py-4 ${
                    sel ? "" : "hover:bg-surface"
                  }`}
                >
                  {sel && (
                    <motion.span
                      layoutId="modulo-activo"
                      transition={reducir ? { duration: 0 } : { type: "spring", duration: 0.6, bounce: 0.15 }}
                      className="absolute inset-0 rounded-control border border-brand bg-surface shadow-card"
                      aria-hidden="true"
                    />
                  )}
                  <m.Icono
                    weight={sel ? "fill" : "regular"}
                    className={`relative size-6 shrink-0 transition-colors duration-300 ${sel ? "text-brand" : "text-ink-soft"}`}
                    aria-hidden="true"
                  />
                  <span className="relative flex flex-col gap-1">
                    <span className={`text-h3 font-bold lg:text-h3-lg ${sel ? "text-ink" : "text-ink-soft"}`}>{m.verbo}</span>
                    <span className="hidden text-small text-ink-soft lg:block">{m.resumen}</span>
                  </span>
                </button>
              );
            })}
          </Revelar>

          <div
            role="tabpanel"
            id={`${base}-panel`}
            aria-labelledby={`${base}-tab-${modulo.id}`}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={modulo.id}
                initial={reducir ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col gap-8"
              >
                <p className="text-body text-ink lg:hidden">{modulo.resumen}</p>
                {modulo.visual}
                <ul className="escalonar grid gap-3 sm:grid-cols-2 sm:gap-x-6">
                  {modulo.funciones.map((f, i) => (
                    <li key={f} style={{ "--i": i } as React.CSSProperties} className="flex gap-3 text-body text-ink">
                      <Check weight="bold" className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
