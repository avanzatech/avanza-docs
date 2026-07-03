// Every article is described by this metadata shape. Content itself lives in
// MDX (or, until MDX is wired, in DocsArticle's placeholder body) — this file
// defines the engine's contract so articles are never hardcoded pages.

export type Product = "os" | "impulse";
export type Blueprint = "restaurant" | "grocery" | "bakery" | "hardware";
export type Lang = "en" | "es";

export type ArticleMeta = {
  slug: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  category: string;
  product: Product;
  blueprint?: Blueprint; // only relevant for Avanza OS
  readingTimeMinutes: number;
  lastUpdated: string; // ISO date
  relatedSlugs: string[];
  keywords: string[]; // includes bilingual synonyms for search, e.g. ["invoice", "factura"]
  searchAliases?: string[];
  aiSummary?: string; // future Ask Avanza hook
};

// Bilingual synonym map used by search — restaurant/business terminology that
// a client might type in either language regardless of their UI language.
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  invoice: ["factura", "invoice"],
  factura: ["factura", "invoice"],
  supplier: ["proveedor", "supplier"],
  proveedor: ["proveedor", "supplier"],
  kitchen: ["cocina", "kitchen"],
  cocina: ["cocina", "kitchen"],
  orders: ["pedidos", "orders", "pedido"],
  pedidos: ["pedidos", "orders", "pedido"],
  inventory: ["inventario", "inventory", "productos"],
  inventario: ["inventario", "inventory", "productos"],
  delivery: ["entrega", "albaran", "albarán", "delivery"],
  albaran: ["entrega", "albaran", "albarán", "delivery"],
};

export function expandSearchTerms(query: string): string[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const direct = SEARCH_SYNONYMS[q];
  return direct ? [q, ...direct] : [q];
}
