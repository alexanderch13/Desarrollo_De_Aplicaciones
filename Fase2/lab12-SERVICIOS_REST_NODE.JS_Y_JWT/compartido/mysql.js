/*
 * ARCHIVO: compartido/mysql.js
 * DESCRIPCION: Crea un pool MySQL con TLS verificado y una lista cerrada de procedimientos parametrizados.
 */
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

function crearAcceso(permitidos, directorio, tlsObligatorio = false) {
  const tls = process.env.DB_SSL === 'true';
  if (tlsObligatorio && !tls) throw new Error('Este proyecto requiere DB_SSL=true');
  for (const campo of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
    if (!process.env[campo]) throw new Error('Falta configurar ' + campo);
  }
  let ssl;
  if (tls) {
    ssl = { rejectUnauthorized: true, verifyIdentity: true, minVersion: 'TLSv1.2' };
    if (process.env.DB_SSL_CA) {
      ssl.ca = fs.readFileSync(path.resolve(directorio, process.env.DB_SSL_CA), 'utf8');
    }
  }
  const pool = mysql.createPool({
    host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, ssl, connectionLimit: 5,
    waitForConnections: true, connectTimeout: 15000,
    multipleStatements: false, dateStrings: true, decimalNumbers: true
  });
  const nombres = new Set(permitidos);
  async function conjuntos(nombre, parametros = []) {
    if (!nombres.has(nombre)) throw new Error('Procedimiento no permitido');
    const marcas = parametros.map(() => '?').join(', ');
    const [resultados] = await pool.query('CALL `' + nombre + '`(' + marcas + ')', parametros);
    return resultados.filter(Array.isArray);
  }
  async function llamar(nombre, parametros = []) {
    const [filas] = await conjuntos(nombre, parametros);
    return filas || [];
  }
  return { pool, llamar, conjuntos };
}
module.exports = { crearAcceso };
