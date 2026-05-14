import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Activity,
  Zap,
  HeartPulse,
  MessageSquare,
  ListChecks,
  CheckCircle2,
} from "lucide-react";
import { AnimatedBackground } from "@/components/medai/AnimatedBackground";
import { HeroOrb } from "@/components/medai/HeroOrb";
import { Logo } from "@/components/medai/Logo";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "MedAI — Futuristic AI Healthcare Assistant" },
      {
        name: "description",
        content:
          "MedAI is an AI-powered healthcare assistant that analyzes symptoms, suggests precautions, and guides you toward safe, professional care.",
      },
      { property: "og:title", content: "MedAI — Futuristic AI Healthcare Assistant" },
      {
        property: "og:description",
        content:
          "Describe your symptoms and get cautious, structured AI guidance. MedAI never replaces a doctor.",
      },
    ],
  }),
});

const features = [
  {
    icon: Brain,
    title: "Symptom intelligence",
    desc: "Multi-step reasoning over your symptoms with structured, cautious analysis.",
  },
  {
    icon: ShieldCheck,
    title: "Safety first",
    desc: "Detects emergencies and never replaces a real doctor — always errs on the safe side.",
  },
  {
    icon: ListChecks,
    title: "Structured insights",
    desc: "Possible conditions, severity, precautions, OTC tips, and lifestyle in one view.",
  },
  {
    icon: Zap,
    title: "Real-time replies",
    desc: "Powered by frontier Gemini models through a secure backend.",
  },
];

const steps = [
  { icon: MessageSquare, title: "Describe symptoms", desc: "Tell MedAI what you're feeling, in plain language." },
  { icon: Brain, title: "AI analysis", desc: "MedAI reasons through possible conditions and severity." },
  { icon: HeartPulse, title: "Structured guidance", desc: "Get precautions, lifestyle and OTC suggestions." },
  { icon: Stethoscope, title: "When to see a doctor", desc: "MedAI tells you exactly when to seek professional care." },
];

const benefits = [
  "Cautious, doctor-aware tone",
  "Emergency detection",
  "Severity color system",
  "Structured AI responses",
  "Beautiful, distraction-free UI",
  "Fast Gemini-powered replies",
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatedBackground />

      {/* NAV */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#preview" className="hover:text-foreground transition-colors">Preview</a>
          </nav>
          <Link
            to="/chat"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition"
          >
            Launch MedAI
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 md:pt-16 md:pb-32 grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Powered by Gemini AI
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
              Your futuristic{" "}
              <span className="text-gradient">AI healthcare</span> assistant.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Describe your symptoms and MedAI returns structured, cautious guidance —
              possible conditions, severity, precautions, and clear advice on when to
              consult a doctor.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition"
              >
                Start free analysis
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-base font-medium hover:bg-white/5 transition"
              >
                How it works
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Never replaces a doctor</div>
              <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Emergency aware</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <HeroOrb />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Capabilities</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              An AI assistant built for <span className="text-gradient">medical caution</span>.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative rounded-2xl glass p-6 hover:bg-white/[0.06] transition"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">How it works</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              From symptom to <span className="text-gradient">structured guidance</span> in seconds.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative rounded-2xl glass p-6"
              >
                <div className="absolute right-4 top-4 font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl glass-strong p-6 shadow-elegant"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-severity-emergency/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-severity-medium/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-severity-low/70" />
              <div className="ml-2 text-xs text-muted-foreground font-mono">medai · symptom analysis</div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.04] p-4 text-sm">
                "I've had a sore throat and mild fever since yesterday."
              </div>
              <div className="rounded-2xl glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-severity-low/15 text-severity-low border border-severity-low/30 px-2.5 py-1 text-xs font-medium">
                    <Activity className="h-3 w-3" /> Low severity
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    Confidence
                    <div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[72%] bg-severity-low" />
                    </div>
                    72%
                  </div>
                </div>
                <p className="text-sm">Likely a mild viral upper respiratory infection. Rest, fluids, and monitoring symptoms is usually sufficient.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Hydrate frequently", "Warm salt-water gargle", "Rest 24–48h", "Avoid spreading"].map((t) => (
                  <div key={t} className="rounded-xl glass px-3 py-2.5 text-xs flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Built for trust</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              Premium AI experience, <span className="text-gradient">designed to be safe</span>.
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every response is structured, cautious, and includes a clear disclaimer. MedAI is a guide — never a substitute for professional care.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/chat"
              className="mt-8 group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition"
            >
              Try MedAI now
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14 text-center shadow-elegant">
            <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-20" />
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Ready to talk to <span className="text-gradient">MedAI</span>?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Describe your symptoms and receive a thoughtful, cautious AI assessment in seconds.
            </p>
            <Link
              to="/chat"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-base font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition"
            >
              Start your analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>· AI healthcare guidance</span>
          </div>
          <div>© {new Date().getFullYear()} MedAI. Not a substitute for medical advice.</div>
        </div>
      </footer>
    </div>
  );
}
