# Experiencia de Práctica N° 03

## Utilización de selectores de atributos, pseudo-clases y pseudo-elementos

Esta carpeta contiene las tres evidencias solicitadas en la guía de la Sesión N° 02 de CSS.

### A. Selectores de atributos

- `index.html`: página completa para la evidencia.
- `atributos.css`: reglas basadas en presencia y valores de atributos.
- Se demuestran presencia, igualdad, inicio (`^=`), final (`$=`), contenido (`*=`), palabra (`~=`) e idioma/prefijo (`|=`).
- La página incluye un formulario académico para observar selectores como `[type="email"]`, `[required]`, `[readonly]` y `[disabled]`.

### B. Pseudo-clases

- `pseudoclases.html`
- `pseudoclases.css`
- Se implementan 18 casos: `:link`, `:visited`, `:hover`, `:active`, `:focus`, `:focus-visible`, `:required`, `:optional`, `:valid`, `:invalid`, `:checked`, `:disabled`, `:enabled`, `:first-child`, `:last-child`, `:nth-child()`, `:not()` y `:target`.

### C. Pseudo-elementos

- `pseudoelementos.html`
- `pseudoelementos.css`
- Se implementan 8 casos: `::before`, `::after`, `::first-letter`, `::first-line`, `::selection`, `::marker`, `::placeholder` y `::file-selector-button`.

### Hoja compartida

- `base.css` conserva la identidad visual negra y roja utilizada en las experiencias anteriores y separa la maquetación general de los selectores que se desean demostrar.

### Cómo probar

1. Abrir `index.html` y revisar los selectores de atributos.
2. Abrir `pseudoclases.html`, interactuar con enlaces y formulario y navegar usando Tab.
3. Abrir `pseudoelementos.html`, seleccionar texto, observar listas, placeholders y el botón del control de archivo.
4. Revisar `REGISTRO_Y_CONCLUSIONES.md` como evidencia escrita.

> Los formularios apuntan a un endpoint público de prueba HTTP. No ingresar información real, personal o confidencial.
