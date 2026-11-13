/*
 * ARCHIVO: ejercicios/ejercicio02_tareas_nube/src/app.js
 * DESCRIPCION: Monta los routers del ejercicio y registra el manejo comun de errores.
 */
const { crearBase, finalizar } = require('../../../compartido/http');
const app = crearBase('tareas');
app.use('/api/tareas', require('./routes/tareas.routes'));
module.exports = finalizar(app);
