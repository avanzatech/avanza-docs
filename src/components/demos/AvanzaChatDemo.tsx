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
        { q: "Why is my food cost up this month?", a: "Your food cost is €5,120, up 8% on last month. I traced it: almost all of it is one supplier — Peix Fresc del Port raised hake and monkfish around the 12th. Everything else held steady. At your current volume that's ~€190/month. Want me to flag it next time their invoice comes in above last month's average?" },
        { q: "Add a new supplier: Forn Artesà, bread", a: "Done — I've created Forn Artesà as a supplier, category bread, and linked it so their deliveries and invoices will map to it automatically. I've left contact and order method blank for you to fill in Suppliers. Want me to set a standing weekly bread order?", proposal: true },
        { q: "Set up pan de cristal as a new product", a: "I've added Pan de cristal under bread, supplier Forn Artesà. I pulled the unit price (€0.85) from their last albarán so your cost history starts accurate from day one. Set a reorder threshold?", proposal: true },
        { q: "Which supplier raised prices the most this quarter?", a: "Peix Fresc del Port — up 11% since April, mostly white fish. Your produce supplier is flat; Distribucions Costa (drinks) actually dropped 2%. Fish is the line worth renegotiating — at your volume, holding them to April pricing is about €520 over the year." },
        { q: "Should I drop the tasting menu?", a: "I wouldn't, on the numbers. It's 9% of covers but 17% of margin — your highest-margin line by far, and its diners spend 40% more on wine. Dropping it saves some prep complexity but costs roughly €1,900/month in contribution. If the goal is simplifying the kitchen, the croquetas are the weaker line to cut." },
        { q: "What should I reorder?", a: "Estrella Damm is down to 2 crates, below your threshold of 3. I can draft a reorder of 6 crates to Distribucions Costa. Confirm?", proposal: true },
      ]
    : [
        { q: "¿Por qué ha subido mi coste de comida este mes?", a: "Tu coste de comida es 5.120 €, un 8% más que el mes pasado. Lo he rastreado: casi todo es un proveedor — Peix Fresc del Port subió merluza y rape hacia el día 12. El resto se mantuvo. A tu volumen son ~190 €/mes. ¿Quieres que te avise la próxima vez que su factura venga por encima de la media del mes pasado?" },
        { q: "Añade un proveedor: Forn Artesà, pan", a: "Hecho — he creado Forn Artesà como proveedor, categoría pan, y lo he vinculado para que sus entregas y facturas se asignen solas. He dejado contacto y método de pedido en blanco para que los rellenes en Proveedores. ¿Quieres que configure un pedido de pan semanal fijo?", proposal: true },
        { q: "Da de alta el pan de cristal como producto", a: "He añadido Pan de cristal en pan, proveedor Forn Artesà. He sacado el precio unitario (0,85 €) de su último albarán para que tu historial de coste empiece exacto desde el día uno. ¿Fijo un umbral de reposición?", proposal: true },
        { q: "¿Qué proveedor subió más los precios este trimestre?", a: "Peix Fresc del Port — un 11% desde abril, sobre todo pescado blanco. Tu proveedor de verdura está plano; Distribucions Costa (bebidas) bajó un 2%. El pescado es la línea a renegociar — a tu volumen, mantenerles el precio de abril son unos 520 € al año." },
        { q: "¿Debería quitar el menú degustación?", a: "Por los números, no lo haría. Es el 9% de los cubiertos pero el 17% del margen — tu línea de mayor margen con diferencia, y sus comensales gastan un 40% más en vino. Quitarlo simplifica algo la cocina pero cuesta unos 1.900 €/mes de contribución. Si el objetivo es simplificar, las croquetas son la línea más débil que recortar." },
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
                ? "Done. I've set that up — you'll find it in the relevant tab, ready to review or adjust anytime. Nothing is locked in without you."
                : "Hecho. Lo he configurado — lo encontrarás en la pestaña correspondiente, listo para revisar o ajustar cuando quieras. Nada queda fijado sin ti."
              : en
                ? "No problem, I've left everything as it was. Nothing changed."
                : "Sin problema, lo he dejado todo como estaba. No he cambiado nada.",
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
