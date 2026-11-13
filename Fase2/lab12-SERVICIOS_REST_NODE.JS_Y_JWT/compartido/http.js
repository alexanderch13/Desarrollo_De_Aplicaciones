/*
 * ARCHIVO: compartido/http.js
 * DESCRIPCION: Configura Express 5 y los manejadores 404 y de errores con respuestas JSON.
 */
const express = require('express');
function crearBase(nombre) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));
  app.get('/', (req, res) => res.json({ mensaje: 'API ' + nombre + ' en funcionamiento' }));
  app.get('/salud', (req, res) => res.json({ estado: 'ok', servicio: nombre }));
  return app;
}
function finalizar(app) {
  app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON no valido' });
    if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Cuerpo demasiado grande' });
    const erroresSQL = {
      ER_DUP_ENTRY: [409, 'El registro ya existe'],
      ER_ROW_IS_REFERENCED_2: [409, 'El recurso tiene registros relacionados'],
      ER_NO_REFERENCED_ROW_2: [400, 'El recurso relacionado no existe'],
      ER_CHECK_CONSTRAINT_VIOLATED: [400, 'Los datos incumplen una restriccion']
    };
    const [estado, mensaje] = erroresSQL[err.code] || [err.estado || 500, err.estado ? err.message : 'Error interno del servidor'];
    if (estado >= 500) console.error('Error del servidor:', err.code || err.name);
    res.status(estado).json({ error: mensaje });
  });
  return app;
}
function escuchar(app, cerrar, predeterminado = 3000) {
  const puerto = Number(process.env.PORT || predeterminado);
  const servidor = app.listen(puerto, () => console.log('API en http://localhost:' + puerto));
  for (const senal of ['SIGINT', 'SIGTERM']) {
    process.once(senal, () => servidor.close(async () => {
      if (cerrar) await cerrar();
      process.exit(0);
    }));
  }
  return servidor;
}
module.exports = { crearBase, finalizar, escuchar };
