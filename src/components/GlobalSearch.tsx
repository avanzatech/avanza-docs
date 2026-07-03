import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import { expandSearchTerms } from "../lib/contentSchema";
import { osRestaurantNav, impulseNav, type NavItem } from "../lib/navConfig";

type Result = NavItem & { product: "os" | "impulse" };

export default function GlobalSearch() {
  const { lang, t } = usePreferences();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results: Result[] = useMemo(() => {
    if (!query.trim()) return [];
    const terms = expandSearchTerms(query).length ? expandSearchTerms(query) : [query.toLowerCase()];
    const pool: Result[] = [
      ...osRestaurantNav.map((n) => ({ ...n, product: "os" as const })),
      ...impulseNav.map((n) => ({ ...n, product: "impulse" as const })),
    ];
    return pool.filter((item) => {
      const haystack = `${item.en} ${item.es} ${item.slug}`.toLowerCase();
      return terms.some((t) => haystack.includes(t)) || haystack.includes(query.toLowerCase());
    });
  }, [query]);

  const go = (r: Result) => {
    setOpen(false);
    setQuery("");
    const base = r.product === "os" ? `/docs/${lang}/os/restaurant` : `/docs/${lang}/impulse`;
    navigate(`${base}/${r.slug}`);
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={t("Search everything…  ⌘K", "Buscar todo…  ⌘K")}
        className="w-full rounded-lg border border-brd bg-bg2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-gold/40 focus:outline-none"
      />
      {open && results.length > 0 && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-brd bg-card shadow-xl">
            {results.map((r) => (
              <button
                key={`${r.product}-${r.slug}`}
                onClick={() => go(r)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-text-muted hover:bg-bg2/60 hover:text-text"
              >
                <span>{lang === "en" ? r.en : r.es}</span>
                <span className="font-mono text-[10px] uppercase text-text-dim">{r.product}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
