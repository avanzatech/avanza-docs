import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import GlobalSearch from "../components/GlobalSearch";
import { osRestaurantNav, impulseNav, kitchenPortalNav, type NavItem } from "../lib/navConfig";

type Props = {
  product: "os" | "impulse";
  section?: "kitchen";
  children: React.ReactNode;
};

export default function DocsLayout({ product, section, children }: Props) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const nav: NavItem[] = section === "kitchen" ? kitchenPortalNav : product === "os" ? osRestaurantNav : impulseNav;
  const base =
    section === "kitchen"
      ? `/docs/${lang}/os/restaurant/kitchen-portal`
      : product === "os"
      ? `/docs/${lang}/os/restaurant`
      : `/docs/${lang}/impulse`;
  const productLabel = section === "kitchen" ? "Kitchen Portal" : product === "os" ? "Avanza OS" : "Avanza Impulse";
  const accentClass = section === "kitchen" ? "border-green" : product === "os" ? "border-gold" : "border-blue";

  const filtered = query
    ? nav.filter((n) => (lang === "en" ? n.en : n.es).toLowerCase().includes(query.toLowerCase()))
    : nav;

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
              <span className="text-xs font-medium text-text-muted">{section === "kitchen" ? "Kitchen" : productLabel === "Avanza OS" ? "OS" : "Impulse"}</span>
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
        {section === "kitchen" && !collapsed && (
          <div className="mx-4 mb-3 rounded-md border border-green/20 bg-green/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wide text-green">
            {t("No login required", "No requiere inicio de sesión")}
          </div>
        )}

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

        <nav className="flex flex-col gap-0.5 px-2 pb-8">
          {filtered.map((item) => {
            const active = slug === item.slug;
            return (
              <Link
                key={item.slug}
                to={`${base}/${item.slug}`}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active ? `bg-bg2 text-text border-l-2 ${accentClass}` : "text-text-muted hover:bg-bg2/60 hover:text-text"
                } ${collapsed ? "text-center text-xs" : ""}`}
              >
                {collapsed ? (lang === "en" ? item.en : item.es).slice(0, 2) : lang === "en" ? item.en : item.es}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="glass-navbar sticky top-0 z-10 flex items-center justify-between px-6 py-3">
          <div className="font-mono text-xs text-text-dim">
            <Link to="/?home=1" className="hover:text-text">Avanza</Link>
            {" / "}
            <Link to={section === "kitchen" ? `${base}/kitchen-home` : product === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse`} className="hover:text-text">
              {productLabel}
            </Link>
            {slug && (
              <>
                {" / "}
                <span className="text-text-muted">{slug}</span>
              </>
            )}
          </div>
          <div className="hidden md:block md:w-72">
            <GlobalSearch />
          </div>
          <LanguageSwitcher />
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
      </div>
    </div>
  );
}
