import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { BotonDemo } from "@/components/ui/Boton";
import { NAV, enlaceWhatsApp } from "@/lib/sitio";

export function Navegacion() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-300 items-center justify-between gap-6 px-5 lg:h-18 lg:px-8">
        <a href="#inicio" aria-label="Business2B, ir al inicio" className="rounded-control">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-small font-medium text-ink-soft transition-colors duration-300 hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="hidden size-11 place-items-center rounded-control text-whatsapp transition-colors duration-300 hover:bg-ground lg:grid"
          >
            <WhatsappLogo weight="fill" className="size-6" aria-hidden="true" />
          </a>
          <BotonDemo tamano="compacto" />
        </div>
      </nav>
    </header>
  );
}
