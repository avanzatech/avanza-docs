import { useState } from "react";
import { Card, AnimNum } from "../avanza-ui/primitives";
import { usePreferences } from "../../lib/LanguageContext";

// A faithful recreation of the real Sales tab (which is what actually opens
// first — there's no separate "Dashboard" screen). Same hero revenue card
// with the count-up animation, same four-card stat row, same cost-vs-sales
// margin bar with the animated width transition. Demo data, real motion.

export default function DashboardDemo() {
  const { t } = usePreferences();
  const [day, setDay] = useState<"good" | "slow">("good");

  const data = {
    good: { revenue: 1847.5, delta: 12.4, items: 63, week: 9820, month: 41200, ticket: 29.3, cost: 5100 },
    slow: { revenue: 612.8, delta: -8.1, items: 22, week: 9820, month: 41200, ticket: 27.9, cost: 5100 },
  }[day];

  const margin = Math.round(((data.week - data.cost) / data.week) * 100);
  const costPct = Math.min((data.cost / data.week) * 100, 100);

  const stats = [
    { l: t("This week", "Semana"), v: data.week, c: "#22C55E", s: "7 " + t("days", "días"), ic: "📊" },
    { l: t("This month", "Mes"), v: data.month, c: "#F59E0B", s: t("Month", "Mes"), ic: "📅" },
    { l: t("Avg ticket", "Ticket medio"), v: data.ticket, c: "#A855F7", s: "/" + t("txn", "tkt"), ic: "🎫" },
    { l: t("Daily avg", "Media diaria"), v: data.week / 7, c: "#3B82F6", s: "/" + t("day", "día"), ic: "📈" },
  ];

  return (
    <div className="my-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wide text-text-dim">
          {t("Try it — a real, live-updating dashboard", "Pruébalo — un panel real, actualizado en vivo")}
        </div>
        <div className="flex overflow-hidden rounded-md border border-brd">
          <button
            onClick={() => setDay("good")}
            className={`px-2.5 py-1 text-[10px] font-bold ${day === "good" ? "bg-gold text-bg" : "text-text-dim"}`}
          >
            {t("Good day", "Buen día")}
          </button>
          <button
            onClick={() => setDay("slow")}
            className={`px-2.5 py-1 text-[10px] font-bold ${day === "slow" ? "bg-gold text-bg" : "text-text-dim"}`}
          >
            {t("Slow day", "Día flojo")}
          </button>
        </div>
      </div>

      <Card style={{ padding: "26px 20px", textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#6B6758", textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 12 }}>
          {t("Yesterday", "Ayer")}
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -3, lineHeight: 1, color: "#F5EDD4", fontFamily: "'DM Mono',monospace" }}>
          <AnimNum value={data.revenue} prefix="€" />
        </div>
        <div style={{ fontSize: 12, color: "#9E9A8A", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ opacity: 0.7 }}>{data.items} {t("transactions", "tickets")}</span>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 10,
              fontSize: 10,
              fontWeight: 700,
              background: data.delta > 0 ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
              color: data.delta > 0 ? "#22C55E" : "#EF4444",
            }}
          >
            {data.delta > 0 ? "▲" : "▼"} {Math.abs(data.delta).toFixed(1)}%
          </span>
        </div>
      </Card>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {stats.map((k, i) => (
          <Card key={i} accent={k.c} style={{ padding: "12px 14px", minWidth: 128, flex: "0 0 auto" }}>
            <div className="flex items-start justify-between">
              <div style={{ fontSize: 8, fontWeight: 700, color: "#6B6758", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
                {k.l}
              </div>
              <span style={{ fontSize: 13, opacity: 0.4 }}>{k.ic}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#E8E4D9", fontFamily: "'DM Mono',monospace" }}>
              <AnimNum value={k.v} prefix="€" duration={1000 + i * 150} />
            </div>
            <div style={{ fontSize: 9, color: "#6B6758", marginTop: 4 }}>{k.s}</div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: "14px 16px" }}>
        <div className="mb-2 flex items-center justify-between">
          <span style={{ fontSize: 10, color: "#6B6758", fontWeight: 600 }}>{t("This week", "Esta semana")}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: 6,
              color: margin > 60 ? "#22C55E" : margin > 30 ? "#F59E0B" : "#EF4444",
              background: margin > 60 ? "rgba(34,197,94,0.12)" : margin > 30 ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
            }}
          >
            {margin}% {t("margin", "margen")}
          </span>
        </div>
        <div style={{ height: 5, background: "rgba(201,168,76,0.10)", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${costPct}%`,
              background: "linear-gradient(90deg,#EF444480,#F59E0B80)",
              borderRadius: 3,
              transition: "width 1s ease",
            }}
          />
        </div>
        <div style={{ fontSize: 8, color: "#6B6758", marginTop: 6, opacity: 0.7 }}>
          {t("Revenue vs. what you spent on invoices this week", "Ventas frente a lo gastado en facturas esta semana")}
        </div>
      </Card>

      <p className="mt-3 text-xs text-text-dim">
        {t(
          "Switch between Good day / Slow day above — every number, including the margin bar, recalculates the same way it does in the real app.",
          "Cambia entre Buen día / Día flojo arriba — cada número, incluida la barra de margen, se recalcula igual que en la app real."
        )}
      </p>
    </div>
  );
}
