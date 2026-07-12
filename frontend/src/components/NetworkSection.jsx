import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Brand palette ────────────────────────────────────────────
const MAROON = '#6D2932'
const BEIGE  = '#C7B7A3'
const CLAY   = '#AB7A44'
const GREEN  = '#D3DEB3'

// ── Network nodes — spread across a 1000 × 560 viewBox ──────
// type: 'farmer' → clay dot | type: 'trader' → maroon dot
const NODES = [
  { id:  0, x:  70, y:  80, type: 'farmer' },
  { id:  1, x: 200, y:  44, type: 'trader' },
  { id:  2, x: 330, y: 118, type: 'farmer' },
  { id:  3, x: 140, y: 210, type: 'trader' },
  { id:  4, x: 460, y:  62, type: 'farmer' },
  { id:  5, x: 590, y: 148, type: 'trader' },
  { id:  6, x: 400, y: 250, type: 'farmer' },
  { id:  7, x: 710, y:  72, type: 'trader' },
  { id:  8, x: 840, y: 160, type: 'farmer' },
  { id:  9, x: 660, y: 270, type: 'trader' },
  { id: 10, x: 930, y:  90, type: 'farmer' },
  { id: 11, x:  90, y: 370, type: 'trader' },
  { id: 12, x: 260, y: 410, type: 'farmer' },
  { id: 13, x: 490, y: 370, type: 'trader' },
  { id: 14, x: 740, y: 390, type: 'farmer' },
  { id: 15, x: 900, y: 320, type: 'trader' },
  { id: 16, x: 190, y: 510, type: 'farmer' },
  { id: 17, x: 400, y: 490, type: 'trader' },
  { id: 18, x: 610, y: 480, type: 'farmer' },
  { id: 19, x: 820, y: 510, type: 'trader' },
  { id: 20, x: 960, y: 450, type: 'farmer' },
  { id: 21, x: 500, y: 175, type: 'trader' },
  { id: 22, x: 310, y: 310, type: 'farmer' },
]

// ── Sparse edge list (believable sub-set of nearby pairs) ────
const EDGES = [
  { id:  0, a:  0, b:  1 },
  { id:  1, a:  0, b:  3 },
  { id:  2, a:  1, b:  2 },
  { id:  3, a:  1, b:  4 },
  { id:  4, a:  2, b: 21 },
  { id:  5, a:  2, b:  6 },
  { id:  6, a:  3, b: 12 },
  { id:  7, a:  3, b: 22 },
  { id:  8, a:  4, b:  5 },
  { id:  9, a:  4, b:  7 },
  { id: 10, a:  5, b: 21 },
  { id: 11, a:  5, b:  9 },
  { id: 12, a:  6, b: 13 },
  { id: 13, a:  6, b: 22 },
  { id: 14, a:  7, b:  8 },
  { id: 15, a:  8, b: 10 },
  { id: 16, a:  8, b: 15 },
  { id: 17, a:  9, b: 14 },
  { id: 18, a: 10, b: 15 },
  { id: 19, a: 11, b: 12 },
  { id: 20, a: 11, b: 16 },
  { id: 21, a: 12, b: 13 },
  { id: 22, a: 12, b: 16 },
  { id: 23, a: 13, b: 17 },
  { id: 24, a: 13, b: 18 },
  { id: 25, a: 14, b: 15 },
  { id: 26, a: 14, b: 19 },
  { id: 27, a: 16, b: 17 },
  { id: 28, a: 17, b: 18 },
  { id: 29, a: 18, b: 19 },
  { id: 30, a: 19, b: 20 },
  { id: 31, a: 15, b: 20 },
  { id: 32, a: 21, b:  6 },
  { id: 33, a: 22, b: 13 },
]

// Edges that will also have a traveling dot (spread evenly)
const TRAVEL_EDGES = new Set([1, 4, 8, 13, 17, 22, 26, 30])

