"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,240,255,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-black transition-all group-hover:scale-105 glow-cyan"
            style={{ background: "linear-gradient(135deg, #00F0FF, #0055FF)" }}
          >
            U
          </div>
          <span className="font-mono font-bold text-white text-sm">
            umam<span className="gradient-text">.dev</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm transition-colors hover:text-cyan-400"
              style={{ color: "#94a3b8" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg font-mono text-sm font-semibold text-black transition-all glow-cyan hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00F0FF, #0055FF)" }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
        style={{
          background: "rgba(5,5,5,0.95)",
          borderBottom: menuOpen ? "1px solid rgba(0,240,255,0.1)" : "none",
        }}
      >
        <div className="px-6 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm transition-colors hover:text-cyan-400"
              style={{ color: "#94a3b8" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}