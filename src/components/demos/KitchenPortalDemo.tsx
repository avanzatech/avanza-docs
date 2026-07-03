import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

// A phone-frame recreation of the real Kitchen Portal — exact palette from
// KitchenPortal in App.jsx (BG #0a1208, CARD #111a0f, BRD #1e2d1a, gold
// #c9a84c), the real 5-tab bottom nav, and the Home screen's actual
// priority-card logic (out-of-stock → pending APPCC → low → all good),
// populated with El Pintxo-style demo data. Tapping the nav switches
// screens exactly like the device does.

const K = {
  bg: "#0a1208",
  card: "#111a0f",
  brd: "#1e2d1a",
  gold: "#c9a84c",
  g4: "#4ade80",
  amb: "#f59e0b",
  red: "#ef4444",
  muted: "#5a7055",
  lite: "#9db899",
  wht: "#e8f0e4",
};

type Tab = "home" | "cocina" | "appcc" | "pedidos" | "notas";

const board = [
  { name: "Pulpo a la gallega", stock: 0 },
  { name: "Tortilla de patatas", stock: 3 },
  { name: "Croquetas de jamón", stock: 12 },
  { name: "Pimientos de Padrón", stock: 8 },
];

export default function KitchenPortalDemo() {
  const { t } = usePreferences();
  const [tab, setTab] = useState<Tab>("home");

  const tabs: { id: Tab; icon: string; lbl: string }[] = [
    { id: "home", icon: "⚡", lbl: t("HOME", "INICIO") },
    { id: "cocina", icon: "▦", lbl: t("BOARD", "TABLERO") },
    { id: "appcc", icon: "✓", lbl: "APPCC" },
    { id: "pedidos", icon: "🛒", lbl: t("ORDERS", "PEDIDOS") },
    { id: "notas", icon: "📌", lbl: t("NOTES", "NOTAS") },
  ];

  return (
    <div className="my-6 flex flex-col items-center">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-wide text-text-dim">
        {t("Try it — the real Kitchen Portal", "Pruébalo — el Portal de Cocina real")}
      </div>

      {/* phone frame */}
      <div
        className="relative overflow-hidden rounded-[36px] border-[6px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
        style={{ borderColor: "#000", width: 300, height: 620, background: K.bg }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-30 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />

        {/* header */}
        <div
          className="flex items-center justify-between px-3.5 py-2.5"
          style={{ background: "rgba(10,18,8,0.98)", borderBottom: `1px solid ${K.brd}` }}
        >
          <div className="min-w-0">
            <div className="text-[13px] font-extrabold" style={{ color: K.gold }}>
              Avanza Kitchen
            </div>
            <div className="truncate text-[9px]" style={{ color: K.muted }}>
              El Pintxo Barcelona
            </div>
          </div>
          <div className="text-[9px]" style={{ color: K.muted }}>
            {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
          </div>
        </div>

        {/* screen content */}
        <div className="h-[calc(100%-118px)] overflow-y-auto">
          {tab === "home" && <HomeScreen t={t} setTab={setTab} />}
          {tab === "cocina" && <BoardScreen t={t} />}
          {tab === "appcc" && <SimpleScreen icon="🛡" title={t("Log reception", "Registrar recepción")} body={t("Scan a delivery's barcode to capture lot number and expiry, then record temperature.", "Escanea el código de una entrega para capturar lote y caducidad, y registra la temperatura.")} />}
          {tab === "pedidos" && <SimpleScreen icon="🛒" title={t("Place an order", "Hacer un pedido")} body={t("Pick a supplier, browse their products, adjust quantities, and send — straight from the kitchen.", "Elige un proveedor, revisa sus productos, ajusta cantidades y envía — desde la cocina.")} />}
          {tab === "notas" && <SimpleScreen icon="📌" title={t("Kitchen notes", "Notas de cocina")} body={t("A shared board for shift handovers and photos, plus an agenda for deliveries and cleaning.", "Un tablón compartido para traspasos de turno y fotos, más una agenda de entregas y limpieza.")} />}
        </div>

        {/* bottom nav */}
        <nav
          className="absolute bottom-0 left-0 flex w-full"
          style={{ background: "rgba(10,18,8,0.97)", borderTop: `1px solid ${K.brd}` }}
        >
          {tabs.map((tb) => {
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2"
                style={{ color: active ? K.gold : K.muted }}
              >
                <span className="text-[17px] leading-none">{tb.icon}</span>
                <span className="text-[8px] font-bold tracking-wide">{tb.lbl}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <p className="mt-3 max-w-md text-center text-xs text-text-dim">
        {t(
          "Tap the tabs at the bottom — this is the actual portal your kitchen staff use, no login required, opened from a link on a phone.",
          "Toca las pestañas de abajo — este es el portal real que usa tu personal de cocina, sin inicio de sesión, abierto desde un enlace en el móvil."
        )}
      </p>
    </div>
  );
}

function HomeScreen({ t, setTab }: { t: (en: string, es: string) => string; setTab: (tab: Tab) => void }) {
  const critical = board.filter((b) => b.stock <= 0);
  const low = board.filter((b) => b.stock > 0 && b.stock <= 5);

  // Real priority logic: out-of-stock wins, then low stock, then all good.
  const state =
    critical.length > 0
      ? { label: t("Critical status", "Estado crítico"), title: `${critical.length} ${t("dish out of stock", "plato sin stock")}`, sub: t("Requires immediate attention", "Requiere atención inmediata"), col: K.red, tab: "cocina" as Tab }
      : low.length > 0
      ? { label: t("Low stock", "Stock bajo"), title: `${low.length} ${t("dishes low", "platos bajos")}`, sub: t("Consider restocking before service", "Considera reponer antes del servicio"), col: K.amb, tab: "cocina" as Tab }
      : { label: t("All good", "Todo correcto"), title: t("All good", "Todo en orden"), sub: t("No active alerts", "Sin alertas activas"), col: K.g4, tab: null };

  const qa = [
    { lbl: t("Board", "Tablero"), sub: t("View stock", "Ver stock"), icon: "▦", tab: "cocina" as Tab },
    { lbl: "APPCC", sub: t("Register", "Registrar"), icon: "🛡", tab: "appcc" as Tab },
    { lbl: t("Orders", "Pedidos"), sub: t("Place order", "Hacer pedido"), icon: "🛒", tab: "pedidos" as Tab },
    { lbl: t("Notes", "Notas"), sub: t("View notes", "Ver notas"), icon: "📌", tab: "notas" as Tab },
  ];

  return (
    <div style={{ background: "#050a04", minHeight: "100%" }}>
      {/* hero band */}
      <div style={{ height: 90, background: "linear-gradient(135deg,#0a1a08,#1a2d14)" }} />
      <div className="px-3" style={{ marginTop: -30 }}>
        <div
          onClick={() => state.tab && setTab(state.tab)}
          style={{
            background: "rgba(6,12,5,0.7)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${state.col}40`,
            borderRadius: 18,
            padding: "12px 14px",
            cursor: state.tab ? "pointer" : "default",
          }}
        >
          <div style={{ fontSize: 9, fontWeight: 700, color: state.col, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>
            {state.label}
          </div>
          <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", marginBottom: 3 }}>{state.title}</div>
          <div style={{ fontSize: 11, color: K.muted }}>{state.sub}</div>
          {state.tab && (
            <button
              onClick={(e) => { e.stopPropagation(); setTab(state.tab!); }}
              style={{ marginTop: 12, padding: "8px 16px", borderRadius: 10, background: `linear-gradient(135deg,${state.col},${state.col}bb)`, color: state.col === K.g4 ? "#050a08" : "#fff", border: "none", fontSize: 12, fontWeight: 800, cursor: "pointer" }}
            >
              {t("View Board →", "Ver Tablero →")}
            </button>
          )}
        </div>
      </div>

      {/* quick actions */}
      <div className="px-3 pb-4 pt-4">
        <div style={{ fontSize: 8, fontWeight: 800, color: K.muted, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>
          {t("Quick actions", "Acciones rápidas")}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {qa.map((a) => (
            <button
              key={a.tab}
              onClick={() => setTab(a.tab)}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "11px 12px", textAlign: "left" }}
            >
              <span style={{ fontSize: 15, color: "#e8f0e4", opacity: 0.8 }}>{a.icon}</span>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginTop: 5 }}>{a.lbl}</div>
              <div style={{ fontSize: 9, color: K.muted }}>{a.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BoardScreen({ t }: { t: (en: string, es: string) => string }) {
  const sorted = [...board].sort((a, b) => a.stock - b.stock);
  return (
    <div className="p-3">
      <div style={{ fontSize: 13, fontWeight: 800, color: K.wht, marginBottom: 10 }}>{t("Board", "Tablero")}</div>
      <div className="flex flex-col gap-1.5">
        {sorted.map((b, i) => {
          const st = b.stock <= 0 ? { c: K.red, l: t("OUT", "SIN STOCK") } : b.stock <= 5 ? { c: K.amb, l: t("LOW", "BAJO") } : { c: K.g4, l: "OK" };
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: K.card, border: `1px solid ${K.brd}`, borderLeft: `3px solid ${st.c}` }}>
              <div className="flex-1 text-[12px]" style={{ color: K.wht }}>{b.name}</div>
              <div className="text-[13px] font-bold" style={{ color: st.c }}>{b.stock}</div>
              <div className="rounded px-1.5 py-0.5 text-[8px] font-bold" style={{ background: `${st.c}20`, color: st.c }}>{st.l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleScreen({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div style={{ fontSize: 32 }}>{icon}</div>
      <div className="mt-3 text-[14px] font-extrabold" style={{ color: K.wht }}>{title}</div>
      <div className="mt-2 text-[11px] leading-relaxed" style={{ color: K.muted }}>{body}</div>
    </div>
  );
}
