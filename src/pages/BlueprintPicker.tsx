import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import AmbientBackground from "../components/AmbientBackground";
import ComingSoonOverlay from "../components/ComingSoonOverlay";
import restaurantImg from "../assets/blueprints/restaurant.webp";
import groceryImg from "../assets/blueprints/grocery.webp";
import bakeryImg from "../assets/blueprints/bakery.webp";
import hardwareImg from "../assets/blueprints/hardware.webp";

const blueprints = [
  { id: "restaurant", icon: "🍽", en: "Restaurant", es: "Restaurante", active: true, glow: "rgba(201,168,76,0.18)", image: restaurantImg },
  { id: "grocery", icon: "🛒", en: "Grocery", es: "Tienda de Alimentación", active: false, glow: "rgba(91,141,239,0.16)", image: groceryImg },
  { id: "bakery", icon: "🥖", en: "Bakery", es: "Panadería", active: false, glow: "rgba(232,163,61,0.16)", image: bakeryImg },
  { id: "hardware", icon: "🔧", en: "Hardware", es: "Ferretería", active: false, glow: "rgba(168,85,247,0.16)", image: hardwareImg },
];

// Same tilt/glow/image-background language as the main landing page's
// ProductCard — one shared visual system across both screens, now with
// thematic wallpaper art per business type instead of a flat icon tile.
function BlueprintCard({
  b,
  lang,
  t,
  onSelect,
  featured = false,
}: {
  b: (typeof blueprints)[number];
  lang: "en" | "es";
  t: (en: string, es: string) => string;
  onSelect: () => void;
  featured?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onSelect}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex ${
        featured ? "aspect-[16/9] min-h-[200px] md:aspect-[21/9]" : "aspect-[4/3] min-h-[130px]"
      } flex-col justify-end overflow-hidden rounded-2xl border border-brd text-left transition-[border-color,box-shadow] duration-300 hover:border-white/10`}
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        style={{ backgroundImage: `url(${b.image})` }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, rgba(8,16,10,0.15) 0%, rgba(8,16,10,0.55) 55%, rgba(8,16,10,0.92) 100%), linear-gradient(155deg, ${b.glow}, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(240px circle at ${glowX} ${glowY}, ${b.glow}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
      />

      <div className={`relative flex flex-col items-start gap-2 ${featured ? "p-6" : "p-4"}`}>
        <span
          className={`${featured ? "text-[19px]" : "text-[13px]"} font-semibold text-text`}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
        >
          {lang === "en" ? b.en : b.es}
        </span>
        {!b.active && (
          <span
            className="font-mono text-[9px] uppercase tracking-wide text-text-dim"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
          >
            {t("Coming soon", "Próximamente")}
          </span>
        )}
      </div>
    </motion.button>
  );
}

export default function BlueprintPicker() {
  const { lang, t, setBlueprint } = usePreferences();
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const select = (b: (typeof blueprints)[number]) => {
    if (!b.active) {
      setShowComingSoon(true);
      return;
    }
    setBlueprint(b.id as "restaurant");
    navigate(`/docs/${lang}/os/restaurant`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <AmbientBackground />

      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <button onClick={() => navigate("/?home=1")} className="flex items-center gap-2 text-sm text-text-muted hover:text-text">
          ← <span className="font-display text-lg font-semibold tracking-tight text-gold-up">Avanza OS Docs</span>
        </button>
        <LanguageSwitcher />
      </header>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-12 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">{t("Avanza OS", "Avanza OS")}</p>
        <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight text-text md:text-4xl">
          {t("Select your business blueprint", "Selecciona tu tipo de negocio")}
        </h1>

        <div className="mt-12 flex w-full flex-col gap-4 [perspective:1000px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <BlueprintCard b={blueprints[0]} lang={lang} t={t} onSelect={() => select(blueprints[0])} featured />
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {blueprints.slice(1).map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <BlueprintCard b={b} lang={lang} t={t} onSelect={() => select(b)} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <ComingSoonOverlay open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}
