import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product, Blueprint, Lang } from "./contentSchema";

const KEY = "avanza-docs-prefs";

type Prefs = {
  product: Product | null;
  blueprint: Blueprint | null;
  lang: Lang;
};

type PreferencesContextValue = Prefs & {
  setProduct: (p: Product) => void;
  setBlueprint: (b: Blueprint) => void;
  setLang: (l: Lang) => void;
  t: (en: string, es: string) => string;
  reset: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore malformed storage
  }
  return {
    product: null,
    blueprint: null,
    lang: navigator.language?.startsWith("es") ? "es" : "en",
  };
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(prefs));
    document.documentElement.lang = prefs.lang;
  }, [prefs]);

  const value: PreferencesContextValue = {
    ...prefs,
    setProduct: (product) => setPrefs((p) => ({ ...p, product })),
    setBlueprint: (blueprint) => setPrefs((p) => ({ ...p, blueprint })),
    setLang: (lang) => setPrefs((p) => ({ ...p, lang })),
    t: (en, es) => (prefs.lang === "en" ? en : es),
    reset: () => setPrefs({ product: null, blueprint: null, lang: prefs.lang }),
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}

// Backward-compatible alias so existing components using useLanguage() keep working.
export const useLanguage = usePreferences;
