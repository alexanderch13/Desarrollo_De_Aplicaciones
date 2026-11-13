/*
 * ARCHIVO: scripts/importar_sql.js
 * DESCRIPCION: Importa los SQL incluidos interpretando DELIMITER en el cliente y sin enviarlo al servidor.
 */
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');
const { cargar } = require('../compartido/entorno');
const { crearAcceso } = require('../compartido/mysql');
function sentencias(texto) {
  const resultado = [];
  let delimitador = ';';
  let bloque = '';
  for (const linea of texto.split(/\r?\n/)) {
    if (/^\s*--/.test(linea) || !linea.trim()) continue;
    const cambio = /^\s*DELIMITER\s+(\S+)\s*$/i.exec(linea);
    if (cambio) { if (bloque.trim()) throw new Error('DELIMITER inesperado'); delimitador = cambio[1]; continue; }
    bloque += linea + '\n';
    if (bloque.trimEnd().endsWith(delimitador)) {
      resultado.push(bloque.trimEnd().slice(0, -delimitador.length));
      bloque = '';
    }
  }
  if (bloque.trim()) throw new Error('Sentencia sin delimitador final');
  return resultado;
}
async function main() {
  const [nombre, archivo] = process.argv.slice(2);
  if (!nombre || !archivo) throw new Error('Uso: npm run importar -- exp3 sql/biblioteca.sql');
  const directorio = cargar(nombre);
  // DB_ADMIN_* son opcionales y se usan solo para importar el esquema.
  for (const campo of ['USER', 'PASSWORD']) {
    if (process.env['DB_ADMIN_' + campo]) process.env['DB_' + campo] = process.env['DB_ADMIN_' + campo];
  }
  const db = crearAcceso([], directorio);
  try {
    const sql = fs.readFileSync(path.resolve(archivo), 'utf8');
    const conexion = await db.pool.getConnection();
    try {
      const lista = sentencias(sql);
      for (const sentencia of lista) await conexion.query(sentencia);
      console.log('Importacion correcta:', lista.length, 'sentencias en', process.env.DB_NAME);
    } finally { conexion.release(); }
  } finally { await db.pool.end(); }
}
if (require.main === module) main().catch(err => { console.error(err.code || err.message); process.exitCode = 1; });
module.exports = { sentencias };
