/*
 * ARCHIVO: actividades/experiencia05/src/db.js
 * DESCRIPCION: Configura los procedimientos de datos disponibles para este proyecto.
 */
const path = require('node:path');
const { crearAcceso } = require('../../../compartido/mysql');
const permitidos = [
  "sp_libros_listar",
  "sp_libros_obtener",
  "sp_libros_crear",
  "sp_libros_actualizar",
  "sp_libros_eliminar",
  "sp_usuario_registrar",
  "sp_usuario_buscar_email",
  "sp_usuario_obtener",
  "sp_usuario_password"
];
module.exports = crearAcceso(permitidos, path.resolve(__dirname, '..'), true);
