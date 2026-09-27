// Arreglo de objetos que simula la base de datos local del catálogo interactivo.
// Cada objeto representa una tecnología con su información y un id único,
// utilizado luego como 'key' estable al renderizar la lista con map().

const catalogoData = [
  {
    id: 1,
    nombre: "React",
    descripcion:
      "Biblioteca declarativa para construir interfaces de usuario basadas en componentes.",
    categoria: "Frontend",
    imagen:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png",
  },
  {
    id: 2,
    nombre: "Vite",
    descripcion:
      "Herramienta de compilación ultrarrápida para proyectos web modernos.",
    categoria: "Build Tool",
    imagen:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vite/vite.png",
  },
  {
    id: 3,
    nombre: "JavaScript",
    descripcion:
      "Lenguaje de programación que da interactividad a las páginas web.",
    categoria: "Lenguaje",
    imagen:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
  },
  {
    id: 4,
    nombre: "CSS3",
    descripcion:
      "Lenguaje de estilos utilizado para dar diseño y presentación a documentos HTML.",
    categoria: "Estilos",
    imagen:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png",
  },
  {
    id: 5,
    nombre: "Node.js",
    descripcion:
      "Entorno de ejecución de JavaScript del lado del servidor.",
    categoria: "Backend",
    imagen:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png",
  },
];

export default catalogoData;
