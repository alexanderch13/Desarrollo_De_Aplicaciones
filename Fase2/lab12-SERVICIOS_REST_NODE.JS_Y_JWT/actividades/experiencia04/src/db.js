/*
 * ARCHIVO: actividades/experiencia04/src/db.js
 * DESCRIPCION: Configura los procedimientos de datos disponibles para este proyecto.
 */
const path = require('node:path');
const { crearAcceso } = require('../../../compartido/mysql');
const permitidos = [
  "sp_libros_listar",
  "sp_libros_obtener",
  "sp_libros_crear",
  "sp_libros_actualizar",
  "sp_libros_eliminar"
];
module.exports = crearAcceso(permitidos, path.resolve(__dirname, '..'), true);
