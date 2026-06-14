"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "root@debian:~# chmod +x start_portfolio.sh", delay: 0 },
  { text: "root@debian:~# ./start_portfolio.sh", delay: 350 },
  { text: "", delay: 600 },
  { text: "[  OK  ] Starting Khoirul Umam's Portfolio Service...", delay: 800, color: "#4ade80" },
  { text: "[  OK  ] Loading kernel modules: next.js framer-motion three.js", delay: 1200, color: "#4ade80" },
  { text: "[  OK  ] Mounting PostgreSQL @ /lib/db ... [schema: verified]", delay: 1600, color: "#4ade80" },
  { text: "[  OK  ] Drizzle ORM: 3 tables detected (projects, skills, inquiries)", delay: 2000, color: "#4ade80" },
  { text: "[ WARN ] Hidden admin panel detected — credentials required", delay: 2400, color: "#facc15" },
  { text: "[  OK  ] Tailwind CSS v3 + Framer Motion ... ready", delay: 2800, color: "#4ade80" },
  { text: "[  OK  ] Three.js renderer ... initialized", delay: 3100, color: "#4ade80" },
  { text: "[  OK  ] Uptime: 99.9% — Hosted independently on Debian 13 VPS", delay: 3400, color: "#4ade80" },
  { text: "", delay: 3700 },
  { text: "✦ Identity loaded: Khoirul Umam | Full-Stack Developer", delay: 3900, color: "#00F0FF" },
  { text: "✦ Launching immersive portfolio experience...", delay: 4400, color: "#00F0FF" },
];

interface BootLine {
  text: string;
  color?: string;
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<BootLine[]>([]);
  const [cursorOn, setCursorOn] = useState(true);
  const [exiting, setExiting] = useState(false);

  // FIX: simpan onComplete di ref agar useEffect tidak perlu ia sebagai
  // dependency. Kalau onComplete masuk deps, setiap render parent yang
  // membuat fungsi baru (tanpa useCallback) akan restart semua timer.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const blink = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, { text: line.text, color: line.color }]);
      }, line.delay);
      timers.push(t);
    });

    const exitTimer = setTimeout(() => {
      setExiting(true);
      // FIX: panggil via ref, bukan closure langsung
      setTimeout(() => onCompleteRef.current(), 900);
    }, 5400);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // deps kosong: timer hanya dipasang sekali saat mount

  const progress = Math.min(Math.round((visibleLines.length / BOOT_LINES.length) * 100), 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(16px)" }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-center px-8 sm:px-16 lg:px-32 overflow-hidden select-none"
          style={{ backgroundColor: "#050505", fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
        >
          {/* CRT scan lines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.012) 2px, rgba(0,240,255,0.012) 4px)",
            }}
          />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #00F0FF, transparent)" }} />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #0055FF, transparent)" }} />

          {/* Terminal window chrome */}
          <div className="mb-5 flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f59e0b", boxShadow: "0 0 6px #f59e0b" }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
            <span className="ml-4 text-xs" style={{ color: "#374151" }}>
              bash — umam@debian: ~/portfolio — 120×40
            </span>
          </div>

          {/* Output lines */}
          <div className="space-y-[3px] text-sm sm:text-[15px] leading-relaxed max-w-4xl">
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                style={{ color: line.color ?? "#d1d5db" }}
              >
                {line.text || "\u00A0"}
              </motion.p>
            ))}
            <p style={{ color: "#00F0FF" }}>{cursorOn ? "█" : " "}</p>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex justify-between mb-1.5" style={{ fontSize: "11px", color: "#4b5563" }}>
              <span>Initializing portfolio.sh</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "#1f2937" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #00F0FF, #0055FF)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}