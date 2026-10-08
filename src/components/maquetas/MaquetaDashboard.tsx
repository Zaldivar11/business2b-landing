import { ArrowUpRight, CurrencyDollar, Receipt, Star, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { CATEGORIAS, CORTE, VENTAS_30, entero, lempiras } from "@/lib/datos";
import { MarcoApp } from "./MarcoApp";

const COLORES_CATEGORIA = ["#0B4A8B", "#0EA5E9", "#475569", "#94A3B8", "#CBD5E1"];

function Grafica() {
  const ancho = 520;
  const alto = 150;
  const max = Math.max(...VENTAS_30) * 1.1;
  const puntos = VENTAS_30.map((v, i) => [(i / (VENTAS_30.length - 1)) * ancho, alto - (v / max) * alto] as const);
  const linea = puntos.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${linea} L${ancho} ${alto} L0 ${alto} Z`;
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} className="h-40 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area-ventas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0EA5E9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={ancho} y1={alto * f} y2={alto * f} stroke="#E2E8F0" strokeDasharray="3 4" />
      ))}
      <path className="area" d={area} fill="url(#area-ventas)" />
      <path
        className="trazo"
        d={linea}
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="#0B4A8B"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Dona() {
  const tramos = CATEGORIAS.map((c, i) => {
    const desde = CATEGORIAS.slice(0, i).reduce((s, x) => s + x.valor, 0);
    return `${COLORES_CATEGORIA[i]} ${desde}% ${desde + c.valor}%`;
  }).join(", ");
  return (
    <div className="dona relative size-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${tramos})` }}>
      <div className="absolute inset-6 grid place-items-center rounded-full bg-surface">
        <span className="font-mono text-mock-sm font-semibold text-ink">5 cat.</span>
      </div>
    </div>
  );
}

function Indicador({
  titulo,
  valor,
  detalle,
  Icono,
  aviso = false,
  i = 0,
}: {
  titulo: string;
  valor: string;
  detalle: React.ReactNode;
  Icono: typeof Receipt;
  aviso?: boolean;
  i?: number;
}) {
  return (
    <div
      className="kpi flex flex-col gap-2 rounded-mock border border-line bg-surface p-4"
      style={{ "--i": i } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="text-mock-xs font-semibold uppercase text-ink-soft">{titulo}</span>
        <span className={`grid size-7 place-items-center rounded-mock ${aviso ? "bg-warn-wash text-warn-ink" : "bg-brand-wash text-brand"}`}>
          <Icono className="size-4" />
        </span>
      </div>
      <span className="cifras font-mono text-mock-lg font-bold text-ink">{valor}</span>
      <span className="text-mock-xs text-ink-soft">{detalle}</span>
    </div>
  );
}

export function MaquetaDashboard() {
  const total30 = VENTAS_30.reduce((a, b) => a + b, 0);
  return (
    <MarcoApp
      activo="Dashboard"
      etiqueta={`Dashboard de ejemplo de Ferretería El Progreso: ventas de hoy ${lempiras(CORTE.ventas)}, ${CORTE.transacciones} transacciones, ${CORTE.stockBajo} alertas de stock y gráfica de ventas de los últimos 30 días.`}
    >
      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="text-mock-lg font-bold text-ink">Dashboard</p>
          <p className="text-mock-xs text-ink-soft">Vista general de su negocio hoy</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Indicador
            titulo="Ventas hoy"
            valor={lempiras(CORTE.ventas)}
            Icono={CurrencyDollar}
            detalle={
              <span className="inline-flex items-center gap-1 font-semibold text-ok-ink">
                <ArrowUpRight className="size-3" /> 6.8 % vs. ayer
              </span>
            }
          />
          <Indicador i={1} titulo="Transacciones" valor={String(CORTE.transacciones)} Icono={Receipt} detalle="Ticket promedio L.400.82" />
          <Indicador i={2} titulo="Más vendido" valor="Cemento 42.5 kg" Icono={Star} detalle="214 bolsas este mes" />
          <Indicador i={3} titulo="Stock bajo" valor={String(CORTE.stockBajo)} Icono={WarningCircle} aviso detalle="Productos por agotarse" />
        </div>
        <div className="grid grid-cols-[1.7fr_1fr] gap-3">
          <div className="flex flex-col gap-2 rounded-mock border border-line bg-surface p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-mock-sm font-bold text-ink">Ventas de los últimos 30 días</span>
              <span className="cifras font-mono text-mock-sm font-semibold text-brand">{lempiras(total30)}</span>
            </div>
            <Grafica />
            <div className="flex justify-between font-mono text-mock-xs text-muted">
              <span>09 sep</span>
              <span>16 sep</span>
              <span>23 sep</span>
              <span>30 sep</span>
              <span>08 oct</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-mock border border-line bg-surface p-4">
            <span className="text-mock-sm font-bold text-ink">Ventas por categoría</span>
            <div className="flex items-center gap-4">
              <Dona />
              <ul className="flex flex-1 flex-col gap-1">
                {CATEGORIAS.map((c, i) => (
                  <li key={c.nombre} className="flex items-center gap-2 text-mock-xs text-ink-soft">
                    <span className="size-2 rounded-full" style={{ background: COLORES_CATEGORIA[i] }} />
                    <span className="flex-1">{c.nombre}</span>
                    <span className="cifras font-mono font-semibold text-ink">{c.valor} %</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            [entero(CORTE.productos), "Productos"],
            ["312", "Clientes"],
            [lempiras(CORTE.porCobrar), "Por cobrar"],
            ["17", "Créditos activos"],
          ].map(([v, t], i) => (
            <div
              key={t}
              className="kpi flex flex-col rounded-mock border border-line bg-surface px-4 py-3"
              style={{ "--i": i + 4 } as React.CSSProperties}
            >
              <span className="cifras font-mono text-mock-sm font-bold text-ink">{v}</span>
              <span className="text-mock-xs text-ink-soft">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </MarcoApp>
  );
}
