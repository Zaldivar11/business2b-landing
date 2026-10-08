import { HandCoins, Plus, Receipt, User } from "@phosphor-icons/react/dist/ssr";
import type React from "react";
import { CLIENTE_CREDITO, MOVIMIENTOS_CREDITO, OTROS_CREDITOS, lempiras } from "@/lib/datos";
import { MarcoApp } from "./MarcoApp";

export function MaquetaCreditos() {
  const filas = MOVIMIENTOS_CREDITO.map((m, i) => ({
    ...m,
    saldo: MOVIMIENTOS_CREDITO.slice(0, i + 1).reduce((s, x) => s + x.cargo - x.abono, 0),
  }));
  const saldo = filas[filas.length - 1].saldo;
  const disponible = CLIENTE_CREDITO.limite - saldo;

  return (
    <MarcoApp
      activo="Créditos"
      etiqueta={`Crédito de ejemplo de ${CLIENTE_CREDITO.nombre}: límite ${lempiras(CLIENTE_CREDITO.limite)}, saldo ${lempiras(saldo)}, disponible ${lempiras(disponible)}, con sus ventas al crédito y abonos de septiembre y octubre.`}
    >
      <div className="grid min-h-140 grid-cols-[1fr_240px]">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-brand text-white">
                <User className="size-5" />
              </span>
              <div>
                <p className="text-mock-lg font-bold text-ink">{CLIENTE_CREDITO.nombre}</p>
                <p className="font-mono text-mock-xs text-ink-soft">RTN {CLIENTE_CREDITO.rtn}</p>
              </div>
            </div>
            <span className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-mock-sm font-semibold text-white">
              <Plus className="size-4" /> Registrar abono
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["Límite de crédito", lempiras(CLIENTE_CREDITO.limite), "text-ink"],
              ["Saldo actual", lempiras(saldo), "text-warn-ink"],
              ["Disponible", lempiras(disponible), "text-ok-ink"],
            ].map(([t, v, c], i) => (
              <div
                key={t}
                className="kpi flex flex-col gap-1 rounded-mock border border-line bg-surface p-4"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="text-mock-xs font-semibold uppercase text-ink-soft">{t}</span>
                <span className={`cifras font-mono text-mock-lg font-bold ${c}`}>{v}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col rounded-mock border border-line bg-surface">
            <div className="grid grid-cols-[0.6fr_0.9fr_1.6fr_1fr_1fr_1fr] gap-3 border-b border-line px-4 py-2 text-mock-xs font-semibold uppercase text-muted">
              <span>Fecha</span>
              <span>Documento</span>
              <span>Detalle</span>
              <span className="text-right">Cargo</span>
              <span className="text-right">Abono</span>
              <span className="text-right">Saldo</span>
            </div>
            {filas.map((f, i) => (
              <div
                key={f.doc}
                className="linea-carrito grid grid-cols-[0.6fr_0.9fr_1.6fr_1fr_1fr_1fr] items-center gap-3 border-b border-line px-4 py-2 last:border-b-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="cifras font-mono text-mock-xs text-ink-soft">{f.fecha}</span>
                <span className="inline-flex items-center gap-1 font-mono text-mock-xs text-ink">
                  {f.abono ? <HandCoins className="size-3 text-ok-ink" /> : <Receipt className="size-3 text-ink-soft" />}
                  {f.doc}
                </span>
                <span className="text-mock-xs text-ink">{f.detalle}</span>
                <span className="cifras text-right font-mono text-mock-xs text-ink">{f.cargo ? lempiras(f.cargo) : ""}</span>
                <span className="cifras text-right font-mono text-mock-xs font-semibold text-ok-ink">{f.abono ? lempiras(f.abono) : ""}</span>
                <span className="cifras text-right font-mono text-mock-xs font-bold text-ink">{lempiras(f.saldo)}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-3 border-l border-line bg-surface p-4">
          <span className="text-mock-sm font-bold text-ink">Otros clientes con crédito</span>
          {OTROS_CREDITOS.map((c) => (
            <div key={c.nombre} className="flex flex-col gap-1 rounded-mock bg-ground p-3">
              <span className="text-mock-xs font-semibold uppercase text-ink">{c.nombre}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-mock-xs text-ink-soft">Saldo</span>
                <span className={`cifras font-mono text-mock-sm font-bold ${c.saldo ? "text-warn-ink" : "text-ok-ink"}`}>
                  {lempiras(c.saldo)}
                </span>
              </div>
              <span className="cifras font-mono text-mock-xs text-muted">Límite {lempiras(c.limite)}</span>
            </div>
          ))}
        </aside>
      </div>
    </MarcoApp>
  );
}
