/**
 * FarmersBuddy — Cinematic System Architecture Visualization
 *
 * Free-flowing node graph layout (all coords in a 1400×800 SVG viewBox):
 *
 *   [Farmer Input]  ──►  [Query Processing]  ──►  [AI / Crop Analysis]
 *         │                      │                        │
 *         │              [Officer Validation]             │
 *         │                      │                        ▼
 *    [Final Output] ◄── [Mandi Prices] ◄── [Recommendation Engine]
 *         ▲                                               │
 *         └──────────── [Training Reco] ◄────────────────┘
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const C = {
  farmer:    '#22c55e',   // green — the farmer
  query:     '#0ea5e9',   // sky   — query processing
  ai:        '#a855f7',   // violet— AI brain
  reco:      '#f59e0b',   // amber — recommendation
  officer:   '#06b6d4',   // cyan  — human validation
  mandi:     '#f97316',   // orange— market prices
  training:  '#ec4899',   // pink  — training
  output:    '#10b981',   // emerald — final output
};

// ─── NODE POSITIONS (in 1400×800 viewBox) ────────────────────────────────────

const N = {
  farmer:   { x: 130,  y: 400 },
  query:    { x: 360,  y: 200 },
  ai:       { x: 660,  y: 180 },
  reco:     { x: 920,  y: 320 },
  officer:  { x: 560,  y: 460 },
  mandi:    { x: 820,  y: 570 },
  training: { x: 560,  y: 640 },
  output:   { x: 270,  y: 620 },
};

const NODE_R = 54; // hexagon "radius"

// ─── CONNECTIONS (from → to, carrying what data) ──────────────────────────────

const EDGES = [
  { id: 'f→q',  from: 'farmer',   to: 'query',    color: C.farmer,  label: 'Query', speed: 2800 },
  { id: 'q→ai', from: 'query',    to: 'ai',       color: C.query,   label: 'Processed', speed: 3000 },
  { id: 'ai→r', from: 'ai',       to: 'reco',     color: C.ai,      label: 'Analysis', speed: 2600 },
  { id: 'q→o',  from: 'query',    to: 'officer',  color: C.query,   label: 'Escalation', speed: 3200, dashed: true },
  { id: 'o→r',  from: 'officer',  to: 'reco',     color: C.officer, label: 'Validated', speed: 2900 },
  { id: 'r→m',  from: 'reco',     to: 'mandi',    color: C.reco,    label: 'Price Req', speed: 2700 },
  { id: 'r→t',  from: 'reco',     to: 'training', color: C.reco,    label: 'Gap Analysis', speed: 3100, dashed: true },
  { id: 'm→out',from: 'mandi',    to: 'output',   color: C.mandi,   label: 'Prices', speed: 2800 },
  { id: 't→out',from: 'training', to: 'output',   color: C.training,label: 'Programs', speed: 3000 },
  { id: 'out→f',from: 'output',   to: 'farmer',   color: C.output,  label: 'Results', speed: 2500 },
];

// ─── POLYLINE UTILS ───────────────────────────────────────────────────────────

function ptLen(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function polyLen(pts) {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += ptLen(pts[i - 1], pts[i]);
  return l;
}

function polyAt(pts, t) {
  let rem = t * polyLen(pts);
  for (let i = 1; i < pts.length; i++) {
    const seg = ptLen(pts[i - 1], pts[i]);
    if (rem <= seg) {
      const r = rem / seg;
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * r,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * r,
      };
    }
    rem -= seg;
  }
  return pts[pts.length - 1];
}

// Push a point away from a node centre so packets start/end at node perimeter
function nudge(from, to, radius) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const d  = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: from.x + (dx / d) * radius, y: from.y + (dy / d) * radius };
}

// Build control-point bezier path (smooth arc through a midpoint offset)
function edgePath(e) {
  const f = N[e.from], t = N[e.to];
  const start = nudge(f, t, NODE_R);
  const end   = nudge(t, f, NODE_R);
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  // perpendicular offset for curviness
  const dx = end.x - start.x, dy = end.y - start.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const perp = { x: -dy / len, y: dx / len };
  const bend = len * 0.18;
  const cp = { x: mx + perp.x * bend, y: my + perp.y * bend };
  return { start, end, cp,
    d: `M ${start.x} ${start.y} Q ${cp.x} ${cp.y} ${end.x} ${end.y}` };
}

// Approximate a quadratic bezier as a polyline for packet travel
function bezierPts(start, cp, end, steps = 40) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x;
    const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y;
    pts.push({ x, y });
  }
  return pts;
}

// ─── PACKET (data particle travelling along an edge) ──────────────────────────

function Packet({ edge, offset, size = 5 }) {
  const path = edgePath(edge);
  const pts  = bezierPts(path.start, path.cp, path.end);
  const [t, setT] = useState(offset % 1);
  const last = useRef(null);
  const raf  = useRef(null);

  useEffect(() => {
    const tick = (now) => {
      if (last.current === null) last.current = now;
      const dt = now - last.current;
      last.current = now;
      setT(prev => (prev + dt / edge.speed) % 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [edge.speed]);

  const pos = polyAt(pts, t);

  return (
    <g>
      {/* outer glow */}
      <circle cx={pos.x} cy={pos.y} r={size + 4} fill={edge.color + '28'} />
      {/* inner bright core */}
      <circle cx={pos.x} cy={pos.y} r={size - 1}
        fill={edge.color}
        style={{ filter: `drop-shadow(0 0 6px ${edge.color})` }}
      />
    </g>
  );
}

