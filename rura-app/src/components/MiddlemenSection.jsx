import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.3 }

const fadeLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function MiddlemenSection() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#EDE5D8' }}
    >
      {/* Ambient blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-[0.12] pointer-events-none float"
        style={{ background: 'radial-gradient(circle, #AB7A44, transparent 70%)' }} />
      <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full opacity-[0.1] pointer-events-none float-delay"
        style={{ background: 'radial-gradient(circle, #6D2932, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: '#6D2932', color: '#C7B7A3' }}
          >
            Direct Connection
          </span>
          <h2
            className="font-semibold leading-tight"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(2rem,5vw,4rem)',
              color: '#6D2932',
              letterSpacing: '-0.02em',
            }}
          >
            Eliminating the Middlemen.<br />
            <em className="font-normal" style={{ color: '#AB7A44' }}>Forever.</em>
          </h2>
        </motion.div>

        {/* Two columns + connector */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">

          {/* Left — Farmer */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '4/5' }}
          >
            <img
              src="/images/herder-sunset.jpg"
              alt="Farmer and herder at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(109,41,50,0.75) 0%, transparent 55%)' }} />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#D3DEB3' }}>The Producer</p>
              <h3 className="font-black text-2xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Farmers &amp; Herders</h3>
              <p className="text-sm text-white/70 mt-0.5">Growing what the world needs</p>
            </div>
          </motion.div>

          {/* Center connector */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="hidden lg:flex flex-col items-center gap-3"
            style={{ transformOrigin: 'center' }}
          >
            <div className="w-px h-16 rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent, #6D2932)' }} />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg"
              style={{ background: '#6D2932', boxShadow: '0 0 20px rgba(109,41,50,0.5)' }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-base"
              >⚡</motion.span>
            </div>
            <div className="w-px h-16 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #6D2932, transparent)' }} />
          </motion.div>

          {/* Right — Trader */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '4/5' }}
          >
            <img
              src="/images/wheat-sky.jpg"
              alt="Golden wheat field marketplace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(109,41,50,0.75) 0%, transparent 55%)' }} />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#D3DEB3' }}>The Market</p>
              <h3 className="font-black text-2xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Traders &amp; Buyers</h3>
              <p className="text-sm text-white/70 mt-0.5">Connecting demand to supply</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
