import { useState } from "react";
import { Card, Btn, Input, Toggle } from "../avanza-ui/primitives";
import { usePreferences } from "../../lib/LanguageContext";

// A faithful, working reproduction of the real InventoryCard config flow —
// same status-pill logic, same border-urgency coloring, same save/confirm
// pattern — running on local demo state instead of the live API, so it's
// safe to click through in documentation. This is the "learn by doing"
// piece for the Productos article: the reader sets a real threshold and
// order quantity and sees exactly what the product does with it.

export default function ProductCardDemo() {
  const { t } = usePreferences();
  const [hasSupplier, setHasSupplier] = useState(true);
  const [configOpen, setConfigOpen] = useState(false);
  const [thresholdQty, setThresholdQty] = useState("5");
  const [orderQty, setOrderQty] = useState("24");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(true);

  // Same 4-state pill logic as the real card, simplified to a demo stock level.
  const stock = 3;
  const threshold = parseFloat(thresholdQty) || 0;
  const pill = !hasSupplier
    ? { label: t("No supplier", "Sin proveedor"), color: "#6B6758", bg: "transparent", border: "1px solid rgba(201,168,76,0.10)" }
    : stock <= 0
    ? { label: t("OUT", "AGOTADO"), color: "#fff", bg: "#EF4444", border: "none" }
    : stock <= threshold
    ? { label: t("Reorder now", "Pedir ahora"), color: "#fff", bg: "#F59E0B", border: "none" }
    : { label: t("OK", "OK"), color: "#22C55E", bg: "rgba(34,197,94,0.12)", border: "none" };

  const borderAccent = !hasSupplier ? undefined : stock <= 0 ? "#EF4444" : stock <= threshold ? "#F59E0B" : undefined;

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => { setSaved(false); setConfigOpen(false); }, 900);
    }, 500);
  };

  return (
    <div className="my-5">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-text-dim">
        {t("Try it — this is a live demo, not a screenshot", "Pruébalo — es una demo interactiva, no una captura")}
      </div>
      <Card accent={borderAccent} style={{ padding: "13px 15px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#E8E4D9" }}>Estrella Galicia 33cl</div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              padding: "3px 8px",
              borderRadius: 8,
              color: pill.color,
              background: pill.bg,
              border: pill.border,
              letterSpacing: 0.5,
            }}
          >
            {pill.label}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#9E9A8A", marginBottom: 10 }}>
          {t(`Stock: ${stock} units`, `Stock: ${stock} unidades`)} · {hasSupplier ? "Distribuciones García" : t("no supplier linked", "sin proveedor vinculado")}
        </div>

        {!hasSupplier ? (
          <Btn variant="ghost" onClick={() => setHasSupplier(true)}>
            {t("Link a supplier to enable ordering →", "Vincular un proveedor para poder pedir →")}
          </Btn>
        ) : !configOpen ? (
          <Btn variant="ghost" onClick={() => setConfigOpen(true)}>
            {t("Set reorder threshold →", "Configurar umbral de pedido →")}
          </Btn>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-2">
              <Input label={t("Threshold qty", "Umbral")} value={thresholdQty} onChange={setThresholdQty} type="number" />
              <Input label={t("Order qty", "Cant. a pedir")} value={orderQty} onChange={setOrderQty} type="number" />
            </div>
            <div className="mb-3">
              <Toggle on={enabled} onClick={() => setEnabled((e) => !e)} label={enabled ? t("Auto-draft on", "Borrador automático activo") : t("Auto-draft off", "Borrador automático desactivado")} />
            </div>
            <div className="flex gap-2">
              <Btn variant="primary" onClick={save} disabled={saving}>
                {saved ? t("Saved ✓", "Guardado ✓") : saving ? t("Saving…", "Guardando…") : t("Save", "Guardar")}
              </Btn>
              <Btn variant="ghost" onClick={() => setConfigOpen(false)}>{t("Cancel", "Cancelar")}</Btn>
            </div>
          </div>
        )}
      </Card>
      <p className="mt-2 text-xs text-text-dim">
        {t(
          "Drop the stock number in your head below the threshold and imagine what happens next: a draft order for the quantity you set appears in Pedidos — waiting for you, not sent automatically.",
          "Baja mentalmente el stock por debajo del umbral e imagina qué pasa después: aparece un borrador de pedido en Pedidos por la cantidad que configuraste — esperándote, no enviado automáticamente."
        )}
      </p>
    </div>
  );
}
