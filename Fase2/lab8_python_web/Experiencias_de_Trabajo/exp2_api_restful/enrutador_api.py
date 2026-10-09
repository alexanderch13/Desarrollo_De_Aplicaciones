"""
Experiencia de Práctica Nº 2:
Enrutador HTTP Multiverbo RESTful con Memoria Volátil.
"""
import json
from urllib.parse import urlparse
from http.server import BaseHTTPRequestHandler, HTTPServer

PUERTO = 8001

# Estado en memoria volátil
coleccion_usuarios = [
    {"id": 100, "nombre": "Linus Torvalds", "perfil": "SysAdmin"},
    {"id": 101, "nombre": "Ada Lovelace", "perfil": "Pionera"}
]


class EnrutadorAPI(BaseHTTPRequestHandler):

    def emitir_json(self, codigo_http: int, datos: dict):
        """Estandariza la cabecera y el flujo de bytes JSON hacia el socket."""
        payload = json.dumps(datos, ensure_ascii=False, indent=2).encode('utf-8')
        self.send_response(codigo_http)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        ruta = urlparse(self.path).path
        if ruta == '/api/usuarios':
            self.emitir_json(200, {
                "estado": "ok",
                "total": len(coleccion_usuarios),
                "datos": coleccion_usuarios
            })
        else:
            self.emitir_json(404, {"error": "Endpoint no mapeado en la API"})

    def do_POST(self):
        ruta = urlparse(self.path).path
        if ruta == '/api/usuarios':
            # Control estricto de I/O bloqueante vía Content-Length
            longitud = int(self.headers.get('Content-Length', 0))
            if longitud <= 0:
                self.emitir_json(400, {"error": "La solicitud carece de carga útil o Content-Length es inválido."})
                return

            bytes_recibidos = self.rfile.read(longitud)

            try:
                nuevo_registro = json.loads(bytes_recibidos.decode('utf-8'))
                if not isinstance(nuevo_registro, dict) or 'nombre' not in nuevo_registro:
                    self.emitir_json(400, {"error": "El payload debe ser un objeto con el campo 'nombre'."})
                    return

                # Autoincremento secuencial de identificador
                siguiente_id = (coleccion_usuarios[-1]['id'] + 1) if coleccion_usuarios else 1
                nuevo_registro['id'] = siguiente_id

                # Mutación de la colección en memoria
                coleccion_usuarios.append(nuevo_registro)

                self.emitir_json(201, {
                    "estado": "creado",
                    "datos": nuevo_registro
                })
            except json.JSONDecodeError:
                self.emitir_json(400, {"error": "El cuerpo de la petición debe ser un JSON válido."})
        else:
            self.emitir_json(404, {"error": "Endpoint no mapeado en la API"})


def ejecutar():
    servidor = HTTPServer(('127.0.0.1', PUERTO), EnrutadorAPI)
    print(f"[*] API RESTful activa en http://127.0.0.1:{PUERTO}/api/usuarios")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Deteniendo API...")
        servidor.server_close()


if __name__ == '__main__':
    ejecutar()