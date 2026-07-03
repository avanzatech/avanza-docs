import logo from "../assets/avanza-logo.png";

export default function LogoGleam({ size = 32 }: { size?: number }) {
  return (
    <span className="relative inline-block" style={{ height: size }}>
      <img src={logo} alt="Avanza" style={{ height: size, width: "auto", display: "block", filter: "brightness(2.4) contrast(0.9)" }} />
      <span
        className="pointer-events-none absolute inset-0 animate-[gleam_4s_ease-in-out_infinite]"
        style={{
          background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
          backgroundSize: "250% 100%",
          mixBlendMode: "overlay",
        }}
      />
    </span>
  );
}
