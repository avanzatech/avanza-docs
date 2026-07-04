import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

// Distinct, faithful mini-recreations of each Kitchen Portal tab, so every
// doc page shows its own real interface instead of one generic portal shot.
// All grounded in the real KitchenHome / KitchenBoard / KitchenAPPCC /
// KitchenPedidos / KitchenNotas components. Demo data, real layout & palette.

const shell =
  "my-5 overflow-hidden rounded-2xl border border-white/10";
const shellBg = { background: "linear-gradient(180deg,#0a1608 0%,#050a04 100%)" };

function TabChrome({ active }: { active: string }) {
  const tabs = [
    { id: "home", label: "🏠" },
    { id: "board", label: "▦" },
    { id: "appcc", label: "🛡" },
    { id: "orders", label: "🛒" },
    { id: "notes", label: "📌" },
  ];
  return (
    <div className="flex border-t border-gold/20 bg-black/40">
      {tabs.map((tb) => (
        <div
          key={tb.id}
          className={`flex-1 py-2.5 text-center text-sm ${
            active === tb.id ? "text-gold" : "text-white/30"
          }`}
          style={active === tb.id ? { borderTop: "2px solid #C9A84C", marginTop: -1 } : undefined}
        >
          {tb.label}
        </div>
      ))}
    </div>
  );
}

/* ── HOME ── smart status card + quick actions ── */
export function KitchenHomeDemo() {
  const { t } = usePreferences();
  return (
    <div className={shell} style={shellBg}>
      <div className="p-4">
        <div className="mb-3 rounded-[22px] border border-gold/30 bg-black/40 p-4 backdrop-blur">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-lg">🛡</span>
            <span className="text-sm font-bold text-gold">{t("2 pending receptions", "2 recepciones pendientes")}</span>
          </div>
          <div className="text-xs text-white/55">{t("Log APPCC for each delivery", "Registra el APPCC de cada entrega")}</div>
          <div className="mt-2 text-xs font-semibold text-gold">{t("Log APPCC →", "Registrar APPCC →")}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { i: "▦", l: t("Board", "Tablero"), s: t("View stock", "Ver stock") },
            { i: "🛡", l: "APPCC", s: t("Register", "Registrar") },
            { i: "🛒", l: t("Orders", "Pedidos"), s: t("Place order", "Hacer pedido") },
            { i: "📌", l: t("Notes", "Notas"), s: t("View notes", "Ver notas") },
          ].map((q) => (
            <div key={q.l} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-lg">{q.i}</div>
              <div className="mt-1 text-[13px] font-semibold text-white">{q.l}</div>
              <div className="text-[11px] text-white/45">{q.s}</div>
            </div>
          ))}
        </div>
      </div>
      <TabChrome active="home" />
    </div>
  );
}