// ─── EDGE (glowing path + 3 staggered packets) ────────────────────────────────

function Edge({ edge }) {
  const { d, end } = edgePath(edge);
  const angle = (() => {
    const f = N[edge.from], t = N[edge.to];
    return Math.atan2(t.y - f.y, t.x - f.x) * 180 / Math.PI;
  })();
  const dashId = `dash-${edge.id}`;

  return (
    <g>
      {/* glow halo track */}
      <path d={d} fill="none" stroke={edge.color + '18'} strokeWidth={10} strokeLinecap="round" />
      {/* main line */}
      <path d={d} fill="none" stroke={edge.color + '55'} strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={edge.dashed ? '8 6' : '1000'}
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1s" repeatCount="indefinite" />
      </path>
      {/* bright core line */}
      <path d={d} fill="none" stroke={edge.color + '99'} strokeWidth={1} strokeLinecap="round" />
      {/* arrowhead */}
      <polygon
        points="-9,-4 0,0 -9,4"
        fill={edge.color}
        transform={`translate(${end.x},${end.y}) rotate(${angle})`}
        style={{ filter: `drop-shadow(0 0 4px ${edge.color})` }}
      />
      {/* 3 staggered data packets */}
      {[0, 0.34, 0.67].map((off, i) => (
        <Packet key={i} edge={edge} offset={off} size={4 + i * 0.5} />
      ))}
    </g>
  );
}

// ─── HEXAGON NODE ─────────────────────────────────────────────────────────────

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

// ─── NODE CARD (rendered as HTML overlay) ─────────────────────────────────────

