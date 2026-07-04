import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import { expandSearchTerms } from "../lib/contentSchema";
import { osRestaurantNav, impulseNav, type NavItem } from "../lib/navConfig";

type Product = "os" | "impulse";
type Result = NavItem & { product: Product };

export default function GlobalSearch() {
  const { lang, t } = usePreferences();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses search from anywhere on the page — matches the
  // convention set by Stripe, Linear, Vercel docs.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results: Result[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const terms = expandSearchTerms(query).length ? expandSearchTerms(query) : [q];
    const pool: Result[] = [
      ...osRestaurantNav.map((n) => ({ ...n, product: "os" as const })),
      ...impulseNav.map((n) => ({ ...n, product: "impulse" as const })),
    ];
    // Match against title AND the page's concept keywords, so searching e.g.
    // "IVA", "lot number" or "booking form" finds the right page — not just
    // exact title words.
    return pool.filter((item) => {
      const haystack = `${item.en} ${item.es} ${item.slug} ${(item.keywords || []).join(" ")}`.toLowerCase();
      return terms.some((term) => haystack.includes(term)) || haystack.includes(q);
    });
  }, [query]);

  useEffect(() => setHighlight(0), [query]);

  const go = (r: Result) => {
    setOpen(false);
    setQuery("");
    // Unified routing: kitchen pages live inside the restaurant nav now, so all
    // OS pages (kitchen included) share one base path.
    const base = r.product === "os" ? `/docs/${lang}/os/restaurant` : `/docs/${lang}/impulse`;
    navigate(`${base}/${r.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => (h + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => (h - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); go(results[highlight]); }
  };

  const tag = (r: Result) => (r.kitchen ? (lang === "en" ? "Kitchen" : "Cocina") : r.product === "impulse" ? "Impulse" : "OS");

  return (
    <div className="relative w-full max-w-sm">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={t("Search docs…  ⌘K", "Buscar…  ⌘K")}
        className="w-full rounded-lg border border-brd bg-bg2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-gold/40 focus:outline-none"
      />
      {open && query.trim() && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-brd bg-card shadow-xl">
            {results.length > 0 ? (
              results.map((r, i) => (
                <button
                  key={`${r.product}-${r.slug}`}
                  onClick={() => go(r)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                    i === highlight ? "bg-bg2 text-text" : "text-text-muted"
                  }`}
                >
                  <span>{lang === "en" ? r.en : r.es}</span>
                  <span className={`font-mono text-[10px] uppercase ${r.kitchen ? "text-green" : "text-text-dim"}`}>{tag(r)}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-text-dim">
                {t("No results — try a topic like \"IVA\" or \"lot\"", "Sin resultados — prueba un tema como \"IVA\" o \"lote\"")}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
