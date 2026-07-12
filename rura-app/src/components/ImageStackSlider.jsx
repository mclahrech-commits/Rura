import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Stack position config: index 0 = front card ─────────────
const STACK_POSITIONS = [
  { scale: 1,    rotate: 0,   y: 0,   x: 0,   opacity: 1,    z: 50, shadow: '0 24px 60px rgba(109,41,50,0.28)' },
  { scale: 0.93, rotate: 4,   y: 14,  x: 18,  opacity: 0.85, z: 40, shadow: '0 12px 30px rgba(109,41,50,0.16)' },
  { scale: 0.86, rotate: -6,  y: 26,  x: -14, opacity: 0.65, z: 30, shadow: '0 8px 20px rgba(109,41,50,0.10)' },
  { scale: 0.79, rotate: 7,   y: 36,  x: 20,  opacity: 0.45, z: 20, shadow: '0 4px 12px rgba(109,41,50,0.07)' },
  { scale: 0.72, rotate: -8,  y: 44,  x: -18, opacity: 0.25, z: 10, shadow: 'none' },
]

const IMAGES = [
  '/images/slider/slide1.jpg',
  '/images/slider/slide2.jpg',
  '/images/slider/slide3.jpg',
  '/images/slider/slide4.jpg',
  '/images/slider/slide5.jpg',
]

// Alt texts for accessibility
const ALTS = [
  'Farmer working in the field',
  'Livestock herding at sunset',
  'Golden crop harvest',
  'Trader at the market',
  'Rural agricultural landscape',
]

export default function ImageStackSlider() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4])

  // Rotate order every 3.5s — purely time-based, no scroll
  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev]
        next.push(next.shift())
        return next
      })
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: '#EDE5D8' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: '#6D2932', color: '#C7B7A3' }}
            >
              Life on the Farm
            </span>
            <h2
              className="font-semibold leading-tight mb-5"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(2rem,4.5vw,3.8rem)',
                color: '#6D2932',
                letterSpacing: '-0.02em',
              }}
            >
              Where Every Field<br />
              <em className="font-normal" style={{ color: '#AB7A44' }}>Tells a Story.</em>
            </h2>
            <p className="text-base font-light leading-relaxed" style={{ color: '#5a4030' }}>
              From golden harvest fields to twilight pastures — Rura is built for the
              people and places that feed the world. Real land. Real work. Real rewards.
            </p>
            <div className="mt-6 flex gap-3">
              {STACK_POSITIONS.slice(0, 5).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: order[0] === i ? 1.4 : 1, opacity: order[0] === i ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#6D2932' }}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Right: stack ── */}
          <div className="flex justify-center">
            <div
              className="relative"
              style={{ width: 320, height: 420 }}
            >
              <AnimatePresence>
                {order.map((imgIdx, stackPos) => {
                  if (stackPos >= STACK_POSITIONS.length) return null
                  const pos = STACK_POSITIONS[stackPos]
                  return (
                    <motion.div
                      key={imgIdx}
                      layout
                      animate={{
                        scale:   pos.scale,
                        rotate:  pos.rotate,
                        y:       pos.y,
                        x:       pos.x,
                        opacity: pos.opacity,
                        zIndex:  pos.z,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        boxShadow: pos.shadow,
                        transformOrigin: 'center bottom',
                      }}
                      onClick={() =>
                        setOrder((prev) => {
                          const next = [...prev]
                          next.push(next.shift())
                          return next
                        })
                      }
                    >
                      <img
                        src={IMAGES[imgIdx % IMAGES.length]}
                        alt={ALTS[imgIdx % ALTS.length]}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      {/* Subtle vignette on front card */}
                      {stackPos === 0 && (
                        <div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(to top, rgba(109,41,50,0.45) 0%, transparent 50%)',
                          }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
