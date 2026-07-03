import { motion } from "framer-motion";

// One job: quiet depth behind the content. Two soft light sources drifting
// very slowly — nothing else. The logo already has its moment in LogoIntro;
// repeating it here as a watermark was two signatures competing for the
// same attention, which read as clutter rather than richness.
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[560px] w-[560px] rounded-full bg-gold/[0.06] blur-[150px]"
        animate={{ x: [-40, 40, -40], y: [-20, 30, -20] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-12%", left: "8%" }}
      />
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full bg-blue/[0.05] blur-[150px]"
        animate={{ x: [30, -30, 30], y: [20, -25, 20] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-16%", right: "6%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,26,15,0.5)_100%)]" />
    </div>
  );
}
