import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DISCOVER_ITEMS = [
  { label: 'Livestock', icon: '🐄' },
  { label: 'Crops', icon: '🌾' },
  { label: 'Dairy', icon: '🥛' },
  { label: 'Trending Products', icon: '📈' },
  { label: 'How It Works', icon: '⚡' },
]

const FARM_DATA_ITEMS = [
  { label: 'Crop Health', icon: '🌿' },
  { label: 'Weather', icon: '☀️' },
]

// In production, you would fetch this `user` from your `useAuth()` hook or Redux store.
// Defaulting to null (logged out) until real authentication is wired up.
export default function NavBar({ onLoginClick, user = null }) {
  const [discoverOpen, setDiscoverOpen] = useState(false)
  const [farmDataOpen, setFarmDataOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const dropRef = useRef(null)
  const farmDataDropRef = useRef(null)

  // Detect FARMER role based on typical Prisma string or array role architectures
  const isFarmer = user?.role === 'FARMER' || user?.roles?.includes('FARMER')

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDiscoverOpen(false)
      }
      if (farmDataDropRef.current && !farmDataDropRef.current.contains(e.target)) {
        setFarmDataOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Build the flat list of mobile menu items
  const mobileItems = [
    'Home',
    'Discover',
    ...DISCOVER_ITEMS.map((d) => `  ${d.label}`), // indent sub-items slightly for clarity
    ...(isFarmer ? [
      'Dashboard',
      'My Products',
      'Orders',
      'Farm Data',
      ...FARM_DATA_ITEMS.map((d) => `  ${d.label}`),
      'Notifications'
    ] : []),
    user ? 'Profile' : 'Login'
  ]

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
        <motion.div 
          layout // Enables smooth width transition when adding/removing items
          className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 shadow-lg"
          style={{ background: '#6D2932', borderRadius: 9999 }}
        >
          {/* Home (active) */}
          <motion.button layout className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap" style={{ background: '#C7B7A3', color: '#6D2932' }}>
            Home
          </motion.button>

          {/* Discover */}
          <motion.div layout className="relative" ref={dropRef}>
            <button
              onClick={() => setDiscoverOpen((o) => !o)}
              className="px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-1 whitespace-nowrap"
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
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left hover:bg-black/5"
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
          </motion.div>

          {/* Conditional FARMER Items */}
          <AnimatePresence mode="popLayout">
            {isFarmer && (
              <>
                <motion.button 
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
                  style={{ background: 'transparent', color: '#C7B7A3' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199, 183, 163, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Dashboard
                </motion.button>
                
                <motion.button 
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
                  style={{ background: 'transparent', color: '#C7B7A3' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199, 183, 163, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  My Products
                </motion.button>

                <motion.button 
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
                  style={{ background: 'transparent', color: '#C7B7A3' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199, 183, 163, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Orders
                </motion.button>

                {/* Farm Data Dropdown */}
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, delay: 0.2 }}
                  className="relative" 
                  ref={farmDataDropRef}
                >
                  <button
                    onClick={() => setFarmDataOpen((o) => !o)}
                    className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 whitespace-nowrap transition-colors"
                    style={{ background: 'transparent', color: '#C7B7A3' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199, 183, 163, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Farm Data
                    <motion.span
                      animate={{ rotate: farmDataOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="text-xs opacity-70"
                    >▾</motion.span>
                  </button>

                  <AnimatePresence>
                    {farmDataOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                          background: '#EDE5D8',
                          border: '1px solid #C7B7A3',
                        }}
                      >
                        {FARM_DATA_ITEMS.map((item, i) => (
                          <motion.button
                            key={item.label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.045 }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left hover:bg-black/5"
                            style={{
                              color: '#6D2932',
                              borderBottom: i < FARM_DATA_ITEMS.length - 1 ? '1px solid rgba(109,41,50,0.1)' : 'none',
                            }}
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Notifications Bell */}
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                  className="flex items-center pl-1 pr-1.5"
                >
                  <button 
                    className="w-9 h-9 rounded-full flex items-center justify-center relative transition-colors" 
                    style={{ color: '#C7B7A3' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(199, 183, 163, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    aria-label="Notifications"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {/* Unread indicator */}
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#6D2932]"></span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Right – Login / Profile (desktop) ── */}
        {!user ? (
          <button
            onClick={() => {
              if (onLoginClick) {
                onLoginClick();
              }
            }}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold shadow-md cursor-pointer pointer-events-auto relative z-50 hover:scale-105 active:scale-95 transition-transform"
            style={{ background: '#6D2932', color: '#C7B7A3' }}
          >
            Login <span>→</span>
          </button>
        ) : (
          <div 
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full shadow-md cursor-pointer pointer-events-auto relative z-50 hover:scale-105 transition-transform"
            style={{ background: '#6D2932', color: '#C7B7A3' }}
            title="Profile"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

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
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-5 overflow-y-auto py-10"
            style={{ background: '#6D2932' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-2xl"
              style={{ color: '#C7B7A3' }}
            >✕</button>

            {mobileItems.map((item, i) => {
              const isSubItem = item.startsWith('  ');
              return (
                <motion.button
                  key={item + i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`font-semibold ${isSubItem ? 'text-lg opacity-80' : 'text-xl'}`}
                  style={{ color: '#C7B7A3' }}
                  onClick={() => {
                    setMobileOpen(false)
                    if (item === 'Login' && onLoginClick) {
                      onLoginClick()
                    }
                  }}
                >
                  {item.trim()}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

