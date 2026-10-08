import type { ReactNode } from "react";
import {
  ChartBar,
  CashRegister,
  ClockCounterClockwise,
  CreditCard,
  GearSix,
  Package,
  ShoppingCart,
  SquaresFour,
  UsersThree,
  Lock,
} from "@phosphor-icons/react/dist/ssr";
import { MENU_APP, NEGOCIO } from "@/lib/datos";
import { Escala } from "./Escala";
import { MaquetaVisible } from "./MaquetaVisible";

export const ICONOS_MENU = {
  Dashboard: SquaresFour,
  Ventas: ClockCounterClockwise,
  Cajas: CashRegister,
  Inventario: Package,
  Compras: ShoppingCart,
  Clientes: UsersThree,
  Créditos: CreditCard,
  Reportes: ChartBar,
  Configuración: GearSix,
} as const;

export type ItemMenu = (typeof MENU_APP)[number];

export function MenuApp({
  activo,
  visibles,
}: {
  activo?: ItemMenu;
  visibles?: readonly ItemMenu[];
}) {
  return (
    <ul className="flex flex-col gap-1">
      {MENU_APP.map((item) => {
        const Icono = ICONOS_MENU[item];
        const bloqueado = visibles ? !visibles.includes(item) : false;
        const esActivo = item === activo;
        return (
          <li
            key={item}
            className={`flex h-9 items-center gap-3 rounded-mock px-3 text-mock-sm font-medium transition-[opacity,background-color] duration-500 ${
              esActivo ? "bg-brand text-white" : "text-night-soft"
            } ${bloqueado ? "opacity-30" : ""}`}
          >
            <Icono className="size-4" aria-hidden="true" />
            <span className="flex-1">{item}</span>
            {bloqueado && <Lock className="size-3" aria-hidden="true" />}
          </li>
        );
      })}
    </ul>
  );
}

export function LateralApp({ activo }: { activo: ItemMenu }) {
  return (
    <aside className="flex w-48 shrink-0 flex-col gap-6 bg-ink px-3 py-4">
      <div className="flex items-center gap-2 px-1">
        <span className="grid size-8 place-items-center rounded-mock bg-white font-mono text-mock-sm font-bold text-brand">
          {NEGOCIO.iniciales}
        </span>
        <span className="text-mock-sm font-semibold leading-tight text-white">{NEGOCIO.nombre}</span>
      </div>
      <MenuApp activo={activo} />
    </aside>
  );
}

// Marco de navegador + app. `etiqueta` describe la maqueta para lectores de pantalla.
export function MarcoApp({
  activo,
  etiqueta,
  ancho = 1000,
  children,
}: {
  activo: ItemMenu;
  etiqueta: string;
  ancho?: number;
  children: ReactNode;
}) {
  return (
    <MaquetaVisible role="img" aria-label={etiqueta} className="overflow-hidden rounded-card border border-line bg-surface shadow-raised">
      <Escala ancho={ancho}>
        <div aria-hidden="true" className="flex flex-col">
          <div className="flex h-8 items-center gap-2 border-b border-line bg-ground px-4">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="ml-4 h-5 w-64 rounded-full bg-surface px-3 font-mono text-mock-xs leading-5 text-muted">
              Business2B
            </span>
          </div>
          <div className="flex min-h-140">
            <LateralApp activo={activo} />
            <div className="flex-1 bg-ground">{children}</div>
          </div>
        </div>
      </Escala>
    </MaquetaVisible>
  );
}
