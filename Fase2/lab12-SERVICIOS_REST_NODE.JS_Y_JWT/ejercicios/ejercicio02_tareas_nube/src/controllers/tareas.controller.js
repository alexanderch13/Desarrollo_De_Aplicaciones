/*
 * ARCHIVO: ejercicios/ejercicio02_tareas_nube/src/controllers/tareas.controller.js
 * DESCRIPCION: Gestiona tareas, fechas, paginacion y una modificacion PATCH exclusiva del estado.
 */
const db = require('../db');
const v = require('../../../../compartido/validacion');
function estado(valor) {
  v.exigir(['pendiente', 'en_progreso', 'terminada'].includes(valor), 'estado no valido');
  return valor;
}
function validar(valor) {
  const d = v.cuerpo(valor);
  v.exigir(d.descripcion == null || (typeof d.descripcion === 'string' && d.descripcion.length <= 2000), 'descripcion admite hasta 2000 caracteres');
  return { titulo: v.texto(d.titulo, 'titulo', 200),
    descripcion: (d.descripcion ?? '').trim(),
    estado: estado(d.estado ?? 'pendiente'), fecha_limite: v.fecha(d.fecha_limite) };
}
exports.listar = async (req, res) => {
  const pagina = v.entero(req.query.pagina ?? 1, 'pagina', 1000000);
  const limite = v.entero(req.query.limite ?? 10, 'limite', 100);
  const offset = (pagina - 1) * limite;
  const [datos, [{ total }]] = await db.conjuntos('sp_tareas_listar', [limite, offset]);
  res.json({ datos, pagina, limite, total, paginas: Math.ceil(total / limite) });
};
exports.obtener = async (req, res) => {
  const [tarea] = await db.llamar('sp_tareas_obtener', [v.entero(req.params.id)]);
  v.exigir(tarea, 'Tarea no encontrada', 404);
  res.json(tarea);
};
exports.crear = async (req, res) => {
  const d = validar(req.body);
  const [{ id }] = await db.llamar('sp_tareas_crear', Object.values(d));
  res.location('/api/tareas/' + id).status(201).json({ id, ...d });
};
exports.actualizar = async (req, res) => {
  const id = v.entero(req.params.id);
  const d = validar(req.body);
  const [{ filas }] = await db.llamar('sp_tareas_actualizar', [id, ...Object.values(d)]);
  v.exigir(filas > 0, 'Tarea no encontrada', 404);
  res.json({ id, ...d });
};
exports.estado = async (req, res) => {
  const id = v.entero(req.params.id);
  const d = v.cuerpo(req.body);
  v.exigir(Object.keys(d).length === 1 && Object.hasOwn(d, 'estado'), 'PATCH acepta solo estado');
  const nuevoEstado = estado(d.estado);
  const [{ filas }] = await db.llamar('sp_tareas_estado', [id, nuevoEstado]);
  v.exigir(filas > 0, 'Tarea no encontrada', 404);
  const [tarea] = await db.llamar('sp_tareas_obtener', [id]);
  res.json(tarea);
};
exports.eliminar = async (req, res) => {
  const [{ filas }] = await db.llamar('sp_tareas_eliminar', [v.entero(req.params.id)]);
  v.exigir(filas > 0, 'Tarea no encontrada', 404);
  res.status(204).end();
};
