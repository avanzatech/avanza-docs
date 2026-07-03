export type NavItem = { slug: string; en: string; es: string };

// Mirrors the actual client-facing structure in App.jsx, not the original
// planning spec — confirmed by reading the bottom-nav array, OverflowMenu,
// and each tab's real sub-structure directly in the source.
//
// Real bottom nav (5 tabs): Sales, Avanza (chat), Documentos, Productos, Pedidos
// Pedidos has two internal views: Pedidos / Proveedores (not separate nav items)
// Kitchen Portal is a separate token-based mini-app (own nav below)
export const osRestaurantNav: NavItem[] = [
  { slug: "getting-started", en: "Getting Started", es: "Primeros Pasos" },
  { slug: "sales", en: "Sales", es: "Ventas" },
  { slug: "avanza-chat", en: "Avanza (AI Assistant)", es: "Avanza (Asistente IA)" },
  { slug: "documentos", en: "Documents (Albaranes & Facturas)", es: "Documentos (Albaranes y Facturas)" },
  { slug: "productos", en: "Products", es: "Productos" },
  { slug: "pedidos", en: "Orders & Suppliers", es: "Pedidos y Proveedores" },
  { slug: "kitchen-portal", en: "Kitchen Portal", es: "Portal de Cocina" },
  { slug: "support", en: "Support", es: "Soporte" },
  { slug: "release-notes", en: "Release Notes", es: "Notas de Versión" },
  { slug: "faq", en: "FAQ", es: "Preguntas Frecuentes" },
];

// Kitchen Portal's own 5-tab structure — separate from the main nav above
// since it's a distinct no-login mini-app with its own visual variant.
export const kitchenPortalNav: NavItem[] = [
  { slug: "kitchen-home", en: "Home", es: "Inicio" },
  { slug: "kitchen-board", en: "Board", es: "Tablero" },
  { slug: "kitchen-appcc", en: "APPCC", es: "APPCC" },
  { slug: "kitchen-pedidos", en: "Orders", es: "Pedidos" },
  { slug: "kitchen-notas", en: "Notes", es: "Notas" },
];

// Avanza Impulse nav is unchanged for now — no Impulse frontend source
// exists yet to ground this against, unlike OS. Flagged as an open item.
export const impulseNav: NavItem[] = [
  { slug: "getting-started", en: "Getting Started", es: "Primeros Pasos" },
  { slug: "connect-business", en: "Connect Business", es: "Conectar Negocio" },
  { slug: "campaigns", en: "Campaigns", es: "Campañas" },
  { slug: "content-calendar", en: "Content Calendar", es: "Calendario de Contenido" },
  { slug: "social-media", en: "Social Media", es: "Redes Sociales" },
  { slug: "google-business", en: "Google Business", es: "Google Business" },
  { slug: "reviews", en: "Reviews", es: "Reseñas" },
  { slug: "seo", en: "SEO", es: "SEO" },
  { slug: "analytics", en: "Analytics", es: "Analítica" },
  { slug: "ai-assistant", en: "AI Assistant", es: "Asistente IA" },
  { slug: "reports", en: "Reports", es: "Informes" },
  { slug: "settings", en: "Settings", es: "Ajustes" },
  { slug: "release-notes", en: "Release Notes", es: "Notas de Versión" },
  { slug: "faq", en: "FAQ", es: "Preguntas Frecuentes" },
];
