"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEnVista } from "@/lib/useEnVista";

// Raíz de cada maqueta: al entrar en pantalla recibe `data-visible` y el CSS dibuja la gráfica,
// barre la dona y escalona indicadores y líneas del carrito (ver "Maquetas" en globals.css).
export function MaquetaVisible({ className = "", ...resto }: ComponentPropsWithoutRef<"div">) {
  const [ref, visible] = useEnVista<HTMLDivElement>();
  return <div ref={ref} data-visible={visible ? "" : undefined} className={`maqueta ${className}`} {...resto} />;
}
