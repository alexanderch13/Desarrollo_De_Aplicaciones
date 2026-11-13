/*
 * ARCHIVO: actividades/experiencia01/src/app.js
 * DESCRIPCION: Publica las primeras consultas GET de libros almacenados en memoria.
 */
const { crearBase, finalizar } = require('../../../compartido/http');
const { entero, exigir } = require('../../../compartido/validacion');
const app = crearBase('Biblioteca Digital');
const libros = [
  { id: 1, titulo: 'Catalogo inicial', autor: 'Autor de ejemplo', anio: 2024 },
  { id: 2, titulo: 'Servicios web', autor: 'Autor de ejemplo', anio: 2025 }
];
app.get('/api/libros', (req, res) => res.json(libros));
app.get('/api/libros/:id', (req, res) => {
  const id = entero(req.params.id);
  const libro = libros.find(l => l.id === id);
  exigir(libro, 'Libro no encontrado', 404);
  res.json(libro);
});
module.exports = finalizar(app);
