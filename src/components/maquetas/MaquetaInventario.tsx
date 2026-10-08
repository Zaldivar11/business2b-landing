import { Barcode, DownloadSimple, Funnel, MagnifyingGlass, PencilSimple, Plus } from "@phosphor-icons/react/dist/ssr";
import { PRODUCTOS, lempiras, entero, porSku, type Producto } from "@/lib/datos";
import { IconoCategoria } from "./iconos";
import { MarcoApp } from "./MarcoApp";

const PLURAL: Record<string, string> = {
  Bolsa: "bolsas",
  Unidad: "unidades",
  Galón: "galones",
  Libra: "libras",
  Metro: "metros",
};

const COLUMNAS = "grid grid-cols-[2.6fr_0.9fr_1.1fr_0.9fr_0.9fr_1fr_0.6fr] items-center gap-3";

// Producto que la demo del código de barras agrega al inventario.
export const SKU_NUEVO = "EP-0110";

function Fila({ p, className = "" }: { p: Producto; className?: string }) {
  const bajo = p.stock < p.minimo;
  return (
    <div className={`${COLUMNAS} rounded-mock border border-line bg-surface px-4 py-2 ${className}`}>
      <span className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-mock bg-ground text-ink-soft">
          <IconoCategoria categoria={p.categoria} className="size-4" />
        </span>
        <span className="text-mock-xs font-semibold uppercase text-ink">{p.nombre}</span>
      </span>
      <span className="font-mono text-mock-xs text-ink-soft">{p.sku}</span>
      <span>
        <span className="rounded-full bg-brand-wash px-2 py-1 text-mock-xs font-semibold text-brand">{p.categoria}</span>
      </span>
      <span className="cifras text-right font-mono text-mock-xs text-ink-soft">{lempiras(p.costo)}</span>
      <span className="cifras text-right font-mono text-mock-xs font-bold text-ink">{lempiras(p.precio)}</span>
      <span className="flex flex-col items-end">
        <span className={`cifras font-mono text-mock-xs font-bold ${bajo ? "text-warn-ink" : "text-ink"}`}>
          {entero(p.stock)} {PLURAL[p.unidad] ?? p.unidad.toLowerCase()}
        </span>
        <span className={`text-mock-xs ${bajo ? "text-warn-ink" : "text-muted"}`}>Mín: {p.minimo}</span>
      </span>
      <span className="flex justify-end gap-2 text-ink-soft">
        <Barcode className="size-4" />
        <PencilSimple className="size-4" />
      </span>
    </div>
  );
}

// `agregado`: la fila del producto nuevo ya está visible y el conteo sube a 1,285.
// La fila siempre existe en el DOM; el CSS de .demo-codigo la despliega en la fase 4.
export function MaquetaInventario({ agregado = true }: { agregado?: boolean }) {
  const filas = PRODUCTOS.slice(0, 6);
  return (
    <MarcoApp
      activo="Inventario"
      etiqueta="Inventario de ejemplo: lista de productos con SKU, categoría, costo, precio y stock; el alambre de amarre se acaba de agregar con su código de barras, y la lámina de zinc y el martillo aparecen con stock bajo."
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-mock-lg font-bold text-ink">Inventario</p>
            <p className="cifras text-mock-xs text-ink-soft">{agregado ? "1,285" : "1,284"} productos en 6 categorías</p>
          </div>
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-mock-sm font-semibold text-white">
            <Plus className="size-4" /> Nuevo producto
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-9 flex-1 items-center gap-2 rounded-mock border border-line bg-surface px-3 text-mock-sm text-muted">
            <MagnifyingGlass className="size-4" /> Buscar por nombre, SKU o código de barras
          </span>
          <span className="grid size-9 place-items-center rounded-mock border border-line bg-surface text-ink-soft">
            <Funnel className="size-4" />
          </span>
          <span className="grid size-9 place-items-center rounded-mock border border-line bg-surface text-ink-soft">
            <DownloadSimple className="size-4" />
          </span>
        </div>
        <div className="flex flex-col">
          <div className={`${COLUMNAS} mb-2 px-4 text-mock-xs font-semibold uppercase text-muted`}>
            <span>Producto</span>
            <span>SKU</span>
            <span>Categoría</span>
            <span className="text-right">Costo</span>
            <span className="text-right">Precio</span>
            <span className="text-right">Stock</span>
            <span />
          </div>
          <div className="fila-nueva">
            <div>
              <Fila p={porSku(SKU_NUEVO)} className="resalte mb-2" />
            </div>
          </div>
          {filas.map((p) => (
            <Fila key={p.sku} p={p} className="mb-2" />
          ))}
        </div>
      </div>
    </MarcoApp>
  );
}
