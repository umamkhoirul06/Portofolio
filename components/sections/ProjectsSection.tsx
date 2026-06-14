"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitBranch, ArrowUpRight, Smartphone, Globe, Shield } from "lucide-react";

const PROJECTS = [
  {
    id: "skilloka",
    title: "Skilloka",
    clientOrType: "Platform Digital LPK Indramayu",
    emoji: "🎓",
    accentColor: "#00F0FF",
    badge: "🟢 Live Production",
    liveUrl: "https://skilloka.my.id",
    description:
      "Ekosistem digital penuh untuk LPK se-Kabupaten Indramayu — menghubungkan 10+ LPK, 26+ pengguna, dan siswa dalam satu platform terintegrasi.",
    problem:
      "LPK di Indramayu tidak memiliki platform terpusat untuk promosi, pendaftaran siswa, dan manajemen kursus — semua masih manual dan tersebar.",
    solution:
      "Membangun full ecosystem: Web Admin per-LPK, Super Admin dashboard, dan Mobile App Flutter untuk siswa — lengkap dengan booking system, pembayaran, QR code check-in, dan sertifikat digital.",
    highlights: [
      { icon: "🌐", label: "Web Admin", desc: "Dashboard per-LPK (Laravel + MySQL)" },
      { icon: "👑", label: "Super Admin", desc: "10 LPK · 6 Courses · 26 Users" },
      { icon: "📱", label: "Mobile App", desc: "Flutter · Booking + QR Code" },
      { icon: "💳", label: "Payment", desc: "Rp 17.5jt Revenue tracked" },
    ],
    techStack: ["Flutter", "Laravel", "PostgreSQL", "REST API", "Debian VPS", "Nginx"],
    liveLink: "https://skilloka.my.id/admin/login",
    githubLink: "#",
    teamSize: 3,
  },
  {
    id: "juraganpakan",
    title: "JuraganPakan",
    clientOrType: "Enterprise Supply Chain",
    emoji: "🏭",
    accentColor: "#a78bfa",
    badge: null,
    liveUrl: null,
    description:
      "Sistem manajemen rantai pasokan enterprise untuk PT. Agung Jaya Abadi — mencakup inventory, distribusi, dan laporan keuangan.",
    problem:
      "Proses supply chain manual yang rawan kesalahan, lambat, dan tidak transparan antar departemen.",
    solution:
      "ERP ringan berbasis Next.js + PostgreSQL dengan dashboard real-time, manajemen stok otomatis, dan laporan PDF.",
    highlights: [],
    techStack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Docker"],
    liveLink: "#",
    githubLink: "#",
    teamSize: null,
  },
  {
    id: "campuscare",
    title: "CampusCare",
    clientOrType: "Integrated Campus Services",
    emoji: "🏛️",
    accentColor: "#34d399",
    badge: null,
    liveUrl: null,
    description:
      "Platform layanan kampus terintegrasi untuk Polindra — pengajuan surat, jadwal akademik, dan layanan mahasiswa dalam satu aplikasi.",
    problem:
      "Layanan administrasi kampus yang tersebar, tidak terintegrasi, dan memerlukan kedatangan fisik untuk proses sederhana.",
    solution:
      "Progressive Web App dengan sistem tiket layanan, notifikasi push, dan dashboard admin untuk staf kampus.",
    highlights: [],
    techStack: ["React", "Laravel", "MySQL", "PWA", "Nginx"],
    liveLink: "#",
    githubLink: "#",
    teamSize: null,
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [expanded, setExpanded] = useState<string | null>("skilloka");

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-mono text-sm mb-3"
            style={{ color: "#00F0FF" }}
          >
            &gt; ls -la ./projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base max-w-lg mx-auto"
            style={{ color: "#64748b" }}
          >
            Klik card untuk melihat detail project
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {PROJECTS.map((project, i) => {
            const isOpen = expanded === project.id;
            const { accentColor } = project;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <motion.div
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.998 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background: "linear-gradient(135deg, #0d1117, #111827)",
                    border: `1px solid ${isOpen ? accentColor + "55" : accentColor + "18"}`,
                    boxShadow: isOpen
                      ? `0 0 32px ${accentColor}18, 0 8px 32px rgba(0,0,0,0.5)`
                      : "0 4px 24px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "border 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-4 p-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
                    >
                      {project.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-black text-white">{project.title}</h3>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-mono"
                          style={{
                            background: `${accentColor}18`,
                            color: accentColor,
                            border: `1px solid ${accentColor}30`,
                          }}
                        >
                          {project.clientOrType}
                        </span>
                        {/* Live badge */}
                        {project.badge && (
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                            style={{
                              background: "rgba(34,197,94,0.12)",
                              color: "#22c55e",
                              border: "1px solid rgba(34,197,94,0.3)",
                            }}
                          >
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-1 line-clamp-1" style={{ color: "#64748b" }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${accentColor}12`,
                        border: `1px solid ${accentColor}25`,
                        color: accentColor,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expandable detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-5 pb-5 pt-4"
                          style={{ borderTop: `1px solid ${accentColor}18` }}
                        >
                          {/* Highlight stats — hanya untuk Skilloka */}
                          {project.highlights.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              {project.highlights.map((h) => (
                                <div
                                  key={h.label}
                                  className="p-3 rounded-xl text-center"
                                  style={{
                                    background: "rgba(0,0,0,0.3)",
                                    border: `1px solid ${accentColor}15`,
                                  }}
                                >
                                  <div className="text-xl mb-1">{h.icon}</div>
                                  <div className="text-xs font-mono font-bold text-white mb-0.5">{h.label}</div>
                                  <div className="text-xs" style={{ color: "#64748b" }}>{h.desc}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Problem + Solution */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div
                              className="p-4 rounded-xl"
                              style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accentColor}15` }}
                            >
                              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                                ⚡ Problem
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                {project.problem}
                              </p>
                            </div>
                            <div
                              className="p-4 rounded-xl"
                              style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${accentColor}15` }}
                            >
                              <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                                ✦ Solution
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                {project.solution}
                              </p>
                            </div>
                          </div>

                          {/* Tech + links row */}
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-1.5">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-0.5 text-xs rounded-full font-mono"
                                  style={{
                                    background: `${accentColor}12`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}28`,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.teamSize && (
                                <span
                                  className="px-2.5 py-0.5 text-xs rounded-full font-mono"
                                  style={{
                                    background: "rgba(255,255,255,0.05)",
                                    color: "#64748b",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                  }}
                                >
                                  👥 {project.teamSize} devs
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2 shrink-0">
                              {project.liveLink !== "#" && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
                                  style={{
                                    background: `${accentColor}18`,
                                    color: accentColor,
                                    border: `1px solid ${accentColor}30`,
                                  }}
                                >
                                  <ExternalLink className="w-3 h-3" /> Live Demo
                                </a>
                              )}
                              <a
                                href={project.githubLink}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
                                style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
                              >
                                <GitBranch className="w-3 h-3" /> Source
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/umamkhoirul06"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border-neon font-mono text-sm transition-all hover:text-cyan-400"
            style={{ color: "#64748b" }}
          >
            <GitBranch className="w-4 h-4" />
            View all repositories on GitHub
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}