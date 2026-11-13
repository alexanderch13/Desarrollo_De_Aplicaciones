/*
 * ARCHIVO: ejercicios/ejercicio01_bodega/src/controllers/productos.controller.js
 * DESCRIPCION: Valida y resuelve el CRUD de productos mediante CALL con parametros.
 */
const db = require('../db');
const v = require('../../../../compartido/validacion');
function validar(valor) {
  const d = v.cuerpo(valor);
  const nombre = v.texto(d.nombre, 'nombre', 100);
  const precio = v.numero(d.precio, 'precio', 0, 99999999.99);
  v.exigir(Math.abs(precio * 100 - Math.round(precio * 100)) < 1e-6, 'precio admite dos decimales');
  const stock = v.numero(d.stock, 'stock', 0, 2147483647);
  v.exigir(Number.isInteger(stock), 'stock debe ser entero');
  return { nombre, precio, stock, categoria_id: v.entero(d.categoria_id, 'categoria_id') };
}
exports.listar = async (req, res) => {
  const categoria = req.query.categoria == null ? null : v.entero(req.query.categoria, 'categoria');
  res.json(await db.llamar('sp_productos_listar', [categoria]));
};
exports.obtener = async (req, res) => {
  const [item] = await db.llamar('sp_productos_obtener', [v.entero(req.params.id)]);
  v.exigir(item, 'Recurso no encontrado', 404);
  res.json(item);
};
exports.crear = async (req, res) => {
  const d = validar(req.body);
  const [{ id }] = await db.llamar('sp_productos_crear', Object.values(d));
  res.location('/api/productos/' + id).status(201).json({ id, ...d });
};
exports.actualizar = async (req, res) => {
  const id = v.entero(req.params.id);
  const d = validar(req.body);
  const [{ filas }] = await db.llamar('sp_productos_actualizar', [id, ...Object.values(d)]);
  v.exigir(filas > 0, 'Recurso no encontrado', 404);
  res.json({ id, ...d });
};
exports.eliminar = async (req, res) => {
  const [{ filas }] = await db.llamar('sp_productos_eliminar', [v.entero(req.params.id)]);
  v.exigir(filas > 0, 'Recurso no encontrado', 404);
  res.status(204).end();
};
