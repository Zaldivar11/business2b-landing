import type React from "react";

// El "antes": una hoja del cuaderno de fiados, escrita a mano, con tachones y cuentas que no
// cierran. Es el contrapunto del ticket del hero, que sí cuadra.
type Renglon = { texto: string; monto?: string; tachado?: boolean; duda?: boolean; rojo?: boolean };

const RENGLONES: Renglon[] = [
  { texto: "Martes 7 de octubre", rojo: true },
  { texto: "Don Wilmer, 2 varillas 3/8", monto: "L.276" },
  { texto: "Taller Ordóñez, abonó", monto: "L.500", tachado: true },
  { texto: "Taller Ordóñez, abonó ¿600?", monto: "L.600", duda: true },
  { texto: "Doña Dilcia, clavos 3 lb", monto: "L.84" },
  { texto: "Constructora, 10 bolsas cemento", monto: "L.2,450" },
  { texto: "Cemento: quedan ¿12 bolsas?", duda: true },
  { texto: "Total del día", monto: "L.18,4??", duda: true, rojo: true },
];

export function CuadernoFiados({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative ${className}`}
      aria-label="Ilustración de una hoja de cuaderno de fiados con anotaciones a mano, montos tachados y un total del día que no se sabe."
      role="img"
    >
      <div
        aria-hidden="true"
        className="hoja-cuaderno flex h-full -rotate-1 flex-col rounded-mock px-6 pb-8 pt-5 pl-16 font-mano text-mano text-lapicero shadow-raised"
      >
        <span className="mb-9 text-small font-sans font-semibold uppercase text-ink-soft">Fiados</span>
        {RENGLONES.map((r, i) => (
          <span
            key={i}
            className={`flex items-baseline justify-between gap-4 ${r.rojo ? "font-bold text-margen" : ""}`}
            style={{ rotate: `${(i % 3) * 0.3 - 0.3}deg` } as React.CSSProperties}
          >
            <span className={r.tachado ? "line-through decoration-2" : undefined}>{r.texto}</span>
            {r.monto && (
              <span className={`shrink-0 ${r.tachado ? "line-through decoration-2" : ""} ${r.duda ? "underline decoration-wavy decoration-margen" : ""}`}>
                {r.monto}
              </span>
            )}
          </span>
        ))}
      </div>
    </figure>
  );
}