/* ── BOARD ── dish stock tracking ── */
export function KitchenBoardDemo() {
  const { t } = usePreferences();
  const dishes = [
    { n: "Paella de marisco", s: 8, low: false },
    { n: "Pulpo a la brasa", s: 3, low: true },
    { n: "Croquetas de jamón", s: 0, low: false, out: true },
    { n: "Tarta de Santiago", s: 12, low: false },
  ];
  return (
    <div className={shell} style={shellBg}>
      <div className="p-4">
        <div className="mb-3 text-[13px] font-bold text-white">{t("Today's dishes", "Platos de hoy")}</div>
        <div className="space-y-2">
          {dishes.map((d) => (
            <div key={d.n} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
              <span className="text-[13px] text-white">{d.n}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  d.out ? "bg-red/20 text-red" : d.low ? "bg-amber-500/20 text-amber-400" : "bg-green/20 text-green"
                }`}
              >
                {d.out ? t("Out", "Agotado") : `${d.s} ${t("left", "quedan")}`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <TabChrome active="board" />
    </div>
  );
}

/* ── APPCC ── delivery reception logging ── */
export function KitchenAppccDemo() {
  const { t } = usePreferences();
  return (
    <div className={shell} style={shellBg}>
      <div className="p-4">
        <div className="mb-3 text-[13px] font-bold text-white">{t("Log a reception", "Registrar recepción")}</div>
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
          <div className="mb-3 text-[12px] font-semibold text-gold">Peix Fresc del Port · 14:20</div>
          <div className="mb-2 flex items-center gap-2 text-[13px] text-white/85">
            <span className="text-green">📷</span> {t("Scan lot number (GS1)", "Escanear número de lote (GS1)")}
          </div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-[12px] text-white/60">{t("Reception temp", "Temp. recepción")}</span>
            <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[13px] font-bold text-white">3.5°C</span>
          </div>
          <div className="flex gap-2">
            <span className="rounded-lg bg-green/20 px-3 py-1.5 text-[12px] font-semibold text-green">✓ {t("Condition OK", "Estado OK")}</span>
            <span className="rounded-lg border border-white/15 px-3 py-1.5 text-[12px] text-white/60">{t("Appearance OK", "Aspecto OK")}</span>
          </div>
        </div>
      </div>
      <TabChrome active="appcc" />
    </div>
  );
}

/* ── ORDERS ── supplier request ── */
export function KitchenOrdersDemo() {
  const { t } = usePreferences();
  const suppliers = [
    { n: "Peix Fresc del Port", m: "WhatsApp" },
    { n: "Distribucions Costa", m: "Email" },
    { n: "Verdures del Camp", m: "WhatsApp + Email" },
  ];
  return (
    <div className={shell} style={shellBg}>
      <div className="p-4">
        <div className="mb-3 text-[13px] font-bold text-white">{t("Select supplier", "Seleccionar proveedor")}</div>
        <div className="space-y-2.5">
          {suppliers.map((s) => (
            <div key={s.n} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.08] text-lg">🚚</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-semibold text-white">{s.n}</div>
                <div className="text-[11px] text-white/45">{s.m}</div>
              </div>
              <span className="text-white/40">→</span>
            </div>
          ))}
        </div>
      </div>
      <TabChrome active="orders" />
    </div>
  );
}

/* ── NOTES ── chat + agenda with booking-form connection ── */
export function KitchenNotesDemo() {
  const { t } = usePreferences();
  const [sub, setSub] = useState<"notas" | "agenda">("notas");
  const [showWebhook, setShowWebhook] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className={shell} style={shellBg}>
      {/* sub-tabs */}
      <div className="flex border-b border-gold/25 bg-black/40">
        <button
          onClick={() => setSub("notas")}
          className={`flex-1 py-2.5 text-[13px] font-bold ${sub === "notas" ? "text-gold" : "text-white/40"}`}
          style={sub === "notas" ? { borderBottom: "2px solid #C9A84C" } : undefined}
        >
          📌 {t("Notes", "Notas")}
        </button>
        <button
          onClick={() => setSub("agenda")}
          className={`flex-1 py-2.5 text-[13px] font-bold ${sub === "agenda" ? "text-gold" : "text-white/40"}`}
          style={sub === "agenda" ? { borderBottom: "2px solid #C9A84C" } : undefined}
        >
          📅 Agenda
        </button>
      </div>

      {sub === "notas" ? (
        <div>
          <div className="space-y-3 p-3" style={{ background: "rgba(5,10,4,0.45)" }}>
            {/* photo message */}
            <div className="flex flex-col items-start">
              <div className="mb-1 w-full text-center text-[9px] text-white/40">14 Jul · 09:12</div>
              <div className="max-w-[85%] rounded-[4px_18px_18px_18px] border border-gold/20 bg-black/50 p-2.5">
                <div className="mb-2 flex h-24 w-40 items-center justify-center rounded-lg bg-white/[0.06] text-2xl">🍅</div>
                <div className="text-[13px] text-white">{t("Tomatoes arrived bruised — worth checking before we accept?", "Los tomates llegaron golpeados — ¿los revisamos antes de aceptar?")}</div>
              </div>
            </div>
            {/* text message */}
            <div className="flex flex-col items-start">
              <div className="mb-1 w-full text-center text-[9px] text-white/40">14 Jul · 16:40</div>
              <div className="max-w-[85%] rounded-[4px_18px_18px_18px] border border-gold/20 bg-black/50 px-3.5 py-2 text-[13px] text-white">
                {t("Low on clean aprons — laundry comes Thursday.", "Quedan pocos delantales limpios — la lavandería viene el jueves.")}
              </div>
            </div>
          </div>
          {/* input bar */}
          <div className="flex items-center gap-2 border-t border-gold/20 bg-black/60 p-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg">📷</div>
            <div className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white/40">
              {t("Write a message…", "Escribe un mensaje…")}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-lg font-bold text-black">↑</div>
          </div>
          <div className="px-3 pb-2 pt-1 text-center text-[10px] text-white/35">
            {t("Messages delete after 30 days", "Los mensajes se borran después de 30 días")}
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* mini month header */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-white/40">‹</span>
            <span className="text-[14px] font-bold text-white">Julio 2026</span>
            <span className="text-white/40">›</span>
          </div>
          {/* mini calendar */}
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
              <div key={i} className="text-center text-[9px] font-bold text-white/40">{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
              const hasEvt = [4, 12, 18, 26].includes(d);
              const isToday = d === 14;
              return (
                <div
                  key={d}
                  className={`rounded-lg py-1.5 text-center text-[11px] ${
                    isToday ? "bg-gold font-bold text-black" : "text-white/80"
                  }`}
                >
                  {d}
                  {hasEvt && !isToday && <div className="mx-auto mt-0.5 h-1 w-1 rounded-full bg-blue" />}
                </div>
              );
            })}
          </div>
          {/* an event */}
          <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.04] p-3" style={{ borderLeft: "4px solid #e879f9" }}>
            <span className="mb-1.5 inline-block rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[11px] font-bold text-fuchsia-300">20:30</span>
            <div className="text-[14px] font-semibold text-white">{t("Booking — table of 8 (Garcia)", "Reserva — mesa de 8 (García)")}</div>
            <div className="text-[11px] text-white/45">{t("From your booking form", "Desde tu formulario de reservas")}</div>
          </div>
          {/* booking-form webhook connector */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <button onClick={() => setShowWebhook((v) => !v)} className="flex w-full items-center justify-between">
              <div className="text-left">
                <div className="text-[11px] font-bold tracking-wide text-gold">🔗 {t("BOOKING FORM", "FORMULARIO DE RESERVAS")}</div>
                <div className="mt-0.5 text-[12px] text-white/45">{t("Connect your external form", "Conecta tu formulario externo")}</div>
              </div>
              <span className="text-white/40">{showWebhook ? "▴" : "▾"}</span>
            </button>
            {showWebhook && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="mb-2.5 text-[12px] leading-relaxed text-white/55">
                  {t("Paste this URL as a webhook in your booking form — new bookings appear on the calendar automatically.", "Pega esta URL como webhook en tu formulario — las reservas nuevas aparecen en el calendario automáticamente.")}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5">
                  <span className="flex-1 truncate text-[10px] text-white/50">
                    https://api.avanzatech.eu/kitchen/webhook/casa-med-8f3a…
                  </span>
                  <button
                    onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                    className="shrink-0 rounded-lg border border-gold/50 bg-gold/20 px-2.5 py-1.5 text-[11px] font-bold text-gold"
                  >
                    {copied ? t("✓ Copied", "✓ Copiado") : t("Copy", "Copiar")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <TabChrome active="notes" />
    </div>
  );
}