function NodeCard({ id, color, icon, title, subtitle, children, pulse = true }) {
  const pos = N[id];
  // convert SVG coords to % of the 1400×800 viewBox
  const pctX = (pos.x / 1400) * 100;
  const pctY = (pos.y / 800)  * 100;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${pctX}%`,
        top:  `${pctY}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        width: 148,
        textAlign: 'center',
      }}
      animate={pulse ? {
        filter: [
          `drop-shadow(0 0 8px ${color}66)`,
          `drop-shadow(0 0 22px ${color}cc)`,
          `drop-shadow(0 0 8px ${color}66)`,
        ],
      } : {}}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
    >
      {/* outer ring */}
      <motion.div
        style={{
          position: 'absolute', inset: -14,
          borderRadius: '50%',
          border: `1px solid ${color}33`,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* card body */}
      <div style={{
        background: 'rgba(6,10,24,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1.5px solid ${color}66`,
        borderRadius: 18,
        padding: '14px 12px 12px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }} />
        {/* scan beam */}
        <motion.div style={{
          position: 'absolute', left: 0, right: 0, height: 1.5,
          background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
          boxShadow: `0 0 8px ${color}`,
          pointerEvents: 'none',
        }}
          animate={{ top: ['8%', '92%', '8%'] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* icon */}
        <motion.div style={{ fontSize: 28, marginBottom: 6, lineHeight: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >{icon}</motion.div>
        <div style={{ color: '#f1f5f9', fontSize: 11, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{title}</div>
        <div style={{ color, fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', marginTop: 3 }}>{subtitle}</div>
        {children && <div style={{ marginTop: 8 }}>{children}</div>}
      </div>
    </motion.div>
  );
}

// ─── INDIVIDUAL NODE CONTENTS ──────────────────────────────────────────────────

function FarmerNode() {
  const inputs = ['🌾 Crop Query', '📍 Location', '🌦 Season'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % inputs.length), 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <NodeCard id="farmer" color={C.farmer} icon="👨‍🌾" title="Farmer Input" subtitle="ENTRY POINT">
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{
            background: C.farmer + '18', border: `1px solid ${C.farmer}44`,
            borderRadius: 8, padding: '4px 8px', fontSize: 9, fontWeight: 700, color: C.farmer,
          }}
        >{inputs[idx]}</motion.div>
      </AnimatePresence>
    </NodeCard>
  );
}

function QueryNode() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProg(p => (p + 7) % 101), 80);
    return () => clearInterval(t);
  }, []);
  return (
    <NodeCard id="query" color={C.query} icon="⚙️" title="Query Processing" subtitle="NLP ENGINE">
      <div style={{ height: 3, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div style={{ height: '100%', background: C.query, borderRadius: 2 }}
          animate={{ width: `${prog}%` }} transition={{ duration: 0.08, ease: 'linear' }}
        />
      </div>
      <div style={{ color: C.query, fontSize: 8, fontWeight: 700, marginTop: 3, letterSpacing: '0.05em' }}>
        {prog < 100 ? 'PARSING...' : 'COMPLETE'}
      </div>
    </NodeCard>
  );
}

function AINode() {
  const labels = ['Soil Analysis', 'Yield Prediction', 'Pest Risk', 'Weather Model'];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % labels.length), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <NodeCard id="ai" color={C.ai} icon="🧠" title="AI / Crop Analysis" subtitle="ML INFERENCE">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {labels.map((l, i) => (
          <motion.span key={l}
            animate={{ background: i === active ? C.ai + '55' : C.ai + '15', color: i === active ? '#e9d5ff' : C.ai }}
            transition={{ duration: 0.3 }}
            style={{ border: `1px solid ${C.ai}44`, borderRadius: 5, padding: '1px 5px', fontSize: 8, fontWeight: 700 }}
          >{l}</motion.span>
        ))}
      </div>
    </NodeCard>
  );
}

function RecoNode() {
  const items = ['✅ Rice (high conf.)', '🌽 Maize (medium)', '🥜 Groundnut'];
  return (
    <NodeCard id="reco" color={C.reco} icon="📋" title="Recommendation Engine" subtitle="DECISION CORE">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {items.map((it, i) => (
          <motion.div key={it}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3, duration: 0.4 }}
            style={{ color: '#e2e8f0', fontSize: 8, fontWeight: 600,
              background: C.reco + '15', borderRadius: 5, padding: '3px 6px',
              borderLeft: `2px solid ${C.reco}` }}
          >{it}</motion.div>
        ))}
      </div>
    </NodeCard>
  );
}

function OfficerNode() {
  const [status, setStatus] = useState('REVIEWING');
  useEffect(() => {
    const states = ['REVIEWING', 'ANALYZING', 'VALIDATING', 'APPROVED'];
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % states.length; setStatus(states[i]); }, 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <NodeCard id="officer" color={C.officer} icon="👩‍💼" title="Officer Validation" subtitle="HUMAN-IN-LOOP">
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          background: C.officer + '22', border: `1px solid ${C.officer}55`,
          borderRadius: 8, padding: '4px 8px', fontSize: 9, fontWeight: 800, color: C.officer,
          letterSpacing: '0.08em',
        }}
      >⬤ {status}</motion.div>
    </NodeCard>
  );
}

function MandiNode() {
  const prices = [
    { crop: 'Rice',   price: '₹2180', trend: '▲' },
    { crop: 'Wheat',  price: '₹2150', trend: '▼' },
    { crop: 'Cotton', price: '₹6580', trend: '▲' },
  ];
  const [row, setRow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRow(r => (r + 1) % prices.length), 1000);
    return () => clearInterval(t);
  }, []);
  const p = prices[row];
  return (
    <NodeCard id="mandi" color={C.mandi} icon="📈" title="Mandi Prices" subtitle="LIVE MARKET DATA">
      <AnimatePresence mode="wait">
        <motion.div key={row}
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: C.mandi + '18', border: `1px solid ${C.mandi}44`,
            borderRadius: 7, padding: '4px 8px' }}
        >
          <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 700 }}>{p.crop}</span>
          <span style={{ color: C.mandi, fontSize: 10, fontWeight: 900 }}>{p.price}</span>
          <span style={{ color: p.trend === '▲' ? '#22c55e' : '#f43f5e', fontSize: 11 }}>{p.trend}</span>
        </motion.div>
      </AnimatePresence>
    </NodeCard>
  );
}

