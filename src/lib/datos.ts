// Datos de ejemplo de un negocio ficticio. Ninguno corresponde a personas o empresas reales.

export const NEGOCIO = {
  nombre: "Ferretería El Progreso",
  iniciales: "EP",
  direccion: "Barrio Guamilito, 6 Ave. N.O.",
  ciudad: "San Pedro Sula, Cortés",
  telefono: "2550-0000",
  rtn: "0501-1990-000000",
};

export type Producto = {
  sku: string;
  nombre: string;
  categoria: string;
  costo: number;
  precio: number;
  stock: number;
  minimo: number;
  unidad: string;
};

export const PRODUCTOS: Producto[] = [
  { sku: "EP-0101", nombre: "Cemento gris 42.5 kg", categoria: "Construcción", costo: 212.4, precio: 245, stock: 86, minimo: 20, unidad: "Bolsa" },
  { sku: "EP-0102", nombre: "Varilla de hierro 3/8\" × 6 m", categoria: "Construcción", costo: 117.25, precio: 138, stock: 240, minimo: 50, unidad: "Unidad" },
  { sku: "EP-0215", nombre: "Lámina de zinc cal. 28, 12'", categoria: "Techos", costo: 268, precio: 312.5, stock: 4, minimo: 15, unidad: "Unidad" },
  { sku: "EP-0330", nombre: "Tubo PVC 1/2\" × 6 m", categoria: "Fontanería", costo: 48.9, precio: 62, stock: 130, minimo: 30, unidad: "Unidad" },
  { sku: "EP-0412", nombre: "Pintura látex blanco, galón", categoria: "Pinturas", costo: 301.75, precio: 385, stock: 22, minimo: 8, unidad: "Galón" },
  { sku: "EP-0108", nombre: "Clavo de 3\"", categoria: "Construcción", costo: 19.6, precio: 28, stock: 310, minimo: 60, unidad: "Libra" },
  { sku: "EP-0520", nombre: "Martillo de uña 16 oz", categoria: "Herramientas", costo: 176.4, precio: 245, stock: 3, minimo: 6, unidad: "Unidad" },
  { sku: "EP-0612", nombre: "Cable THHN #12", categoria: "Electricidad", costo: 12.85, precio: 18, stock: 820, minimo: 200, unidad: "Metro" },
  { sku: "EP-0109", nombre: "Bloque de concreto 15 cm", categoria: "Construcción", costo: 13.2, precio: 17.5, stock: 1450, minimo: 300, unidad: "Unidad" },
  { sku: "EP-0110", nombre: "Alambre de amarre", categoria: "Construcción", costo: 23.5, precio: 32, stock: 96, minimo: 25, unidad: "Libra" },
];

export const porSku = (sku: string) => PRODUCTOS.find((p) => p.sku === sku)!;

// Carrito del POS: Constructora Valle de Sula.
export const CARRITO = [
  { sku: "EP-0101", cantidad: 10 },
  { sku: "EP-0102", cantidad: 12 },
  { sku: "EP-0108", cantidad: 5 },
  { sku: "EP-0110", cantidad: 4 },
];

// Ticket de la sección "Su marca".
export const TICKET_VENTA = [
  { sku: "EP-0101", cantidad: 2 },
  { sku: "EP-0108", cantidad: 5 },
  { sku: "EP-0330", cantidad: 3 },
];

// ISV del 15 % incluido en el precio (Honduras).
export function desglose(total: number) {
  const neto = Math.round((total / 1.15) * 100) / 100;
  const isv = Math.round((total - neto) * 100) / 100;
  return { neto, isv, total };
}

export const lempiras = (n: number) =>
  "L." + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const entero = (n: number) => n.toLocaleString("en-US");

// Corte del día. Efectivo + tarjeta + transferencias = ventas del día.
export const CORTE = {
  ventas: 18437.5,
  transacciones: 46,
  efectivo: 14215.5,
  tarjeta: 3180,
  transferencias: 1042,
  abonos: 2150,
  porCobrar: 86420,
  productos: 1284,
  stockBajo: 9,
};

// Ventas diarias de los últimos 30 días (domingos con medio día de atención).
export const VENTAS_30 = [
  16240.5, 17890, 15320.75, 19410, 21385.25, 9120, 17055.5, 16780, 18240.25, 17305, 20110.5, 22460, 9845.75,
  16930, 18110.25, 15785, 19960.5, 21240, 23015.75, 10230, 17420.5, 16995, 18805.25, 17650, 20870.5, 22130,
  9980.25, 17240, 17255, 18437.5,
];

export const CATEGORIAS = [
  { nombre: "Construcción", valor: 34 },
  { nombre: "Herramientas", valor: 21 },
  { nombre: "Electricidad", valor: 18 },
  { nombre: "Fontanería", valor: 15 },
  { nombre: "Pinturas", valor: 12 },
];

export const MENU_APP = [
  "Dashboard",
  "Ventas",
  "Cajas",
  "Inventario",
  "Compras",
  "Clientes",
  "Créditos",
  "Reportes",
  "Configuración",
] as const;

// Estado de cuenta de Constructora Valle de Sula: el saldo final es L.18,640.00.
export const CLIENTE_CREDITO = {
  nombre: "Constructora Valle de Sula",
  rtn: "0501-2015-000000",
  limite: 50000,
};

export const MOVIMIENTOS_CREDITO = [
  { fecha: "02/09", doc: "VNT-0981", detalle: "Venta al crédito", cargo: 12450, abono: 0 },
  { fecha: "10/09", doc: "ABN-0112", detalle: "Abono en efectivo", cargo: 0, abono: 4000 },
  { fecha: "19/09", doc: "VNT-1012", detalle: "Venta al crédito", cargo: 9870, abono: 0 },
  { fecha: "26/09", doc: "ABN-0127", detalle: "Abono por transferencia", cargo: 0, abono: 3500 },
  { fecha: "03/10", doc: "VNT-1031", detalle: "Venta al crédito", cargo: 5820, abono: 0 },
  { fecha: "07/10", doc: "ABN-0139", detalle: "Abono en efectivo", cargo: 0, abono: 2000 },
];

export const OTROS_CREDITOS = [
  { nombre: "Taller Hermanos Ordóñez", saldo: 6872, limite: 15000 },
  { nombre: "Wilmer Antonio Banegas", saldo: 2315.5, limite: 8000 },
  { nombre: "Dilcia Yamileth Paz", saldo: 0, limite: 5000 },
];

export const USUARIOS = [
  { nombre: "Marta Lucía Reyes", usuario: "marta.reyes", rol: "Administrador", iniciales: "MR" },
  { nombre: "Luis Fernando Castro", usuario: "luis.castro", rol: "Cajero", iniciales: "LC" },
  { nombre: "Ana Gabriela Romero", usuario: "ana.romero", rol: "Cajero", iniciales: "AR" },
  { nombre: "José David Turcios", usuario: "jose.turcios", rol: "Inventarista", iniciales: "JT" },
] as const;
