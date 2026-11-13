/*
 * ARCHIVO: actividades/experiencia06/src/controllers/libros.controller.js
 * DESCRIPCION: Implementa el CRUD de libros mediante procedimientos almacenados.
 */
const db = require('../db');
const v = require('../../../../compartido/validacion');
exports.listar = async (req, res) => res.json(await db.llamar('sp_libros_listar'));
exports.obtener = async (req, res) => {
  const [libro] = await db.llamar('sp_libros_obtener', [v.entero(req.params.id)]);
  v.exigir(libro, 'Libro no encontrado', 404);
  res.json(libro);
};
exports.crear = async (req, res) => {
  const d = v.libro(req.body);
  const [{ id }] = await db.llamar('sp_libros_crear', [d.titulo, d.autor, d.anio]);
  res.location('/api/libros/' + id).status(201).json({ id, ...d });
};
exports.actualizar = async (req, res) => {
  const id = v.entero(req.params.id);
  const d = v.libro(req.body);
  const [{ filas }] = await db.llamar('sp_libros_actualizar', [id, d.titulo, d.autor, d.anio]);
  v.exigir(filas > 0, 'Libro no encontrado', 404);
  res.json({ id, ...d });
};
exports.eliminar = async (req, res) => {
  const [{ filas }] = await db.llamar('sp_libros_eliminar', [v.entero(req.params.id)]);
  v.exigir(filas > 0, 'Libro no encontrado', 404);
  res.status(204).end();
};
