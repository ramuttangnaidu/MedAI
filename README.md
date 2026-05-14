# MedAI — AI Healthcare Assistant

> A futuristic, production-grade AI healthcare assistant that turns symptoms into structured, easy-to-understand medical guidance.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-doc--ai-green?style=for-the-badge)](https://doc-ai-web.lovable.app)
>
 🔗 **🌐 URL:** [`https://doc-ai-web.lovable.app`](https://doc-ai-web.lovable.app)
---

## ✨ Overview

**MedAI** is a modern AI-powered healthcare assistant built as a premium SaaS-style web application. Users can describe their symptoms in natural language and receive structured, AI-generated medical guidance — including possible conditions, severity assessment, precautions, OTC suggestions, lifestyle recommendations, and emergency warnings.

The platform is designed to feel like a real next-generation healthcare startup: smooth animations, glassmorphism UI, 3D-style visuals, and a polished chat experience.

> ⚠️ **Disclaimer:** MedAI provides AI-generated informational guidance only. It is **not** a substitute for professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare provider for medical concerns.

---

## 🚀 Features

- 🧠 **Gemini-powered medical AI** with structured JSON tool responses
- 🩺 **Severity classification** — low, medium, high, emergency (color-coded)
- 📋 **Structured guidance** — possible conditions, precautions, OTC suggestions, lifestyle tips
- 💬 **Premium chat experience** with animated message bubbles and typing states
- 🗂️ **Chat history** persisted locally for quick access
- 🌌 **Animated 3D-style hero** with glowing orb and ambient backgrounds
- 📱 **Fully responsive** across mobile, tablet, and desktop
- ⚡ **Fast SSR** powered by TanStack Start on the edge

---

## 🛠️ Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4 with OKLCH design tokens
- **Animation:** Framer Motion
- **UI Primitives:** shadcn/ui + Radix UI
- **AI:** Google Gemini 2.5 Flash via Lovable AI Gateway
- **Backend:** TanStack server functions (edge runtime)
- **Deployment:** Lovable Cloud

---

## 📂 Project Structure

```
src/
├── components/
│   ├── medai/              # Hero orb, animated background, response card, logo
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   └── medai.functions.ts  # Server function for Gemini medical AI
├── routes/
│   ├── __root.tsx          # Root layout
│   ├── index.tsx           # Landing page
│   └── chat.tsx            # Chat dashboard
└── styles.css              # Design tokens & theme
```

---

## 🧑‍💻 Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173`.

---

## 🌍 Live Deployment

Try MedAI now: **[https://doc-ai-web.lovable.app](https://doc-ai-web.lovable.app)**

---

## 📜 License

This project is provided for educational and demonstration purposes.
