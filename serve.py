import http.server, os, mimetypes

# Serve the built Vite dev output (or use this for the static public assets workaround)
RURA_DIR   = r"C:\Users\mosfa\Rura\rura-app\public"
FRAMES_DIR = r"C:\Users\mosfa\Downloads\perfecto"
PORT = 5500

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = path.split('?', 1)[0].split('#', 1)[0]
        if path.startswith('/frames/'):
            rel = path[len('/frames/'):]
            return os.path.join(FRAMES_DIR, rel)
        rel = path.lstrip('/')
        return os.path.join(RURA_DIR, rel) if rel else os.path.join(RURA_DIR, 'index.html')

    def log_message(self, fmt, *args):
        pass

if __name__ == '__main__':
    os.chdir(RURA_DIR)
    with http.server.ThreadingHTTPServer(('', PORT), Handler) as srv:
        print('Serving /frames from:', FRAMES_DIR)
        print('Server at http://localhost:{}'.format(PORT))
        srv.serve_forever()
