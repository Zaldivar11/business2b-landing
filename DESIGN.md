# Business2B: sistema de diseño de la landing

## Mundo
"El mostrador que imprime". La barra de navegación es la boca de una impresora térmica; el ticket es el objeto protagonista. Las etiquetas de precio del POS (píldora marina con monto en mono) son el segundo motivo y marcan montos, categorías y tipos de negocio. Tema claro en toda la página (escena: dueño en su local, de día, en el celular); único bloque oscuro deliberado: la sección del video.

## Color (un solo acento)
| Token | Valor | Uso |
|---|---|---|
| `ground` | `#F5F7FA` | Fondo de página |
| `surface` | `#FFFFFF` | Tarjetas, formulario, papel del ticket |
| `ink` | `#0F172A` | Texto principal, etiquetas |
| `ink-soft` | `#475569` | Texto secundario |
| `line` | `#E2E8F0` | Bordes, separadores |
| `line-strong` | `#CBD5E1` | Borde de botón secundario y campos |
| `brand` | `#0B4A8B` | ÚNICO acento: botones principales, enlaces, pestaña activa |
| `brand-deep` | `#093D73` | Hover del principal |
| `sky` | `#0EA5E9` | Solo logo y anillo de foco |
| `night` | `#070D1A` | Solo bloque del video |
| `ok` | `#10B981` (texto `#047857`) | Solo "CUADRA" y confirmaciones |
| `warn` | `#F97316` (texto `#C2410C`) | Solo stock bajo y avisos |
| `whatsapp` | `#128C7E` | Excepción de marca de terceros: solo ícono y botón flotante de WhatsApp |

## Tipografía
Geist (texto) y Geist Mono (montos, SKU, etiquetas, ticket; cifras tabulares). Wordmark "Business2B" en Inter 900 como en el video. Escala (móvil / escritorio, px, tamaño/interlineado):
- display 40/44 · 64/64, 800, tracking -0.03em
- h2 30/36 · 44/48, 700
- h3 20/26 · 24/30, 600
- lead 18/28 · 20/30
- body 16/26 · 17/28 (mínimo 16)
- small 14/20, 500
- ticket 13/18 · 14/20 mono
- tag 14 · 15 mono 600
- Maquetas de la app (se dibujan a 1000 px y se escalan): mock-xs 11, mock-sm 12, mock-lg 18

## Espaciado y grid
Base 4: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (equivale a la escala de Tailwind 1, 2, 3, 4, 6, 8, 12, 16, 24, 32). Secciones: 64 móvil / 112 escritorio (`py-16` / `lg:py-28`). Grid 4 col (margen 20 = `px-5`, gap 16) / 8 / 12 col (máx 1200, gap 24). Todo asimétrico colapsa a una columna bajo 768 px.

## Forma
Botones y campos 12 px · tarjetas y marcos 16 px · etiquetas en píldora completa · ticket recto con borde dentado.

## Botones
Principal: fondo `brand`, texto blanco, 52 px móvil / 48 escritorio; hover `brand-deep`; activo baja 1 px y escala 0.98; foco anillo `sky` 3 px con separación 2 px; cargando conserva el ancho; deshabilitado `#94A3B8`. Secundario: blanco, borde 1.5 px `line-strong`, texto `ink`. Etiquetas de botón nunca en dos líneas.

## Tarjetas
Blanco, borde 1 px `line`, sombra con tinte marino y desplazamiento (nunca negra ni halo). Solo donde hay elevación real.

## Movimiento
Un momento firmado: el ticket se imprime una vez al cargar (0.9 s, salida exponencial). Además: fundido entre módulos, reimpresión del ticket al escribir el nombre del negocio, acordeón. Nada en bucle. `prefers-reduced-motion` deja todo estático.

## Prohibido en esta página
Eyebrows sobre títulos, números de sección, texto con degradado, halos, tarjetas iguales como estructura, em-dash.
