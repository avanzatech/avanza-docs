import { useParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import DocsLayout from "../layouts/DocsLayout";
import { osRestaurantNav, impulseNav } from "../lib/navConfig";
import ArticleFooter from "../components/content/ArticleFooter";
import { Callout } from "../components/content/Blocks";

type Props = { product: "os" | "impulse" };

export default function DocsArticle({ product }: Props) {
  const { slug } = useParams();
  const { lang, t } = usePreferences();
  const nav = product === "os" ? osRestaurantNav : impulseNav;
  const item = nav.find((n) => n.slug === slug);
  const title = item ? (lang === "en" ? item.en : item.es) : slug;
  const base = product === "os" ? `/docs/${lang}/os/restaurant` : `/docs/${lang}/impulse`;

  return (
    <DocsLayout product={product}>
      <article>
        <div className="mb-6 flex items-center gap-3 font-mono text-xs text-text-dim">
          <span>{t("4 min read", "4 min de lectura")}</span>
          <span>·</span>
          <span>{t("Updated Jul 2026", "Actualizado jul. 2026")}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold text-text">{title}</h1>

        <Callout type="note" title={t("Not written yet", "Aún no escrito")}>
          {t(
            "This article's content hasn't been authored — this is the documentation engine's placeholder. Real articles load from metadata (title, category, product, blueprint, reading time, related articles, keywords) rather than being hardcoded pages.",
            "El contenido de este artículo aún no se ha redactado — este es el marcador de posición del motor de documentación. Los artículos reales se cargan desde metadatos (título, categoría, producto, blueprint, tiempo de lectura, artículos relacionados, palabras clave) en lugar de ser páginas fijas."
          )}
        </Callout>
      </article>

      <ArticleFooter nav={nav} currentSlug={slug ?? ""} base={base} />
    </DocsLayout>
  );
}
