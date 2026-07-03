import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ProductCard from "../components/ProductCard";
import AmbientBackground from "../components/AmbientBackground";

const products = [
  {
    id: "os" as const,
    name: "Avanza OS",
    subtitle: { en: "Restaurant Operations Platform", es: "Plataforma de Operaciones para Restaurantes" },
    desc: {
      en: "Inventory, suppliers, purchasing, kitchen operations, compliance and business intelligence.",
      es: "Inventario, proveedores, compras, cocina, cumplimiento normativo e inteligencia de negocio.",
    },
    dot: "bg-gold",
    glow: "rgba(201,168,76,0.16)",
  },
  {
    id: "impulse" as const,
    name: "Avanza Impulse",
    subtitle: { en: "AI Growth Platform", es: "Plataforma de Crecimiento con IA" },
    desc: {
      en: "Marketing, social media, SEO, reputation, campaigns and customer growth.",
      es: "Marketing, redes sociales, SEO, reputación, campañas y crecimiento de clientes.",
    },
    dot: "bg-blue",
    glow: "rgba(91,141,239,0.16)",
  },
];

export default function Landing() {
  const { lang, t, product, blueprint, setProduct } = usePreferences();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const forceHome = params.get("home") === "1";

  useEffect(() => {
    if (forceHome || !product) return;
    if (product === "os") {
      navigate(blueprint ? `/docs/${lang}/os/${blueprint}` : `/docs/${lang}/os`, { replace: true });
    } else {
      navigate(`/docs/${lang}/impulse/getting-started`, { replace: true });
    }
  }, [forceHome, product, blueprint, lang, navigate]);

  const go = (id: "os" | "impulse") => {
    setProduct(id);
    navigate(id === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse/getting-started`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[15px] font-semibold tracking-tight text-gold-up"
        >
          Avanza
        </motion.span>
        <LanguageSwitcher />
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-20 text-center md:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim"
        >
          {t("Select your product", "Selecciona tu producto")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[22ch] font-display text-[44px] font-semibold leading-[1.08] tracking-tight text-text md:text-[56px]"
        >
          {t("Which Avanza product", "¿Con qué producto de Avanza")}
          <br />
          <span className="text-text-muted">{t("do you need help with?", "necesitas ayuda?")}</span>
        </motion.h1>

        <div className="mt-20 grid w-full gap-5 [perspective:1200px] md:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              eyebrowDot={p.dot}
              glowColor={p.glow}
              name={p.name}
              subtitle={p.subtitle[lang]}
              desc={p.desc[lang]}
              cta={t("Open Documentation", "Abrir Documentación")}
              onClick={() => go(p.id)}
              delay={0.2 + i * 0.1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
