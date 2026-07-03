import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

type Doc = { name: string; type: "albaran" | "factura"; status: "done" | "needs_review" | "pending"; total: string };

const statusCfg = {
  done: { icon: "✓", color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  needs_review: { icon: "⚠", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  pending: { icon: "⟳", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
};

// Same badge colors and status states as the real upload/document list —
// #0ea5e9-family cyan for albarán, amber for factura, plus the three
// status pills. The point of this demo is making the distinction land
// visually, since confusing the two is the single most common mistake.

export default function DocumentosDemo() {
  const { t } = usePreferences();
  const [filter, setFilter] = useState<"all" | "albaran" | "factura">("all");

  const docs: Doc[] = [
    { name: "Distribuciones García — 03/07", type: "albaran", status: "done", total: "€284.50" },
    { name: "Distribuciones García — Factura Jun", type: "factura", status: "needs_review", total: "€1,204.00" },
    { name: "Carnicería Ruiz — 02/07", type: "albaran", status: "pending", total: "—" },
    { name: "Bebidas Costa — Factura Jun", type: "factura", status: "done", total: "€890.15" },
  ];

  const filtered = filter === "all" ? docs : docs.filter((d) => d.type === filter);

  return (
    <div className="my-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wide text-text-dim">
          {t("Try it — same list, two document types", "Pruébalo — misma lista, dos tipos de documento")}
        </div>
        <div className="flex overflow-hidden rounded-md border border-brd text-[10px]">
          {(["all", "albaran", "factura"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 font-bold capitalize ${filter === f ? "bg-gold text-bg" : "text-text-dim"}`}
            >
              {f === "all" ? t("All", "Todos") : f === "albaran" ? "Albaranes" : "Facturas"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brd bg-card">
        {filtered.map((d, i) => {
          const s = statusCfg[d.status];
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 ${i < filtered.length - 1 ? "border-b border-brd" : ""}`}
            >
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: d.type === "albaran" ? "rgba(14,165,233,0.15)" : "rgba(245,158,11,0.15)",
                  color: d.type === "albaran" ? "#0ea5e9" : "#F59E0B",
                }}
              >
                {d.type === "albaran" ? "📦 ALB" : "🧾 FAC"}
              </span>
              <span className="flex-1 truncate text-[13px] text-text">{d.name}</span>
              <span className="font-mono text-[12px] text-text-muted">{d.total}</span>
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]"
                style={{ background: s.bg, color: s.color }}
              >
                {s.icon}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-text-dim">
        {t(
          "ALB drives your stock and product history. FAC drives your accounting exports. Same list, different job.",
          "ALB impulsa tu stock e historial de productos. FAC impulsa tus exportaciones contables. Misma lista, función distinta."
        )}
      </p>
    </div>
  );
}
