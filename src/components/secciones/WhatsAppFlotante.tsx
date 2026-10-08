"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { enlaceWhatsApp } from "@/lib/sitio";

// Se oculta mientras el formulario de demo está en pantalla, para no tapar sus campos.
export function WhatsAppFlotante() {
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const demo = document.getElementById("demo");
    if (!demo) return;
    const obs = new IntersectionObserver(([e]) => setOculto(e.isIntersecting), { threshold: 0.15 });
    obs.observe(demo);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href={enlaceWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp: quiero una demo de Business2B"
      tabIndex={oculto ? -1 : 0}
      className={`fixed bottom-4 right-4 z-20 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-raised flotante-entrada transition-[translate,scale,opacity,background-color] duration-300 ease-out hover:scale-105 hover:bg-whatsapp-deep active:scale-[0.95] lg:bottom-6 lg:right-6 ${
        oculto ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <WhatsappLogo weight="fill" className="size-8" aria-hidden="true" />
    </a>
  );
}
