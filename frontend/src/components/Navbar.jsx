import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DISCOVER_ITEMS = [
  { label: 'Livestock', icon: '🐄' },
  { label: 'Crops', icon: '🌾' },
  { label: 'Dairy', icon: '🥛' },
  { label: 'Trending Products', icon: '📈' },
  { label: 'How It Works', icon: '⚡' },
]

export default function NavBar() {
  const [discoverOpen, setDiscoverOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropRef = useRef(null)

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDiscoverOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      {/* ── Top strip ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: 5, background: '#0d0d14' }}
      />

      {/* ── Floating nav bar ── */}
      <div
        className="fixed left-0 right-0 z-40 flex items-center justify-between px-6 py-3"
        style={{ top: 5 }}
      >
        {/* Left – empty */}
        <div className="w-24 hidden md:block" />

        {/* ── Center pill (desktop) ── */}
        <div className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full shadow-lg"
          style={{ background: '#6D2932' }}>

          {/* Home (active) */}
          <button
            className="px-5 py-2 rounded-full text-sm font-semibold"
            style={{ background: '#C7B7A3', color: '#6D2932' }}
          >
            Home
          </button>

          {/* Discover */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDiscoverOpen((o) => !o)}
              className="px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-1"
              style={{ background: 'transparent', color: '#C7B7A3' }}
            >
              Discover
              <motion.span
                animate={{ rotate: discoverOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="text-xs opacity-70"
              >▾</motion.span>
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
              {discoverOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: '#EDE5D8',
                    border: '1px solid #C7B7A3',
                  }}
                >
                  {DISCOVER_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left"
                      style={{
                        color: '#6D2932',
                        borderBottom: i < DISCOVER_ITEMS.length - 1 ? '1px solid rgba(109,41,50,0.1)' : 'none',
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right – Login (desktop) ── */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold shadow-md"
          style={{ background: '#6D2932', color: '#C7B7A3' }}
        >
          Login <span>→</span>
        </motion.button>

        {/* ── Mobile: logo + hamburger ── */}
        <div className="flex md:hidden items-center justify-between w-full">
          <span className="font-black text-xl tracking-wider" style={{ color: '#6D2932', fontFamily: 'Georgia, serif' }}>
            RU<span style={{ color: '#AB7A44' }}>R</span>A
          </span>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block w-6 h-0.5 rounded" style={{ background: '#6D2932' }} />
            <span className="block w-6 h-0.5 rounded" style={{ background: '#6D2932' }} />
            <span className="block w-4 h-0.5 rounded" style={{ background: '#6D2932' }} />
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6"
            style={{ background: '#6D2932' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-2xl"
              style={{ color: '#C7B7A3' }}
            >✕</button>

            {['Home', 'Discover', ...DISCOVER_ITEMS.map((d) => d.label), 'Login'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-xl font-semibold"
                style={{ color: '#C7B7A3' }}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
