import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

type Props = {
  eyebrowDot: string;
  glowColor: string;
  name: string;
  subtitle: string;
  desc: string;
  cta: string;
  onClick: () => void;
  delay: number;
  image?: string;
};

export default function ProductCard({ eyebrowDot, glowColor, name, subtitle, desc, cta, onClick, delay, image }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), spring);
  // Content floats on its own, shallower axis than the card shell — this is
  // what actually reads as "3D glass" rather than a flat card that tilts.
  const contentX = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const contentY = useSpring(useTransform(my, [0, 1], [-6, 6]), spring);
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
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[24px] border p-9 text-left backdrop-blur-2xl transition-[border-color,box-shadow,transform] duration-300"
    >
      {/* image background — real product screenshot, not a flat color wash,
          when one is provided. Parallax zoom on hover matches the reference
          card pattern; a bottom-anchored scrim keeps the text legible over
          busy image detail without hiding the art entirely. */}
      {image ? (
        <>
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: `linear-gradient(180deg, rgba(10,26,15,0.15) 0%, rgba(10,26,15,0.55) 55%, rgba(10,26,15,0.92) 100%), linear-gradient(155deg, ${glowColor}, transparent 60%)`,
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(155deg, ${glowColor}, transparent 55%), linear-gradient(155deg, rgba(255,255,255,0.05), rgba(14,38,22,0.4))`,
          }}
        />
      )}
      {/* resting border + shadow tinted to the product color, intensifies on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-shadow duration-300 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{ boxShadow: `inset 0 0 0 1px ${glowColor.replace(/[\d.]+\)$/, "0.4)")}` }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(380px circle at ${glowX} ${glowY}, ${glowColor.replace(/[\d.]+\)$/, "0.5)")}, transparent 70%)` }}
      />
      {/* top edge highlight — the detail that sells "glass" over "card" */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
      />

      <motion.div style={{ x: contentX, y: contentY }} className="relative">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${eyebrowDot}`} />
        <h2 className="mt-7 font-display text-[26px] font-semibold leading-tight text-text">{name}</h2>
        <p className="mt-1.5 text-[13px] font-medium text-gold-light">{subtitle}</p>
        <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-text-muted">{desc}</p>
        <div className="mt-10 flex items-center gap-2 text-[13px] font-medium text-text">
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </div>
      </motion.div>
    </motion.button>
  );
}
