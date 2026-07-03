import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

type Item = { name: string; qty: string; unit: string };

// Faithful reproduction of the real draft-order card: amber pending styling,
// source badge, inline-editable quantities, and — the detail worth getting
// right — the two different send flows. Email sends and confirms in one
// step. WhatsApp requires opening the app and then a manual "I sent it"
// confirmation, because Avanza can't know a WhatsApp message actually went
// out the way it knows an email did.

export default function PedidosDemo() {
  const { t } = usePreferences();
  const [items, setItems] = useState<Item[]>([
    { name: "Estrella Galicia 33cl", qty: "24", unit: "ud" },
    { name: "Agua con gas 1L", qty: "12", unit: "ud" },
  ]);
  const [method, setMethod] = useState<"email" | "whatsapp">("whatsapp");
  const [status, setStatus] = useState<"pending" | "sending" | "waOpened" | "sent" | "rejected">("pending");

  const updateQty = (i: number, qty: string) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, qty } : it)));
  };

  const send = () => {
    setStatus("sending");
    setTimeout(() => setStatus(method === "whatsapp" ? "waOpened" : "sent"), 700);
  };

  const reset = () => setStatus("pending");

  if (status === "rejected") {
    return (
      <div className="my-5">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-text-dim">
          {t("Try it — a real draft order card", "Pruébalo — una tarjeta de borrador real")}
        </div>
        <div className="rounded-2xl border border-brd bg-card p-6 text-center">
          <p className="text-sm text-text-muted">{t("Draft rejected — it's gone, no undo.", "Borrador rechazado — desaparece, sin deshacer.")}</p>
          <button onClick={reset} className="mt-3 text-xs font-medium text-gold-light underline">
            {t("Reset demo", "Reiniciar demo")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wide text-text-dim">
          {t("Try it — edit quantities, then send", "Pruébalo — edita cantidades y envía")}
        </div>
        <div className="flex overflow-hidden rounded-md border border-brd text-[10px]">
          <button
            onClick={() => setMethod("whatsapp")}
            className={`px-2 py-1 font-bold ${method === "whatsapp" ? "bg-gold text-bg" : "text-text-dim"}`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setMethod("email")}
            className={`px-2 py-1 font-bold ${method === "email" ? "bg-gold text-bg" : "text-text-dim"}`}
          >
            Email
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-amber/25" style={{ background: "rgba(245,158,11,0.05)" }}>
        <div className="flex items-center justify-between border-b border-brd px-4 py-2.5">
          <div>
            <div className="text-[13px] font-extrabold text-text">Distribuciones García</div>
            <div className="mt-0.5 text-[10px] text-amber">🧃 {t("Beverages (auto)", "Bebidas (auto)")}</div>
          </div>
          {status === "pending" && (
            <button
              onClick={() => setStatus("rejected")}
              className="rounded-md border border-red/40 px-2.5 py-1 text-[10px] font-bold text-red"
            >
              {t("Reject", "Rechazar")}
            </button>
          )}
        </div>

        <div className="px-4 py-3">
          {items.map((item, i) => (
            <div key={i} className="mb-1.5 flex items-center gap-2">
              <div className="flex-1 text-xs text-text">{item.name}</div>
              <input
                type="number"
                value={item.qty}
                disabled={status !== "pending"}
                onChange={(e) => updateQty(i, e.target.value)}
                className="w-14 rounded-md border border-brd bg-black/20 px-2 py-1 text-center text-[13px] text-text disabled:opacity-50"
              />
              <div className="w-9 text-[11px] text-text-dim">{item.unit}</div>
            </div>
          ))}

          {status === "pending" && (
            <button
              onClick={send}
              className="mt-2 w-full rounded-lg py-2.5 text-[13px] font-extrabold text-bg"
              style={{ background: "linear-gradient(135deg,#C9A84C,#8B7332)" }}
            >
              {method === "whatsapp" ? t("Approve & open WhatsApp", "Aprobar y abrir WhatsApp") : t("Approve & send email", "Aprobar y enviar email")}
            </button>
          )}
          {status === "sending" && (
            <div className="mt-2 w-full rounded-lg py-2.5 text-center text-[13px] font-extrabold text-bg" style={{ background: "rgba(201,168,76,0.6)" }}>
              …
            </div>
          )}
          {status === "waOpened" && (
            <div className="mt-2 flex flex-col gap-2">
              <div className="rounded-lg py-3 text-center text-[13px] font-extrabold text-white" style={{ background: "#25d366" }}>
                💬 {t("WhatsApp opened in a new tab", "WhatsApp abierto en una pestaña nueva")}
              </div>
              <button
                onClick={() => setStatus("sent")}
                className="rounded-lg py-2.5 text-[12px] font-extrabold text-green"
                style={{ background: "rgba(34,197,94,0.15)" }}
              >
                ✓ {t("I sent it", "Confirmé el envío")}
              </button>
            </div>
          )}
          {status === "sent" && (
            <div className="mt-2 text-[12px] font-bold text-green">
              ✓ {method === "whatsapp" ? t("Confirmed by you", "Confirmado por ti") : t("Email sent", "Email enviado")}
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-text-dim">
        {status === "sent"
          ? t(
              method === "whatsapp"
                ? "Notice WhatsApp needed your manual confirmation — Avanza can't verify a WhatsApp send the way it can an email."
                : "Email confirms itself the moment it's sent — no extra step needed.",
              method === "whatsapp"
                ? "Fíjate que WhatsApp necesitó tu confirmación manual — Avanza no puede verificar un envío de WhatsApp como sí puede uno de email."
                : "El email se confirma solo en cuanto se envía — sin paso extra."
            )
          : t("Change quantities above before sending — edits save automatically.", "Cambia cantidades arriba antes de enviar — los cambios se guardan solos.")}
      </p>
    </div>
  );
}
