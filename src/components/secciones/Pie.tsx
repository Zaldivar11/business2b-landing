import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { CORREO, NAV, WHATSAPP_VISIBLE, enlaceWhatsApp } from "@/lib/sitio";

export function Pie() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-300 flex-col gap-8 px-5 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo />
          <p className="text-small text-ink-soft">
            Inventario, ventas, facturas y créditos en un solo sistema para el comercio de Latinoamérica.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-small text-ink-soft hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#demo" className="text-small font-semibold text-brand hover:underline">
                Solicitar demo
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <a
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-small font-semibold text-ink hover:underline"
          >
            <WhatsappLogo weight="fill" className="size-5 text-whatsapp" aria-hidden="true" />
            <span className="cifras">{WHATSAPP_VISIBLE}</span>
          </a>
          <a href={`mailto:${CORREO}`} className="inline-flex items-center gap-2 text-small text-ink-soft hover:text-ink hover:underline">
            <EnvelopeSimple className="size-5 text-ink-soft" aria-hidden="true" />
            {CORREO}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-300 px-5 py-6 text-small text-ink-soft lg:px-8">© 2026 Business2B. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
