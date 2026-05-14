import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Send,
  Sparkles,
  History,
  Settings,
  HeartPulse,
  Loader2,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { Logo } from "@/components/medai/Logo";
import { AnimatedBackground } from "@/components/medai/AnimatedBackground";
import { HeroOrb } from "@/components/medai/HeroOrb";
import {
  MedicalResponseCard,
  type MedicalResponse,
} from "@/components/medai/MedicalResponseCard";
import { generateMedicalResponse } from "@/lib/medai.functions";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "MedAI Chat — AI Symptom Analysis" },
      {
        name: "description",
        content:
          "Chat with MedAI to receive structured, cautious guidance about your symptoms. Not a replacement for professional medical advice.",
      },
    ],
  }),
});

type ChatMessage =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; content: string; data?: MedicalResponse };

type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
};

const STORAGE_KEY = "medai_conversations_v1";
const ACTIVE_KEY = "medai_active_conv_v1";

const STARTERS = [
  "I've had a sore throat and mild fever since yesterday",
  "Sharp headache on one side for 2 days, sensitive to light",
  "Stomach pain after eating, mostly upper-right",
  "Persistent dry cough for over a week",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function ChatPage() {
  const callMedAI = useServerFn(generateMedicalResponse);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // hydrate from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const act = localStorage.getItem(ACTIVE_KEY);
      const list: Conversation[] = raw ? JSON.parse(raw) : [];
      setConversations(list);
      if (act && list.find((c) => c.id === act)) setActiveId(act);
      else if (list[0]) setActiveId(list[0].id);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
      if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    } catch {}
  }, [conversations, activeId]);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [active?.messages.length, loading]);

  function newChat() {
    const conv: Conversation = {
      id: uid(),
      title: "New consultation",
      createdAt: Date.now(),
      messages: [],
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    setInput("");
    setError(null);
  }

  function deleteChat(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);

    let convId = activeId;
    let conv = active;
    if (!conv) {
      conv = {
        id: uid(),
        title: trimmed.slice(0, 48),
        createdAt: Date.now(),
        messages: [],
      };
      convId = conv.id;
      setConversations((prev) => [conv!, ...prev]);
      setActiveId(convId);
    }

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              title: c.messages.length === 0 ? trimmed.slice(0, 48) : c.title,
              messages: [...c.messages, userMsg],
            }
          : c,
      ),
    );
    setInput("");
    setLoading(true);

    const history = [...(conv?.messages ?? []), userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await callMedAI({ data: { messages: history } });
      if ("error" in res && res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      const data = (res as { data: MedicalResponse }).data;
      const assistantMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: data.summary,
        data,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, assistantMsg] }
            : c,
        ),
      );
    } catch (e) {
      console.error(e);
      setError("Failed to reach MedAI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground flex">
      {/* Animated 3D ambient background */}
      <AnimatedBackground />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/60 shadow-glow"
            style={{
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* SIDEBAR */}
      <aside className="relative z-10 hidden md:flex w-72 shrink-0 flex-col border-r border-white/5 bg-sidebar/70 backdrop-blur-xl">
        <div className="p-4 flex items-center justify-between">
          <Logo size="sm" />
          <Link
            to="/"
            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5 text-muted-foreground"
            title="Back to landing"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="px-3">
          <button
            onClick={newChat}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-3 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition"
          >
            <Plus className="h-4 w-4" /> New consultation
          </button>
        </div>

        <div className="mt-5 px-3">
          <div className="px-2 mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <History className="h-3 w-3" /> Previous chats
          </div>
          <div className="space-y-1 max-h-[40vh] overflow-y-auto pr-1">
            {conversations.length === 0 && (
              <div className="px-3 py-2 text-xs text-muted-foreground">
                No conversations yet.
              </div>
            )}
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`group w-full text-left rounded-lg px-3 py-2 text-sm transition flex items-center justify-between gap-2 ${
                  c.id === activeId
                    ? "bg-white/[0.07] text-foreground"
                    : "text-muted-foreground hover:bg-white/[0.04]"
                }`}
              >
                <span className="truncate">{c.title || "Untitled"}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(c.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-severity-emergency transition"
                  role="button"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 px-3">
          <div className="rounded-xl glass p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <HeartPulse className="h-4 w-4 text-primary" /> Health insights
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              MedAI provides cautious, structured guidance — never a diagnosis. Always
              consult a doctor for medical decisions.
            </p>
          </div>
        </div>

        <div className="mt-auto p-3">
          <button className="w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.04]">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </aside>

      {/* CHAT AREA */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/5">
          <Logo size="sm" />
          <button
            onClick={newChat}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollerRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 md:px-6 py-8">
            {(!active || active.messages.length === 0) && (
              <EmptyState onPick={(t) => send(t)} />
            )}

            <AnimatePresence initial={false}>
              {active?.messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`mb-6 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-primary px-4 py-3 text-sm text-primary-foreground shadow-glow">
                      {m.content}
                    </div>
                  ) : (
                    <div className="w-full max-w-[95%]">
                      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        MedAI assessment
                      </div>
                      {m.data ? (
                        <MedicalResponseCard data={m.data} />
                      ) : (
                        <div className="rounded-2xl glass p-4 text-sm">{m.content}</div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && <TypingIndicator />}

            {error && (
              <div className="mb-4 rounded-xl border border-severity-emergency/30 bg-severity-emergency/10 px-4 py-3 text-sm text-severity-emergency">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-white/5 bg-background/60 backdrop-blur-xl">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl px-4 md:px-6 py-4"
          >
            <div className="flex items-end gap-2 rounded-2xl glass-strong p-2 shadow-elegant focus-within:ring-2 focus-within:ring-primary/40 transition">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Describe your symptoms in detail…"
                className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none max-h-40"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.05] transition"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              MedAI is informational only and does not replace professional medical advice.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (t: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-glow animate-float">
        <Sparkles className="h-7 w-7 text-primary-foreground" />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        How are you feeling today?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Describe your symptoms in your own words. MedAI will respond with a structured,
        cautious analysis.
      </p>
      <div className="mt-8 grid gap-2 sm:grid-cols-2 max-w-xl mx-auto">
        {STARTERS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="text-left rounded-xl glass p-3 text-sm hover:bg-white/[0.07] hover:scale-[1.01] transition"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6"
    >
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        MedAI is thinking…
      </div>
      <div className="rounded-2xl glass p-4 inline-flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
