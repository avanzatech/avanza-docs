import { useState } from "react";
import { usePreferences } from "../../lib/LanguageContext";

// Faithful visual of the real Documentos export panel: one shared date range
// (from / to, defaulting 1st-of-month → today) feeding three separate XLSX
// exports — IVA (input tax), Sales, and Albaranes/invoice review. Grounded in
// FacturasTab: /audit/iva-export, /sales/export, /audit/invoices/export.

export default function ExportDemo() {
  const { t } = usePreferences();
  const [from, setFrom] = useState("2026-07-01");
  const [to, setTo] = useState("2026-07-04");
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const exports = [
    {
      id: "iva",
      icon: "🧾",
      name: t("IVA export", "Exportación IVA"),
      file: `Facturas_IVA_Soportado_${from}_${to}.xlsx`,
      desc: t(
        "Input-tax breakdown for your gestoría — supplier, base, VAT rate, VAT amount and total per factura.",
        "Desglose de IVA soportado para tu gestoría — proveedor, base, tipo de IVA, cuota y total por factura."
      ),
      color: "#5B8DEF",
    },
    {
      id: "sales",
      icon: "📈",
      name: t("Sales export", "Exportación de ventas"),
      file: `ventas_${from}_${to}.xlsx`,
      desc: t(
        "Your POS sales over the range — daily totals and takings, ready for your accountant or your own analysis.",
        "Tus ventas de TPV del periodo — totales diarios y recaudación, listos para tu gestor o tu propio análisis."
      ),
      color: "#22C55E",
    },
    {
      id: "albaranes",
      icon: "📦",
      name: t("Albaranes / invoice review", "Albaranes / revisión de facturas"),
      file: `albaranes_${from}_${to}.xlsx`,
      desc: t(
        "Line-by-line document audit — every item with lot number, expiry date and a link back to the original scan.",
        "Auditoría documento a documento — cada artículo con número de lote, caducidad y enlace al documento original."
      ),
      color: "#C9A84C",
    },
  ];

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-white/10" style={{ background: "linear-gradient(180deg,#0d2214 0%,#0a1a0f 100%)" }}>
      {/* date range */}
      <div className="border-b border-white/10 p-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-gold/70">
          {t("Date range", "Rango de fechas")}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex-1">
            <span className="mb-1 block text-[10px] text-white/40">{t("From", "Desde")}</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-2 text-[13px] text-white [color-scheme:dark]"
            />
          </label>
          <span className="mt-4 text-white/30">→</span>
          <label className="flex-1">
            <span className="mb-1 block text-[10px] text-white/40">{t("To", "Hasta")}</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-2 text-[13px] text-white [color-scheme:dark]"
            />
          </label>
        </div>
        <div className="mt-2 text-[11px] text-white/40">
          {t("The same range feeds all three exports below.", "El mismo rango alimenta las tres exportaciones de abajo.")}
        </div>
      </div>

      {/* three exports */}
      <div className="space-y-2.5 p-4">
        {exports.map((ex) => (
          <div key={ex.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5" style={{ borderLeft: `3px solid ${ex.color}` }}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{ex.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-white">{ex.name}</div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-white/55">{ex.desc}</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-white/45">.xlsx</span>
                  <span className="truncate font-mono text-[10px] text-white/35">{ex.file}</span>
                </div>
              </div>
              <button
                onClick={() => { setDownloaded(ex.id); setTimeout(() => setDownloaded(null), 1500); }}
                className="shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-black"
                style={{ background: ex.color }}
              >
                {downloaded === ex.id ? t("✓ Ready", "✓ Listo") : t("Export", "Exportar")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
