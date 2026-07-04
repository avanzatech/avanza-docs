import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import AmbientBackground from "../components/AmbientBackground";
import ComingSoonOverlay from "../components/ComingSoonOverlay";

const blueprints = [
  { id: "restaurant", icon: "🍽", en: "Restaurant", es: "Restaurante", active: true, glow: "rgba(201,168,76,0.16)" },
  { id: "grocery", icon: "🛒", en: "Grocery", es: "Tienda de Alimentación", active: false, glow: "rgba(91,141,239,0.14)" },
  { id: "bakery", icon: "🥖", en: "Bakery", es: "Panadería", active: false, glow: "rgba(232,163,61,0.14)" },
  { id: "hardware", icon: "🔧", en: "Hardware", es: "Ferretería", active: false, glow: "rgba(168,85,247,0.14)" },
];

// Same tilt/glow interaction as the main landing page's ProductCard, scaled
// down for a 4-up grid — one shared visual language across both screens.
function BlueprintCard({
  b,
  lang,
  t,
  onSelect,
}: {
  b: (typeof blueprints)[number];
  lang: "en" | "es";
  t: (en: string, es: string) => string;
  onSelect: () => void;
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
      className="group relative flex min-h-[190px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-brd bg-card px-4 py-8 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(220px circle at ${glowX} ${glowY}, ${b.glow}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
        style={{ boxShadow: `inset 0 0 0 1px ${b.glow.replace(/[\d.]+\)$/, "0.35)")}` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
      />

      <div className="relative flex flex-col items-center gap-3">
        <span className="text-3xl">{b.icon}</span>
        <span className="text-sm font-medium text-text">{lang === "en" ? b.en : b.es}</span>
        {!b.active && (
          <span className="font-mono text-[9px] uppercase tracking-wide text-text-dim">
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

      <main className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-12 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">{t("Avanza OS", "Avanza OS")}</p>
        <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight text-text md:text-4xl">
          {t("Select your business blueprint", "Selecciona tu tipo de negocio")}
        </h1>

        <div className="mt-12 grid w-full grid-cols-2 gap-4 [perspective:1000px] md:grid-cols-4">
          {blueprints.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <BlueprintCard b={b} lang={lang} t={t} onSelect={() => select(b)} />
            </motion.div>
          ))}
        </div>
      </main>

      <ComingSoonOverlay open={showComingSoon} onClose={() => setShowComingSoon(false)} />
    </div>
  );
}
