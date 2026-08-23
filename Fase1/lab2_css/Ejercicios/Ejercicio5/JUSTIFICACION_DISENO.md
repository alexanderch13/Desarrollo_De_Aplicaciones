# Ejercicio 5 — Justificación del diseño

## Base utilizada

Este Ejercicio 5 fue construido directamente a partir de los archivos proporcionados en **Ejercicio 1** y **Ejercicio 3**:

- Se conserva la marca **MoKaChiMo**.
- Se conservan las tres páginas principales: `index.html`, `menu.html` y `reservas.html`.
- Se reutilizan las imágenes `inicio.png`, `menu.png` y `reservas.png`.
- Se conserva la idea de café de especialidad, granos de origen, pastelería artesanal y reservas.
- Del Ejercicio 3 se mantiene la intención de utilizar animaciones, tablas avanzadas y una presentación visual más elaborada.

No se incorporó una temática distinta.

## Análisis de los elementos visuales

Las imágenes proporcionadas transmiten una cafetería cálida y artesanal. Los elementos visuales dominantes son madera, tonos café, iluminación cálida, vegetación y verde oscuro. Por esa razón la interfaz utiliza una paleta formada por crema, marrón café, caramelo, verde salvia y verde bosque.

Las fotografías son el elemento visual principal. En lugar de ocultarlas dentro de efectos 3D complejos, se usan como piezas editoriales grandes para conservar su impacto. La composición utiliza espacios amplios, bordes suaves, tarjetas claras y sombras moderadas.

## Selectores avanzados utilizados

Se utilizan distintos tipos de selectores para mantener el código expresivo y evitar clases innecesarias:

- `header.site-header > nav.container` — hijo directo.
- `main > section + section` — hermano adyacente.
- `a[href^="https://"]` — atributo cuyo valor comienza con `https://`.
- `a[href$=".pdf"]` — atributo cuyo valor termina en `.pdf`.
- `img[alt*="MoKaChiMo"]` — atributo que contiene una cadena.
- `[data-state="popular"]` — selector por atributo y valor.
- `td[data-origin^="Perú"]` y `td[data-origin*="Brasil"]` — coincidencia parcial.
- `[class^="btn-"]` — clases cuyo nombre comienza con `btn-`.
- `.menu-card:is(:hover, :focus-within)` — agrupación de estados.
- `.form-grid label:has(textarea)` — selección de un padre según su contenido.
- `.footer-links :where(a:hover, a:focus-visible)` — agrupación con baja especificidad.

## Pseudo-clases

Entre otras, se emplean:

- `:hover`
- `:focus-visible`
- `:nth-child()`
- `:target`
- `:valid`
- `:invalid`
- `:required`
- `:checked`
- `:focus-within`
- `:has()`
- `:is()`
- `:where()`

Estas pseudo-clases se utilizan para interacción, validación, accesibilidad y organización del diseño.

## Pseudo-elementos

Se utilizan:

- `::before`
- `::after`
- `::first-letter`
- `::marker`
- `::placeholder`
- `::selection`

Los pseudo-elementos permiten generar adornos, indicadores y detalles visuales sin añadir elementos HTML únicamente decorativos.

## Optimización y mantenibilidad

Se evita la duplicación mediante variables CSS declaradas en `:root`. Los componentes comparten reglas de tarjetas, botones, navegación y secciones. Grid y Flexbox se aplican directamente a elementos semánticos.

La página no utiliza etiquetas `<div>`. La estructura se construye con `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `form`, `table` y `footer`.

Se eliminan los estilos inline observados en el Ejercicio 3 y toda la presentación queda centralizada en `styles.css`.

## Accesibilidad y responsive

- Existe estilo visible para `:focus-visible`.
- Los formularios tienen `label` vinculados mediante `for` e `id`.
- Las imágenes poseen texto alternativo.
- La navegación indica la página actual mediante `aria-current`.
- Se utilizan media queries para escritorio, tablet y móvil.
- `prefers-reduced-motion` reduce las animaciones para usuarios que así lo solicitan.
- El contraste se mantiene alto en los bloques de texto sobre fondo oscuro.

## Conclusión

La propuesta conserva el contenido y la identidad de los ejercicios 1 y 3, pero reorganiza el CSS para que sea más semántico, mantenible y consistente. Los selectores avanzados, pseudo-clases, pseudo-elementos, Grid, Flexbox, animaciones y media queries se aplican con una función concreta dentro del diseño, en lugar de incluirse únicamente para cumplir el requisito.
