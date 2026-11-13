/*
 * ARCHIVO: pruebas/ejecutar_todo.js
 * DESCRIPCION: Arranca y comprueba secuencialmente los nueve servicios y conserva los codigos HTTP reales.
 */
const { spawn } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const { proyectos, raiz } = require('../compartido/entorno');
const dotenv = require('dotenv');
async function esperar(base, servidor) {
  for (let n = 0; n < 60; n++) {
    if (servidor.exitCode !== null) throw new Error('El servidor no pudo iniciar');
    try { const r = await fetch(base + '/salud', { signal: AbortSignal.timeout(400) }); if (r.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error('Tiempo de espera agotado');
}
async function main() {
  const lista = process.argv.slice(2);
  if (!lista.length) lista.push(...Object.keys(proyectos));
  const resumen = [];
  for (const nombre of lista) {
    if (!proyectos[nombre]) throw new Error('Proyecto desconocido');
    const envFile = path.join(raiz, proyectos[nombre], '.env');
    const env = { ...process.env, ...dotenv.parse(fs.readFileSync(envFile)) };
    const base = 'http://localhost:' + env.PORT;
    const servidor = spawn(process.execPath, [path.join(raiz, proyectos[nombre], 'src/index.js')], { env, stdio: ['ignore', 'pipe', 'pipe'] });
    let errores = '';
    servidor.stderr.on('data', d => errores += d.toString());
    try {
      await esperar(base, servidor);
      const detalles = path.join(raiz, 'evidencias', nombre + '.json');
      fs.mkdirSync(path.dirname(detalles), { recursive: true });
      const codigo = await new Promise(resolve => {
        const p = spawn(process.execPath, [path.join(__dirname, 'verificar.js'), nombre, base],
        { env: { ...env, RESULTADO_JSON: detalles }, stdio: 'inherit' });
        p.on('exit', resolve);
      });
      if (codigo !== 0) throw new Error('Fallo en las pruebas de ' + nombre + '\n' + errores);
      const casos = JSON.parse(fs.readFileSync(detalles));
      resumen.push({ proyecto: nombre, casos: casos.length, correctos: casos.filter(x => x.correcto).length });
    } finally {
      if (servidor.exitCode === null && servidor.signalCode === null) {
        await new Promise(resolve => {
          servidor.once('exit', resolve);
          servidor.kill('SIGTERM');
        });
      }
    }
  }
  fs.writeFileSync(path.join(raiz, 'evidencias/resumen.json'), JSON.stringify({ fecha: new Date().toISOString(), entorno: 'Configuracion .env de cada proyecto', resultados: resumen }, null, 2));
  console.table(resumen);
}
main().catch(err => { console.error(err.message); process.exitCode = 1; });
