/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/db.js
 * DESCRIPCION: Configura los procedimientos de datos disponibles para este proyecto.
 */
const path = require('node:path');
const { crearAcceso } = require('../../../compartido/mysql');
const permitidos = [
  "sp_usuario_registrar",
  "sp_usuario_buscar_email",
  "sp_usuario_obtener",
  "sp_usuario_password",
  "sp_cursos_listar",
  "sp_curso_obtener",
  "sp_curso_crear",
  "sp_matricula_crear",
  "sp_matricula_obtener",
  "sp_notas_guardar",
  "sp_notas_propias"
];
module.exports = crearAcceso(permitidos, path.resolve(__dirname, '..'), false);
