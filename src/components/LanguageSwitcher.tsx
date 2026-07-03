import { useLanguage } from "../lib/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 rounded-full border border-brd bg-card p-1 font-mono text-xs">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l ? "bg-bg2 text-text" : "text-text-dim hover:text-text-muted"
          }`}
        >
          {l === "en" ? "EN" : "ES"}
        </button>
      ))}
    </div>
  );
}
