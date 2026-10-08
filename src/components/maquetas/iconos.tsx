import { Drop, Hammer, House, Lightning, PaintBrushBroad, Cube } from "@phosphor-icons/react/dist/ssr";

const POR_CATEGORIA = {
  Construcción: Cube,
  Techos: House,
  Fontanería: Drop,
  Pinturas: PaintBrushBroad,
  Herramientas: Hammer,
  Electricidad: Lightning,
} as const;

// Productos sin foto: la app real muestra un ícono en su lugar; aquí uno por categoría.
export function IconoCategoria({ categoria, className }: { categoria: string; className?: string }) {
  const Icono = POR_CATEGORIA[categoria as keyof typeof POR_CATEGORIA] ?? Cube;
  return <Icono className={className} weight="duotone" aria-hidden="true" />;
}
