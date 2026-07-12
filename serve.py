import http.server, os, mimetypes

RURA_DIR   = r"C:\Users\mosfa\Rura"
FRAMES_DIR = r"C:\Users\mosfa\Downloads\ezgif-394176784e5acd99-png-split"
PORT = 5500

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Strip query string
        path = path.split('?', 1)[0].split('#', 1)[0]
        if path.startswith('/frames/'):
            rel = path[len('/frames/'):]
            return os.path.join(FRAMES_DIR, rel)
        # Everything else from Rura root
        rel = path.lstrip('/')
        return os.path.join(RURA_DIR, rel) if rel else os.path.join(RURA_DIR, 'index.html')

    def log_message(self, fmt, *args):
        pass  # suppress noisy logs

if __name__ == '__main__':
    os.chdir(RURA_DIR)
    with http.server.ThreadingHTTPServer(('', PORT), Handler) as srv:
        print('Server running at http://localhost:{}'.format(PORT))
        srv.serve_forever()
