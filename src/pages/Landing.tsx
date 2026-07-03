import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

const products = [
  {
    id: "os",
    name: "Avanza OS",
    subtitle: { en: "Restaurant Operations Platform", es: "Plataforma de Operaciones para Restaurantes" },
    desc: {
      en: "Inventory, suppliers, purchasing, kitchen operations, compliance and business intelligence.",
      es: "Inventario, proveedores, compras, cocina, cumplimiento normativo e inteligencia de negocio.",
    },
    dot: "bg-gold",
    ring: "hover:border-gold/40",
    glow: "shadow-[0_0_120px_-30px_rgba(201,168,76,0.35)]",
  },
  {
    id: "impulse",
    name: "Avanza Impulse",
    subtitle: { en: "AI Growth Platform", es: "Plataforma de Crecimiento con IA" },
    desc: {
      en: "Marketing, social media, SEO, reputation, campaigns and customer growth.",
      es: "Marketing, redes sociales, SEO, reputación, campañas y crecimiento de clientes.",
    },
    dot: "bg-blue",
    ring: "hover:border-blue/40",
    glow: "shadow-[0_0_120px_-30px_rgba(59,130,246,0.35)]",
  },
] as const;

export default function Landing() {
  const { lang, t, product, blueprint, setProduct } = usePreferences();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const forceHome = params.get("home") === "1";

  // Returning users with a saved product go straight back in — the landing
  // screen only asks once. Explicit "switch product" always goes through the
  // ProductSwitcher in the docs header, not back through here.
  useEffect(() => {
    if (forceHome || !product) return;
    if (product === "os") {
      navigate(blueprint ? `/docs/${lang}/os/${blueprint}` : `/docs/${lang}/os`, { replace: true });
    } else {
      navigate(`/docs/${lang}/impulse/getting-started`, { replace: true });
    }
  }, [forceHome, product, blueprint, lang, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue/10 blur-[140px]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <span className="font-display text-lg font-semibold tracking-tight text-gold-up">Avanza Docs</span>
        <LanguageSwitcher />
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          {t("Select your product", "Selecciona tu producto")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-2xl font-display text-4xl font-semibold leading-[1.15] text-text md:text-5xl"
        >
          {t("Which Avanza product do you need help with?", "¿Con qué producto de Avanza necesitas ayuda?")}
        </motion.h1>

        <div className="mt-16 grid w-full gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => { setProduct(p.id); navigate(p.id === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse/getting-started`); }}
              className={`glass-card group relative overflow-hidden rounded-2xl p-8 text-left transition-colors ${p.ring} ${p.glow}`}
            >
              <div className="flex items-center justify-between">
                <span className={`h-2 w-2 rounded-full ${p.dot}`} />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-text">{p.name}</h2>
              <p className="mt-1 text-sm font-medium text-gold-light">{p.subtitle[lang]}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">{p.desc[lang]}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-text">
                {t("Open Documentation", "Abrir Documentación")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
