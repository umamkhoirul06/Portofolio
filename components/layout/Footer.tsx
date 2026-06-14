"use client";

import { motion } from "framer-motion";
import { GitBranch, Link2, Mail, Server, Shield, Cpu } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative border-t"
      style={{
        backgroundColor: "#050505",
        borderColor: "rgba(0,240,255,0.08)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-base text-black glow-cyan"
                style={{ background: "linear-gradient(135deg, #00F0FF, #0055FF)" }}
              >
                U
              </div>
              <span className="font-mono font-bold text-white text-base">
                umam<span className="gradient-text">.dev</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
              D4 Software Engineering student at Politeknik Negeri Indramayu,
              building production-grade full-stack systems and mobile applications.
            </p>
            <div className="flex gap-3">
              {[
                { icon: GitBranch, href: "https://github.com/umamkhoirul06", label: "GitHub" },
                { icon: Link2, href: "https://www.linkedin.com/in/khoerul-umam-78b02b408", label: "LinkedIn" },
                { icon: Mail, href: "mailto:umamkhoerul163@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center glass border-neon transition-all hover:border-cyan-400/40 hover:text-cyan-400"
                  style={{ color: "#64748b" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white mb-5 uppercase tracking-wider">
              Navigation
            </h3>
            <div className="flex flex-col gap-3">
              {[
                ["#hero", "Home"],
                ["#skills", "Skills"],
                ["#projects", "Projects"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-mono transition-colors hover:text-cyan-400 flex items-center gap-2"
                  style={{ color: "#64748b" }}
                >
                  <span className="gradient-text">&gt;</span> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Server Status */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-white mb-5 uppercase tracking-wider">
              Server Status
            </h3>
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "rgba(13,13,13,0.8)",
                borderColor: "rgba(34,197,94,0.2)",
                boxShadow: "0 0 20px rgba(34,197,94,0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full pulse-green" style={{ backgroundColor: "#22c55e" }} />
                  <div
                    className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: "#22c55e", opacity: 0.4 }}
                  />
                </div>
                <span className="text-sm font-mono font-semibold" style={{ color: "#22c55e" }}>
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#64748b" }}>
                  <Server className="w-3.5 h-3.5 shrink-0" style={{ color: "#22c55e" }} />
                  <span>Hosted & managed independently on</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <span className="font-bold gradient-text">Debian 13 VPS</span>
                  <span style={{ color: "#64748b" }}>· Nginx · PM2</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#64748b" }}>
                    <Cpu className="w-3 h-3" />
                    Uptime
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: "#22c55e" }}>99.9%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5" style={{ color: "#64748b" }}>
                    <Shield className="w-3 h-3" />
                    SSL / HTTPS
                  </div>
                  <span style={{ color: "#22c55e" }}>✓ Active</span>
                </div>
              </div>
            </div>
            <div
              className="mt-3 rounded-xl px-4 py-3 flex items-center gap-3 border"
              style={{ background: "rgba(13,13,13,0.8)", borderColor: "rgba(0,240,255,0.1)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00F0FF", boxShadow: "0 0 6px #00F0FF" }} />
              <span className="text-xs font-mono" style={{ color: "#64748b" }}>
                PostgreSQL · Drizzle ORM · <span style={{ color: "#00F0FF" }}>Connected</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-mono" style={{ color: "#374151" }}>
            © {year} Khoirul Umam · Built with Next.js, Tailwind CSS, Framer Motion
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#374151" }}>
            <span>Made with</span>
            <span className="gradient-text font-bold">♥</span>
            <span>in Indramayu, Indonesia 🇮🇩</span>
          </div>
        </div>
      </div>
    </footer>
  );
}