// ── Layer 1: Network Graph Background ────────────────────────
function NetworkGraphBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Soft glow filter for active lines */}
          <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Soft glow for nodes */}
          <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial gradient for section bg tint */}
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor={CLAY}   stopOpacity="0.06" />
            <stop offset="100%" stopColor={MAROON}  stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* Background tint */}
        <rect width="1000" height="560" fill="url(#bgGrad)" />

        {/* ── Base edges (always-on, faint) ── */}
        {EDGES.map((e) => {
          const a = NODES[e.a], b = NODES[e.b]
          return (
            <line
              key={`base-${e.id}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={CLAY}
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
          )
        })}

        {/* ── Pulsing highlight edges ── */}
        {EDGES.map((e) => {
          const a = NODES[e.a], b = NODES[e.b]
          // Spread delays across 0–4s to avoid sync
          const delay = (e.id * 0.37) % 4.0
          const repeatDelay = 1.8 + (e.id % 4) * 0.55
          const color = e.id % 3 === 0 ? GREEN : e.id % 3 === 1 ? CLAY : MAROON

          return (
            <motion.line
              key={`pulse-${e.id}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={color}
              strokeWidth="1.8"
              filter="url(#lineGlow)"
              animate={{ strokeOpacity: [0, 0, 0.75, 0.4, 0] }}
              transition={{
                duration: 2.2,
                delay,
                repeat: Infinity,
                repeatDelay,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* ── Traveling dots along selected edges ── */}
        {EDGES.filter((e) => TRAVEL_EDGES.has(e.id)).map((e) => {
          const a = NODES[e.a], b = NODES[e.b]
          const delay = (e.id * 0.37) % 4.0
          const repeatDelay = 1.8 + (e.id % 4) * 0.55
          const color = e.id % 2 === 0 ? CLAY : MAROON

          return (
            <motion.circle
              key={`dot-${e.id}`}
              r="4"
              fill={color}
              filter="url(#nodeGlow)"
              animate={{
                cx:      [a.x, b.x],
                cy:      [a.y, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.6,
                delay: delay + 0.35,
                repeat: Infinity,
                repeatDelay: repeatDelay + 0.6,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* ── Nodes ── */}
        {NODES.map((node) => {
          const color = node.type === 'farmer' ? CLAY : MAROON
          const breatheDelay = (node.id * 0.22) % 3

          return (
            <g key={`node-${node.id}`}>
              {/* Breathing outer ring */}
              <motion.circle
                cx={node.x} cy={node.y}
                fill={color}
                animate={{ r: [10, 15, 10], fillOpacity: [0.08, 0.18, 0.08] }}
                transition={{
                  duration: 3.5 + (node.id % 3) * 0.8,
                  delay: breatheDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Core dot */}
              <circle
                cx={node.x} cy={node.y}
                r="4.5"
                fill={color}
                fillOpacity="0.6"
                filter="url(#nodeGlow)"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Layer 2: Live Activity Ticker ────────────────────────────
const ACTIVITIES = [
  { icon: '🌾', text: 'A farmer from Sétif just listed fresh durum wheat' },
  { icon: '🤝', text: 'A trader from Algiers completed a bulk grain deal' },
  { icon: '🐑', text: 'A herder from Djelfa added 60 sheep to livestock' },
  { icon: '📦', text: 'A new order was placed by a buyer in Oran' },
  { icon: '🌽', text: 'A farmer from Tiaret listed premium maize harvest' },
  { icon: '🚚', text: 'Delivery confirmed — Annaba to Constantine route' },
  { icon: '🐄', text: 'A herder from Tébessa listed dairy cattle today' },
  { icon: '📈', text: 'Wheat prices up 9% — 14 farmers listed in Blida' },
  { icon: '🫙', text: 'Olive oil batch listed by a producer from Béjaïa' },
  { icon: '🤑', text: 'A trader from Batna just completed their 50th deal' },
]

// Three independent card slots — each cycles at a different pace
const SLOTS = [
  { key: 'A', startIdx: 0, interval: 2800, x: '8%',  y: '62%' },
  { key: 'B', startIdx: 3, interval: 3600, x: '38%', y: '74%' },
  { key: 'C', startIdx: 6, interval: 4400, x: '62%', y: '60%' },
]

function TickerCard({ message }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-lg select-none"
      style={{
        background: 'rgba(237,229,216,0.88)',
        backdropFilter: 'blur(12px)',
        border: `1px solid rgba(109,41,50,0.12)`,
        boxShadow: '0 8px 32px rgba(109,41,50,0.14)',
        maxWidth: 260,
        minWidth: 200,
      }}
    >
      <span style={{ fontSize: 16 }}>{message.icon}</span>
      <p
        className="text-xs leading-snug font-medium"
        style={{ color: MAROON }}
      >
        {message.text}
      </p>
      {/* Live pulse indicator */}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="flex-shrink-0 w-1.5 h-1.5 rounded-full ml-auto"
        style={{ background: '#22c55e' }}
      />
    </div>
  )
}

function LiveActivityTicker() {
  // Each slot maintains its own message index
  const [indices, setIndices] = useState(
    Object.fromEntries(SLOTS.map((s) => [s.key, s.startIdx]))
  )

  useEffect(() => {
    const timers = SLOTS.map((slot) =>
      setInterval(() => {
        setIndices((prev) => ({
          ...prev,
          [slot.key]: (prev[slot.key] + 1) % ACTIVITIES.length,
        }))
      }, slot.interval)
    )
    return () => timers.forEach(clearInterval)
  }, [])

  return (
    <>
      {SLOTS.map((slot) => {
        const msgIdx = indices[slot.key]
        return (
          <div
            key={slot.key}
            className="absolute"
            style={{ left: slot.x, top: slot.y, zIndex: 10 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <TickerCard message={ACTIVITIES[msgIdx]} />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      })}
    </>
  )
}

// ── Main exported section ────────────────────────────────────
export default function NetworkSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#EDE5D8',
        minHeight: 580,
      }}
    >
      {/* Layer 1 — SVG network graph fills the entire section */}
      <NetworkGraphBackground />

      {/* Layer 2 — Heading (upper half) */}
      <div
        className="relative z-10 flex flex-col items-center justify-start text-center pt-16 pb-0 px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
          style={{ background: MAROON, color: BEIGE }}
        >
          The Rura Network
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-semibold leading-tight"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: MAROON,
            letterSpacing: '-0.02em',
          }}
        >
          Rura: A Direct Network
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-md text-base font-light leading-relaxed"
          style={{ color: `${MAROON}99` }}
        >
          No middlemen. Just the connection.
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center gap-6 mt-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: CLAY }} />
            <span className="text-xs font-medium" style={{ color: `${MAROON}99` }}>Farmers &amp; Herders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: MAROON }} />
            <span className="text-xs font-medium" style={{ color: `${MAROON}99` }}>Traders &amp; Buyers</span>
          </div>
        </motion.div>
      </div>

      {/* Layer 2 — Live activity ticker cards (lower half) */}
      {/* spacer that gives the network graph its lower half to breathe */}
      <div className="relative" style={{ height: 300 }}>
        <LiveActivityTicker />
      </div>
    </section>
  )
}
