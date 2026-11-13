/*
 * ARCHIVO: actividades/experiencia02/src/controllers/libros.controller.js
 * DESCRIPCION: Implementa el CRUD de libros en memoria.
 */
const v = require('../../../../compartido/validacion');
let siguiente = 3;
const libros = [
  { id: 1, titulo: 'Catalogo inicial', autor: 'Autor de ejemplo', anio: 2024 },
  { id: 2, titulo: 'Servicios web', autor: 'Autor de ejemplo', anio: 2025 }
];
function buscar(id) {
  const libro = libros.find(l => l.id === v.entero(id));
  v.exigir(libro, 'Libro no encontrado', 404);
  return libro;
}
exports.listar = (req, res) => res.json(libros);
exports.obtener = (req, res) => res.json(buscar(req.params.id));
exports.crear = (req, res) => {
  const libro = { id: siguiente++, ...v.libro(req.body) };
  libros.push(libro);
  res.location('/api/libros/' + libro.id).status(201).json(libro);
};
exports.actualizar = (req, res) => {
  const libro = buscar(req.params.id);
  Object.assign(libro, v.libro(req.body));
  res.json(libro);
};
exports.eliminar = (req, res) => {
  const libro = buscar(req.params.id);
  libros.splice(libros.indexOf(libro), 1);
  res.status(204).end();
};
