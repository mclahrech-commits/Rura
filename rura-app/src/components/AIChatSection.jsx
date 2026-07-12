import { motion } from 'framer-motion'

const MAROON     = '#6D2932'
const BEIGE      = '#C7B7A3'
const BEIGE_SOFT = '#e0d4c2'
const BG         = '#f5ede2'

const MESSAGES = [
  { from: 'user', text: 'My maize leaves are turning yellow. What\'s wrong?' },
  { from: 'ai',   text: 'Likely nitrogen deficiency. Soil is dry — irrigate this week and apply urea at 50kg/ha.' },
  { from: 'user', text: 'When should I sell my cassava harvest?' },
  { from: 'ai',   text: 'Market price up 12% in 3 weeks. Hold, store dry. I\'ll alert you when traders peak.' },
  { from: 'user', text: 'Add 40 goats to my livestock tracker.' },
  { from: 'ai',   text: 'Done. Vaccination reminder set for Oct 14. Avg weight gain target: 0.18kg/day.' },
]

function PhoneFrame({ children }) {
  return (
    <div className="relative mx-auto" style={{ width: 340, height: 700 }}>
      {/* Outer bezel */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 52,
          background: MAROON,
          padding: 12,
          boxShadow: '0 60px 120px -30px rgba(109,41,50,0.6)',
        }}
      >
        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 42, background: BEIGE }}
        >
          {/* Notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{
              top: 12,
              height: 24,
              width: 112,
              borderRadius: 99,
              background: MAROON,
            }}
          />
          {children}
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[3px] rounded-l"
        style={{ top: 128, height: 48, width: 4, background: '#4a1b20' }} />
      <div className="absolute -left-[3px] rounded-l"
        style={{ top: 192, height: 64, width: 4, background: '#4a1b20' }} />
      <div className="absolute -right-[3px] rounded-r"
        style={{ top: 160, height: 80, width: 4, background: '#4a1b20' }} />
    </div>
  )
}

export default function AIChatSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: BG }}>

      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: MAROON, opacity: 0.07 }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-10 left-10 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: BEIGE, opacity: 0.4 }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: MAROON, color: BEIGE }}
          >
            AI Advisor
          </span>

          <h2
            className="font-semibold leading-tight mb-6"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(2rem,4.5vw,3.8rem)',
              color: MAROON,
              letterSpacing: '-0.02em',
            }}
          >
            Your Personal<br />
            <em className="font-normal" style={{ color: '#AB7A44' }}>Farming Expert,</em><br />
            Always On.
          </h2>

          <p className="text-base font-light leading-relaxed mb-8" style={{ color: `${MAROON}B3` }}>
            Ask anything. Rura's AI Advisor analyses your soil data, local weather patterns, and
            live market prices to give you hyper-personalised guidance — 24/7.
          </p>

          {[
            '🌦 Weather-aware advice',
            '📍 Location-specific crops',
            '💰 Live price intelligence',
            '🧪 Soil health analysis',
          ].map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 + i * 0.09 }}
              className="flex items-center gap-3 mb-3 text-sm font-medium"
              style={{ color: '#333' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: MAROON }} />
              {f}
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(109,41,50,0.35)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5 }}
            className="mt-8 px-8 py-4 rounded-full font-bold text-sm tracking-wide"
            style={{ background: MAROON, color: '#D3DEB3' }}
          >
            Try AI Advisor Free →
          </motion.button>
        </motion.div>

        {/* ── Right: new phone ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <PhoneFrame>
            <div className="h-full flex flex-col">

              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-5 pb-3"
                style={{
                  paddingTop: 52,
                  borderBottom: `1px solid ${MAROON}26`,
                  background: BEIGE_SOFT,
                }}
              >
                <div
                  className="flex items-center justify-center font-semibold"
                  style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    background: MAROON,
                    color: BEIGE,
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 16,
                  }}
                >R</div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: MAROON }}>
                    Rura AI Advisor
                  </div>
                  <div className="flex items-center gap-1.5" style={{ fontSize: 10, color: `${MAROON}99` }}>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: MAROON, display: 'inline-block' }}
                    />
                    Online
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-4 py-5 space-y-2" style={{ overflow: 'hidden' }}>
                {MESSAGES.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18, delay: i * 0.35 }}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      style={{
                        maxWidth: '78%',
                        borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        padding: '8px 14px',
                        fontSize: 12,
                        lineHeight: 1.45,
                        background: m.from === 'user' ? MAROON : BEIGE_SOFT,
                        color: m.from === 'user' ? BEIGE : MAROON,
                        border: m.from === 'ai' ? `1px solid ${MAROON}20` : 'none',
                      }}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: MESSAGES.length * 0.35 }}
                  className="flex justify-start"
                >
                  <div
                    className="flex gap-1 items-center px-3 py-2"
                    style={{
                      background: BEIGE_SOFT,
                      border: `1px solid ${MAROON}20`,
                      borderRadius: '16px 16px 16px 4px',
                    }}
                  >
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.15 }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: MAROON, display: 'inline-block' }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input bar */}
              <div
                className="px-4 py-3"
                style={{ borderTop: `1px solid ${MAROON}20` }}
              >
                <div
                  className="flex items-center gap-2 px-4"
                  style={{
                    background: BEIGE_SOFT,
                    borderRadius: 99,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <div className="flex-1" style={{ fontSize: 11, color: `${MAROON}55` }}>
                    Ask your advisor…
                  </div>
                  <div
                    className="flex items-center justify-center font-bold"
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: MAROON, color: BEIGE, fontSize: 13,
                    }}
                  >↑</div>
                </div>
              </div>

            </div>
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  )
}
