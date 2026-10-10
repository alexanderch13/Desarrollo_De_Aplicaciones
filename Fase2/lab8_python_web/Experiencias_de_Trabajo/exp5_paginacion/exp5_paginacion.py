import json
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server

base_de_datos = [{"id": i, "articulo": f"Item {i}", "valor": i*10} for i in range(1, 101)]


def endpoint_inventario_paginado(environ, start_response):
    cadena_consulta = environ.get('QUERY_STRING', '')
    parametros_url = parse_qs(cadena_consulta)

    try:
        limite_elementos = int(parametros_url.get('limite', ['10'])[0])
        pagina_actual = int(parametros_url.get('pagina', ['1'])[0])
    except ValueError:
        estado, cuerpo = '400 Bad Request', {"error": "Paginación exige numéricos"}
    else:
        if limite_elementos < 1 or pagina_actual < 1:
            estado, cuerpo = '400 Bad Request', {"error": "limite y pagina deben ser enteros mayores o iguales a 1"}
        else:
            if limite_elementos > 50:
                limite_elementos = 50

            indice_desplazamiento = (pagina_actual - 1) * limite_elementos
            indice_corte = indice_desplazamiento + limite_elementos
            datos_cortados = base_de_datos[indice_desplazamiento:indice_corte]

            estado = '200 OK'
            cuerpo = {
                "meta": {"pagina": pagina_actual, "limite_real": limite_elementos, "total_items": len(base_de_datos)},
                "registros": datos_cortados
            }

    payload = json.dumps(cuerpo, ensure_ascii=False).encode('utf-8')
    start_response(estado, [
        ('Content-Type', 'application/json; charset=utf-8'),
        ('Content-Length', str(len(payload)))
    ])
    return [payload]


if __name__ == '__main__':
    servidor = make_server('127.0.0.1', 8080, endpoint_inventario_paginado)
    print("Exp. 5 activa en http://127.0.0.1:8080  (Ctrl+C para detener)")
    servidor.serve_forever()