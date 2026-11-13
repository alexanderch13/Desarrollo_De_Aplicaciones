/*
 * ARCHIVO: scripts/probar_conexion.js
 * DESCRIPCION: Comprueba version, base y cifrado TLS usando una sola sesion real de MySQL.
 */
const { cargar, proyectos } = require('../compartido/entorno');
const path = require('node:path');
const nombre = process.argv[2] || 'exp4';
cargar(nombre);
const db = require(path.resolve(__dirname, '..', proyectos[nombre], 'src/db'));
async function main() {
  // Las tres comprobaciones usan la misma conexion del pool.
  const conexion = await db.pool.getConnection();
  try {
    const [[info]] = await conexion.query('SELECT VERSION() AS version, DATABASE() AS base');
    const [[cifrado]] = await conexion.query("SHOW SESSION STATUS LIKE 'Ssl_cipher'");
    if (process.env.DB_SSL === 'true' && !cifrado.Value) throw new Error('La sesion no usa TLS');
    console.log(JSON.stringify({ proyecto: nombre, ...info, tls: cifrado.Value || 'sin TLS' }, null, 2));
  } finally { conexion.release(); }
}
main().catch(err => { console.error('Conexion fallida:', err.code || err.message); process.exitCode = 1; })
.finally(() => db.pool.end());
