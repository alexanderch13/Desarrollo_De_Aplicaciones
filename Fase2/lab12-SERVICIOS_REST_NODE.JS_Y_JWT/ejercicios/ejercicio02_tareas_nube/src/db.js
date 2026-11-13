/*
 * ARCHIVO: ejercicios/ejercicio02_tareas_nube/src/db.js
 * DESCRIPCION: Configura los procedimientos de datos disponibles para este proyecto.
 */
const path = require('node:path');
const { crearAcceso } = require('../../../compartido/mysql');
const permitidos = [
  "sp_tareas_listar",
  "sp_tareas_obtener",
  "sp_tareas_crear",
  "sp_tareas_actualizar",
  "sp_tareas_estado",
  "sp_tareas_eliminar"
];
module.exports = crearAcceso(permitidos, path.resolve(__dirname, '..'), true);
