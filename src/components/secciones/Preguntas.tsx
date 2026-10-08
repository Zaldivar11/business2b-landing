import { CaretDown } from "@phosphor-icons/react/dist/ssr";

// Respuestas confirmadas por Business2B (formulario de pendientes, 08/10/2026).
const PREGUNTAS = [
  {
    p: "¿Cuánto cuesta?",
    r: "Depende del tamaño de su negocio. Se lo cotizamos en la demo, que es gratis.",
  },
  {
    p: "¿Tengo que instalar algo?",
    r: "No. Business2B funciona desde el navegador de su computadora, tablet o celular.",
  },
  {
    p: "¿Puedo usarlo en el celular o la tablet?",
    r: "Sí. Todo el sistema funciona en celular y tablet, igual que en la computadora.",
  },
  {
    p: "¿Funciona sin internet?",
    r: "No, necesita conexión a internet. A cambio, sus datos se respaldan en la nube todos los días y puede entrar desde cualquier equipo.",
  },
  {
    p: "¿Qué impresora necesito?",
    r: "Funciona con impresoras térmicas de tickets y con impresoras normales para facturas tamaño carta o A4.",
  },
  {
    p: "¿Sirve para facturar con los requisitos del SAR?",
    r: "Sí, está autorizado. Solo debe configurar sus datos fiscales: número CAI, fecha límite de emisión y rango autorizado.",
  },
  {
    p: "¿Cómo cargo mis productos?",
    r: "Usted los agrega en el sistema con su precio, costo, categoría y stock mínimo. El código de barras de cada producto se genera solo.",
  },
  {
    p: "¿Cuántos empleados pueden usarlo?",
    r: "Los que necesite: los usuarios son ilimitados. Cada empleado tiene el suyo, con rol de administrador, cajero o inventarista.",
  },
  {
    p: "¿Mis datos están seguros?",
    r: "Sus datos se guardan en una base de datos en la nube con respaldo diario. Nadie fuera de Business2B tiene acceso a ella.",
  },
  {
    p: "¿Me enseñan a usarlo?",
    r: "Sí. Le damos capacitación por Zoom para aprender a usar el sistema, y soporte de por vida.",
  },
];

export function Preguntas() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="py-16 lg:py-28">
      <div className="mx-auto grid max-w-300 gap-8 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <h2 id="preguntas-titulo" className="text-h2 font-bold tracking-tight text-ink lg:col-span-4 lg:text-h2-lg">
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-3 lg:col-span-8">
          {PREGUNTAS.map((q) => (
            <details key={q.p} className="group rounded-card border border-line bg-surface transition-[box-shadow,border-color] duration-300 ease-out open:border-line-strong open:shadow-card">
              <summary className="flex min-h-16 cursor-pointer select-none items-center justify-between gap-4 rounded-card px-6 py-4 text-body font-semibold text-ink transition-colors duration-300 hover:bg-ground lg:text-body-lg">
                <span>{q.p}</span>
                <CaretDown
                  className="size-5 shrink-0 text-ink-soft transition-transform duration-500 ease-out group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[65ch] px-6 pb-6 text-body text-ink-soft">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
