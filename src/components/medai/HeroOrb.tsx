import { motion } from "framer-motion";
import { Activity, Heart, Brain, Stethoscope, ShieldCheck, Sparkles } from "lucide-react";

const orbitItems = [
  { icon: Heart, angle: 0, color: "from-rose-400 to-rose-600" },
  { icon: Brain, angle: 60, color: "from-violet-400 to-fuchsia-500" },
  { icon: Stethoscope, angle: 120, color: "from-cyan-300 to-sky-500" },
  { icon: ShieldCheck, angle: 180, color: "from-emerald-300 to-teal-500" },
  { icon: Sparkles, angle: 240, color: "from-amber-300 to-orange-400" },
  { icon: Activity, angle: 300, color: "from-primary to-primary-glow" },
];

export function HeroOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Outer rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ inset: `${i * 6}%` }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Glow center */}
      <div className="absolute inset-[18%] rounded-full bg-gradient-primary opacity-90 blur-2xl animate-pulse-glow" />

      {/* Core */}
      <motion.div
        className="absolute inset-[24%] rounded-full glass-strong shadow-elegant grid place-items-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-primary/30" />
        <div className="relative grid place-items-center">
          <div className="rounded-full bg-background/40 backdrop-blur p-5 ring-1 ring-white/15">
            <Activity className="h-12 w-12 text-primary" strokeWidth={2.4} />
          </div>
          <div className="absolute -inset-6 rounded-full border border-primary/30 animate-ping" />
        </div>
      </motion.div>

      {/* Orbiting icons */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {orbitItems.map(({ icon: Icon, angle, color }, idx) => {
          const rad = (angle * Math.PI) / 180;
          const r = 46; // % radius
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <motion.div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${color} shadow-glow`}>
                <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 31) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
