import { motion } from 'framer-motion'

const VP = { once: true, amount: 0.25 }

const links = ['Platform', 'Markets', 'AI Advisor', 'Livestock', 'Crops', 'About']

export default function Footer() {
  return (
    <footer
      className="relative pt-24 pb-16 px-6 overflow-hidden"
      style={{ background: '#6D2932' }}
    >
      {/* Floating ambient blobs */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-12 w-60 h-60 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#AB7A44' }}
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-12 left-8 w-44 h-44 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#D3DEB3' }}
      />

      <div className="max-w-6xl mx-auto">



        {/* Divider */}
        <div className="h-px mb-12" style={{ background: 'rgba(199,183,163,0.15)' }} />

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ delay: 0.1 }}
          >
            <div
              className="font-black text-3xl tracking-widest mb-3"
              style={{ fontFamily: 'Georgia, serif', color: 'white' }}
            >
              RU<span style={{ color: '#D3DEB3' }}>R</span>A
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(199,183,163,0.7)' }}>
              Africa's premier agri-tech marketplace.<br />Direct. Smart. Profitable.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-y-3"
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href="#"
                whileHover={{ x: 4, color: '#D3DEB3' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: 0.25 + i * 0.055 }}
                className="text-sm font-medium transition-colors"
                style={{ color: 'rgba(199,183,163,0.75)' }}
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(199,183,163,0.12)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(199,183,163,0.45)' }}>
            © 2026 Rura Platform. All rights reserved. Built for Africa's farmers.
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Contact'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs transition-opacity hover:opacity-100"
                style={{ color: 'rgba(199,183,163,0.45)' }}
              >{t}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
