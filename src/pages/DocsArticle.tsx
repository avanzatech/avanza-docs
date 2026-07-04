import { useParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import DocsLayout from "../layouts/DocsLayout";
import { osRestaurantNav, impulseNav } from "../lib/navConfig";
import ArticleFooter from "../components/content/ArticleFooter";
import { Callout } from "../components/content/Blocks";
import { osArticles } from "../content/osArticles";
import { kitchenArticles } from "../content/kitchenArticles";

type Section = "os" | "impulse" | "kitchen";
type Props = { product: "os" | "impulse"; section?: Section };

export default function DocsArticle({ product, section }: Props) {
  const { slug } = useParams();
  const { lang, t } = usePreferences();
  // Kitchen pages now live inside the restaurant experience — one nav, no
  // separate mode. A page is "kitchen" if its nav entry is flagged, so the
  // sidebar and back-navigation never swap out from under the reader.
  const sec = section ?? product;
  const nav = sec === "impulse" ? impulseNav : osRestaurantNav;
  const item = nav.find((n) => n.slug === slug);
  const isKitchen = !!item?.kitchen;
  const title = item ? (lang === "en" ? item.en : item.es) : slug;

  const base = sec === "impulse" ? `/docs/${lang}/impulse` : `/docs/${lang}/os/restaurant`;

  const realContent =
    sec === "impulse"
      ? undefined
      : slug
      ? isKitchen
        ? kitchenArticles[slug]
        : osArticles[slug]
      : undefined;

  return (
    <DocsLayout product={sec === "impulse" ? "impulse" : "os"}>
      <article>
        <div className="mb-6 flex items-center gap-3 font-mono text-xs text-text-dim">
          <span>{t("4 min read", "4 min de lectura")}</span>
          <span>·</span>
          <span>{t("Updated Jul 2026", "Actualizado jul. 2026")}</span>
        </div>
        <h1 className="mb-6 font-display text-3xl font-semibold text-text">{title}</h1>

        {isKitchen && (
          <Callout type="info" title={t("Part of Kitchen Portal", "Parte del Portal de Cocina")}>
            {t(
              "Kitchen Portal opens from a link with a restaurant-specific token — kitchen staff never log in. It's built for a phone or tablet on the counter during service, not a desk. It's part of your one Avanza setup, connected to everything else automatically.",
              "El Portal de Cocina se abre desde un enlace con un token específico del restaurante — el personal de cocina nunca inicia sesión. Está pensado para un móvil o tablet en la barra durante el servicio, no para un escritorio. Forma parte de tu única configuración de Avanza, conectado con todo lo demás automáticamente."
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
