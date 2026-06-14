"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACHIEVEMENTS = [
    {
        id: "pkm-gft",
        type: "PKM",
        year: "2025",
        emoji: "🏆",
        accentColor: "#f59e0b",
        title: "PKM-GFT — Ketua Tim",
        subtitle: "Program Kreativitas Mahasiswa · Gagasan Futuristik Tertulis",
        description:
            "Memimpin tim 4 mahasiswa dalam menyusun proposal PKM-GFT bertema IoT: Sistem Pendeteksi Kebocoran Gas Berbasis IoT dengan Notifikasi Smartphone menggunakan NodeMCU ESP32 + Sensor MQ-2.",
        tags: ["IoT", "ESP32", "Sensor MQ-2", "Blynk", "Mobile Notifikasi"],
        meta: "Politeknik Negeri Indramayu · 2025",
        icon: "📄",
    },
    {
        id: "skilloka-project",
        type: "Project",
        year: "2026",
        emoji: "🎓",
        accentColor: "#00F0FF",
        title: "Skilloka — Lead Developer",
        subtitle: "Platform Digital LPK Kabupaten Indramayu · Production",
        description:
            "Membangun full-stack ecosystem untuk 10+ LPK di Indramayu bersama tim 3 orang: Web Admin (Laravel), Super Admin Dashboard, dan Mobile App Flutter — sudah live di skilloka.my.id.",
        tags: ["Flutter", "Laravel", "PostgreSQL", "Debian VPS", "Team Lead"],
        meta: "skilloka.my.id · Live Production",
        icon: "🌐",
    },
    {
        id: "paskibraka",
        type: "Achievement",
        year: "2022",
        emoji: "🎖️",
        accentColor: "#ef4444",
        title: "Paskibraka Tingkat Kabupaten",
        subtitle: "Sertifikat Paskibraka · Bupati Pandeglang",
        description:
            "Terpilih sebagai anggota Paskibraka tingkat Kabupaten — melatih kedisiplinan, kepemimpinan, dan kerja tim yang kemudian mendukung kemampuan kolaborasi dalam project-project software.",
        tags: ["Kepemimpinan", "Disiplin", "Kerja Tim"],
        meta: "Kabupaten Pandeglang · 2022",
        icon: "🏅",
    },
    {
        id: "juara-kelas",
        type: "Achievement",
        year: "2024",
        emoji: "🥉",
        accentColor: "#a78bfa",
        title: "Juara 3 Tingkat Kelas",
        subtitle: "SMA Negeri 18 Pandeglang",
        description:
            "Meraih peringkat 3 di tingkat kelas, membuktikan kemampuan akademik yang solid sebelum melanjutkan ke jenjang D4 Rekayasa Perangkat Lunak di Polindra.",
        tags: ["Akademik", "Prestasi"],
        meta: "SMA Negeri 18 Pandeglang · 2024",
        icon: "📚",
    },
];

const TYPE_COLORS: Record<string, string> = {
    PKM: "#f59e0b",
    Project: "#00F0FF",
    Achievement: "#a78bfa",
};

export default function AchievementsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    return (
        <section
            id="achievements"
            ref={ref}
            className="relative py-24 px-6 bg-[#050505] overflow-hidden"
        >
            {/* Subtle top divider */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent)",
                }}
            />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="font-mono text-sm mb-3"
                        style={{ color: "#00F0FF" }}
                    >
                        &gt; cat achievements.log
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-black text-white"
                    >
                        Achievements &amp; <span className="gradient-text">Activities</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-sm max-w-lg mx-auto"
                        style={{ color: "#64748b" }}
                    >
                        PKM, organisasi, dan pencapaian yang membentuk saya sebagai developer
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div
                        className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,240,255,0.2), transparent)" }}
                    />

                    <div className="flex flex-col gap-6">
                        {ACHIEVEMENTS.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                                className="sm:pl-16 relative"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 hidden sm:flex items-center justify-center"
                                    style={{
                                        backgroundColor: "#050505",
                                        borderColor: item.accentColor,
                                        boxShadow: `0 0 8px ${item.accentColor}60`,
                                    }}
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: item.accentColor }}
                                    />
                                </div>

                                {/* Card */}
                                <div
                                    className="rounded-2xl p-5"
                                    style={{
                                        background: "linear-gradient(135deg, #0d1117, #111827)",
                                        border: `1px solid ${item.accentColor}22`,
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Emoji icon */}
                                        <div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                                            style={{
                                                background: `${item.accentColor}15`,
                                                border: `1px solid ${item.accentColor}30`,
                                            }}
                                        >
                                            {item.emoji}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Type badge + year */}
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span
                                                    className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
                                                    style={{
                                                        background: `${item.accentColor}18`,
                                                        color: item.accentColor,
                                                        border: `1px solid ${item.accentColor}30`,
                                                    }}
                                                >
                                                    {item.type}
                                                </span>
                                                <span className="text-xs font-mono" style={{ color: "#374151" }}>
                                                    {item.year}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-black text-white leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs font-mono mt-0.5 mb-2" style={{ color: item.accentColor }}>
                                                {item.subtitle}
                                            </p>
                                            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                                                {item.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {item.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 text-xs rounded-full font-mono"
                                                        style={{
                                                            background: "rgba(255,255,255,0.04)",
                                                            color: "#64748b",
                                                            border: "1px solid rgba(255,255,255,0.07)",
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span
                                                    className="px-2 py-0.5 text-xs rounded-full font-mono ml-auto"
                                                    style={{ color: "#374151" }}
                                                >
                                                    {item.meta}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}