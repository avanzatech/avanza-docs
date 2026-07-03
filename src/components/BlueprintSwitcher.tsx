import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";

const blueprints = [
  { id: "restaurant" as const, icon: "🍽", en: "Restaurant", es: "Restaurante", active: true },
  { id: "grocery" as const, icon: "🛒", en: "Grocery", es: "Alimentación", active: false },
  { id: "bakery" as const, icon: "🥖", en: "Bakery", es: "Panadería", active: false },
  { id: "hardware" as const, icon: "🔧", en: "Hardware", es: "Ferretería", active: false },
];

export default function BlueprintSwitcher() {
  const { blueprint, lang, setBlueprint } = usePreferences();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const current = blueprints.find((b) => b.id === blueprint) ?? blueprints[0];

  const go = (id: (typeof blueprints)[number]) => {
    if (!id.active) return;
    setBlueprint(id.id);
    setOpen(false);
    navigate(`/docs/${lang}/os/${id.id}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md border border-brd bg-card px-2.5 py-1.5 text-xs font-medium text-text hover:border-gold/30"
      >
        <span>{current.icon}</span>
        {lang === "en" ? current.en : current.es}
        <span className={`text-text-dim transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-md border border-brd bg-card shadow-xl">
            {blueprints.map((b) => (
              <button
                key={b.id}
                onClick={() => go(b)}
                disabled={!b.active}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs ${
                  !b.active
                    ? "cursor-not-allowed text-text-dim/60"
                    : b.id === current.id
                    ? "bg-bg2 text-gold-light"
                    : "text-text-muted hover:bg-bg2/60 hover:text-text"
                }`}
              >
                <span>{b.icon} {lang === "en" ? b.en : b.es}</span>
                {!b.active && <span className="font-mono text-[9px] uppercase">soon</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
