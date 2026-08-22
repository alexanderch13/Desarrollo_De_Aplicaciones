# Registro y conclusiones — Experiencia 04

## A. Selectores combinados y múltiples

### Registro
Se cargó `index.html` en el navegador y se verificaron las relaciones de hijo directo, descendiente, hermano adyacente y hermanos generales. También se comprobaron las reglas agrupadas mediante comas. Los efectos visibles permiten reconocer qué nodos cumplen cada relación sin introducir elementos genéricos adicionales en el HTML.

### Conclusión
Los selectores combinados permiten representar la estructura real del documento y aplicar reglas con mayor precisión. Los selectores múltiples son útiles para reducir duplicación cuando diferentes etiquetas comparten propiedades. Su uso combinado mejora la organización de la hoja de estilos y facilita el mantenimiento.

## B. Selectores Regex

### Registro
Se probaron coincidencias con `^=`, `$=` y `*=` sobre enlaces, códigos OWASP, familias de riesgo, clases y atributos `title`. Se verificó que los elementos cambian de presentación cuando sus valores cumplen el patrón definido.

### Conclusión
Los selectores de coincidencia de atributos permiten trabajar con convenciones de nombres y cadenas sin crear una clase específica para cada caso. Son adecuados para URLs, prefijos, extensiones, códigos y datos estructurados. Aunque la guía los denomina Regex, CSS utiliza operadores de coincidencia de cadenas y no expresiones regulares completas.

## C. Herencia y cascada

### Registro
Se implementaron siete propiedades heredables: `color`, `font-family`, `font-size`, `line-height`, `letter-spacing`, `text-align` y `text-transform`. Luego se generaron cinco conflictos deliberados para observar orden de origen, especificidad entre elemento/clase/ID, selectores compuestos e `!important`.

### Conclusión
La herencia permite centralizar ciertas características de presentación en un ancestro para que sus descendientes las reciban automáticamente. La cascada, en cambio, decide qué valor se aplica cuando varias reglas compiten sobre el mismo elemento. Comprender ambos mecanismos evita reglas redundantes y reduce el uso innecesario de `!important`.

## Conclusión general
La Experiencia 04 demuestra que CSS no depende de añadir contenedores genéricos al HTML para conseguir precisión. La combinación de una estructura semántica con selectores relacionales, agrupaciones, patrones de atributos, herencia y cascada permite mantener una interfaz compleja con código más limpio, reutilizable y fácil de depurar.
