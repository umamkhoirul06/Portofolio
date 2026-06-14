"use client";

import { useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";

const ROLES = ["Full-Stack Developer", "Mobile Architect", "Web Architect", "System Administrator"];

// ── Role typer ────────────────────────────────────────────────────────────────
function RoleTyper({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 28);
    } else {
      setDeleting(false);
      setIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, roles]);

  return (
    <p className="text-xl sm:text-2xl font-semibold h-8 flex items-center justify-center">
      <span className="gradient-text">{displayed}</span>
      <span className="inline-block w-[2px] h-6 ml-1 animate-pulse" style={{ backgroundColor: "#00F0FF" }} />
    </p>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] bg-grid"
    >
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-none"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px,
            rgba(0, 240, 255, 0.055),
            transparent 65%)`,
        }}
      />

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #00F0FF, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #0055FF, transparent 70%)" }}
      />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-cyan font-mono text-sm"
          style={{ color: "#00F0FF" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-green-400 pulse-green"
            style={{ display: "inline-block" }}
          />
          Available for Opportunities &nbsp;·&nbsp; D4 RPL &nbsp;·&nbsp; Polindra
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-7xl sm:text-8xl lg:text-[110px] font-black tracking-tighter leading-none text-white">
            Khoirul
          </h1>
          <h1 className="text-7xl sm:text-8xl lg:text-[110px] font-black tracking-tighter leading-none gradient-text text-glow-cyan">
            Umam.
          </h1>
        </motion.div>

        {/* Role card with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 mx-auto max-w-2xl"
        >
          <div className="glass rounded-2xl px-8 py-5 border-neon">
            <RoleTyper roles={ROLES} />
            <p className="mt-3 text-sm font-mono" style={{ color: "#64748b" }}>
              D4 Rekayasa Perangkat Lunak &nbsp;·&nbsp; Politeknik Negeri Indramayu &nbsp;·&nbsp; 20 yo
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-black transition-all duration-300 glow-cyan"
            style={{ background: "linear-gradient(135deg, #00F0FF, #0055FF)" }}
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="mailto:umamkhoerul163@gmail.com"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold glass border-neon text-white hover:text-cyan-300 transition-all duration-300"
          >
            <Mail className="w-4 h-4" style={{ color: "#00F0FF" }} />
            Hire Me
          </a>
          <a
            href="/cv-khoirul-umam.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:text-cyan-400"
            style={{ color: "#64748b" }}
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-10"
        >
          {[
            { value: "3+", label: "Major Projects" },
            { value: "20", label: "Years Old" },
            { value: "D4", label: "Degree Level" },
            { value: "99.9%", label: "Server Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-xs font-mono mt-1" style={{ color: "#64748b" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono" style={{ color: "#374151" }}>scroll</span>
          <ArrowDown className="w-4 h-4" style={{ color: "#374151" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
