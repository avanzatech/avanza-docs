import { motion } from "framer-motion";

// Two soft light sources that drift very slowly — gives the page depth and
// a sense of life without ever drawing attention to itself. No particles
// (they tend to read as "trying too hard" at this scale); the two-source
// drift alone is enough to break up a flat background.
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,26,15,0.4)_100%)]" />
    </div>
  );
}
