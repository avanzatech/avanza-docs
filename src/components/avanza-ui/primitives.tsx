import type { ReactNode, CSSProperties } from "react";

// Ported directly from App.jsx's Card/Btn/Input/Toggle — same structure and
// interaction logic, restyled onto our CSS-var token set (which already
// matches App.jsx's `C` palette 1:1: gold/green/red/amber/bg/card/brd).
// This is the shared vocabulary the interactive demos below are built from,
// so a demo genuinely looks and behaves like the real product, not a
// redrawn approximation of it.

export function Card({
  children,
  style,
  accent,
  alert,
}: {
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
  alert?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(14,38,22,0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${alert ? "rgba(239,68,68,0.3)" : "rgba(201,168,76,0.10)"}`,
        borderLeft: accent ? `3px solid ${accent}` : undefined,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Btn({
  onClick,
  children,
  disabled,
  variant = "primary",
  style,
}: {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "ghost" | "danger" | "green";
  style?: CSSProperties;
}) {
  const base: CSSProperties = {
    padding: "10px 16px",
    borderRadius: 12,
    border: "none",
    fontWeight: 700,
    fontSize: 11,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s",
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: "linear-gradient(135deg,#C9A84C,#8B7332)", color: "#0A1A0F" },
    ghost: { background: "transparent", border: "1px solid rgba(201,168,76,0.10)", color: "#9E9A8A" },
    danger: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#EF4444" },
    green: { background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)", color: "#22C55E" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && (
        <label
          style={{
            fontSize: 8,
            fontWeight: 600,
            color: "#6B6758",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            display: "block",
            marginBottom: 4,
          }}
        >
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          background: "#0A1A0F",
          border: "1px solid rgba(201,168,76,0.10)",
          color: "#E8E4D9",
          fontSize: 12,
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button
        onClick={onClick}
        style={{
          width: 34,
          height: 18,
          borderRadius: 9,
          border: "none",
          cursor: "pointer",
          background: on ? "#22C55E" : "rgba(107,103,88,0.4)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 2,
            left: on ? 18 : 2,
            transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
      </button>
      {label && <span style={{ fontSize: 8, color: on ? "#22C55E" : "#6B6758", fontWeight: 600 }}>{label}</span>}
    </div>
  );
}
