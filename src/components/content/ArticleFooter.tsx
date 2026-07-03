import { useState } from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "../../lib/LanguageContext";
import type { NavItem } from "../../lib/navConfig";

type Props = {
  nav: NavItem[];
  currentSlug: string;
  base: string; // e.g. /docs/en/os/restaurant
};

export default function ArticleFooter({ nav, currentSlug, base }: Props) {
  const { lang, t } = usePreferences();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const idx = nav.findIndex((n) => n.slug === currentSlug);
  const prev = idx > 0 ? nav[idx - 1] : null;
  const next = idx >= 0 && idx < nav.length - 1 ? nav[idx + 1] : null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-12 border-t border-brd pt-6">
      <div className="mb-8 flex items-center gap-3 font-mono text-xs text-text-dim">
        <button onClick={copyLink} className="hover:text-text">
          {copied ? t("Copied", "Copiado") : t("Copy link", "Copiar enlace")}
        </button>
        <span>·</span>
        <button onClick={() => window.print()} className="hover:text-text">
          {t("Print", "Imprimir")}
        </button>
        <span className="ml-auto flex items-center gap-2">
          {t("Helpful?", "¿Útil?")}
          <button
            onClick={() => setFeedback("up")}
            className={feedback === "up" ? "text-green" : "hover:text-text"}
          >
            👍
          </button>
          <button
            onClick={() => setFeedback("down")}
            className={feedback === "down" ? "text-red" : "hover:text-text"}
          >
            👎
          </button>
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link to={`${base}/${prev.slug}`} className="group flex-1 rounded-lg border border-brd bg-card px-4 py-3 hover:border-gold/30">
            <div className="text-[11px] text-text-dim">← {t("Previous", "Anterior")}</div>
            <div className="mt-0.5 text-sm text-text group-hover:text-gold-light">{lang === "en" ? prev.en : prev.es}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link to={`${base}/${next.slug}`} className="group flex-1 rounded-lg border border-brd bg-card px-4 py-3 text-right hover:border-gold/30">
            <div className="text-[11px] text-text-dim">{t("Next", "Siguiente")} →</div>
            <div className="mt-0.5 text-sm text-text group-hover:text-gold-light">{lang === "en" ? next.en : next.es}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
