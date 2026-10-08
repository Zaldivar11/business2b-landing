"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MenuApp, type ItemMenu } from "@/components/maquetas/MarcoApp";
import { MaquetaUsuarios } from "@/components/maquetas/MaquetaUsuarios";
import { MENU_APP } from "@/lib/datos";

// Permisos confirmados por Business2B: el administrador ve todo; el cajero, ventas, cajas y
// clientes; el inventarista, inventario y compras.
const ROLES: { id: string; nombre: string; persona: string; iniciales: string; resumen: string; visibles: readonly ItemMenu[] }[] = [
  {
    id: "administrador",
    nombre: "Administrador",
    persona: "Marta Lucía Reyes",
    iniciales: "MR",
    resumen: "Ve y configura todo: ventas, inventario, créditos, reportes y usuarios.",
    visibles: MENU_APP,
  },
  {
    id: "cajero",
    nombre: "Cajero",
    persona: "Ana Gabriela Romero",
    iniciales: "AR",
    resumen: "Vende, cobra, atiende a los clientes y hace el corte de su caja. No ve reportes ni la configuración.",
    visibles: ["Ventas", "Cajas", "Clientes"],
  },
  {
    id: "inventarista",
    nombre: "Inventarista",
    persona: "José David Turcios",
    iniciales: "JT",
    resumen: "Carga productos, registra compras, actualiza el stock y genera códigos de barras.",
    visibles: ["Inventario", "Compras"],
  },
];

export function Roles() {
  const [activo, setActivo] = useState(1);
  const reducir = useReducedMotion();
  const rol = ROLES[activo];

  return (
    <section aria-labelledby="roles" className="py-16 lg:py-28">
      <div className="mx-auto grid max-w-300 gap-12 px-5 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <h2 id="roles" className="text-h2 font-bold tracking-tight text-ink lg:text-h2-lg">
              Cada empleado ve solo lo que le toca.
            </h2>
            <p className="text-body text-ink-soft lg:text-body-lg">
              Cree todos los usuarios que necesite, uno para cada persona, y asígnele un rol. Usted decide quién vende, quién toca el inventario y quién ve los números.
            </p>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-small font-semibold text-ink">Elija un rol para ver qué tiene a la mano</legend>
            <div className="grid grid-cols-3 gap-1 rounded-control bg-line p-1">
              {ROLES.map((r, i) => (
                <label
                  key={r.id}
                  className={`relative grid h-11 cursor-pointer place-items-center rounded-control px-2 text-small font-semibold transition-[color,scale] duration-300 ease-out active:scale-[0.96] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky ${
                    i === activo ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {i === activo && (
                    <motion.span
                      layoutId="rol-activo"
                      transition={reducir ? { duration: 0 } : { type: "spring", duration: 0.55, bounce: 0.12 }}
                      className="absolute inset-0 rounded-control bg-surface shadow-card"
                      aria-hidden="true"
                    />
                  )}
                  <input
                    type="radio"
                    name="rol"
                    value={r.id}
                    checked={i === activo}
                    onChange={() => setActivo(i)}
                    className="sr-only"
                  />
                  <span className="relative">{r.nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-4 rounded-card bg-ink p-4" aria-live="polite">
            <div className="flex items-center gap-3 border-b border-night-line px-2 pb-4">
              <span className="grid size-9 place-items-center rounded-full bg-brand font-mono text-small font-bold text-white">
                {rol.iniciales}
              </span>
              <span className="flex flex-col">
                <span className="text-small font-semibold text-white">{rol.persona}</span>
                <span className="text-small text-night-soft">{rol.nombre}</span>
              </span>
            </div>
            <p className="px-2 text-small text-night-soft">{rol.resumen}</p>
            <MenuApp visibles={rol.visibles} />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <MaquetaUsuarios rolActivo={rol.nombre} />
        </div>
      </div>
    </section>
  );
}
