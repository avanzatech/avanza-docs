export type NavItem = { slug: string; en: string; es: string; group?: string; kitchen?: boolean; keywords?: string[] };

// Mirrors the actual client-facing structure in App.jsx, not the original
// planning spec — confirmed by reading the bottom-nav array, OverflowMenu,
// and each tab's real sub-structure directly in the source.
//
// Real bottom nav (5 tabs): Sales, Avanza (chat), Documentos, Productos, Pedidos
// Kitchen Portal is part of the same restaurant experience — a grouped
// sub-section within this one nav, not a separate mode (kitchen: true marks
// pages that render the login-free portal styling and content).
//
// keywords: bilingual concept terms a user might search for, so the search bar
// surfaces the right page by topic (e.g. "IVA", "lot number") not just title.
export const osRestaurantNav: NavItem[] = [
  { slug: "getting-started", en: "Getting Started", es: "Primeros Pasos", keywords: ["start", "empezar", "overview", "resumen", "dashboard", "panel", "tabs", "pestañas", "first", "primeros"] },
  { slug: "sales", en: "Sales", es: "Ventas", keywords: ["revenue", "facturación", "margin", "margen", "profit", "beneficio", "takings", "recaudación", "daily", "diario", "ticket"] },
  { slug: "avanza-chat", en: "Avanza (AI Assistant)", es: "Avanza (Asistente IA)", keywords: ["ai", "ia", "assistant", "asistente", "chat", "ask", "preguntar", "supplier mapping", "create product", "crear producto", "decisions", "decisiones", "analysis", "análisis"] },
  { slug: "documentos", en: "Documents (Albaranes & Facturas)", es: "Documentos (Albaranes y Facturas)", keywords: ["invoice", "factura", "albaran", "albarán", "delivery note", "export", "exportar", "iva", "vat", "tax", "impuestos", "gestoria", "gestoría", "xlsx", "excel", "date range", "rango de fechas", "download", "descargar"] },
  { slug: "productos", en: "Products", es: "Productos", keywords: ["inventory", "inventario", "stock", "beverages", "bebidas", "drinks", "threshold", "umbral", "reorder", "reponer", "checkpoint"] },
  { slug: "pedidos", en: "Orders & Suppliers", es: "Pedidos y Proveedores", keywords: ["order", "pedido", "supplier", "proveedor", "draft", "borrador", "approve", "aprobar", "whatsapp", "email", "reorder"] },
  { slug: "kitchen-home", en: "Overview", es: "Resumen", group: "Kitchen Portal", kitchen: true, keywords: ["kitchen", "cocina", "portal", "home", "inicio", "status", "estado", "token", "tablet", "staff", "personal"] },
  { slug: "kitchen-board", en: "Board", es: "Tablero", group: "Kitchen Portal", kitchen: true, keywords: ["kitchen", "cocina", "dishes", "platos", "stock", "board", "tablero", "food", "comida", "tracking"] },
  { slug: "kitchen-appcc", en: "APPCC", es: "APPCC", group: "Kitchen Portal", kitchen: true, keywords: ["appcc", "haccp", "lot", "lote", "batch", "expiry", "caducidad", "traceability", "trazabilidad", "temperature", "temperatura", "reception", "recepción", "scan", "escanear", "barcode", "gs1", "food safety", "seguridad alimentaria", "no_lote"] },
  { slug: "kitchen-pedidos", en: "Orders", es: "Pedidos", group: "Kitchen Portal", kitchen: true, keywords: ["kitchen", "cocina", "order", "pedido", "request", "solicitar", "supplier", "proveedor", "staff", "draft"] },
  { slug: "kitchen-notas", en: "Notes", es: "Notas", group: "Kitchen Portal", kitchen: true, keywords: ["kitchen", "cocina", "notes", "notas", "chat", "photo", "foto", "message", "mensaje", "agenda", "calendar", "calendario", "booking", "reserva", "webhook", "events", "eventos"] },
  { slug: "support", en: "Support", es: "Soporte", group: "Help", keywords: ["support", "soporte", "help", "ayuda", "contact", "contacto", "ticket", "problem", "problema"] },
  { slug: "release-notes", en: "Release Notes", es: "Notas de Versión", group: "Help", keywords: ["release", "version", "versión", "updates", "actualizaciones", "changelog", "new", "nuevo"] },
  { slug: "faq", en: "FAQ", es: "Preguntas Frecuentes", group: "Help", keywords: ["faq", "questions", "preguntas", "frequent", "frecuentes", "help", "ayuda"] },
];

// Bilingual labels for the sidebar group headers.
export const groupLabels: Record<string, { en: string; es: string }> = {
  "Kitchen Portal": { en: "Kitchen Portal", es: "Portal de Cocina" },
  Help: { en: "Help", es: "Ayuda" },
};

// Kept for any legacy references; the kitchen pages now live inside
// osRestaurantNav as a grouped sub-section.
export const kitchenPortalNav: NavItem[] = osRestaurantNav.filter((n) => n.kitchen);

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
