import { motion, AnimatePresence } from "framer-motion";
import { ParticleTextEffect } from "./ParticleTextEffect";
import { usePreferences } from "../lib/LanguageContext";

type Props = { open: boolean; onClose: () => void };

// Same full-screen, centered treatment as LogoIntro (dark bg, soft gold
// glow behind the focal element) but dismissible rather than a one-time
// load animation — this fires on demand when a locked card is clicked.
export default function ComingSoonOverlay({ open, onClose }: Props) {
  const { t } = usePreferences();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          onClick={onClose}
        >
          <motion.div
            className="absolute h-[60vh] w-[60vh] rounded-full bg-blue/[0.14] blur-[150px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <motion.div
            className="relative h-[42vh] w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParticleTextEffect
              text={t("COMING SOON", "PRÓXIMAMENTE")}
              colors={["8FB2F5", "5B8DEF", "A855F7", "5B8DEF", "8FB2F5"]}
              particleDensity={3}
              animationForce={60}
            />
          </motion.div>

          <motion.p
            className="absolute bottom-16 font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("Avanza Impulse — tap anywhere to close", "Avanza Impulse — toca para cerrar")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
