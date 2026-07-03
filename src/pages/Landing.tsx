import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ProductCard from "../components/ProductCard";
import AmbientBackground from "../components/AmbientBackground";
import osCardImg from "../assets/cards/avanza-os-card.webp";
import impulseCardImg from "../assets/cards/avanza-impulse-card.webp";
import LogoGleam from "../components/LogoGleam";
import LogoIntro from "../components/LogoIntro";

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
    image: osCardImg,
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
    image: impulseCardImg,
  },
];

export default function Landing() {
  const { lang, t, product, blueprint, setProduct } = usePreferences();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const forceHome = params.get("home") === "1";
  const [introDone, setIntroDone] = useState(false);

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

  // Content animates in only once the intro reveal has receded.
  const show = introDone;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <LogoIntro onDone={() => setIntroDone(true)} />
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <LogoGleam size={26} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.6 }}>
          <LanguageSwitcher />
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-28 pt-20 text-center md:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim"
        >
          {t("Select your product", "Selecciona tu producto")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[23ch] font-display text-[48px] font-semibold leading-[1.06] tracking-tight text-text md:text-[64px]"
        >
          {t("Which Avanza product", "¿Con qué producto de Avanza")}
          <br />
          <span className="text-text-muted">{t("do you need help with?", "necesitas ayuda?")}</span>
        </motion.h1>

        <div className="mt-24 grid w-full gap-5 [perspective:1200px] md:grid-cols-2">
          {show &&
            products.map((p, i) => (
              <ProductCard
                key={p.id}
                eyebrowDot={p.dot}
                glowColor={p.glow}
                name={p.name}
                subtitle={p.subtitle[lang]}
                desc={p.desc[lang]}
                cta={t("Open Documentation", "Abrir Documentación")}
                onClick={() => go(p.id)}
                delay={0.25 + i * 0.12}
                image={p.image}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
