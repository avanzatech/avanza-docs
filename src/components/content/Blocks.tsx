import { useState, type ReactNode } from "react";

const calloutStyles = {
  info: { border: "border-blue/30", bg: "bg-blue/5", icon: "ℹ" },
  success: { border: "border-green/30", bg: "bg-green/5", icon: "✓" },
  warning: { border: "border-amber/30", bg: "bg-amber/5", icon: "⚠" },
  tip: { border: "border-gold/30", bg: "bg-gold/5", icon: "💡" },
  note: { border: "border-brd", bg: "bg-card", icon: "✎" },
} as const;

export function Callout({ type = "note", title, children }: { type?: keyof typeof calloutStyles; title?: string; children: ReactNode }) {
  const s = calloutStyles[type];
  return (
    <div className={`my-4 rounded-lg border ${s.border} ${s.bg} px-4 py-3`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-sm">{s.icon}</span>
        <div className="min-w-0 flex-1">
          {title && <div className="mb-1 text-sm font-semibold text-text">{title}</div>}
          <div className="text-sm leading-relaxed text-text-muted [&_p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function StepCard({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div className="my-4 flex gap-4 rounded-lg border border-brd bg-card px-4 py-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 font-mono text-xs font-medium text-gold-light">
        {number}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 text-sm font-semibold text-text">{title}</div>
        <div className="text-sm leading-relaxed text-text-muted [&_p]:m-0">{children}</div>
      </div>
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <ul className="my-4 flex flex-col gap-2 rounded-lg border border-brd bg-card p-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <button
            onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
              checked[i] ? "border-green bg-green text-bg" : "border-brdHi text-transparent"
            }`}
          >
            ✓
          </button>
          <span className={checked[i] ? "text-text-dim line-through" : "text-text-muted"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Expandable({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-brd bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-text"
      >
        {title}
        <span className={`text-text-dim transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="border-t border-brd px-4 py-3 text-sm leading-relaxed text-text-muted">{children}</div>}
    </div>
  );
}
