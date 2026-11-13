/*
 * ARCHIVO: ejercicios/ejercicio01_bodega/src/db.js
 * DESCRIPCION: Configura los procedimientos de datos disponibles para este proyecto.
 */
const path = require('node:path');
const { crearAcceso } = require('../../../compartido/mysql');
const permitidos = [
  "sp_categorias_listar",
  "sp_categorias_obtener",
  "sp_categorias_crear",
  "sp_categorias_actualizar",
  "sp_categorias_eliminar",
  "sp_productos_listar",
  "sp_productos_obtener",
  "sp_productos_crear",
  "sp_productos_actualizar",
  "sp_productos_eliminar"
];
module.exports = crearAcceso(permitidos, path.resolve(__dirname, '..'), false);
