"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_NODES = [
  // Frontend
  { id: "nextjs", label: "Next.js", category: "Frontend", x: 20, y: 15, level: 90 },
  { id: "react", label: "React", category: "Frontend", x: 35, y: 8, level: 88 },
  { id: "tailwind", label: "Tailwind", category: "Frontend", x: 50, y: 18, level: 85 },
  // Mobile
  { id: "flutter", label: "Flutter", category: "Mobile", x: 70, y: 10, level: 87 },
  { id: "dart", label: "Dart", category: "Mobile", x: 83, y: 22, level: 82 },
  // Backend
  { id: "laravel", label: "Laravel", category: "Backend", x: 15, y: 52, level: 92 },
  { id: "nodejs", label: "Node.js", category: "Backend", x: 30, y: 62, level: 80 },
  { id: "postgres", label: "PostgreSQL", category: "Backend", x: 48, y: 55, level: 85 },
  { id: "mysql", label: "MySQL", category: "Backend", x: 62, y: 65, level: 83 },
  // DevOps
  { id: "debian", label: "Debian", category: "DevOps", x: 75, y: 48, level: 88 },
  { id: "nginx", label: "Nginx", category: "DevOps", x: 85, y: 60, level: 82 },
  { id: "docker", label: "Docker", category: "DevOps", x: 22, y: 35, level: 75 },
];

const CONNECTIONS = [
  ["nextjs", "react"], ["nextjs", "tailwind"], ["react", "tailwind"],
  ["flutter", "dart"], ["flutter", "nextjs"],
  ["laravel", "mysql"], ["laravel", "postgres"], ["laravel", "nodejs"],
  ["postgres", "nodejs"], ["postgres", "nextjs"],
  ["debian", "nginx"], ["debian", "docker"], ["nginx", "laravel"],
  ["docker", "laravel"], ["docker", "nodejs"],
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#00F0FF",
  Mobile: "#a78bfa",
  Backend: "#34d399",
  DevOps: "#fb923c",
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // FIX: margin dari "-100px" ke "0px" agar useInView trigger lebih andal,
  // terutama di layar pendek atau saat section langsung terlihat saat load.
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getActiveConnections = (nodeId: string | null) => {
    if (!nodeId) return new Set<string>();
    return new Set(
      CONNECTIONS
        .filter((c) => c[0] === nodeId || c[1] === nodeId)
        .map((c) => c.join("-"))
    );
  };

  const activeConns = getActiveConnections(hoveredNode);

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm mb-3"
          style={{ color: "#00F0FF" }}
        >
          &gt; cat skills.json
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-white"
        >
          Technology <span className="gradient-text">Stack</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base max-w-lg mx-auto"
          style={{ color: "#64748b" }}
        >
          Hover over a node to illuminate its circuit connections
        </motion.p>
      </div>

      {/* Circuit Board SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-5xl mx-auto relative"
        style={{ aspectRatio: "16/7" }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 70"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <pattern id="pcb-grid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0,240,255,0.04)" strokeWidth="0.1" />
            </pattern>
            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100" height="70" fill="url(#pcb-grid)" />

          {/* Connections */}
          {CONNECTIONS.map(([from, to]) => {
            const fromNode = SKILL_NODES.find((n) => n.id === from);
            const toNode = SKILL_NODES.find((n) => n.id === to);
            if (!fromNode || !toNode) return null;
            const connKey = `${from}-${to}`;
            const isActive =
              activeConns.has(connKey) || activeConns.has(`${to}-${from}`);
            const color = isActive
              ? (CATEGORY_COLORS[fromNode.category] ?? "#00F0FF")
              : "rgba(0,240,255,0.08)";

            return (
              <motion.line
                key={connKey}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={color}
                strokeWidth={isActive ? "0.4" : "0.2"}
                filter={isActive ? "url(#glow-filter)" : undefined}
                animate={{ stroke: color, strokeWidth: isActive ? 0.4 : 0.2 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}

          {/* Nodes */}
          {SKILL_NODES.map((node, i) => {
            const color = CATEGORY_COLORS[node.category] ?? "#00F0FF";
            const isHovered = hoveredNode === node.id;
            const isConnected =
              activeConns.size > 0 &&
              CONNECTIONS.some(
                (c) =>
                  (c[0] === hoveredNode && c[1] === node.id) ||
                  (c[1] === hoveredNode && c[0] === node.id)
              );
            const dim = activeConns.size > 0 && !isHovered && !isConnected;

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: dim ? 0.2 : 1, scale: isHovered ? 1.4 : 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.25, ease: "backOut" },
                  default: { duration: 0.5, delay: i * 0.05 },
                }}
                style={{ cursor: "pointer", transformOrigin: `${node.x}px ${node.y}px` }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {isHovered && (
                  <circle
                    cx={node.x} cy={node.y} r="2.5"
                    fill="none" stroke={color} strokeWidth="0.3" opacity="0.4"
                    filter="url(#glow-filter)"
                  />
                )}
                <circle
                  cx={node.x} cy={node.y} r="1.5"
                  fill={isHovered ? color : "rgba(13,13,13,0.9)"}
                  stroke={color}
                  strokeWidth={isHovered ? "0.4" : "0.25"}
                  filter={isHovered ? "url(#glow-filter)" : undefined}
                />
                <circle
                  cx={node.x} cy={node.y} r="0.5"
                  fill={isHovered ? "#050505" : color}
                  opacity={isHovered ? 1 : 0.8}
                />
                <text
                  x={node.x} y={node.y + 3.2}
                  textAnchor="middle"
                  fontSize="1.8"
                  fontFamily="'JetBrains Mono', monospace"
                  fill={isHovered ? color : "#94a3b8"}
                  filter={isHovered ? "url(#glow-filter)" : undefined}
                >
                  {node.label}
                </text>
                {isHovered && (
                  <text
                    x={node.x} y={node.y - 3}
                    textAnchor="middle"
                    fontSize="1.6"
                    fontFamily="'JetBrains Mono', monospace"
                    fill={color}
                  >
                    {node.level}%
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-10 flex flex-wrap justify-center gap-6"
      >
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            />
            <span className="text-xs font-mono" style={{ color: "#64748b" }}>{cat}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}