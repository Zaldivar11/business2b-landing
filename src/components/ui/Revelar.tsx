"use client";

import type { ComponentPropsWithoutRef, ElementType } from "react";
import { useEnVista } from "@/lib/useEnVista";

// Marca `data-visible` mientras el elemento está en pantalla y lo quita al salir, así la
// animación se repite cada vez que el visitante vuelve. Toda la animación vive en CSS
// (globals.css):
// - modo "elemento" (`data-revelar`): anima el propio elemento;
// - modo "grupo" (`data-revelar-grupo`): escalona a sus hijos usando `--i` en cada uno;
// - modo "escena" (`data-escena`): solo da la señal; los hijos con .entrada, .imprimir o
//   .entrada-panel se animan.
// Sin JavaScript no se oculta nada (las reglas de ocultar exigen `html.js`).
type Props<T extends ElementType> = {
  as?: T;
  modo?: "elemento" | "grupo" | "escena";
  inicial?: boolean;
} & ComponentPropsWithoutRef<T>;

const ATRIBUTO = { elemento: "data-revelar", grupo: "data-revelar-grupo", escena: "data-escena" } as const;

export function Revelar<T extends ElementType = "div">({ as, modo = "elemento", inicial = false, ...resto }: Props<T>) {
  const [ref, visible] = useEnVista<HTMLElement>(inicial);
  const Etiqueta = (as ?? "div") as ElementType;
  return (
    <Etiqueta
      ref={ref}
      {...{ [ATRIBUTO[modo]]: "" }}
      data-visible={visible ? "" : undefined}
      {...resto}
    />
  );
}
