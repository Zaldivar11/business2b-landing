"use client";

import { useState, type FormEvent } from "react";
import {
  CaretDown,
  CheckCircle,
  Copy,
  WarningCircle,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Corte, Linea } from "@/components/ui/Ticket";
import { claseBoton } from "@/components/ui/Boton";
import { TIPOS_NEGOCIO, enlaceWhatsApp } from "@/lib/sitio";

type Campos = {
  nombre: string;
  negocio: string;
  telefono: string;
  tipo: string;
};
type Errores = Partial<Record<keyof Campos, string>>;

const VACIO: Campos = { nombre: "", negocio: "", telefono: "", tipo: "" };

function validar(c: Campos): Errores {
  const e: Errores = {};
  if (c.nombre.trim().length < 2) e.nombre = "Escriba su nombre.";
  if (c.negocio.trim().length < 2)
    e.negocio = "Escriba el nombre de su negocio.";
  const digitos = c.telefono.replace(/\D/g, "");
  if (digitos.length < 8 || digitos.length > 15)
    e.telefono = "Escriba un teléfono de al menos 8 dígitos.";
  if (!c.tipo) e.tipo = "Elija el tipo de negocio.";
  return e;
}

function armarMensaje(c: Campos) {
  return `Hola, soy ${c.nombre.trim()} de ${c.negocio.trim()} (${c.tipo}). Mi teléfono es ${c.telefono.trim()}. Me gustaría ver una demo de Business2B.`;
}

const claseCampo =
  "h-13 w-full rounded-control border-[1.5px] bg-surface px-4 font-sans text-body text-ink outline-none transition-colors placeholder:text-ink-soft hover:border-muted focus-visible:border-brand aria-[invalid=true]:border-warn-ink";

export function FormularioDemo() {
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"editando" | "abriendo" | "enviado">(
    "editando",
  );
  const [copiado, setCopiado] = useState(false);

  const cambiar = (k: keyof Campos) => (v: string) => {
    setCampos((c) => ({ ...c, [k]: v }));
    if (errores[k]) setErrores((e) => ({ ...e, [k]: undefined }));
  };

  function enviar(ev: FormEvent) {
    ev.preventDefault();
    const e = validar(campos);
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      document.getElementById(`demo-${primero}`)?.focus();
      return;
    }
    setEstado("abriendo");
    window.open(
      enlaceWhatsApp(armarMensaje(campos)),
      "_blank",
      "noopener,noreferrer",
    );
    setTimeout(() => setEstado("enviado"), 600);
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(armarMensaje(campos));
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  if (estado === "enviado") {
    return (
      <div className="flex flex-col gap-4" role="status">
        <div className="flex items-center gap-2 font-bold text-ok-ink">
          <CheckCircle
            weight="fill"
            className="size-6 text-ok"
            aria-hidden="true"
          />
          SOLICITUD LISTA
        </div>
        <p className="font-sans text-body text-ink">
          Se abrió WhatsApp con su mensaje. Solo falta tocar{" "}
          <strong>Enviar</strong>.
        </p>
        <Corte />
        <p className="font-sans text-small text-ink-soft">¿No se abrió?</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={enlaceWhatsApp(armarMensaje(campos))}
            target="_blank"
            rel="noopener noreferrer"
            className={claseBoton({
              variante: "principal",
              tamano: "compacto",
            })}
          >
            <WhatsappLogo weight="fill" className="size-5" aria-hidden="true" />
            Abrir WhatsApp
          </a>
          <button
            type="button"
            onClick={copiar}
            className={claseBoton({
              variante: "secundario",
              tamano: "compacto",
            })}
          >
            <Copy className="size-5" aria-hidden="true" />
            {copiado ? "Mensaje copiado" : "Copiar mensaje"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => setEstado("editando")}
          className="self-start font-sans text-small font-semibold text-brand underline"
        >
          Corregir mis datos
        </button>
      </div>
    );
  }

  const campo = (
    k: keyof Campos,
    etiqueta: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`demo-${k}`}
        className="font-sans text-small font-semibold text-ink"
      >
        {etiqueta}
      </label>
      <input
        id={`demo-${k}`}
        name={k}
        value={campos[k]}
        onChange={(e) => cambiar(k)(e.target.value)}
        aria-invalid={!!errores[k]}
        aria-describedby={errores[k] ? `demo-${k}-error` : undefined}
        className={`${claseCampo} ${errores[k] ? "border-warn-ink" : "border-line-strong"}`}
        {...props}
      />
      {errores[k] && (
        <MensajeError id={`demo-${k}-error`}>{errores[k]}</MensajeError>
      )}
    </div>
  );

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
      {campo("nombre", "Su nombre", {
        autoComplete: "name",
        placeholder: "Nombre y apellido",
      })}
      {campo("negocio", "Nombre del negocio", {
        autoComplete: "organization",
        placeholder: "Ferretería, tienda, distribuidora…",
      })}
      {campo("telefono", "Teléfono", {
        type: "tel",
        inputMode: "tel",
        autoComplete: "tel",
        placeholder: "9999-0000",
      })}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="demo-tipo"
          className="font-sans text-small font-semibold text-ink"
        >
          Tipo de negocio
        </label>
        <div className="relative">
          <select
            id="demo-tipo"
            name="tipo"
            value={campos.tipo}
            onChange={(e) => cambiar("tipo")(e.target.value)}
            aria-invalid={!!errores.tipo}
            aria-describedby={errores.tipo ? "demo-tipo-error" : undefined}
            className={`${claseCampo} appearance-none pr-12 ${errores.tipo ? "border-warn-ink" : "border-line-strong"} ${
              campos.tipo ? "" : "text-ink-soft"
            }`}
          >
            <option value="" disabled>
              Elija una opción
            </option>
            {TIPOS_NEGOCIO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <CaretDown
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
        </div>
        {errores.tipo && (
          <MensajeError id="demo-tipo-error">{errores.tipo}</MensajeError>
        )}
      </div>

      <Corte />
      <div className="flex flex-col gap-1">
        <Linea etiqueta="Demo de Business2B" valor="GRATIS" fuerte />
        <Linea etiqueta="Respuesta" valor="Por WhatsApp" />
      </div>
      <Corte doble />

      <button
        type="submit"
        disabled={estado === "abriendo"}
        className={`${claseBoton({})} w-full font-sans`}
      >
        <WhatsappLogo weight="fill" className="size-5" aria-hidden="true" />
        {estado === "abriendo" ? "Abriendo WhatsApp…" : "Solicitar demo"}
      </button>
      <p className="text-center font-sans text-small text-ink-soft">
        Se abrirá WhatsApp con su mensaje listo para enviar.
      </p>
    </form>
  );
}

function MensajeError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      className="flex items-center gap-1 font-sans text-small font-medium text-warn-ink"
    >
      <WarningCircle
        weight="fill"
        className="size-4 shrink-0"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
