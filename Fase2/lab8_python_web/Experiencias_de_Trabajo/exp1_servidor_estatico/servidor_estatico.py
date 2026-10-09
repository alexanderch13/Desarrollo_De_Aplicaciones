"""
Experiencia de Práctica Nº 1:
Servidor de Archivos Estáticos con Validación y Prevención de Path Traversal.
"""
import os
import mimetypes
from urllib.parse import urlparse, unquote
from http.server import BaseHTTPRequestHandler, HTTPServer

PUERTO = 8000
# Definición estricta de la 'jaula': carpeta pública absoluta
DIRECTORIO_PUBLICO = os.path.abspath(os.path.join(os.path.dirname(__file__), 'public'))


class ServidorEstaticoFortificado(BaseHTTPRequestHandler):

    def do_GET(self):
        # 1. Normalización de URI y descarte de query strings
        ruta_limpia = unquote(urlparse(self.path).path.lstrip('/'))
        if not ruta_limpia:
            ruta_limpia = 'index.html'

        # 2. Resolución matemática colapsando secuencias '../'
        ruta_resuelta = os.path.abspath(os.path.join(DIRECTORIO_PUBLICO, ruta_limpia))

        # 3. Verificación de frontera perimetral (Evita Path Traversal)
        if not ruta_resuelta.startswith(DIRECTORIO_PUBLICO) or not os.path.isfile(ruta_resuelta):
            self.send_error(404, "Recurso no encontrado o acceso estrictamente denegado.")
            return

        # 4. Inferencia dinámica de Content-Type según extensión
        tipo_mime, _ = mimetypes.guess_type(ruta_resuelta)

        # 5. Lectura y transmisión binaria por socket (self.wfile)
        try:
            with open(ruta_resuelta, 'rb') as archivo:
                contenido = archivo.read()

            self.send_response(200)
            self.send_header('Content-Type', tipo_mime or 'application/octet-stream')
            self.send_header('Content-Length', str(len(contenido)))
            self.end_headers()
            self.wfile.write(contenido)
        except IOError:
            self.send_error(500, "Error del sistema al intentar acceder al archivo físico.")


def ejecutar():
    servidor = HTTPServer(('127.0.0.1', PUERTO), ServidorEstaticoFortificado)
    print(f"[*] Servidor Estático corriendo en http://127.0.0.1:{PUERTO}")
    print(f"[*] Raíz pública aislada: {DIRECTORIO_PUBLICO}")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Deteniendo servidor...")
        servidor.server_close()


if __name__ == '__main__':
    servidor = HTTPServer(('127.0.0.1', 8000), ServidorEstaticoFortificado)
    print("[*] Servidor Estático corriendo en http://127.0.0.1:8000")
    servidor.serve_forever()