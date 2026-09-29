// Ejercicio 1: arreglo de objetos (mínimo 5 elementos) que simula la base
// de datos local del catálogo. Cada elemento incluye un 'id' único que se
// usará como 'key' estable al recorrer la lista con map().
// El campo 'estado' queda listo para que Luz lo controle con useState.

const catalogoData = [
  {
    id: 1,
    nombre: "React",
    descripcion:
      "Biblioteca de JavaScript orientada a la creación de interfaces de usuario modulares y declarativas.",
    categoria: "Frontend",
    estado: "pendiente",
  },
  {
    id: 2,
    nombre: "Vite",
    descripcion:
      "Herramienta de compilación y servidor de desarrollo ultrarrápido para proyectos web.",
    categoria: "Build Tool",
    estado: "pendiente",
  },
  {
    id: 3,
    nombre: "JavaScript",
    descripcion:
      "Lenguaje de programación base para la lógica e interactividad del proyecto.",
    categoria: "Lenguaje",
    estado: "pendiente",
  },
  {
    id: 4,
    nombre: "CSS3",
    descripcion:
      "Lenguaje de estilos empleado para el diseño visual de los componentes.",
    categoria: "Estilos",
    estado: "pendiente",
  },
  {
    id: 5,
    nombre: "Node.js",
    descripcion:
      "Entorno de ejecución de JavaScript utilizado del lado del servidor.",
    categoria: "Backend",
    estado: "pendiente",
  },
];

export default catalogoData;
