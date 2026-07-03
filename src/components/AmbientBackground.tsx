import { motion } from "framer-motion";
import logo from "../assets/avanza-logo.png";

// Two soft light sources drift slowly for depth, and the real Avanza mark
// sits large and faint behind the hero content — a watermark, not a logo
// lockup, so it reads as texture rather than competing with the headline.
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-gold/[0.07] blur-[160px]"
        animate={{ x: [-40, 40, -40], y: [-20, 30, -20] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-10%", left: "10%" }}
      />
      <motion.div
        className="absolute h-[560px] w-[560px] rounded-full bg-blue/[0.06] blur-[160px]"
        animate={{ x: [30, -30, 30], y: [20, -25, 20] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-15%", right: "8%" }}
      />
      {/* Real marketing-site keyframes: butterfly-float for motion,
          gold-pulse for the glow breathing behind it — sized and positioned
          to stay clear of the card row so it reads as background texture,
          not something the cards are competing with. */}
      <div className="absolute left-1/2 top-[16%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] blur-[110px] animate-gold-pulse" />
      <img
        src={logo}
        alt=""
        className="absolute left-1/2 top-[16%] w-[480px] max-w-none -translate-x-1/2 -translate-y-1/2 animate-butterfly-float opacity-[0.07]"
        style={{ filter: "grayscale(1) brightness(2.2)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,26,15,0.55)_100%)]" />
    </div>
  );
}
