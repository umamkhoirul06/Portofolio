"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    recruiterName: "", company: "", email: "", message: "",
  });

  // FIX: auto-reset error state setelah 4 detik agar user tidak perlu
  // refresh halaman untuk bisa mencoba submit ulang
  useEffect(() => {
    if (status !== "error") return;
    const timer = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ recruiterName: "", company: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="font-mono text-sm mb-3"
            style={{ color: "#00F0FF" }}
          >
            &gt; send_inquiry --to umam
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base max-w-lg mx-auto"
            style={{ color: "#64748b" }}
          >
            Have a project in mind or looking to hire? Drop a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            {[
              { icon: Mail, label: "Email", value: "umamkhoerul163@gmail.com", href: "mailto:umamkhoerul163@gmail.com" },
              { icon: MapPin, label: "Location", value: "Indramayu, West Java 🇮🇩" },
              { icon: MessageSquare, label: "Response Time", value: "Usually within 24h" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 glass-cyan">
                  <Icon className="w-4 h-4" style={{ color: "#00F0FF" }} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "#64748b" }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-sm text-white hover:text-cyan-400 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 glass rounded-2xl p-10 border-neon">
                <CheckCircle2 className="w-12 h-12" style={{ color: "#22c55e" }} />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p style={{ color: "#64748b" }}>
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-mono"
                  style={{ color: "#00F0FF" }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: "#64748b" }}>
                      Your Name *
                    </label>
                    <input
                      required
                      value={form.recruiterName}
                      onChange={(e) => setForm({ ...form, recruiterName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all focus:border-cyan-500/50"
                      style={{ background: "rgba(13,13,13,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: "#64748b" }}>
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                      style={{ background: "rgba(13,13,13,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: "#64748b" }}>
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                    style={{ background: "rgba(13,13,13,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono mb-2 uppercase tracking-wider" style={{ color: "#64748b" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
                    style={{ background: "rgba(13,13,13,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-black transition-all glow-cyan disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #00F0FF, #0055FF)" }}
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* FIX: tambah pesan bahwa error akan auto-reset */}
                {status === "error" && (
                  <p className="text-sm text-center" style={{ color: "#f87171" }}>
                    Something went wrong. Please try again or email directly.{" "}
                    <span style={{ color: "#64748b" }}>(auto-reset in 4s)</span>
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}