# REGISTRO Y CONCLUSIONES - EXPERIENCIA 2

## A. Selectores por nombre

**Registro:** Se cargó `index.html` en el navegador y se verificó que las reglas de `nombre.css` se aplicaran a los elementos correspondientes. Al cambiar una regla de etiqueta, todos los elementos que comparten ese nombre actualizaron su presentación.

**Conclusión:** Los selectores por nombre son sencillos y apropiados para establecer estilos generales. Su principal ventaja es la uniformidad, aunque tienen poca precisión porque modifican todos los elementos de un mismo tipo.

## B. Selectores por clase

**Registro:** Se cargó `clase.html` y se comprobó que las clases reutilizadas aplicaran el mismo estilo en varios componentes. Se modificó la clase `.tarjeta` y el cambio se reflejó en todas las tarjetas asociadas.

**Conclusión:** Las clases permiten reutilizar reglas y agrupar elementos por función visual. Son más flexibles que los selectores por nombre y reducen la repetición cuando varios componentes necesitan compartir estilos.

## C. Selectores por ID

**Registro:** Se cargó `id.html` y se comprobó que cada selector por ID afectara únicamente al elemento con el identificador correspondiente. Los IDs se mantuvieron únicos dentro del documento.

**Conclusión:** Los selectores por ID ofrecen alta precisión para elementos únicos. Sin embargo, no son la mejor alternativa para estilos repetitivos, porque un ID no debe reutilizarse y obliga a declarar más reglas que una solución basada en clases.

## Conclusión general

La experiencia permitió comparar tres niveles de selección. Los selectores por nombre son útiles para reglas globales, las clases facilitan la reutilización y los IDs permiten identificar elementos específicos. Elegir el selector adecuado mejora la organización, legibilidad y mantenimiento de las hojas de estilo.
