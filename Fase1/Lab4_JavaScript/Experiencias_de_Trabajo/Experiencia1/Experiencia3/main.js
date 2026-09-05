const producto = {
  id: 1,
  nombre: "Teclado",
  precio: 120,
  stock: 8
};

console.log(producto.nombre);
console.log(producto.precio);

producto.categoria = "Periféricos";
producto.stock = 10;

console.log(producto);

producto.calcularValorStock = function () {
  return this.precio * this.stock;
};

console.log(producto.calcularValorStock());

const productos = [
  { id: 1, nombre: "Teclado", precio: 120, stock: 8 },
  { id: 2, nombre: "Mouse", precio: 70, stock: 15 },
  { id: 3, nombre: "Monitor", precio: 850, stock: 4 },
  { id: 4, nombre: "Webcam", precio: 160, stock: 0 }
];

productos.forEach(producto => {
  console.log(
    `${producto.nombre} | S/ ${producto.precio} | Stock: ${producto.stock}`
  );
});

const nombres = productos.map(producto => producto.nombre);
console.log(nombres);

const preciosIncrementados = productos.map(producto => producto.precio * 1.10);
console.log(preciosIncrementados);

const bajoStock = productos.filter(producto => producto.stock < 10);
console.log(bajoStock);

const conStock = productos.filter(producto => producto.stock > 0);
console.log(conStock);

const encontrado = productos.find(producto => producto.id === 3);
console.log(encontrado);

const noEncontrado = productos.find(producto => producto.id === 15);
console.log(noEncontrado);

const totalInventario = productos.reduce(
  (total, producto) => total + producto.precio * producto.stock,
  0
);
console.log(totalInventario);

productos.push(
  { id: 5, nombre: "Audífonos", precio: 95, stock: 12 },
  { id: 6, nombre: "Impresora", precio: 620, stock: 3 }
);

const preciosMayores = productos.filter(producto => producto.precio > 150);
console.log(preciosMayores);

const todosLosNombres = productos.map(producto => producto.nombre);
console.log(todosLosNombres);

const productoBuscado = productos.find(producto => producto.id === 5);
console.log(productoBuscado);

const totalInventarioActualizado = productos.reduce(
  (total, producto) => total + producto.precio * producto.stock,
  0
);
console.log(totalInventarioActualizado);