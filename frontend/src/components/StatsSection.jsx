import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.3 }

// ── Custom hook: count up when inView ──────────────────────
function useCountUp(target, isActive, duration = 2000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!isActive) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [isActive, target, duration])
  return value
}

const STATS = [
  { target: 50000, suffix: '+',  label: 'Farmers Onboarded', icon: '👩‍🌾' },
  { target: 2,     prefix: '₦', suffix: 'B+', label: 'Trade Volume', icon: '💹' },
  { target: 18,    suffix: '%',  label: 'Avg. Profit Increase', icon: '📈' },
  { target: 6,     suffix: '+',  label: 'States Covered', icon: '🗺️' },
]

function StatCard({ stat, index, isActive }) {
  const count = useCountUp(stat.target, isActive, 2000)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VP}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}
      className="rounded-3xl p-8 text-center flex flex-col items-center gap-3"
      style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <span className="text-4xl">{stat.icon}</span>
      <div
        className="font-black"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem,4vw,3rem)',
          color: '#D3DEB3',
        }}
      >
        {stat.prefix ?? ''}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm font-medium tracking-wide" style={{ color: '#C7B7A3' }}>
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#6D2932' }}
    >
      {/* Slow rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ border: '2px solid #AB7A44' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{ border: '2px solid #D3DEB3' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: '#AB7A44' }}>
            Rura By The Numbers
          </p>
          <h2
            className="font-black"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem,5vw,4rem)', color: 'white' }}
          >
            The Platform That <em style={{ color: '#D3DEB3' }}>Delivers</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} isActive={triggered} />
          ))}
        </div>
      </div>
    </section>
  )
}
