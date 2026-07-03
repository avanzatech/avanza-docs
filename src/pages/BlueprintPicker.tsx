import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

const blueprints = [
  { id: "restaurant", icon: "🍽", en: "Restaurant", es: "Restaurante", active: true },
  { id: "grocery", icon: "🛒", en: "Grocery", es: "Tienda de Alimentación", active: false },
  { id: "bakery", icon: "🥖", en: "Bakery", es: "Panadería", active: false },
  { id: "hardware", icon: "🔧", en: "Hardware", es: "Ferretería", active: false },
];

export default function BlueprintPicker() {
  const { lang, t, setBlueprint } = usePreferences();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between px-8 py-6 md:px-16">
        <button onClick={() => navigate("/?home=1")} className="flex items-center gap-2 text-sm text-text-muted hover:text-text">
          ← <span className="font-display text-lg font-semibold tracking-tight text-gold-up">Avanza OS Docs</span>
        </button>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-12 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">{t("Avanza OS", "Avanza OS")}</p>
        <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight text-text md:text-4xl">
          {t("Select your business blueprint", "Selecciona tu tipo de negocio")}
        </h1>

        <div className="mt-12 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {blueprints.map((b, i) => (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={b.active ? { y: -3 } : undefined}
              disabled={!b.active}
              onClick={() => { if (b.active) { setBlueprint(b.id as "restaurant"); navigate(`/docs/${lang}/os/restaurant`); } }}
              className={`glass-card flex flex-col items-center gap-3 rounded-xl px-4 py-8 transition-colors ${
                b.active ? "cursor-pointer hover:border-gold/40" : "cursor-not-allowed opacity-40"
              }`}
            >
              <span className="text-3xl">{b.icon}</span>
              <span className="text-sm font-medium text-text">{lang === "en" ? b.en : b.es}</span>
              {!b.active && (
                <span className="font-mono text-[10px] uppercase tracking-wide text-text-dim">
                  {t("Coming soon", "Próximamente")}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
