import { useState, useRef, useEffect } from "react";
import { usePreferences } from "../../lib/LanguageContext";

// A faithful, elevated recreation of the real Avanza (AI Assistant) tab.
// Greeting header, a bank of prompt chips ranging from everyday to
// manager-grade questions, a typing indicator, and a proposal → confirm/reject
// flow. Scripted answers, real interface, app's dark-glass look.

type Msg =
  | { role: "user"; text: string }
  | { role: "avanza"; text: string; proposal?: boolean };

type QA = { q: string; a: string; proposal?: boolean };

export default function AvanzaChatDemo() {
  const { lang, t } = usePreferences();
  const en = lang === "en";
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [confirmed, setConfirmed] = useState<null | "yes" | "no">(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, typing]);

  const bank: QA[] = en
    ? [
        { q: "How are sales going?", a: "Yesterday was €1,847 — up 12% on the day before. This week is tracking 4% ahead of last. Saturday was your strongest day, driven mostly by the tasting menu." },
        { q: "Why is my food cost up this month?", a: "Your food cost is €5,120, up 8% on last month. Almost all of it traces to one supplier: Peix Fresc del Port raised prices on hake and monkfish around the 12th. Everything else held steady. If that increase sticks, it's roughly €190/month at your current volume." },
        { q: "Which supplier raised prices the most this quarter?", a: "Peix Fresc del Port — up 11% since April, mostly on white fish. For comparison: your produce supplier is flat, and Distribucions Costa (drinks) actually dropped 2%. Fish is the line worth a conversation." },
        { q: "Compare this weekend to last weekend", a: "This weekend: €4,210 across Fri–Sun. Last weekend: €3,880. Up 8.5%. The difference is almost entirely Friday dinner — 14 more covers than the week before, likely the local match. Saturday and Sunday were near-identical." },
        { q: "What's my most profitable dish?", a: "By margin, the grilled octopus: it sells for €18.50 and costs about €5.20 in ingredients — a 72% margin, your best on the menu. By total contribution it's the paella, because you sell far more of it even at a thinner margin." },
        { q: "What should I reorder?", a: "Estrella Damm is down to 2 crates, below your threshold of 3. I can draft a reorder of 6 crates to Distribucions Costa. Confirm?", proposal: true },
      ]
    : [
        { q: "¿Cómo van las ventas?", a: "Ayer fueron 1.847 € — un 12% más que el día anterior. Esta semana va un 4% por encima de la pasada. El sábado fue tu día más fuerte, sobre todo por el menú degustación." },
        { q: "¿Por qué ha subido mi coste de comida este mes?", a: "Tu coste de comida es 5.120 €, un 8% más que el mes pasado. Casi todo viene de un proveedor: Peix Fresc del Port subió la merluza y el rape hacia el día 12. El resto se mantuvo. Si esa subida se queda, son unos 190 €/mes a tu volumen actual." },
        { q: "¿Qué proveedor subió más los precios este trimestre?", a: "Peix Fresc del Port — un 11% desde abril, sobre todo en pescado blanco. Para comparar: tu proveedor de verdura está plano, y Distribucions Costa (bebidas) bajó un 2%. El pescado es la línea que merece una conversación." },
        { q: "Compara este finde con el anterior", a: "Este finde: 4.210 € entre viernes y domingo. El finde pasado: 3.880 €. Un 8,5% más. La diferencia es casi toda la cena del viernes — 14 cubiertos más que la semana anterior, probablemente el partido. Sábado y domingo casi idénticos." },
        { q: "¿Cuál es mi plato más rentable?", a: "Por margen, el pulpo a la brasa: se vende a 18,50 € y te cuesta unos 5,20 € en ingredientes — un 72% de margen, el mejor de la carta. Por contribución total es la paella, porque vendes muchísima más aunque el margen sea más ajustado." },
        { q: "¿Qué debería reponer?", a: "Estrella Damm está en 2 cajas, por debajo de tu umbral de 3. Puedo preparar un pedido de 6 cajas a Distribucions Costa. ¿Confirmar?", proposal: true },
      ];

  const ask = (item: QA) => {
    if (typing) return;
    setConfirmed(null);
    setMessages([{ role: "user", text: item.q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "avanza", text: item.a, proposal: item.proposal }]);
    }, 900);
  };

  const answerProposal = (choice: "yes" | "no") => {
    setConfirmed(choice);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "avanza",
          text:
            choice === "yes"
              ? en
                ? "Done — the draft is waiting for you in Pedidos. It won't send until you approve it there."
                : "Hecho — el borrador te espera en Pedidos. No se enviará hasta que lo apruebes allí."
              : en
                ? "No problem, I've discarded it. Nothing was ordered."
                : "Sin problema, lo he descartado. No se ha pedido nada.",
        },
      ]);
    }, 700);
  };

  const reset = () => { setMessages([]); setConfirmed(null); setTyping(false); };

  return (
    <div
      className="my-5 overflow-hidden rounded-2xl border border-white/10"
      style={{ background: "linear-gradient(180deg,#0b1a10 0%,#060e08 100%)" }}
    >
      <div className="px-5 pt-5 pb-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-black text-gold">✦</span>
          <span className="text-[13px] font-black uppercase tracking-[1.5px] text-gold">Avanza</span>
          <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-green" />
        </div>
        <div className="mb-1 text-xs text-white/55">{t("Good afternoon", "Buenas tardes")}</div>
        <div className="mb-4 text-2xl font-black leading-tight text-white" style={{ letterSpacing: "-0.8px" }}>
          Casa Mediterránea
        </div>

        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-white/35">
          {t("Try asking", "Prueba a preguntar")}
        </div>
        <div className="flex flex-wrap gap-2">
          {bank.map((item) => (
            <button
              key={item.q}
              onClick={() => ask(item)}
              className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur transition hover:border-gold/40 hover:bg-white/[0.14]"
            >
              {item.q}
            </button>
          ))}
        </div>
      </div>

      {(messages.length > 0 || typing) && (
        <div ref={threadRef} className="max-h-[340px] space-y-3 overflow-y-auto border-t border-white/10 px-5 py-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl rounded-br-sm bg-gold/20 px-3.5 py-2 text-[13px] text-white"
                    : "max-w-[88%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-3.5 py-2.5 text-[13px] leading-relaxed text-white/90"
                }
              >
                {m.text}
                {"proposal" in m && m.proposal && confirmed === null && !typing && (
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
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:300ms]" />
              </div>
            </div>
          )}
          {messages.length > 0 && !typing && (
            <button onClick={reset} className="pt-1 font-mono text-[10px] uppercase tracking-wide text-white/40 hover:text-white/70">
              {t("Reset demo", "Reiniciar demo")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
