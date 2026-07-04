import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

// A faithful recreation of the real Avanza (AI Assistant) tab: the greeting
// header (✦ Avanza · restaurant name), the three real suggested-prompt chips,
// and the threaded conversation with a proposal → confirm/reject flow. Scripted
// demo answers, real interface. Matches the app's dark-glass palette.

type Msg =
  | { role: "user"; text: string }
  | { role: "avanza"; text: string; proposal?: boolean };

export default function AvanzaChatDemo() {
  const { lang, t } = usePreferences();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [confirmed, setConfirmed] = useState<null | "yes" | "no">(null);

  const chips = lang === "en"
    ? ["How are sales going?", "How much have I spent?", "What should I reorder?"]
    : ["¿Cómo van las ventas?", "¿Cuánto he gastado?", "¿Qué pedir pronto?"];

  // Scripted answers keyed to each chip, so the demo feels real without a backend.
  const scriptedAnswer = (q: string): Msg[] => {
    if (q === chips[0]) {
      return [{
        role: "avanza",
        text: lang === "en"
          ? "Yesterday was €1,847 — up 12% on the day before. This week is tracking slightly ahead of last. Your strongest day was Saturday."
          : "Ayer fueron 1.847 € — un 12% más que el día anterior. Esta semana va algo por encima de la pasada. Tu día más fuerte fue el sábado.",
      }];
    }
    if (q === chips[1]) {
      return [{
        role: "avanza",
        text: lang === "en"
          ? "So far this month you've spent €5,120 across suppliers. Your fish supplier is up 8% versus last month — the biggest single change."
          : "Este mes llevas 5.120 € gastados entre proveedores. Tu proveedor de pescado ha subido un 8% respecto al mes pasado — el mayor cambio.",
      }];
    }
    // "What should I reorder?" → a proposal that needs confirm/reject
    return [{
      role: "avanza",
      proposal: true,
      text: lang === "en"
        ? "Estrella Damm is down to 2 crates, below your threshold of 3. I can draft a reorder of 6 crates to Distribucions Costa. Confirm?"
        : "Estrella Damm está en 2 cajas, por debajo de tu umbral de 3. Puedo preparar un pedido de 6 cajas a Distribucions Costa. ¿Confirmar?",
    }];
  };

  const ask = (q: string) => {
    setConfirmed(null);
    setMessages([{ role: "user", text: q }, ...scriptedAnswer(q)]);
  };

  const answerProposal = (choice: "yes" | "no") => {
    setConfirmed(choice);
    setMessages((m) => [
      ...m,
      {
        role: "avanza",
        text:
          choice === "yes"
            ? lang === "en"
              ? "Done — the draft is waiting for you in Pedidos. It won't send until you approve it there."
              : "Hecho — el borrador te espera en Pedidos. No se enviará hasta que lo apruebes allí."
            : lang === "en"
              ? "No problem, I've discarded it. Nothing was ordered."
              : "Sin problema, lo he descartado. No se ha pedido nada.",
      },
    ]);
  };

  const reset = () => { setMessages([]); setConfirmed(null); };

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-white/10" style={{ background: "linear-gradient(180deg,#0b1a10 0%,#060e08 100%)" }}>
      <div className="px-5 pt-5 pb-4">
        {/* Greeting header — matches the real tab */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-black text-gold">✦</span>
          <span className="text-[13px] font-black uppercase tracking-[1.5px] text-gold">Avanza</span>
          <span className="h-[5px] w-[5px] rounded-full bg-green" />
        </div>
        <div className="mb-1 text-xs text-white/55">{t("Good afternoon", "Buenas tardes")}</div>
        <div className="mb-4 text-2xl font-black leading-tight text-white" style={{ letterSpacing: "-0.8px" }}>
          Casa Mediterránea
        </div>

        {/* Suggested-prompt chips */}
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => ask(c)}
              className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur transition hover:bg-white/[0.14]"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation thread */}
      {messages.length > 0 && (
        <div className="space-y-3 border-t border-white/10 px-5 py-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-br-sm bg-gold/20 px-3.5 py-2 text-[13px] text-white"
                    : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-relaxed text-white/90"
                }
              >
                {m.text}
                {"proposal" in m && m.proposal && confirmed === null && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => answerProposal("yes")}
                      className="rounded-lg bg-green/90 px-3 py-1.5 text-[12px] font-semibold text-black transition hover:bg-green"
                    >
                      {t("Confirm", "Confirmar")}
                    </button>
                    <button
                      onClick={() => answerProposal("no")}
                      className="rounded-lg border border-white/20 px-3 py-1.5 text-[12px] font-medium text-white/80 transition hover:bg-white/10"
                    >
                      {t("Reject", "Rechazar")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button onClick={reset} className="pt-1 font-mono text-[10px] uppercase tracking-wide text-white/40 hover:text-white/70">
            {t("Reset demo", "Reiniciar demo")}
          </button>
        </div>
      )}
    </div>
  );
}
