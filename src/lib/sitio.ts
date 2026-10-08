// Configuración del sitio. Cambie aquí el número de WhatsApp y se actualiza en toda la página.

// Código de país + número, solo dígitos (Honduras, 9308-8183).
export const WHATSAPP_NUMERO = "50493088183";
export const WHATSAPP_VISIBLE = "+504 9308-8183";

export const CORREO = "kzaldivar83@gmail.com";

// Prefijo de la página cuando se publica en una subcarpeta (GitHub Pages: /business2b-landing).
// Next lo aplica solo a sus propios archivos; los de /public se prefijan a mano con `ruta()`.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const ruta = (p: string) => `${BASE_PATH}${p}`;

export const MENSAJE_FLOTANTE = "Hola, quiero una demo de Business2B";

export function enlaceWhatsApp(mensaje: string = MENSAJE_FLOTANTE) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export const NAV = [
  { href: "#modulos", label: "Módulos" },
  { href: "#marca", label: "Su marca" },
  { href: "#empezar", label: "Cómo empezar" },
  { href: "#preguntas", label: "Preguntas" },
];

export const TIPOS_NEGOCIO = [
  "Ferretería",
  "Repuestos y accesorios",
  "Tienda o abarrotería",
  "Distribuidora",
  "Materiales de construcción",
  "Agroveterinaria",
  "Otro",
];
