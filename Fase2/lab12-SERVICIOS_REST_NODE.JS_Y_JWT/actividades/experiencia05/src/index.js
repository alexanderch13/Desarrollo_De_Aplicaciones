/*
 * ARCHIVO: actividades/experiencia05/src/index.js
 * DESCRIPCION: Carga la configuracion y arranca el servidor de esta experiencia.
 */
require('../../../compartido/entorno').cargar('exp5');
const app = require('./app');
const { escuchar } = require('../../../compartido/http');
const db = require("./db");
escuchar(app, () => db.pool.end(), 3005);
