/*
 * ARCHIVO: compartido/entorno.js
 * DESCRIPCION: Carga el .env del proyecto elegido sin depender del directorio de ejecucion.
 */
const path = require('node:path');
const dotenv = require('dotenv');
const proyectos = require('./proyectos');
const raiz = path.resolve(__dirname, '..');

function cargar(nombre) {
  if (!proyectos[nombre]) throw new Error('Proyecto desconocido: ' + nombre);
  const directorio = path.join(raiz, proyectos[nombre]);
  dotenv.config({ path: path.join(directorio, '.env'), quiet: true });
  return directorio;
}
module.exports = { cargar, raiz, proyectos };
