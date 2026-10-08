"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Dibuja la maqueta a su ancho de diseño y la escala al ancho disponible, para que
// la proporción de la app se mantenga igual en celular y en escritorio.
export function Escala({ ancho = 1000, children }: { ancho?: number; children: ReactNode }) {
  const caja = useRef<HTMLDivElement>(null);
  const interior = useRef<HTMLDivElement>(null);
  const [medida, setMedida] = useState({ escala: 1, alto: 0 });

  useLayoutEffect(() => {
    const exterior = caja.current;
    const dentro = interior.current;
    if (!exterior || !dentro) return;
    const medir = () => {
      const escala = exterior.clientWidth / ancho;
      setMedida({ escala, alto: dentro.offsetHeight * escala });
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(exterior);
    observador.observe(dentro);
    return () => observador.disconnect();
  }, [ancho]);

  return (
    <div ref={caja} className="relative w-full" style={{ height: medida.alto || undefined }}>
      <div
        ref={interior}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: ancho, transform: `scale(${medida.escala})` }}
      >
        {children}
      </div>
    </div>
  );
}
