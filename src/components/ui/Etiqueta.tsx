import type { ReactNode } from "react";

// Etiqueta de precio del POS: píldora marina con texto blanco. El "ojal" la convierte
// en etiqueta colgante cuando se usa para categorías.

export function Etiqueta({
  children,
  ojal = false,
  tachada = false,
  className = "",
}: {
  children: ReactNode;
  ojal?: boolean;
  tachada?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 font-mono text-tag font-semibold text-white lg:text-tag-lg ${className}`}
    >
      {ojal && <span className="size-2 rounded-full bg-ground ring-2 ring-ink-soft" aria-hidden="true" />}
      <span className={tachada ? "line-through decoration-warn decoration-2" : undefined}>{children}</span>
    </span>
  );
}

export function EtiquetaPrecio({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`cifras inline-flex items-center rounded-full bg-ink px-2 py-1 font-mono text-mock-sm font-semibold text-white ${className}`}
    >
      {children}
    </span>
  );
}
