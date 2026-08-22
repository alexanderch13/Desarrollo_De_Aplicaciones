# Experiencia de Práctica N.º 06 — Utilización de colores

La experiencia se construyó a partir de la guía de práctica y mantiene la identidad visual negro/rojo de las experiencias anteriores.

## Estructura

- `index.html` + `colorespornombre.css`
- `rgb.html` + `coloresrgb.css`
- `hexadecimal.html` + `coloreshexadecimal.css`
- `hls.html` + `coloreshls.css`
- `opacidad.html` + `medidasrelativas.css`
- `base.css`
- `REGISTRO_Y_CONCLUSIONES.md`
- `QA.txt`

## Casos desarrollados

### A. Colores por nombre
6 casos.

### B. RGB
6 casos:
- 3 con valores enteros.
- 3 con porcentajes.

### C. Hexadecimal
6 casos, incluyendo una demostración abreviada de 3 dígitos.

### D. HSL
6 casos.

La guía escribe “H LS” y solicita `coloreshls.css`. El marco teórico de la misma guía describe HSL. Se mantiene el nombre de archivo indicado por la actividad, pero se utiliza `hsl()`, que es la función válida de CSS.

### E. Opacidad
6 casos:
- rgba()
- hsla()
- hexadecimal de 8 dígitos con alfa
- opacity 0.25
- opacity 0.55
- opacity 0.85

La guía repite en esta parte el nombre `medidasrelativas.css` y texto sobre medidas relativas. Para no ocultar ni reemplazar ese contenido, se conserva literalmente ese nombre de archivo, aunque aquí contiene las demostraciones de opacidad correspondientes al encabezado de la actividad.

## Calidad estructural

- Cero etiquetas `<div>`.
- Cero estilos inline.
- HTML semántico.
- CSS externo.
- Grid aplicado sobre `section`.
- Tablas con `caption`, `colgroup`, `rowspan` y `colspan`.
- Meta description, charset y viewport en todas las páginas.
