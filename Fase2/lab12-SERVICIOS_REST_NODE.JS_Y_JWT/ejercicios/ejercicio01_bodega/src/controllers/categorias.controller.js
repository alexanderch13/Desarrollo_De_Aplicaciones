/*
 * ARCHIVO: ejercicios/ejercicio01_bodega/src/controllers/categorias.controller.js
 * DESCRIPCION: Valida y resuelve el CRUD de categorias mediante CALL con parametros.
 */
const db = require('../db');
const v = require('../../../../compartido/validacion');
function validar(valor) {
  const d = v.cuerpo(valor);
  const nombre = v.texto(d.nombre, 'nombre', 100);
  return { nombre };
}
exports.listar = async (req, res) => {
  res.json(await db.llamar('sp_categorias_listar'));
};
exports.obtener = async (req, res) => {
  const [item] = await db.llamar('sp_categorias_obtener', [v.entero(req.params.id)]);
  v.exigir(item, 'Recurso no encontrado', 404);
  res.json(item);
};
exports.crear = async (req, res) => {
  const d = validar(req.body);
  const [{ id }] = await db.llamar('sp_categorias_crear', Object.values(d));
  res.location('/api/categorias/' + id).status(201).json({ id, ...d });
};
exports.actualizar = async (req, res) => {
  const id = v.entero(req.params.id);
  const d = validar(req.body);
  const [{ filas }] = await db.llamar('sp_categorias_actualizar', [id, ...Object.values(d)]);
  v.exigir(filas > 0, 'Recurso no encontrado', 404);
  res.json({ id, ...d });
};
exports.eliminar = async (req, res) => {
  const [{ filas }] = await db.llamar('sp_categorias_eliminar', [v.entero(req.params.id)]);
  v.exigir(filas > 0, 'Recurso no encontrado', 404);
  res.status(204).end();
};
