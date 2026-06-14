"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus } from "lucide-react";

const PROFILE = `
╔══════════════════════════════════════════════╗
║         KHOIRUL UMAM — SYSTEM INFO           ║
╠══════════════════════════════════════════════╣
║  Name     : Khoirul Umam (Umam)              ║
║  Age      : 20 Years Old                     ║
║  Role     : Full-Stack Developer             ║
║             Mobile & Web Architect           ║
║             System Administrator             ║
║  Education: D4 RPL · Polindra               ║
║  Org      : KSR PMI Unit Polindra            ║
║             (Bidang Litbang)                 ║
║  Stack    : Flutter, Laravel, Next.js        ║
║             PostgreSQL, Drizzle, Debian      ║
╚══════════════════════════════════════════════╝`;

const HIRE_ME = `
╔══════════════════════════════════════════════╗
║           HIRE ME — CONTACT INFO             ║
╠══════════════════════════════════════════════╣
║  📧 Email   : umam@dev.id                    ║
║  💼 LinkedIn: linkedin.com/in/khoirulumam    ║
║  🐙 GitHub  : github.com/umam                ║
║  📍 Location: Indramayu, West Java, ID       ║
║                                              ║
║  Status : ✅ OPEN TO WORK                    ║
║  Prefer : Remote / Hybrid / On-site         ║
║  Notice : Flexible                           ║
╚══════════════════════════════════════════════╝`;

const HELP_TEXT = `
Available commands:
  whoami      — Display my profile & identity
  hire_me     — Show contact information
  skills      — List my tech stack
  projects    — List featured projects
  clear       — Clear terminal
  help        — Show this help message
  exit        — Close terminal`;

const SKILLS_TEXT = `
Tech Stack:
  Frontend  → Next.js, React, Tailwind CSS
  Mobile    → Flutter, Dart
  Backend   → Laravel, Node.js, PHP
  Database  → PostgreSQL, MySQL
  DevOps    → Debian Linux, Nginx, Docker, PM2
  Tools     → Git, Drizzle ORM, REST API`;

const PROJECTS_TEXT = `
Featured Projects:
  [1] Skilloka       — Regional LPK Aggregator
  [2] JuraganPakan   — Enterprise Supply Chain
                       (PT. Agung Jaya Abadi)
  [3] CampusCare     — Integrated Campus Services
                       (Politeknik Negeri Indramayu)`;

interface HistoryEntry {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", text: 'Type "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", text: `umam@portfolio:~$ ${cmd}` },
    ];

    switch (command) {
      case "whoami":
        newHistory.push({ type: "output", text: PROFILE });
        break;
      case "hire_me":
        newHistory.push({ type: "output", text: HIRE_ME });
        break;
      case "help":
        newHistory.push({ type: "output", text: HELP_TEXT });
        break;
      case "skills":
        newHistory.push({ type: "output", text: SKILLS_TEXT });
        break;
      case "projects":
        newHistory.push({ type: "output", text: PROJECTS_TEXT });
        break;
      case "clear":
        setHistory([{ type: "output", text: 'Type "help" to see available commands.' }]);
        setInput("");
        return;
      case "exit":
        setOpen(false);
        setHistory([{ type: "output", text: 'Type "help" to see available commands.' }]);
        return;
      case "":
        break;
      default:
        newHistory.push({
          type: "error",
          text: `bash: ${cmd}: command not found. Type "help" for commands.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        id="terminal-trigger"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm glass-cyan border-neon transition-all"
        style={{ color: "#00F0FF" }}
        title="Open Terminal"
      >
        <Terminal className="w-4 h-4" />
        <span className="hidden sm:inline">&gt;_</span>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-20 right-6 z-50 w-[90vw] sm:w-[520px] max-h-[420px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "rgba(5,5,5,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,240,255,0.2)",
              boxShadow: "0 0 60px rgba(0,240,255,0.12), 0 20px 80px rgba(0,0,0,0.6)",
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "rgba(0,240,255,0.12)" }}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#ef4444" }}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#f59e0b" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#22c55e" }}
                />
              </div>
              <span className="text-xs" style={{ color: "#374151" }}>
                bash — umam@portfolio — 72×28
              </span>
              <button
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-white"
                style={{ color: "#374151" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Output area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-0.5 text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => (
                <pre
                  key={i}
                  className="whitespace-pre-wrap font-mono leading-relaxed text-xs sm:text-sm"
                  style={{
                    color:
                      entry.type === "input"
                        ? "#00F0FF"
                        : entry.type === "error"
                        ? "#f87171"
                        : "#d1d5db",
                  }}
                >
                  {entry.text}
                </pre>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t"
              style={{ borderColor: "rgba(0,240,255,0.12)" }}
            >
              <span className="text-xs font-mono shrink-0" style={{ color: "#00F0FF" }}>
                umam@portfolio:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none text-xs sm:text-sm font-mono caret-cyan-400"
                style={{ color: "#f1f5f9" }}
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
