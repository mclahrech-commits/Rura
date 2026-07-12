import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const FRAMES_DIR = 'C:/Users/mosfa/Downloads/perfecto'

// Custom plugin: serve /frames/* from the perfecto folder
function framesPlugin() {
  return {
    name: 'frames-server',
    configureServer(server) {
      server.middlewares.use('/frames', (req, res, next) => {
        const filePath = path.join(FRAMES_DIR, req.url)
        if (fs.existsSync(filePath)) {
          const ext = path.extname(filePath).toLowerCase()
          const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
          res.setHeader('Content-Type', mime)
          res.setHeader('Cache-Control', 'public, max-age=31536000')
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), framesPlugin()],
  server: {
    port: 5173,
    open: true,
  },
})
