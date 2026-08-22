# Registro y conclusiones - Experiencia 03

## A. Selectores de atributos

Se cargó `index.html` en el navegador y se verificó que `atributos.css` identificara correctamente elementos por la presencia y por el contenido de sus atributos. Las pruebas con `data-level`, `href`, `type`, `required`, `readonly`, `disabled`, `data-state`, `lang` y `data-code` mostraron que este mecanismo permite aplicar estilos de forma precisa sin modificar la jerarquía del documento.

**Diferencia entre atributos y pseudo-clases:** los selectores de atributos consultan características declaradas en el HTML, como `[required]`, `[type="email"]` o `[data-level="critico"]`. Las pseudo-clases representan estados, condiciones o posiciones, como `:focus`, `:checked` o `:nth-child()`.

## B. Pseudo-clases

Se probaron dieciocho casos diferentes. Los enlaces respondieron a los estados de interacción; los controles del formulario permitieron comprobar foco, obligatoriedad, validación, selección, habilitación y deshabilitación; y la lista permitió observar condiciones estructurales según la posición de sus elementos. También se verificó `:target` navegando mediante los enlaces internos de la página.

**Conclusión:** las pseudo-clases permiten que la interfaz responda a condiciones cambiantes sin agregar clases manualmente para cada estado. Esto mejora la retroalimentación visual y facilita estilos asociados a interacción, validación y estructura.

## C. Pseudo-elementos

Se verificaron ocho pseudo-elementos. `::before` y `::after` generaron contenido visual, `::first-letter` y `::first-line` afectaron partes específicas de un párrafo, `::selection` modificó la selección de texto, `::marker` personalizó listas, `::placeholder` estilizó textos de ayuda y `::file-selector-button` modificó el botón nativo del control de archivo.

**Diferencia entre pseudo-clases y pseudo-elementos:** una pseudo-clase selecciona un elemento completo cuando cumple un estado o condición. Un pseudo-elemento permite representar o estilizar una parte virtual del elemento o generar contenido asociado a él.

## Conclusión general

La experiencia permitió comprobar tres niveles de selección más precisos que los selectores simples. Los selectores de atributos aprovechan información declarada en el HTML; las pseudo-clases responden a estados y relaciones estructurales; y los pseudo-elementos permiten intervenir partes específicas o contenido generado. Utilizados de manera adecuada, estos mecanismos reducen marcado innecesario y permiten hojas de estilo más expresivas y mantenibles.
