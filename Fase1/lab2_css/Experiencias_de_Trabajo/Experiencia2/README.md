# EXPERIENCIA DE PRÁCTICA N° 02: USO DE SELECTORES

**Autor:** CHIPANA FLORES ALEXANDER TOMAS  
**Grupo:** 06  
**Curso:** Laboratorio de Desarrollo de Aplicaciones  

## Estructura del proyecto

```text
Experiencia2_completa/
├── index.html       # Parte A: selectores por nombre
├── nombre.css
├── clase.html       # Parte B: selectores por clase
├── clase.css
├── id.html          # Parte C: selectores por ID
├── id.css
└── REGISTRO_Y_CONCLUSIONES.md
```

## Parte A: selectores por nombre

`index.html` enlaza `nombre.css`. La hoja de estilos utiliza únicamente nombres de etiqueta como `body`, `header`, `nav`, `main`, `section`, `article`, `h1`, `h2`, `p`, `a`, `ul`, `li`, `aside` y `footer`.

## Parte B: selectores por clase

`clase.html` es una copia funcional del documento anterior y enlaza `clase.css`. Las reglas usan únicamente clases, por ejemplo `.pagina`, `.seccion`, `.tarjeta`, `.texto` y `.enlace-nav`. Se reutilizan clases en múltiples elementos para demostrar su utilidad.

## Parte C: selectores por ID

`id.html` es la segunda copia funcional. Cada componente relevante tiene un identificador único y `id.css` utiliza únicamente selectores `#id`. El archivo se llama `id.css` para evitar sobrescribir `nombre.css`, aunque la guía repite por error el nombre `nombre.css` en esta sección.

## Verificación

Cada página contiene al final un bloque de **Registro de verificación** y **Conclusión**. Antes de entregar, abrir los tres HTML en el navegador, revisar el aspecto visual y confirmar que no existan rutas CSS rotas.
