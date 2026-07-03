import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

type Props = {
  eyebrowDot: string;
  glowColor: string; // rgba string
  name: string;
  subtitle: string;
  desc: string;
  cta: string;
  onClick: () => void;
  delay: number;
};

export default function ProductCard({ eyebrowDot, glowColor, name, subtitle, desc, cta, onClick, delay }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-[22px] border border-brd bg-card p-9 text-left backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/10"
    >
      {/* cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${glowX} ${glowY}, ${glowColor}, transparent 70%)`,
        }}
      />
      {/* animated border shimmer on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${glowColor}` }}
      />

      <div className="relative">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${eyebrowDot}`} />
        <h2 className="mt-7 font-display text-[26px] font-semibold leading-tight text-text">{name}</h2>
        <p className="mt-1.5 text-[13px] font-medium text-gold-light">{subtitle}</p>
        <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-text-muted">{desc}</p>
        <div className="mt-10 flex items-center gap-2 text-[13px] font-medium text-text">
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </div>
      </div>
    </motion.button>
  );
}
