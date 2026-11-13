/*
 * ARCHIVO: actividades/experiencia06/src/middlewares/auth.js
 * DESCRIPCION: Verifica firma, expiracion e identidad y autoriza con el rol actual de la base de datos.
 */
const jwt = require('jsonwebtoken');
const db = require('../db');
const { ErrorHTTP, exigir } = require('../../../../compartido/validacion');
const secreto = process.env.JWT_SECRET;
if (!secreto || Buffer.byteLength(secreto) < 32 || secreto === 'GENERAR_CON_PREPARAR') {
  throw new Error('Configure JWT_SECRET con al menos 32 bytes aleatorios');
}
const opciones = { algorithms: ['HS256'], issuer: 'lab12', audience: 'exp6' };
async function verificarToken(req, res, next) {
  const coincidencia = /^Bearer ([^\s]+)$/i.exec(req.headers.authorization || '');
  exigir(coincidencia, 'Token no proporcionado', 401);
  let datos;
  try {
    datos = jwt.verify(coincidencia[1], secreto, opciones);
  } catch (err) {
    throw new ErrorHTTP(401, err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token invalido');
  }
  exigir(typeof datos === 'object' && /^[1-9]\d*$/.test(datos.sub || '') &&
  Number.isSafeInteger(datos.exp), 'Token invalido', 401);
  const [usuario] = await db.llamar('sp_usuario_obtener', [Number(datos.sub)]);
  exigir(usuario && usuario.token_version === datos.ver, 'Token invalido', 401);
  req.usuario = usuario;
  next();
}
function permitirRoles(...roles) {
  return (req, res, next) => {
    exigir(req.usuario, 'Token no proporcionado', 401);
    exigir(roles.includes(req.usuario.rol), 'No tiene permisos para esta operacion', 403);
    next();
  };
}
module.exports = { verificarToken, permitirRoles, secreto, opciones };
