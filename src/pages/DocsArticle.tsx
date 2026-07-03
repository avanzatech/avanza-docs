import { useParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import DocsLayout from "../layouts/DocsLayout";
import { osRestaurantNav, impulseNav, kitchenPortalNav } from "../lib/navConfig";
import ArticleFooter from "../components/content/ArticleFooter";
import { Callout } from "../components/content/Blocks";
import { osArticles } from "../content/osArticles";
import { kitchenArticles } from "../content/kitchenArticles";

type Section = "os" | "impulse" | "kitchen";
type Props = { product: "os" | "impulse"; section?: Section };

const sectionConfig = {
  os: { nav: osRestaurantNav, product: "os" as const },
  impulse: { nav: impulseNav, product: "impulse" as const },
  kitchen: { nav: kitchenPortalNav, product: "os" as const },
};

export default function DocsArticle({ product, section }: Props) {
  const { slug } = useParams();
  const { lang, t } = usePreferences();
  const sec = section ?? product;
  const cfg = sectionConfig[sec];
  const nav = cfg.nav;
  const item = nav.find((n) => n.slug === slug);
  const title = item ? (lang === "en" ? item.en : item.es) : slug;

  const base =
    sec === "kitchen"
      ? `/docs/${lang}/os/restaurant/kitchen-portal`
      : sec === "os"
      ? `/docs/${lang}/os/restaurant`
      : `/docs/${lang}/impulse`;

  const realContent =
    sec === "os" && slug ? osArticles[slug] : sec === "kitchen" && slug ? kitchenArticles[slug] : undefined;

  return (
    <DocsLayout product={cfg.product} section={sec === "kitchen" ? "kitchen" : undefined}>
      <article>
        <div className="mb-6 flex items-center gap-3 font-mono text-xs text-text-dim">
          <span>{t("4 min read", "4 min de lectura")}</span>
          <span>·</span>
          <span>{t("Updated Jul 2026", "Actualizado jul. 2026")}</span>
        </div>
        <h1 className="mb-6 font-display text-3xl font-semibold text-text">{title}</h1>

        {sec === "kitchen" && (
          <Callout type="info" title={t("A separate mini-app", "Una mini-app aparte")}>
            {t(
              "Kitchen Portal opens from a link with a restaurant-specific token — kitchen staff never log in. It's built for a phone screen on a counter during service, not a desk.",
              "El Portal de Cocina se abre desde un enlace con un token específico del restaurante — el personal de cocina nunca inicia sesión. Está pensado para un móvil en la barra durante el servicio, no para un escritorio."
            )}
          </Callout>
        )}

        {realContent ? (
          <div className="flex flex-col gap-1 text-sm leading-relaxed text-text-muted [&_p]:mb-3">
            {lang === "en" ? realContent.en : realContent.es}
          </div>
        ) : (
          <Callout type="note" title={t("Not written yet", "Aún no escrito")}>
            {t(
              "This article's content hasn't been authored — this is the documentation engine's placeholder. Real articles load from metadata (title, category, product, blueprint, reading time, related articles, keywords) rather than being hardcoded pages.",
              "El contenido de este artículo aún no se ha redactado — este es el marcador de posición del motor de documentación. Los artículos reales se cargan desde metadatos (título, categoría, producto, blueprint, tiempo de lectura, artículos relacionados, palabras clave) en lugar de ser páginas fijas."
            )}
          </Callout>
        )}
      </article>

      <ArticleFooter nav={nav} currentSlug={slug ?? ""} base={base} />
    </DocsLayout>
  );
}
