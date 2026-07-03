import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/avanza-logo.png";

// Plays once per session: the full Avanza mark emerges center-screen (fade +
// scale + a gleam sweep), holds a beat, then the whole overlay lifts away —
// at which point the landing content (headline, cards) staggers in. Uses a
// sessionStorage flag so returning navigations within the session don't
// replay it and feel slow.

const SEEN_KEY = "avanza-docs-intro-seen";

export default function LogoIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    const t = setTimeout(() => {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
      setVisible(false);
      onDone();
    }, 2200);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* gold pulse glow behind the mark */}
          <motion.div
            className="absolute h-[520px] w-[520px] rounded-full bg-gold/[0.16] blur-[130px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.86, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={logo}
              alt="Avanza"
              className="w-[440px] max-w-[80vw]"
              style={{ filter: "grayscale(1) brightness(2.2)" }}
            />
            {/* gleam sweep across the mark */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.6) 50%, transparent 58%)",
                backgroundSize: "250% 100%",
                mixBlendMode: "overlay",
              }}
              initial={{ backgroundPosition: "150% 0" }}
              animate={{ backgroundPosition: "-50% 0" }}
              transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
