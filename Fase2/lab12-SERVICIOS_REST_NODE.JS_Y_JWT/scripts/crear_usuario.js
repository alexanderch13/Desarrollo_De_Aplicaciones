/*
 * ARCHIVO: scripts/crear_usuario.js
 * DESCRIPCION: Crea cuentas privilegiadas mediante un script local, sin habilitar autoasignacion de roles en el registro publico.
 */
const path = require('node:path');
const bcrypt = require('bcryptjs');
const { cargar, proyectos } = require('../compartido/entorno');
const v = require('../compartido/validacion');
async function main() {
  const [nombre, rol = 'admin'] = process.argv.slice(2);
  v.exigir(['exp5', 'exp6', 'matricula'].includes(nombre), 'Use exp5, exp6 o matricula');
  cargar(nombre);
  const roles = nombre === 'matricula' ? ['admin', 'docente', 'estudiante'] : ['admin', 'lector'];
  v.exigir(roles.includes(rol), 'Rol no permitido');
  const db = require(path.resolve(__dirname, '..', proyectos[nombre], 'src/db'));
  try {
    const nombreUsuario = v.texto(process.env.SEED_NOMBRE, 'SEED_NOMBRE', 100);
    const email = v.email(process.env.SEED_EMAIL);
    const password = v.clave(process.env.SEED_PASSWORD);
    v.exigir(!password.startsWith('CAMBIAR'), 'Cambie SEED_PASSWORD en .env');
    const hash = await bcrypt.hash(password, 10);
    const [{ id }] = await db.llamar('sp_usuario_registrar', [nombreUsuario, email, hash, rol]);
    console.log('Usuario creado:', id, '- rol:', rol);
  } finally { await db.pool.end(); }
}
main().catch(err => { console.error(err.code || err.message); process.exitCode = 1; });
