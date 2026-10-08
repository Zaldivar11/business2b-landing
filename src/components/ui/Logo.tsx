// Marca de Business2B, tomada del video promocional: cuadrado redondeado con degradado
// celeste a azul y una gráfica de barras blanca.

export function LogoMarca({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="b2b-degradado" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#0B4A8B" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill="url(#b2b-degradado)" />
      <g
        transform="translate(22 22) scale(2.3333)"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </g>
    </svg>
  );
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMarca className="size-8" />
      <span
        className={`font-wordmark text-h3 font-black tracking-tight ${claro ? "text-white" : "text-ink"}`}
      >
        Business2B
      </span>
    </span>
  );
}
