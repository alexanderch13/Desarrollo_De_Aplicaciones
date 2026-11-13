/*
 * ARCHIVO: scripts/preparar_env.js
 * DESCRIPCION: Copia las plantillas sin sobrescribir .env existentes y genera una clave JWT aleatoria por servicio.
 */
const fs = require('node:fs');
const path = require('node:path');
const { randomBytes } = require('node:crypto');
const { raiz, proyectos } = require('../compartido/entorno');
const nombres = process.argv.slice(2);
if (!nombres.length) nombres.push(...Object.keys(proyectos));
for (const nombre of nombres) {
  if (!proyectos[nombre]) throw new Error('Proyecto desconocido: ' + nombre);
  const dir = path.join(raiz, proyectos[nombre]);
  const destino = path.join(dir, '.env');
  if (fs.existsSync(destino)) { console.log(nombre + ': .env existente conservado'); continue; }
  const ejemplo = fs.readFileSync(path.join(dir, '.env.example'), 'utf8');
  fs.writeFileSync(destino, ejemplo.replace('GENERAR_CON_PREPARAR', randomBytes(32).toString('hex')),
  { flag: 'wx', mode: 0o600 });
  console.log(nombre + ': .env creado. Complete los datos de conexion');
}
