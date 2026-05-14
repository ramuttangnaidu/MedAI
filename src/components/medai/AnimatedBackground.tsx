import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent/25 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary-glow/20 blur-3xl"
        animate={{ scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
