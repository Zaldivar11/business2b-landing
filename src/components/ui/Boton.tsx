import type { ComponentProps, ReactNode } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { enlaceWhatsApp } from "@/lib/sitio";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-body font-semibold transition-[background-color,border-color,translate,scale,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none";

const tamanos = {
  normal: "h-13 lg:h-12",
  compacto: "h-11 px-4 text-small",
};

const variantes = {
  principal:
    "bg-brand text-white shadow-button hover:bg-brand-deep disabled:bg-muted disabled:shadow-none",
  secundario:
    "border-[1.5px] border-line-strong bg-surface text-ink hover:border-muted disabled:text-muted",
};

type Props = {
  variante?: keyof typeof variantes;
  tamano?: keyof typeof tamanos;
  children: ReactNode;
};

export function claseBoton({ variante = "principal", tamano = "normal" }: Omit<Props, "children">) {
  return `${base} ${tamanos[tamano]} ${variantes[variante]}`;
}

export function BotonEnlace({
  variante,
  tamano,
  children,
  className = "",
  ...resto
}: Props & ComponentProps<"a">) {
  return (
    <a className={`${claseBoton({ variante, tamano })} ${className}`} {...resto}>
      {children}
    </a>
  );
}

export function BotonDemo({ tamano, className }: { tamano?: Props["tamano"]; className?: string }) {
  return (
    <BotonEnlace href="#demo" tamano={tamano} className={className}>
      Solicitar demo
    </BotonEnlace>
  );
}

export function BotonWhatsApp({ className }: { className?: string }) {
  return (
    <BotonEnlace
      variante="secundario"
      href={enlaceWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <WhatsappLogo weight="fill" className="size-6 text-whatsapp" aria-hidden="true" />
      Escribir por WhatsApp
    </BotonEnlace>
  );
}
