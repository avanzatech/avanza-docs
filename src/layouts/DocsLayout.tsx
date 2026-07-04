import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import GlobalSearch from "../components/GlobalSearch";
import watermarkStamp from "../assets/watermark-stamp.png";
import watermarkTilePrint from "../assets/watermark-tile-print.png";
import { osRestaurantNav, impulseNav, groupLabels, type NavItem } from "../lib/navConfig";

type Props = {
  product: "os" | "impulse";
  children: React.ReactNode;
};

export default function DocsLayout({ product, children }: Props) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const nav: NavItem[] = product === "os" ? osRestaurantNav : impulseNav;
  const base = product === "os" ? `/docs/${lang}/os/restaurant` : `/docs/${lang}/impulse`;
  const productLabel = product === "os" ? "Avanza OS" : "Avanza Impulse";
  const accentClass = product === "os" ? "border-gold" : "border-blue";

  const filtered = query
    ? nav.filter((n) => (lang === "en" ? n.en : n.es).toLowerCase().includes(query.toLowerCase()))
    : nav;

  const navList = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-0.5 px-2 pb-8">
      {filtered.map((item, i) => {
        const active = slug === item.slug;
        const prevGroup = i > 0 ? filtered[i - 1].group : undefined;
        const showGroupHeader = item.group && item.group !== prevGroup && !collapsed && !query;
        const groupLabel = item.group ? groupLabels[item.group]?.[lang === "en" ? "en" : "es"] ?? item.group : "";
        return (
          <div key={item.slug}>
            {showGroupHeader && (
              <div className="mb-1 mt-4 flex items-center gap-2 px-3">
                {item.kitchen && <span className="h-1.5 w-1.5 rounded-full bg-green" />}
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-dim">
                  {groupLabel}
                </span>
              </div>
            )}
            <Link
              to={`${base}/${item.slug}`}
              onClick={onNavigate}
              className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                active ? `bg-bg2 text-text border-l-2 ${item.kitchen ? "border-green" : accentClass}` : "text-text-muted hover:bg-bg2/60 hover:text-text"
              } ${item.group && !collapsed ? "pl-5" : ""} ${collapsed ? "text-center text-xs" : ""}`}
            >
              {collapsed ? (lang === "en" ? item.en : item.es).slice(0, 2) : lang === "en" ? item.en : item.es}
            </Link>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-bg">
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 border-r border-brd bg-card transition-all md:block ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && (
            <button onClick={() => navigate("/?home=1")} className="flex items-center gap-2">
              <span className="font-display text-base font-semibold text-gold-up">Avanza</span>
              <span className="text-xs font-medium text-text-muted">{productLabel === "Avanza OS" ? "OS" : "Impulse"}</span>
            </button>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="rounded p-1 text-text-dim hover:bg-bg2 hover:text-text"
            aria-label="Collapse sidebar"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 pb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search docs…", "Buscar en la documentación…")}
              className="w-full rounded-lg border border-brd bg-bg2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-gold/40 focus:outline-none"
            />
          </div>
        )}

        {navList()}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 h-full w-72 max-w-[82vw] overflow-y-auto border-r border-brd bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-5">
              <button onClick={() => navigate("/?home=1")} className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-gold-up">Avanza</span>
                <span className="text-xs font-medium text-text-muted">{productLabel === "Avanza OS" ? "OS" : "Impulse"}</span>
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded p-1 text-text-dim hover:bg-bg2 hover:text-text"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="px-4 pb-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Search docs…", "Buscar en la documentación…")}
                className="w-full rounded-lg border border-brd bg-bg2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-gold/40 focus:outline-none"
              />
            </div>
            {navList(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="glass-navbar sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 md:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded p-1 text-text-muted hover:bg-bg2 hover:text-text md:hidden"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="min-w-0 flex-1 truncate font-mono text-xs text-text-dim">
            <Link to="/?home=1" className="hover:text-text">Avanza</Link>
            {" / "}
            <Link to={product === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse`} className="hover:text-text">
              {productLabel}
            </Link>
            {slug && (
              <span className="hidden sm:inline">
                {" / "}
                <span className="text-text-muted">{slug}</span>
              </span>
            )}
          </div>
          <div className="hidden md:block md:w-72">
            <GlobalSearch />
          </div>
          <LanguageSwitcher />
        </header>
        <main className="relative flex-1">
          {/* Faint repeating logo watermark — sits behind the content as a
              subtle brand stamp; pointer-events-none so it never interferes. */}
          {/* A few large, well-spaced logo stamps down the page rather than a
              dense repeating grid — reads as an intentional brand mark, not a
              busy pattern. Alternating sides, generous vertical gaps. */}
          <div aria-hidden className="doc-watermark-screen pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {[
              { top: "4%", side: "left", off: "-3%" },
              { top: "26%", side: "right", off: "-4%" },
              { top: "50%", side: "left", off: "2%" },
              { top: "72%", side: "right", off: "-3%" },
              { top: "92%", side: "left", off: "-2%" },
            ].map((m, i) => (
              <img
                key={i}
                src={watermarkStamp}
                alt=""
                className="absolute w-[300px] max-w-[60vw]"
                style={{
                  top: m.top,
                  [m.side]: m.off,
                  opacity: 0.06,
                }}
              />
            ))}
          </div>
          <div
            aria-hidden
            className="doc-watermark-print pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${watermarkTilePrint})`,
              backgroundRepeat: "repeat",
              backgroundSize: "280px auto",
            }}
          />
          <div className="relative z-[1] mx-auto w-full max-w-3xl px-6 py-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
