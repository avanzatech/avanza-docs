import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import { expandSearchTerms } from "../lib/contentSchema";
import { osRestaurantNav, impulseNav, kitchenPortalNav, type NavItem } from "../lib/navConfig";

type Product = "os" | "impulse" | "kitchen";
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
    const terms = expandSearchTerms(query).length ? expandSearchTerms(query) : [query.toLowerCase()];
    const pool: Result[] = [
      ...osRestaurantNav.map((n) => ({ ...n, product: "os" as const })),
      ...kitchenPortalNav.map((n) => ({ ...n, product: "kitchen" as const })),
      ...impulseNav.map((n) => ({ ...n, product: "impulse" as const })),
    ];
    return pool.filter((item) => {
      const haystack = `${item.en} ${item.es} ${item.slug}`.toLowerCase();
      return terms.some((t) => haystack.includes(t)) || haystack.includes(query.toLowerCase());
    });
  }, [query]);

  useEffect(() => setHighlight(0), [query]);

  const go = (r: Result) => {
    setOpen(false);
    setQuery("");
    const base =
      r.product === "kitchen"
        ? `/docs/${lang}/os/restaurant/kitchen-portal`
        : r.product === "os"
        ? `/docs/${lang}/os/restaurant`
        : `/docs/${lang}/impulse`;
    navigate(`${base}/${r.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => (h + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => (h - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); go(results[highlight]); }
  };

  const productLabel = { os: "OS", kitchen: "Kitchen", impulse: "Impulse" };

  return (
    <div className="relative w-full max-w-sm">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={t("Search everything…  ⌘K", "Buscar todo…  ⌘K")}
        className="w-full rounded-lg border border-brd bg-bg2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-gold/40 focus:outline-none"
      />
      {open && results.length > 0 && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-brd bg-card shadow-xl">
            {results.map((r, i) => (
              <button
                key={`${r.product}-${r.slug}`}
                onClick={() => go(r)}
                onMouseEnter={() => setHighlight(i)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                  i === highlight ? "bg-bg2 text-text" : "text-text-muted"
                }`}
              >
                <span>{lang === "en" ? r.en : r.es}</span>
                <span className="font-mono text-[10px] uppercase text-text-dim">{productLabel[r.product]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
