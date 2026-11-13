/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/controllers/matricula.controller.js
 * DESCRIPCION: Administra cursos y matriculas y limita las notas al docente asignado y al estudiante propietario.
 */
const db = require('../db');
const v = require('../../../../compartido/validacion');
exports.cursos = async (req, res) => res.json(await db.llamar('sp_cursos_listar'));
exports.crearCurso = async (req, res) => {
  const d = v.cuerpo(req.body);
  const nombre = v.texto(d.nombre, 'nombre', 120);
  const codigo = v.texto(d.codigo, 'codigo', 20);
  const docente_id = v.entero(d.docente_id, 'docente_id');
  const [docente] = await db.llamar('sp_usuario_obtener', [docente_id]);
  v.exigir(docente?.rol === 'docente', 'docente_id debe identificar a un docente');
  const [{ id }] = await db.llamar('sp_curso_crear', [codigo, nombre, docente_id]);
  res.status(201).json({ id, codigo, nombre, docente_id });
};
exports.matricular = async (req, res) => {
  const d = v.cuerpo(req.body);
  const curso_id = v.entero(d.curso_id, 'curso_id');
  const estudiante_id = v.entero(d.estudiante_id, 'estudiante_id');
  const [curso] = await db.llamar('sp_curso_obtener', [curso_id]);
  v.exigir(curso, 'Curso no encontrado', 404);
  const [estudiante] = await db.llamar('sp_usuario_obtener', [estudiante_id]);
  v.exigir(estudiante?.rol === 'estudiante', 'estudiante_id debe identificar a un estudiante');
  await db.llamar('sp_matricula_crear', [curso_id, estudiante_id]);
  res.status(201).json({ curso_id, estudiante_id });
};
exports.registrarNota = async (req, res) => {
  const d = v.cuerpo(req.body);
  const curso_id = v.entero(d.curso_id, 'curso_id');
  const estudiante_id = v.entero(d.estudiante_id, 'estudiante_id');
  const nota = v.numero(d.nota, 'nota', 0, 20);
  v.exigir(Math.abs(nota * 100 - Math.round(nota * 100)) < 1e-6, 'nota admite dos decimales');
  const [curso] = await db.llamar('sp_curso_obtener', [curso_id]);
  v.exigir(curso, 'Curso no encontrado', 404);
  v.exigir(curso.docente_id === req.usuario.id, 'No es docente de este curso', 403);
  const [matricula] = await db.llamar('sp_matricula_obtener', [curso_id, estudiante_id]);
  v.exigir(matricula, 'El estudiante no esta matriculado', 404);
  const [{ creado }] = await db.llamar('sp_notas_guardar', [curso_id, estudiante_id, nota]);
  res.status(creado ? 201 : 200).json({ curso_id, estudiante_id, nota });
};
exports.misNotas = async (req, res) => {
  res.json(await db.llamar('sp_notas_propias', [req.usuario.id]));
};
