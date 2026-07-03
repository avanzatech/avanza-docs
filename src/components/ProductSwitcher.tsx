import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../lib/LanguageContext";

const options = [
  { id: "os" as const, label: "Avanza OS" },
  { id: "impulse" as const, label: "Avanza Impulse" },
];

export default function ProductSwitcher() {
  const { product, lang, setProduct } = usePreferences();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const current = options.find((o) => o.id === product) ?? options[0];

  const go = (id: "os" | "impulse") => {
    setProduct(id);
    setOpen(false);
    navigate(id === "os" ? `/docs/${lang}/os` : `/docs/${lang}/impulse/getting-started`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md border border-brd bg-card px-2.5 py-1.5 text-xs font-medium text-text hover:border-gold/30"
      >
        {current.label}
        <span className={`text-text-dim transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-md border border-brd bg-card shadow-xl">
            {options.map((o) => (
              <button
                key={o.id}
                onClick={() => go(o.id)}
                className={`block w-full px-3 py-2 text-left text-xs ${
                  o.id === current.id ? "bg-bg2 text-gold-light" : "text-text-muted hover:bg-bg2/60 hover:text-text"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
