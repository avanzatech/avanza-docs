# Avanza Docs (docs.avanzatech.eu)

Scaffold for the client-facing documentation platform, spec'd for two products
(Avanza OS, Avanza Impulse) with a business-blueprint layer under OS.

## Stack
- Vite + React + TypeScript + Tailwind + Framer Motion (same as gentle-visual-verse marketing site)
- react-router-dom for routing
- Language persisted via localStorage, EN/ES throughout

## Run locally
```
npm install
npm run dev
```

## Structure
- `src/pages/Landing.tsx` — product picker (OS vs Impulse)
- `src/pages/BlueprintPicker.tsx` — business type picker (Restaurant / Grocery / Bakery / Hardware, only Restaurant active)
- `src/layouts/DocsLayout.tsx` — sidebar + search + breadcrumbs shell for docs pages
- `src/pages/DocsArticle.tsx` — placeholder article renderer (swap for MDX loader once content exists)
- `src/lib/navConfig.ts` — nav item lists per product, matches the spec's nav structure
- `src/lib/LanguageContext.tsx` — EN/ES state, persisted, drives all `t()` calls

## Design tokens (see tailwind.config.js / src/index.css)
- base-950/900/800 — near-black steel background (not pure black)
- os (#E8A33D, heat-lamp amber) — Avanza OS accent
- impulse (#5B8DEF, signal blue) — Avanza Impulse accent
- Fraunces (display) + Inter (body) + JetBrains Mono (labels/meta/ticket-tags)
- Signature element: `.ticket-tag` — small monospace eyebrow labels styled like an
  order-ticket line item (OS · 01, IMPULSE · 01), a nod to the restaurant-ticket
  rhythm the product is built around. Used sparingly — eyebrows and breadcrumbs only.

## Not yet built (next passes)
- Actual MDX content loading (DocsArticle is a placeholder — wire to `src/content/{lang}/{product}/*.mdx`)
- Global instant search (currently just filters the visible sidebar list)
- Ask Avanza integration hook
- Release Notes auto-generation from shipped features
- Article feedback widget, copy-link, print, table of contents
- Mobile sidebar (currently desktop-only; content area is responsive but nav drawer isn't built)
- Deploy: new Vercel project pointing at `docs.avanzatech.eu`, same pattern as the marketing site

## Update: retheme to match Avanza OS product (not marketing site)
Per the master implementation prompt, this now pulls tokens directly from
`App.jsx`'s `const C = {...}` palette rather than inventing a new design
language:
- bg #0A1A0F → #0D2214 gradient (dark forest green, not neutral black)
- gold #C9A84C (primary accent, buttons/active states) — Avanza OS
- blue #3B82F6 — used to differentiate Avanza Impulse without leaving the palette
- glass cards: rgba(14,38,22,0.65) + 16px blur + 10-22% gold border, exact match to App.jsx `.card` treatment
- DM Sans (display/body) + DM Mono (labels/mono), matching App.jsx exactly

Still open from the master prompt, not yet built:
- DNS/Vercel subdomain (your action — see chat for steps)
- Component reuse audit against actual App.jsx components (buttons, badges, toasts, skeletons) — this pass only matched color/type/glass tokens, not componentry
- Cross-linking between related articles
- Screenshot pipeline with annotations
- Search with keyboard shortcuts + highlighting
- Mobile sidebar drawer

## Update: architecture pass (documentation engine)
Per the "Final Architecture Pass" spec, before writing content pages:

- **Persistence**: `PreferencesProvider` (`src/lib/LanguageContext.tsx`) now stores product + blueprint + language together in one `localStorage` key. Returning users skip the landing screen entirely and land straight in their docs (`Landing.tsx` redirects on mount unless `?home=1` is present).
- **Product/Blueprint switcher**: always visible in the docs header (`ProductSwitcher.tsx`, `BlueprintSwitcher.tsx`) — no need to return to the homepage to switch. The "Avanza" breadcrumb link uses `/?home=1` specifically so it doesn't get redirect-looped by the returning-user logic.
- **Documentation engine contract**: `src/lib/contentSchema.ts` defines `ArticleMeta` (title, slug, category, product, blueprint, reading time, last updated, related slugs, keywords, search aliases, future AI summary) — this is the shape real MDX frontmatter should conform to once content is written.
- **Search**: `src/lib/contentSchema.ts` also holds a bilingual synonym map (invoice/factura, supplier/proveedor, kitchen/cocina, orders/pedidos, inventory/inventario, delivery/albarán) used by `GlobalSearch.tsx`, which searches across both products regardless of current UI language.
- **Rich content blocks**: `src/components/content/Blocks.tsx` — `Callout` (info/success/warning/tip/note), `StepCard`, `Checklist` (clickable), `Expandable`. `ArticleFooter.tsx` adds prev/next, copy link, print, and a thumbs up/down feedback control to every article.

Still not done: actual MDX loading (schema exists, loader doesn't — DocsArticle still renders a placeholder body using the Callout block as a demo), keyboard shortcut for search (⌘K is shown as a hint but not wired), related-articles rendering (relatedSlugs exists in the schema but nothing reads it yet), and the deeper "reuse actual App.jsx components" ask from the master prompt — this pass matched tokens/behavior, not componentry, since App.jsx has no exported component library to import from (single-file, all inline).
