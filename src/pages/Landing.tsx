import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ProductCard from "../components/ProductCard";
import ShaderCardBackground from "../components/ShaderCardBackground";
import osCardImg from "../assets/cards/avanza-os-matte.webp";
import impulseCardImg from "../assets/cards/avanza-impulse-matte.webp";
import LogoIntro from "../components/LogoIntro";
import ComingSoonOverlay from "../components/ComingSoonOverlay";

const products = [
  {
    id: "os" as const,
    name: "Avanza OS",
    subtitle: { en: "Business Operations Platform", es: "Plataforma de Operaciones para Negocios" },
    desc: {
      en: "Purchasing intelligence, supplier coordination, compliance and operational memory for growing businesses.",
      es: "Inteligencia de compras, coordinación de proveedores, cumplimiento normativo y memoria operativa para negocios en crecimiento.",
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
    locked: true,
  },
];

export default function Landing() {
  const { lang, t, setProduct } = usePreferences();
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const go = (id: "os" | "impulse") => {
    const p = products.find((x) => x.id === id);
    if (p?.locked) {
      setShowComingSoon(true);
      return;
    }
    setProduct(id);
    navigate(id === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse/getting-started`);
  };

  // Content animates in only once the intro reveal has receded.
  const show = introDone;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg">
      <LogoIntro onDone={() => setIntroDone(true)} />
      <div className="absolute inset-0 z-0">
        {/* CSS fallback — visible immediately and stays visible if WebGL
            fails to initialize for any reason, so the background is never
            just flat black. The shader canvas paints over this once it's up. */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #16321f 0%, #0A1A0F 45%, #0A1A0F 55%, #241733 100%)" }} />
        <ShaderCardBackground />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 900px 700px at center, rgba(8,16,10,0.72) 0%, rgba(8,16,10,0.35) 55%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,26,15,0.05)_0%,rgba(10,26,15,0.4)_100%)]" />
      </div>

      <header className="relative z-10 flex items-center justify-end px-8 py-6 md:px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.6 }}>
          <LanguageSwitcher />
        </motion.div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-10 pt-2 text-center">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
        >
          {t("Select your product", "Selecciona tu producto")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[23ch] font-display text-[36px] font-semibold leading-[1.08] tracking-tight text-text md:text-[48px]"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          {t("Which Avanza product", "¿Con qué producto de Avanza")}
          <br />
          <span className="text-text-muted">{t("do you need help with?", "necesitas ayuda?")}</span>
        </motion.h1>

        <div className="mt-10 grid w-full max-w-3xl gap-5 [perspective:1200px] md:grid-cols-2">
          {show &&
            products.map((p, i) => (
              <ProductCard
                key={p.id}
                eyebrowDot={p.dot}
                glowColor={p.glow}
                name={p.name}
                subtitle={p.subtitle[lang]}
                desc={p.desc[lang]}
                cta={p.locked ? t("Coming Soon", "Próximamente") : t("Open Documentation", "Abrir Documentación")}
                onClick={() => go(p.id)}
                delay={0.25 + i * 0.12}
                image={p.image}
              />
            ))}
        </div>
      </main>

      <ComingSoonOverlay open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}
