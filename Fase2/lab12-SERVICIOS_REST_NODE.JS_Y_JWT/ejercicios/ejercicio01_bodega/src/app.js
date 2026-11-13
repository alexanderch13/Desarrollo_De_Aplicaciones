/*
 * ARCHIVO: ejercicios/ejercicio01_bodega/src/app.js
 * DESCRIPCION: Monta los routers del ejercicio y registra el manejo comun de errores.
 */
const { crearBase, finalizar } = require('../../../compartido/http');
const app = crearBase('bodega');
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
module.exports = finalizar(app);
