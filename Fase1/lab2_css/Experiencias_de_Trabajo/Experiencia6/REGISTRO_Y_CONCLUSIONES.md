# Registro y conclusiones — Experiencia 06

## A. Colores mediante nombre

Se implementaron seis casos con nombres CSS. Se comprobó que el navegador interpreta directamente palabras clave de color como `crimson`, `orangered`, `midnightblue`, `indigo`, `darkgreen` y `dimgray`.

**Conclusión:** los nombres CSS favorecen la legibilidad del código, pero ofrecen menos precisión numérica al definir una paleta específica.

## B. Colores RGB

Se implementaron seis casos: tres usando canales con valores enteros y tres utilizando porcentajes.

**Conclusión:** RGB expresa un color mediante la combinación de rojo, verde y azul. La posibilidad de trabajar con enteros o porcentajes permite representar el mismo modelo con dos formas de escritura.

## C. Colores hexadecimal

Se implementaron seis casos con códigos de seis dígitos y un caso abreviado de tres dígitos.

**Conclusión:** hexadecimal es una representación compacta de los canales RGB y resulta práctica para mantener paletas exactas dentro de hojas de estilo.

## D. Colores HSL

Se implementaron seis casos usando `hsl()`.

**Nota sobre la guía:** la actividad escribe “H LS” y el nombre `coloreshls.css`, mientras que el marco teórico de la misma guía describe HSL. Se conserva el nombre de archivo solicitado y se utiliza la sintaxis CSS válida `hsl()`.

**Conclusión:** HSL separa tono, saturación y luminosidad, lo cual facilita generar variaciones de un color de forma intuitiva.

## E. Colores con opacidad

Se implementaron seis demostraciones mediante `rgba()`, `hsla()`, hexadecimal con alfa y la propiedad `opacity`.

**Nota sobre la guía:** en esta sección se repite `medidasrelativas.css` y texto sobre medidas relativas. Para respetar literalmente el nombre indicado sin ocultar la inconsistencia, el archivo `medidasrelativas.css` de esta carpeta se usa para las demostraciones de opacidad.

**Conclusión:** el canal alfa modifica la transparencia del color configurado, mientras que `opacity` modifica la transparencia del elemento completo, incluyendo su contenido descendiente.

## Conclusión general

CSS admite diferentes sistemas para representar colores. Los nombres son fáciles de leer; RGB controla directamente los canales primarios; hexadecimal es compacto; HSL separa propiedades perceptuales del color; y los canales alfa permiten introducir transparencia. La práctica permite comparar estas formas sobre una misma estructura visual.
