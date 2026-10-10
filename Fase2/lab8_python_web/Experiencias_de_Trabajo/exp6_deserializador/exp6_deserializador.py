import json
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server

TAMANO_MAXIMO = 1048576
LLAVES_OBLIGATORIAS = {'identificador', 'token_operacion', 'comando'}


def responder(start_response, estado, cuerpo, cabeceras_extra=None):
    payload = json.dumps(cuerpo, ensure_ascii=False).encode('utf-8')
    cabeceras = [
        ('Content-Type', 'application/json; charset=utf-8'),
        ('Content-Length', str(len(payload)))
    ]
    if cabeceras_extra:
        cabeceras.extend(cabeceras_extra)
    start_response(estado, cabeceras)
    return [payload]


def endpoint_recepcion_estricta(environ, start_response):
    if environ.get('REQUEST_METHOD') not in ['POST', 'PUT']:
        return responder(start_response, '405 Method Not Allowed',
                         {"error": "Método transaccional bloqueado"},
                         [('Allow', 'POST, PUT')])

    try:
        tamano_buffer = int(environ.get('CONTENT_LENGTH', '0') or '0')
    except ValueError:
        return responder(start_response, '400 Bad Request',
                         {"error": "Content-Length inválido"})

    if tamano_buffer <= 0:
        return responder(start_response, '400 Bad Request',
                         {"error": "Rechazo: Payload vacío (Zero Bytes)"})

    if tamano_buffer > TAMANO_MAXIMO:
        return responder(start_response, '413 Payload Too Large',
                         {"error": "El payload supera el tamaño máximo permitido (1 MB)"})

    cuerpo_bytes = environ['wsgi.input'].read(tamano_buffer)
    metadato_formato = environ.get('CONTENT_TYPE', '')

    try:
        if 'application/json' in metadato_formato:
            dto_diccionario = json.loads(cuerpo_bytes.decode('utf-8'))
        elif 'application/x-www-form-urlencoded' in metadato_formato:
            diccionario_listas = parse_qs(cuerpo_bytes.decode('utf-8'))
            dto_diccionario = {k: v[0] for k, v in diccionario_listas.items()}
        else:
            return responder(start_response, '415 Unsupported Media Type',
                             {"error": "El servidor exige formatos JSON o URL-Encoded"})
    except (json.JSONDecodeError, ValueError):
        return responder(start_response, '400 Bad Request',
                         {"error": "Corrupción detectada en el formato de transferencia"})

    if not isinstance(dto_diccionario, dict):
        return responder(start_response, '400 Bad Request',
                         {"error": "El payload debe ser un objeto con pares clave-valor"})

    llaves_faltantes = LLAVES_OBLIGATORIAS - dto_diccionario.keys()
    if llaves_faltantes:
        return responder(start_response, '400 Bad Request',
                         {"error": "Violación del esquema", "faltan": sorted(llaves_faltantes)})

    return responder(start_response, '200 OK',
                     {"estado": "Payload estandarizado y auditado exitosamente", "datos": dto_diccionario})


if __name__ == '__main__':
    servidor = make_server('127.0.0.1', 8081, endpoint_recepcion_estricta)
    print("Exp. 6 activa en http://127.0.0.1:8081  (Ctrl+C para detener)")
    servidor.serve_forever()