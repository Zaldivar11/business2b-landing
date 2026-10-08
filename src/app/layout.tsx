import type { Metadata, Viewport } from "next";
import { Caveat, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Solo para el nombre "Business2B", igual que en el video promocional.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: "900" });
// Solo para la letra a mano del cuaderno de fiados (sección del problema).
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Business2B · Inventario, ventas, facturas y créditos en un solo sistema",
  description:
    "Business2B reemplaza el cuaderno, el Excel y los programas sueltos de su negocio. Inventario con códigos de barras, ventas, facturación, créditos y reportes. Solicite una demo.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${caveat.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Activa las animaciones de revelado solo si hay JavaScript; sin él, todo se ve. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
