# Registro y conclusiones — Experiencia 05

## A. Registro de medidas absolutas

Se verificaron las unidades `cm`, `mm`, `Q`, `in`, `pc`, `pt` y `px`. Para cada una se aplicaron tres reglas diferentes sobre propiedades de ancho, relleno, tipografía, separación o borde. Al visualizar los resultados en el navegador se observa que los valores mantienen una relación fija de acuerdo con las equivalencias definidas por CSS.

### Conclusión

Las medidas absolutas permiten establecer dimensiones concretas sin depender directamente de la fuente del elemento padre ni del tamaño del viewport. La comparación entre las siete unidades facilita entender sus equivalencias y distinguir cuándo una medida expresa una referencia física, tipográfica o en píxeles.

## B. Registro de medidas relativas

Se verificaron `em`, `ex`, `ch`, `rem`, `lh`, `vw`, `vh`, `vmin` y `vmax`, con tres casos por cada unidad. También se añadieron tres ejemplos porcentuales como comparación. Para evaluar las unidades asociadas al viewport se modificó el tamaño de la ventana del navegador.

### Conclusión

Las medidas relativas dependen de una referencia externa o contextual. Algunas dependen de la tipografía y otras de las dimensiones del viewport, por lo que pueden cambiar cuando cambia el contexto de visualización. Esto las hace especialmente útiles para interfaces adaptables.

## Comparación general

Las medidas absolutas se comportan como valores definidos de manera fija, mientras que las relativas ajustan su resultado tomando otra dimensión como referencia. La práctica permite comprobar que la elección de unidad afecta directamente la capacidad de adaptación, legibilidad y consistencia de la interfaz.
