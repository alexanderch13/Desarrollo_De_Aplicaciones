/*
 * ARCHIVO: compartido/validacion.js
 * DESCRIPCION: Valida cuerpos JSON, identificadores, textos, fechas y contrasenas antes del acceso a datos.
 */
class ErrorHTTP extends Error {
  constructor(estado, mensaje) { super(mensaje); this.estado = estado; }
}
function exigir(condicion, mensaje, estado = 400) {
  if (!condicion) throw new ErrorHTTP(estado, mensaje);
}
function cuerpo(valor) {
  exigir(valor && typeof valor === 'object' && !Array.isArray(valor), 'Se requiere un objeto JSON');
  return valor;
}
function texto(valor, campo, maximo) {
  exigir(typeof valor === 'string' && valor.trim().length > 0 && valor.trim().length <= maximo,
  campo + ' es obligatorio y admite hasta ' + maximo + ' caracteres');
  return valor.trim();
}
function entero(valor, campo = 'id', maximo = 2147483647) {
  exigir(/^[1-9]\d*$/.test(String(valor)), campo + ' debe ser un entero positivo');
  const n = Number(valor);
  exigir(Number.isSafeInteger(n) && n <= maximo, campo + ' fuera de rango');
  return n;
}
function numero(valor, campo, min, max) {
  exigir(typeof valor === 'number' && Number.isFinite(valor) && valor >= min && valor <= max,
  campo + ' debe ser un numero entre ' + min + ' y ' + max);
  return valor;
}
function clave(valor) {
  exigir(typeof valor === 'string' && valor.length >= 8 && Buffer.byteLength(valor, 'utf8') <= 72,
  'password debe tener al menos 8 caracteres y como maximo 72 bytes UTF-8');
  return valor;
}
function email(valor) {
  const correo = texto(valor, 'email', 120).toLowerCase();
  exigir(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo), 'email no valido');
  return correo;
}
function libro(valor) {
  const d = cuerpo(valor);
  const anio = d.anio == null ? null : numero(d.anio, 'anio', 0, 9999);
  exigir(anio === null || Number.isInteger(anio), 'anio debe ser entero');
  return { titulo: texto(d.titulo, 'titulo', 200), autor: texto(d.autor, 'autor', 120), anio };
}
function fecha(valor) {
  if (valor == null) return null;
  exigir(typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor), 'fecha_limite debe usar AAAA-MM-DD');
  const d = new Date(valor + 'T00:00:00Z');
  exigir(Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === valor && valor >= '1000-01-01',
  'fecha_limite no valida');
  return valor;
}
module.exports = { ErrorHTTP, exigir, cuerpo, texto, entero, numero, clave, email, libro, fecha };
