import { Barcode, MagnifyingGlass, Minus, Plus, ShoppingCart, User } from "@phosphor-icons/react/dist/ssr";
import { CARRITO, PRODUCTOS, desglose, lempiras, porSku } from "@/lib/datos";
import { EtiquetaPrecio } from "@/components/ui/Etiqueta";
import { IconoCategoria } from "./iconos";
import { MarcoApp } from "./MarcoApp";

export function MaquetaPOS() {
  const lineas = CARRITO.map((c) => ({ ...porSku(c.sku), cantidad: c.cantidad }));
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);
  const { neto, isv } = desglose(total);
  const catalogo = PRODUCTOS.slice(0, 8);

  return (
    <MarcoApp
      activo="Ventas"
      etiqueta={`Punto de venta de ejemplo: carrito de Constructora Valle de Sula con ${lineas.length} productos, total ${lempiras(total)} con ISV incluido.`}
    >
      <div className="grid min-h-140 grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-mock-sm text-muted">
            <MagnifyingGlass className="size-4" />
            <span className="flex-1">Buscar por nombre, SKU o código de barras</span>
            <Barcode className="size-5 text-ink-soft" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {catalogo.map((p) => {
              const enCarrito = CARRITO.some((c) => c.sku === p.sku);
              return (
                <div
                  key={p.sku}
                  className={`flex flex-col overflow-hidden rounded-mock border bg-surface ${enCarrito ? "border-brand ring-2 ring-brand-wash" : "border-line"}`}
                >
                  <div className="relative grid h-24 place-items-center bg-ground text-line-strong">
                    <IconoCategoria categoria={p.categoria} className="size-10" />
                    <EtiquetaPrecio className="absolute left-2 top-2">{lempiras(p.precio)}</EtiquetaPrecio>
                    {p.stock < p.minimo && (
                      <span className="absolute right-2 top-2 rounded-full bg-warn px-2 font-mono text-mock-xs font-semibold text-white">
                        {p.stock} quedan
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <span className="line-clamp-2 text-mock-xs font-semibold uppercase leading-tight text-ink">{p.nombre}</span>
                    <span className="font-mono text-mock-xs text-muted">SKU: {p.sku}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col border-l border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line p-4">
            <span className="grid size-8 place-items-center rounded-full bg-brand text-white">
              <User className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-mock-xs uppercase text-muted">Cliente</span>
              <span className="text-mock-sm font-semibold text-ink">Constructora Valle de Sula</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="inline-flex items-center gap-2 text-mock-sm font-bold text-ink">
              <ShoppingCart className="size-4 text-brand" /> Carrito
            </span>
            <span className="text-mock-xs text-muted">{lineas.length} productos</span>
          </div>
          <ul className="flex flex-1 flex-col gap-2 px-3">
            {lineas.map((l, i) => (
              <li
                key={l.sku}
                className="linea-carrito flex flex-col gap-2 rounded-mock bg-ground p-3"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="text-mock-xs font-semibold uppercase text-ink">{l.nombre}</span>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-mock-xs text-ink">
                    <Minus className="size-3 text-muted" />
                    <span className="grid h-6 w-8 place-items-center rounded-mock border border-line bg-surface">{l.cantidad}</span>
                    <Plus className="size-3 text-muted" />
                  </span>
                  <span className="cifras font-mono text-mock-xs font-semibold text-ink">{lempiras(l.precio * l.cantidad)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1 border-t border-line p-4 font-mono text-mock-xs text-ink-soft">
            <div className="cifras flex justify-between">
              <span>Subtotal neto</span>
              <span>{lempiras(neto)}</span>
            </div>
            <div className="cifras flex justify-between">
              <span>ISV 15 %</span>
              <span>{lempiras(isv)}</span>
            </div>
            <div className="cifras mt-2 flex items-baseline justify-between">
              <span className="font-sans text-mock-sm font-bold text-ink">TOTAL</span>
              <span className="text-mock-lg font-bold text-brand">{lempiras(total)}</span>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2 font-sans">
              <span className="grid h-10 place-items-center rounded-mock border border-line text-mock-sm text-ink-soft">Cancelar</span>
              <span className="grid h-10 place-items-center rounded-mock bg-brand text-mock-sm font-bold text-white">COBRAR</span>
            </div>
          </div>
        </div>
      </div>
    </MarcoApp>
  );
}
