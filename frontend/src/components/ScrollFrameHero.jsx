import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Config ──────────────────────────────────────────────────
const TOTAL_FRAMES = 304
const frameSrc = (i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.png`

// ── Cover-fit draw ──────────────────────────────────────────
function drawCover(ctx, img, cw, ch) {
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

// ── Debounce ────────────────────────────────────────────────
function debounce(fn, ms) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

export default function ScrollFrameHero() {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const framesRef    = useRef([])
  const targetFrame  = useRef(0)
  const lastFrame    = useRef(-1)
  const rafId        = useRef(null)
  const progressRef  = useRef(0)

  const [loadedCount, setLoadedCount] = useState(0)
  const [allLoaded, setAllLoaded]     = useState(false)

  // ── 1. Preload all frames ─────────────────────────────────
  useEffect(() => {
    const imgs = []
    let done = 0
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.onload = img.onerror = () => {
        done++
        setLoadedCount(done)
        if (done === TOTAL_FRAMES) setAllLoaded(true)
      }
      img.src = frameSrc(i)
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  // ── 2. Resize canvas (DPR-aware) ─────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w   = window.innerWidth
    const h   = window.innerHeight
    canvas.width        = w * dpr
    canvas.height       = h * dpr
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    // Redraw current frame after resize
    const img = framesRef.current[lastFrame.current]
    if (img?.complete && img.naturalWidth) drawCover(ctx, img, w, h)
  }, [])

  useEffect(() => {
    resizeCanvas()
    const onResize = debounce(resizeCanvas, 250)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [resizeCanvas])

  // ── 3. RAF render loop (started once, decoupled from scroll) ─
  useEffect(() => {
    const loop = () => {
      const canvas = canvasRef.current
      if (canvas && targetFrame.current !== lastFrame.current) {
        const img = framesRef.current[targetFrame.current]
        if (img?.complete && img.naturalWidth) {
          const ctx = canvas.getContext('2d')
          drawCover(ctx, img, window.innerWidth, window.innerHeight)
          lastFrame.current = targetFrame.current
        }
      }
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  // ── 4. Scroll listener (only after all frames loaded) ─────
  useEffect(() => {
    if (!allLoaded) return

    // Draw frame 0 immediately
    const canvas = canvasRef.current
    if (canvas) {
      const img = framesRef.current[0]
      if (img?.complete && img.naturalWidth) {
        const ctx = canvas.getContext('2d')
        drawCover(ctx, img, window.innerWidth, window.innerHeight)
        lastFrame.current = 0
      }
    }

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect             = container.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      const scrolled           = -rect.top
      let progress             = scrolled / scrollableDistance
      progress                 = Math.min(Math.max(progress, 0), 1)
      progressRef.current      = progress

      targetFrame.current = Math.round(progress * (TOTAL_FRAMES - 1))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [allLoaded])

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100)

  return (
    <>
      {/* ── Loader overlay ── */}
      <AnimatePresence>
        {!allLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
            style={{ background: '#080808' }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-black tracking-[0.15em]"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: 'white',
              }}
            >
              RU<span style={{ color: '#6D2932' }}>R</span>A
            </motion.div>

            <div className="relative w-72 h-[2px] rounded-full overflow-hidden" style={{ background: '#1c1c1c' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #6D2932, #AB7A44)',
                  boxShadow: '0 0 10px #6D2932',
                }}
              />
            </div>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#555' }}>
              Loading {pct}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main scroll section ── */}
      <section
        ref={containerRef}
        style={{ height: '500vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <canvas ref={canvasRef} style={{ display: 'block' }} />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.55) 100%)',
            }}
          />

          {/* ── Scroll hint ── */}
          <AnimatePresence>
            {allLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="#C7B7A3" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: '#C7B7A3' }}>
                  Scroll
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