function TrainingNode() {
  const programs = ['Drip Irrigation', 'Organic Farming', 'Soil Health'];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % programs.length), 950);
    return () => clearInterval(t);
  }, []);
  return (
    <NodeCard id="training" color={C.training} icon="🎓" title="Training Recommendation" subtitle="SKILL BRIDGE">
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{ color: C.training, fontSize: 9, fontWeight: 700,
            background: C.training + '18', border: `1px solid ${C.training}44`,
            borderRadius: 7, padding: '4px 8px' }}
        >📌 {programs[idx]}</motion.div>
      </AnimatePresence>
    </NodeCard>
  );
}

function OutputNode() {
  const metrics = [
    { label: 'Accuracy', val: 94 },
    { label: 'Confidence', val: 88 },
  ];
  return (
    <NodeCard id="output" color={C.output} icon="🌿" title="Farmer Dashboard" subtitle="FINAL OUTPUT">
      {metrics.map(m => (
        <div key={m.label} style={{ marginBottom: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ color: '#94a3b8', fontSize: 8, fontWeight: 600 }}>{m.label}</span>
            <span style={{ color: C.output, fontSize: 8, fontWeight: 800 }}>{m.val}%</span>
          </div>
          <div style={{ height: 3, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', background: `linear-gradient(90deg,${C.output},${C.farmer})`, borderRadius: 2 }}
              initial={{ width: 0 }}
              animate={{ width: `${m.val}%` }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
        </div>
      ))}
    </NodeCard>
  );
}

// ─── HEXAGON SVG NODES (visual glowing shapes on the SVG layer) ───────────────

function HexNode({ id, color }) {
  const pos = N[id];
  const pts = hexPoints(pos.x, pos.y, NODE_R);
  const innerPts = hexPoints(pos.x, pos.y, NODE_R - 6);

  return (
    <g>
      {/* outer glow rings */}
      {[1.4, 1.2, 1.0].map((scale, i) => (
        <motion.polygon
          key={i}
          points={hexPoints(pos.x, pos.y, NODE_R * scale)}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeOpacity={0.15 + (2 - i) * 0.08}
          animate={{ strokeOpacity: [0.08, 0.22, 0.08], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
        />
      ))}
      {/* filled hex */}
      <polygon points={pts} fill={color + '12'} stroke={color + '88'} strokeWidth={1.5}
        style={{ filter: `drop-shadow(0 0 10px ${color}66)` }}
      />
      {/* inner hex */}
      <polygon points={innerPts} fill={color + '22'} stroke={color + '44'} strokeWidth={1} />
    </g>
  );
}

// ─── EDGE LABEL (HTML overlay) ────────────────────────────────────────────────

function EdgeLabel({ edge }) {
  const path = edgePath(edge);
  const mid = (() => {
    const t = 0.5;
    const { start: s, end: e, cp } = path;
    return {
      x: (1 - t) ** 2 * s.x + 2 * (1 - t) * t * cp.x + t * t * e.x,
      y: (1 - t) ** 2 * s.y + 2 * (1 - t) * t * cp.y + t * t * e.y,
    };
  })();

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: `${(mid.x / 1400) * 100}%`,
        top:  `${(mid.y / 800)  * 100}%`,
        transform: 'translate(-50%, -50%)',
        background: edge.color + '1a',
        border: `1px solid ${edge.color}55`,
        borderRadius: 20,
        padding: '2px 8px',
        fontSize: 8,
        fontWeight: 800,
        color: edge.color,
        whiteSpace: 'nowrap',
        letterSpacing: '0.06em',
        pointerEvents: 'none',
        zIndex: 25,
      }}
    >{edge.label}</motion.div>
  );
}

// ─── AMBIENT PARTICLES ────────────────────────────────────────────────────────

function Particles() {
  const pts = useRef(
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.6 + 0.5,
      dur: Math.random() * 10 + 6,
      delay: Math.random() * 6,
      color: Object.values(C)[i % 8],
    }))
  );
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pts.current.map(p => (
        <motion.div key={p.id}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.r * 2, height: p.r * 2, borderRadius: '50%',
            background: p.color, boxShadow: `0 0 ${p.r * 5}px ${p.color}`,
          }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── NEURAL BACKGROUND MESH ───────────────────────────────────────────────────

function NeuralMesh() {
  // static faint lines connecting distant node pairs for depth
  const meshLines = [
    [N.farmer, N.mandi], [N.query, N.training], [N.ai, N.output],
    [N.reco, N.farmer], [N.officer, N.output],
  ];
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
      viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid meet">
      {meshLines.map(([a, b], i) => (
        <line key={i}
          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke="#ffffff" strokeWidth={0.5} strokeOpacity={0.025}
          strokeDasharray="4 8"
        />
      ))}
    </svg>
  );
}

