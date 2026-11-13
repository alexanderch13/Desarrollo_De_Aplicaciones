/*
 * ARCHIVO: actividades/experiencia04/src/app.js
 * DESCRIPCION: Monta las rutas del servicio y registra los errores al final.
 */
const { crearBase, finalizar } = require('../../../compartido/http');
const app = crearBase('Biblioteca Digital');
app.use('/api/libros', require('./routes/libros.routes'));

module.exports = finalizar(app);
