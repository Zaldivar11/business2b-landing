"use client";

import { useEffect, useRef, useState } from "react";

// Dos IntersectionObserver compartidos por toda la página (más barato en celulares de gama
// media que uno por elemento):
// - `entrar` marca el elemento como visible cuando ya se ve una parte suficiente;
// - `salir` lo desmarca solo cuando quedó totalmente fuera de pantalla, para que la animación
//   se repita al volver y nunca se oculte algo que el visitante todavía está viendo.
type Aviso = (visible: boolean) => void;

const avisos = new WeakMap<Element, Aviso>();
let entrar: IntersectionObserver | null = null;
let salir: IntersectionObserver | null = null;

function observadores() {
  entrar ??= new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        // Los elementos más altos que la pantalla nunca llegan al 15 %: basta con que ocupen
        // un tercio de la ventana.
        const suficiente = e.intersectionRatio >= 0.15 || e.intersectionRect.height > window.innerHeight * 0.3;
        if (e.isIntersecting && suficiente) avisos.get(e.target)?.(true);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: [0, 0.15, 0.3] },
  );
  salir ??= new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) if (!e.isIntersecting) avisos.get(e.target)?.(false);
    },
    { threshold: 0 },
  );
  return [entrar, salir] as const;
}

// `inicial`: arranca como visible (para el hero, que debe animarse al cargar sin esperar a JS).
export function useEnVista<T extends Element>(inicial = false) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(inicial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = observadores();
    avisos.set(el, setVisible);
    obs.forEach((o) => o.observe(el));
    return () => {
      avisos.delete(el);
      obs.forEach((o) => o.unobserve(el));
    };
  }, []);

  return [ref, visible] as const;
}
