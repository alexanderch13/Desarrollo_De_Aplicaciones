/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/app.js
 * DESCRIPCION: Monta los routers del ejercicio y registra el manejo comun de errores.
 */
const { crearBase, finalizar } = require('../../../compartido/http');
const app = crearBase('matricula');
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/matricula.routes'));
module.exports = finalizar(app);
