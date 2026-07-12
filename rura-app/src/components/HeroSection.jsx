import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOTAL_FRAMES = 304
const FRAME_PATH = (i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.png`

function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth, ih = img.naturalHeight
  const scale = Math.max(cw / iw, ch / ih)
  const dw = iw * scale, dh = ih * scale
  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

export default function HeroSection() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const frames = useRef([])
  const currentIdx = useRef(0)
  const rafPending = useRef(false)
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  const showIntro = progress < 0.12
  const showMid   = progress >= 0.38 && progress < 0.72
  const showFinal = progress >= 0.82

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth, h = window.innerHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    const img = frames.current[currentIdx.current]
    if (img?.complete) drawCover(ctx, img, w, h)
  }, [])

  useEffect(() => {
    let cnt = 0
    const imgs = new Array(TOTAL_FRAMES)
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const done = () => { cnt++; setLoaded(cnt); if (cnt === TOTAL_FRAMES) setReady(true) }
      img.onload = done; img.onerror = done
      img.src = FRAME_PATH(i)
      imgs[i] = img
    }
    frames.current = imgs
  }, [])

  useEffect(() => {
    resizeCanvas()
    let t; const onResize = () => { clearTimeout(t); t = setTimeout(resizeCanvas, 120) }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t) }
  }, [resizeCanvas])

  useEffect(() => {
    if (!ready) return
    const img0 = frames.current[0]
    if (img0?.complete) {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) drawCover(ctx, img0, window.innerWidth, window.innerHeight)
    }

    const tick = () => {
      rafPending.current = false
      const section = sectionRef.current; const canvas = canvasRef.current
      if (!section || !canvas) return
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight)))
      setProgress(p)
      const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES))
      if (idx !== currentIdx.current) {
        currentIdx.current = idx
        const ctx = canvas.getContext('2d')
        const img = frames.current[idx]
        if (img?.complete) drawCover(ctx, img, window.innerWidth, window.innerHeight)
      }
    }

    const onScroll = () => { if (!rafPending.current) { rafPending.current = true; requestAnimationFrame(tick) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ready])

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100)

  return (
    <section ref={sectionRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>
        <canvas ref={canvasRef} id="hero-canvas" style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* Dark vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg,rgba(0,0,0,0.35) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.5) 100%)'
        }} />

        {/* Intro */}
        <AnimatePresence>
          {showIntro && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-xs font-semibold tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--beige)' }}>
                Scroll to Reveal
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-['Playfair_Display'] font-black leading-[1.08]"
                style={{ fontSize: 'clamp(3rem,9vw,7.5rem)', color: 'white', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
                The Land<br /><em style={{ color: 'var(--green)' }}>Connects</em><br />Us All
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="mt-10 flex flex-col items-center gap-2" style={{ color: 'var(--beige)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="text-xs tracking-widest uppercase">Scroll</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mid */}
        <AnimatePresence>
          {showMid && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: 'var(--maroon)', color: 'var(--beige)' }}>Agri-Tech Platform</span>
              <h2 className="font-['Playfair_Display'] font-black leading-tight"
                style={{ fontSize: 'clamp(2.2rem,6vw,5rem)', color: 'white', textShadow: '0 4px 40px rgba(0,0,0,0.7)' }}>
                Connecting Farmers<br /><em style={{ color: 'var(--green)' }}>To The Future</em>
              </h2>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed" style={{ color: 'rgba(237,229,216,0.85)' }}>
                Real-time markets, AI advisory, and direct trade — no middlemen, maximum profit.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final */}
        <AnimatePresence>
          {showFinal && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="font-['Playfair_Display'] font-black leading-tight"
                style={{ fontSize: 'clamp(2.5rem,7vw,6rem)', color: 'white', textShadow: '0 4px 60px rgba(0,0,0,0.7)' }}>
                Rura: Direct Trade,<br /><span className="shimmer-text">Smarter Farming</span>
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }} className="flex gap-4 mt-10 flex-wrap justify-center">
                <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(211,222,179,0.5)' }}
                  whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-full font-bold text-sm tracking-wide"
                  style={{ background: 'var(--green)', color: 'var(--maroon)' }}>
                  Start Trading →
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide border"
                  style={{ borderColor: 'rgba(237,229,216,0.4)', color: 'var(--beige-lt)', background: 'transparent' }}>
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress */}
        <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-75"
          style={{ width: `${progress * 100}%`, background: 'var(--green)' }} />
      </div>

      {/* Loader */}
      <AnimatePresence>
        {!ready && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
            style={{ background: '#080808' }}>
            <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="font-['Playfair_Display'] font-black tracking-[0.15em]"
              style={{ fontSize: 'clamp(3rem,8vw,5rem)', color: 'white' }}>
              RU<span style={{ color: 'var(--maroon)' }}>R</span>A
            </motion.div>
            <div className="w-72 h-[2px] rounded-full overflow-hidden" style={{ background: '#1a1a1a' }}>
              <div className="h-full rounded-full" style={{
                width: `${pct}%`, background: 'linear-gradient(90deg,var(--maroon),var(--clay))',
                boxShadow: '0 0 12px var(--maroon)', transition: 'width 0.1s linear'
              }} />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666' }}>Loading {pct}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
