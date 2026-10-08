"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import { ruta } from "@/lib/sitio";

// El video no se descarga hasta que el visitante toca "Reproducir": solo se carga el poster
// (27 KB). En celular se usa la versión vertical y en pantallas grandes la horizontal.
export function Video() {
  const [reproduciendo, setReproduciendo] = useState(false);

  return (
    <section aria-labelledby="video" className="bg-night py-16 lg:py-28">
      <div className="mx-auto flex max-w-300 flex-col items-center gap-8 px-5 lg:gap-12 lg:px-8">
        <div className="flex max-w-2xl flex-col gap-4 text-center">
          <h2 id="video" className="text-h2 font-bold tracking-tight text-white lg:text-h2-lg">
            Véalo funcionando en menos de un minuto.
          </h2>
          <p className="text-body text-night-soft lg:text-body-lg">
            Ventas, inventario, facturas y créditos, en el mismo sistema que usará en su negocio.
          </p>
        </div>

        <div className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-card border border-night-line bg-ink md:aspect-video md:max-w-none lg:w-10/12">
          {reproduciendo ? (
            <video
              className="size-full"
              controls
              autoPlay
              playsInline
              preload="auto"
              poster={ruta("/video/poster-horizontal.webp")}
            >
              <source src={ruta("/video/business2b-vertical.mp4")} type="video/mp4" media="(max-width: 767px)" />
              <source src={ruta("/video/business2b-horizontal.mp4")} type="video/mp4" />
              Su navegador no puede reproducir este video.
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setReproduciendo(true)}
              className="group relative size-full"
              aria-label="Reproducir el video de Business2B (52 segundos, con sonido)"
            >
              <picture>
                <source srcSet={ruta("/video/poster-vertical.webp")} media="(max-width: 767px)" />
                <img
                  src={ruta("/video/poster-horizontal.webp")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </picture>
              <span className="absolute inset-0 grid place-items-center">
                <span className="inline-flex h-13 items-center gap-3 rounded-full bg-white px-6 text-body font-semibold text-ink shadow-raised transition-transform duration-300 ease-out group-hover:scale-[1.04] group-active:scale-[0.98]">
                  <Play weight="fill" className="size-5 text-brand" aria-hidden="true" />
                  Reproducir video
                  <span className="cifras font-mono text-small text-ink-soft">0:52</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
