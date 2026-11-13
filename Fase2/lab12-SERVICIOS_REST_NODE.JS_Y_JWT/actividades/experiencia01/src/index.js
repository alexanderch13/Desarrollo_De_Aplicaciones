/*
 * ARCHIVO: actividades/experiencia01/src/index.js
 * DESCRIPCION: Carga la configuracion y arranca el servidor de esta experiencia.
 */
require('../../../compartido/entorno').cargar('exp1');
const app = require('./app');
const { escuchar } = require('../../../compartido/http');

escuchar(app, null, 3001);