// ─── LEGEND ───────────────────────────────────────────────────────────────────

function Legend() {
  const items = [
    { label: 'Primary Flow',  style: { background: '#6366f1' } },
    { label: 'Validation',    style: { background: '#06b6d4' } },
    { label: 'Enrichment',    style: { background: '#f97316' } },
    { label: 'Optional Path', style: { background: '#a855f7', opacity: 0.6 } },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 16, right: 20, zIndex: 100,
      display: 'flex', gap: 14, alignItems: 'center',
    }}>
      {items.map(it => (
        <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 22, height: 3, borderRadius: 2,
            ...it.style,
            boxShadow: `0 0 6px ${Object.values(it.style)[0]}`,
          }} />
          <span style={{ color: '#475569', fontSize: 9, fontWeight: 600, letterSpacing: '0.05em' }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── SYSTEM STATUS TICKER ─────────────────────────────────────────────────────

const TICKERS = [
  '● Query #4421 processed',
  '● ML model confidence: 94.2%',
  '● Mandi prices synced (AGMARKNET)',
  '● Officer Singh validated 3 queries',
  '● 12 training programmes available',
  '● Rice advisory sent to 841 farmers',
];

function StatusTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % TICKERS.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      position: 'absolute', bottom: 16, left: 20, zIndex: 100,
      background: 'rgba(6,10,24,0.85)', border: '1px solid #22c55e33',
      borderRadius: 8, padding: '6px 14px',
    }}>
      <AnimatePresence mode="wait">
        <motion.span key={i}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          style={{ color: '#22c55e', fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}
        >{TICKERS[i]}</motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 50,
      background: 'linear-gradient(180deg,rgba(4,6,18,0.97) 0%,transparent 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <motion.span style={{ fontSize: 22 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >🌾</motion.span>
        <span style={{
          fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em',
          background: 'linear-gradient(130deg,#22c55e,#0ea5e9,#a855f7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>FarmersBuddy</span>
        <span style={{ color: '#334155', fontSize: 10, fontWeight: 600,
          letterSpacing: '0.12em', paddingLeft: 14, borderLeft: '1px solid #1e293b' }}>
          AI PLATFORM ARCHITECTURE
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {['ML Engine', 'Market API', 'Officer Net'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
            />
            <span style={{ color: '#475569', fontSize: 9, fontWeight: 600 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function SystemArchitecture() {
  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative',
      background: 'radial-gradient(ellipse at 30% 40%, #0a1628 0%, #040612 55%, #060d10 100%)',
      fontFamily: "'Inter','SF Pro Display',system-ui,sans-serif",
    }}>
      {/* dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />
      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.68) 100%)',
      }} />

      <Particles />
      <NeuralMesh />

      {/* ── SHARED CONTAINER: SVG + HTML overlay ────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0 }}>

        {/* ── SVG LAYER: edges + hexagons ── */}
        <svg
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, overflow: 'visible' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* draw edges first (below hex nodes) */}
          {EDGES.map(e => <Edge key={e.id} edge={e} />)}

          {/* hex node shells */}
          {Object.entries(C).map(([id, color]) => (
            N[id] ? <HexNode key={id} id={id} color={color} /> : null
          ))}
        </svg>

        {/* ── HTML LAYER: node cards ── */}
        <FarmerNode />
        <QueryNode />
        <AINode />
        <RecoNode />
        <OfficerNode />
        <MandiNode />
        <TrainingNode />
        <OutputNode />

        {/* ── Edge labels ── */}
        {EDGES.map(e => <EdgeLabel key={e.id} edge={e} />)}
      </div>

      <Header />
      <Legend />
      <StatusTicker />
    </div>
  );
}
