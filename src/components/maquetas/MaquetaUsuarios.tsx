import { Plus } from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { USUARIOS } from "@/lib/datos";
import { MarcoApp } from "./MarcoApp";

// Pantalla de usuarios: resalta a quienes tienen el rol elegido en la sección de roles.
export function MaquetaUsuarios({ rolActivo }: { rolActivo?: string }) {
  return (
    <MarcoApp
      activo="Configuración"
      ancho={760}
      etiqueta={`Pantalla de usuarios de ejemplo con ${USUARIOS.length} empleados: una administradora, dos cajeros y un inventarista. Los usuarios son ilimitados.`}
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-mock-lg font-bold text-ink">Usuarios</p>
            <p className="text-mock-xs text-ink-soft">{USUARIOS.length} usuarios · Usuarios ilimitados</p>
          </div>
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-mock-sm font-semibold text-white">
            <Plus className="size-4" /> Nuevo usuario
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {USUARIOS.map((u, i) => {
            const activo = u.rol === rolActivo;
            return (
              <div
                key={u.usuario}
                className={`kpi flex items-center gap-3 rounded-mock border bg-surface px-4 py-3 transition-[border-color,box-shadow,opacity] duration-500 ease-out ${
                  activo ? "border-brand shadow-card" : rolActivo ? "border-line opacity-55" : "border-line"
                }`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-wash font-mono text-mock-sm font-bold text-brand">
                  {u.iniciales}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-mock-sm font-semibold text-ink">{u.nombre}</span>
                  <span className="font-mono text-mock-xs text-ink-soft">{u.usuario}</span>
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-mock-xs font-semibold transition-colors duration-500 ${
                    activo ? "bg-brand text-white" : "bg-ground text-ink-soft"
                  }`}
                >
                  {u.rol}
                </span>
                <span className="rounded-full bg-ok-wash px-2 py-1 text-mock-xs font-semibold text-ok-ink">Activo</span>
              </div>
            );
          })}
        </div>
      </div>
    </MarcoApp>
  );
}
