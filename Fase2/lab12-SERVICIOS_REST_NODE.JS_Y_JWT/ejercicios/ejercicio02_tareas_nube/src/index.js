/*
 * ARCHIVO: ejercicios/ejercicio02_tareas_nube/src/index.js
 * DESCRIPCION: Punto de entrada del ejercicio con cierre ordenado del pool MySQL.
 */
require('../../../compartido/entorno').cargar('tareas');
const { escuchar } = require('../../../compartido/http');
const db = require('./db');
escuchar(require('./app'), () => db.pool.end(), 3012);
