import type { ReactNode } from "react";

// Piezas del ticket térmico. El papel lleva bordes dentados (ver .papel-ticket en globals.css).

export function PapelTicket({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`sombra-ticket ${className}`}>
      <div className="papel-ticket cifras px-6 pb-8 pt-8 font-mono text-ticket text-ink lg:text-ticket-lg">
        {children}
      </div>
    </div>
  );
}

export function Linea({
  etiqueta,
  valor,
  fuerte = false,
}: {
  etiqueta: ReactNode;
  valor: ReactNode;
  fuerte?: boolean;
}) {
  return (
    <div className={`flex items-baseline gap-2 ${fuerte ? "font-bold" : ""}`}>
      <span className="shrink-0">{etiqueta}</span>
      <span className="min-w-4 flex-1 translate-y-[-0.25em] border-b border-dotted border-muted" aria-hidden="true" />
      <span className="shrink-0 text-right">{valor}</span>
    </div>
  );
}

export function Corte({ doble = false }: { doble?: boolean }) {
  return (
    <div
      className={`my-3 border-t border-dashed border-muted ${doble ? "border-t-2 border-ink" : ""}`}
      aria-hidden="true"
    />
  );
}
