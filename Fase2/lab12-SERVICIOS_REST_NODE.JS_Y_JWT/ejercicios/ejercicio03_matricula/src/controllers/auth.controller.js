/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/controllers/auth.controller.js
 * DESCRIPCION: Registra el rol publico fijo, valida hashes bcrypt y emite tokens JWT sin datos sensibles.
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const v = require('../../../../compartido/validacion');
const { secreto } = require('../middlewares/auth');
const expiraEn = '30m';
function publicar(u) { return { id: u.id, nombre: u.nombre, email: u.email, rol: u.rol }; }
exports.registrar = async (req, res) => {
  const d = v.cuerpo(req.body);
  const nombre = v.texto(d.nombre, 'nombre', 100);
  const email = v.email(d.email);
  const hash = await bcrypt.hash(v.clave(d.password), 10);
  const [{ id }] = await db.llamar('sp_usuario_registrar', [nombre, email, hash, 'estudiante']);
  res.status(201).json({ id, nombre, email, rol: 'estudiante' });
};
exports.login = async (req, res) => {
  const d = v.cuerpo(req.body);
  const email = v.email(d.email);
  v.exigir(typeof d.password === 'string', 'password es obligatorio');
  const [u] = await db.llamar('sp_usuario_buscar_email', [email]);
  v.exigir(u && await bcrypt.compare(d.password, u.password_hash), 'Credenciales incorrectas', 401);
  const token = jwt.sign({ sub: String(u.id), rol: u.rol, ver: u.token_version }, secreto,
  { algorithm: 'HS256', expiresIn: expiraEn, issuer: 'lab12', audience: 'matricula' });
  res.json({ token, tipo: 'Bearer', expiraEn, usuario: publicar(u) });
};
exports.perfil = (req, res) => res.json(publicar(req.usuario));
exports.password = async (req, res) => {
  const d = v.cuerpo(req.body);
  v.exigir(typeof d.password_actual === 'string', 'password_actual es obligatorio');
  const nueva = v.clave(d.password_nueva);
  const [u] = await db.llamar('sp_usuario_buscar_email', [req.usuario.email]);
  v.exigir(u && await bcrypt.compare(d.password_actual, u.password_hash), 'Contrasena actual incorrecta', 401);
  const hash = await bcrypt.hash(nueva, 10);
  const [{ filas }] = await db.llamar('sp_usuario_password', [u.id, hash, u.token_version]);
  v.exigir(filas > 0, 'La sesion cambio. Inicie sesion nuevamente', 401);
  res.json({ mensaje: 'Contrasena actualizada. Inicie sesion nuevamente' });
};
