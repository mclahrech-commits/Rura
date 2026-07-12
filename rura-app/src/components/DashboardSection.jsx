import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MAROON    = '#6D2932'
const BEIGE     = '#C7B7A3'
const BEIGE_SOFT = '#e0d4c2'
const BG        = '#f5ede2'

function ProfileBadge({ role, name, meta, tags, icon, side }) {
  return (
    <div
      className="w-full max-w-sm rounded-3xl p-6"
      style={{
        background: BEIGE_SOFT,
        border: `1px solid ${MAROON}26`,
        boxShadow: '0 30px 80px -40px rgba(109,41,50,0.45)',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: `${MAROON}B3` }}
        >
          {role}
        </span>
        <span
          className="size-2 rounded-full animate-pulse"
          style={{ background: MAROON }}
        />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div
          className="size-14 rounded-2xl flex items-center justify-center"
          style={{ background: MAROON, color: BEIGE }}
        >
          {icon}
        </div>
        <div>
          <div
            className="text-xl font-semibold"
            style={{ color: MAROON, fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {name}
          </div>
          <div className="text-xs" style={{ color: `${MAROON}99` }}>
            {meta}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-1 text-[11px]"
            style={{ border: `1px solid ${MAROON}33`, color: MAROON }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-xl px-3 py-2" style={{ background: BEIGE }}>
          <div style={{ color: `${MAROON}99` }}>Rating</div>
          <div className="font-semibold" style={{ color: MAROON }}>4.9 ★</div>
        </div>
        <div className="rounded-xl px-3 py-2" style={{ background: BEIGE }}>
          <div style={{ color: `${MAROON}99` }}>
            {side === 'left' ? 'Listings' : 'Orders'}
          </div>
          <div className="font-semibold" style={{ color: MAROON }}>
            {side === 'left' ? '128' : '342'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DirectTrade() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const leftX     = useTransform(scrollYProgress, [0.1, 0.55], [-260, 0])
  const rightX    = useTransform(scrollYProgress, [0.1, 0.55], [260, 0])
  const parallaxL = useTransform(scrollYProgress, [0, 1], [60, -60])
  const parallaxR = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const pathLength = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const dotOffset  = useTransform(scrollYProgress, [0.2, 0.85], ['0%', '100%'])
  const headerOp  = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headerY   = useTransform(scrollYProgress, [0.05, 0.35], [40, 0])

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: BG }}
    >
      {/* ── Heading ── */}
      <motion.div
        style={{ opacity: headerOp, y: headerY }}
        className="mx-auto max-w-3xl text-center"
      >
        <span
          className="text-[11px] uppercase tracking-[0.25em]"
          style={{ color: `${MAROON}B3` }}
        >
          02 — Direct
        </span>
        <h2
          className="mt-4 leading-[1] font-semibold"
          style={{
            color: MAROON,
            fontFamily: "'Fraunces', Georgia, serif",
            letterSpacing: '-0.02em',
            fontSize: 'clamp(2rem,5vw,4.5rem)',
          }}
        >
          No middlemen.
          <br />
          <span className="italic font-normal">Just the handshake.</span>
        </h2>
        <p className="mt-6 max-w-xl mx-auto" style={{ color: `${MAROON}B3` }}>
          Farmers and traders connect directly on Rura. Every transaction keeps
          more value in the hands that built it.
        </p>
      </motion.div>

      {/* ── Three-column layout ── */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-0 max-w-6xl mx-auto">

        {/* LEFT — Farmer */}
        <motion.div
          style={{ x: leftX }}
          className="flex justify-center md:justify-end md:pr-4"
        >
          <motion.div style={{ y: parallaxL }}>
            <ProfileBadge
              role="Farmer"
              name="Amara Okonkwo"
              meta="Sétif, Algeria · 8 hectares"
              tags={['Maize', 'Cassava', 'Yam']}
              side="left"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 22V8m0 0c0-3 2-5 5-5-1 4-2 6-5 6Zm0 0c0-3-2-5-5-5 1 4 2 6 5 6Z" />
                  <path d="M5 14c2 0 4 1 7 4 3-3 5-4 7-4" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>

        {/* CENTER — Animated connector */}
        <div className="relative h-32 md:h-64 w-full md:w-64 flex items-center justify-center">
          <svg
            viewBox="0 0 240 80"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor={MAROON} stopOpacity="0.2" />
                <stop offset="50%"  stopColor={MAROON} stopOpacity="1" />
                <stop offset="100%" stopColor={MAROON} stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Main arc */}
            <motion.path
              d="M 10 40 Q 120 0 230 40"
              fill="none"
              stroke="url(#connGrad)"
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Glow copy */}
            <motion.path
              d="M 10 40 Q 120 0 230 40"
              fill="none"
              stroke={MAROON}
              strokeWidth="6"
              strokeOpacity="0.35"
              filter="url(#glow)"
              style={{ pathLength }}
            />
            {/* Travelling dot */}
            <motion.circle
              r="5"
              fill={MAROON}
              style={{
                offsetPath: "path('M 10 40 Q 120 0 230 40')",
                offsetDistance: dotOffset,
              }}
            />
          </svg>

          <div
            className="absolute inset-x-0 -bottom-2 text-center text-[10px] uppercase tracking-[0.25em]"
            style={{ color: `${MAROON}99` }}
          >
            Direct trade
          </div>
        </div>

        {/* RIGHT — Trader */}
        <motion.div
          style={{ x: rightX }}
          className="flex justify-center md:justify-start md:pl-4"
        >
          <motion.div style={{ y: parallaxR }}>
            <ProfileBadge
              role="Trader"
              name="Kemi Logistics Co."
              meta="Algiers · Bulk buyer"
              tags={['Grains', 'Tubers', 'Export']}
              side="right"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 7h11l4 4h3v6h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V7Z" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
