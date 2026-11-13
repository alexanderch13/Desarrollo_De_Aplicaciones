/*
 * ARCHIVO: pruebas/verificar.js
 * DESCRIPCION: Verifica con fetch flujos REST reales, errores HTTP, persistencia, JWT y autorizacion por roles.
 */
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const path = require('node:path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cargar, proyectos } = require('../compartido/entorno');
const resultados = [];

async function verificar(nombre, base) {
  resultados.length = 0;
  cargar(nombre);
  let db;
  if (nombre !== 'exp1' && nombre !== 'exp2') {
    db = require(path.resolve(__dirname, '..', proyectos[nombre], 'src/db'));
  }
  const sufijo = randomUUID().slice(0, 8);
  async function pedir(caso, metodo, ruta, esperado, datos, token) {
    const headers = {};
    if (datos !== undefined) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = 'Bearer ' + token;
    const r = await fetch(base + ruta, { method: metodo, headers,
      body: datos === undefined ? undefined : JSON.stringify(datos), signal: AbortSignal.timeout(15000) });
    const texto = await r.text();
    const respuesta = texto ? JSON.parse(texto) : null;
    resultados.push({ caso, esperado, obtenido: r.status, correcto: r.status === esperado });
    console.log((r.status === esperado ? 'OK ' : 'ERROR ') + caso + ' -> ' + r.status);
    assert.equal(r.status, esperado, caso + ': ' + texto);
    if (esperado === 204) assert.equal(texto, '');
    return respuesta;
  }
  async function crearCuenta(rol) {
    const usuario = { nombre: 'Usuario de prueba', email: rol + '-' + randomUUID().slice(0, 8) + '@example.test', password: 'Prueba_' + sufijo };
    const hash = await bcrypt.hash(usuario.password, 10);
    const [{ id }] = await db.llamar('sp_usuario_registrar', [usuario.nombre, usuario.email, hash, rol]);
    return { ...usuario, id };
  }
  async function login(usuario, caso = 'Login ' + usuario.email.split('-')[0]) {
    const r = await pedir(caso, 'POST', '/api/auth/login', 200, { email: usuario.email, password: usuario.password });
    assert.ok(r.token);
    return r.token;
  }
  async function probarJWT(usuario, token, duracion) {
    const datos = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'], issuer: 'lab12', audience: nombre });
    assert.equal(datos.exp - datos.iat, duracion);
    assert.equal(datos.password, undefined);
    await pedir('Perfil sin token', 'GET', '/api/auth/perfil', 401);
    const falso = await pedir('Token invalido', 'GET', '/api/auth/perfil', 401, undefined, 'abc.def.ghi');
    assert.equal(falso.error, 'Token invalido');
    const expirado = jwt.sign({ sub: String(usuario.id), rol: usuario.rol, ver: 0 }, process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: -1, issuer: 'lab12', audience: nombre });
    const r = await pedir('Token expirado', 'GET', '/api/auth/perfil', 401, undefined, expirado);
    assert.equal(r.error, 'Token expirado');
    const perfil = await pedir('Perfil valido', 'GET', '/api/auth/perfil', 200, undefined, token);
    assert.equal(perfil.id, usuario.id);
    assert.equal(perfil.password_hash, undefined);
  }
  try {
    await pedir('Ruta inexistente', 'GET', '/no-existe', 404);
    if (nombre.startsWith('exp')) {
      const libros = await pedir('Listado publico', 'GET', '/api/libros', 200);
      assert.ok(Array.isArray(libros));
      const uno = libros[0];
      await pedir('Libro existente', 'GET', '/api/libros/' + uno.id, 200);
      await pedir('Libro inexistente', 'GET', '/api/libros/2147483647', 404);
      await pedir('Identificador invalido', 'GET', '/api/libros/abc', 400);
      let token;
      if (nombre === 'exp5' || nombre === 'exp6') {
        const usuario = { nombre: 'Lector de prueba', email: 'lector-' + sufijo + '@example.test', password: 'Prueba_' + sufijo, rol: 'admin' };
        const r = await pedir('Registro publico sin elevar rol', 'POST', '/api/auth/registro', 201, usuario);
        assert.equal(r.rol, 'lector');
        usuario.id = r.id;
        await pedir('Email duplicado', 'POST', '/api/auth/registro', 409, usuario);
        await pedir('Clave corta', 'POST', '/api/auth/registro', 400, { ...usuario, password: '123' });
        await pedir('Login incorrecto', 'POST', '/api/auth/login', 401, { email: usuario.email, password: 'incorrecta' });
        const lector = await login(usuario, 'Login lector');
        await probarJWT(usuario, lector, 3600);
        if (nombre === 'exp6') {
          const datos = { titulo: 'Prueba', autor: 'Autor de prueba', anio: 2026 };
          await pedir('Crear sin token', 'POST', '/api/libros', 401, datos);
          await pedir('Lector no puede crear', 'POST', '/api/libros', 403, datos, lector);
          await pedir('Lector no puede actualizar', 'PUT', '/api/libros/' + uno.id, 403, datos, lector);
          await pedir('Lector no puede eliminar', 'DELETE', '/api/libros/' + uno.id, 403, undefined, lector);
          const admin = await crearCuenta('admin');
          token = await login(admin, 'Login admin');
        }
      }
      if (nombre !== 'exp1') {
        const d = { titulo: "Libro ' ; -- " + sufijo, autor: 'Autor de prueba', anio: 2026 };
        const item = await pedir('Crear libro con texto SQL', 'POST', '/api/libros', 201, d, token);
        assert.equal(item.titulo, d.titulo);
        await pedir('Faltan campos', 'POST', '/api/libros', 400, {}, token);
        await pedir('Anio invalido', 'POST', '/api/libros', 400, { ...d, anio: -1 }, token);
        const obtenido = await pedir('Lectura posterior a crear', 'GET', '/api/libros/' + item.id, 200);
        assert.equal(obtenido.titulo, d.titulo);
        await pedir('Actualizar libro', 'PUT', '/api/libros/' + item.id, 200, { ...d, anio: 2025 }, token);
        await pedir('PUT identico conserva 200', 'PUT', '/api/libros/' + item.id, 200, { ...d, anio: 2025 }, token);
        await pedir('Actualizar inexistente', 'PUT', '/api/libros/2147483647', 404, d, token);
        await pedir('Eliminar libro', 'DELETE', '/api/libros/' + item.id, 204, undefined, token);
        await pedir('Consultar eliminado', 'GET', '/api/libros/' + item.id, 404);
        await pedir('Eliminar inexistente', 'DELETE', '/api/libros/' + item.id, 404, undefined, token);
      }
    } else if (nombre === 'bodega') {
      const a = await pedir('Crear categoria A', 'POST', '/api/categorias', 201, { nombre: 'Prueba A ' + sufijo });
      const b = await pedir('Crear categoria B', 'POST', '/api/categorias', 201, { nombre: 'Prueba B ' + sufijo });
      await pedir('Categoria repetida', 'POST', '/api/categorias', 409, { nombre: a.nombre });
      await pedir('Listar categorias', 'GET', '/api/categorias', 200);
      await pedir('Obtener categoria', 'GET', '/api/categorias/' + a.id, 200);
      await pedir('Actualizar categoria', 'PUT', '/api/categorias/' + b.id, 200, { nombre: b.nombre + ' editada' });
      const d = { nombre: 'Producto ' + sufijo, precio: 4.5, stock: 10, categoria_id: a.id };
      await pedir('Precio negativo', 'POST', '/api/productos', 400, { ...d, precio: -1 });
      await pedir('Categoria no existe', 'POST', '/api/productos', 400, { ...d, categoria_id: 2147483647 });
      const p = await pedir('Crear producto', 'POST', '/api/productos', 201, d);
      const filtrados = await pedir('Filtrar categoria A', 'GET', '/api/productos?categoria=' + a.id, 200);
      assert.ok(filtrados.some(x => x.id === p.id));
      const otros = await pedir('Filtrar categoria B', 'GET', '/api/productos?categoria=' + b.id, 200);
      assert.ok(!otros.some(x => x.id === p.id));
      await pedir('No borrar categoria ocupada', 'DELETE', '/api/categorias/' + a.id, 409);
      await pedir('Producto existente', 'GET', '/api/productos/' + p.id, 200);
      await pedir('Actualizar producto', 'PUT', '/api/productos/' + p.id, 200, { ...d, stock: 8 });
      await pedir('PUT identico de producto', 'PUT', '/api/productos/' + p.id, 200, { ...d, stock: 8 });
      await pedir('Producto inexistente', 'GET', '/api/productos/2147483647', 404);
      await pedir('Filtro invalido', 'GET', '/api/productos?categoria=abc', 400);
      await pedir('Borrar producto', 'DELETE', '/api/productos/' + p.id, 204);
      await pedir('Borrar categoria A', 'DELETE', '/api/categorias/' + a.id, 204);
      await pedir('Borrar categoria B', 'DELETE', '/api/categorias/' + b.id, 204);
    } else if (nombre === 'tareas') {
      const ids = [];
      const d = { titulo: 'Tarea ' + sufijo, descripcion: 'Prueba de paginacion', estado: 'pendiente', fecha_limite: '2027-01-15' };
      for (let i = 0; i < 3; i++) ids.push((await pedir('Crear tarea ' + (i+1), 'POST', '/api/tareas', 201, { ...d, titulo: d.titulo+i })).id);
      const p1 = await pedir('Pagina 1 limite 2', 'GET', '/api/tareas?pagina=1&limite=2', 200);
      const p2 = await pedir('Pagina 2 limite 2', 'GET', '/api/tareas?pagina=2&limite=2', 200);
      assert.equal(p1.datos.length, 2);
      assert.ok(p1.total >= 3);
      assert.ok(!p1.datos.some(a => p2.datos.some(b => a.id === b.id)));
      await pedir('Pagina cero', 'GET', '/api/tareas?pagina=0', 400);
      await pedir('Limite excesivo', 'GET', '/api/tareas?limite=101', 400);
      await pedir('Fecha imposible', 'POST', '/api/tareas', 400, { ...d, fecha_limite: '2027-02-30' });
      await pedir('Estado invalido', 'PATCH', '/api/tareas/' + ids[0] + '/estado', 400, { estado: 'otra' });
      await pedir('PATCH rechaza otros campos', 'PATCH', '/api/tareas/' + ids[0] + '/estado', 400, { estado: 'terminada', titulo: 'otro' });
      const r = await pedir('PATCH cambia solo estado', 'PATCH', '/api/tareas/' + ids[0] + '/estado', 200, { estado: 'en_progreso' });
      assert.equal(r.titulo, d.titulo + '0');
      assert.equal(r.fecha_limite, d.fecha_limite);
      await pedir('PATCH identico conserva 200', 'PATCH', '/api/tareas/' + ids[0] + '/estado', 200, { estado: 'en_progreso' });
      await pedir('PATCH inexistente', 'PATCH', '/api/tareas/2147483647/estado', 404, { estado: 'terminada' });
      await pedir('PUT tarea', 'PUT', '/api/tareas/' + ids[1], 200, { ...d, estado: 'terminada' });
      for (const id of ids) await pedir('Eliminar tarea ' + id, 'DELETE', '/api/tareas/' + id, 204);
      await pedir('Tarea eliminada', 'GET', '/api/tareas/' + ids[0], 404);
    } else if (nombre === 'matricula') {
      const publico = { nombre: 'Estudiante de prueba', email: 'estudiante-' + sufijo + '@example.test', password: 'Prueba_' + sufijo, rol: 'admin' };
      const r = await pedir('Registro siempre estudiante', 'POST', '/api/auth/registro', 201, publico);
      assert.equal(r.rol, 'estudiante'); publico.id = r.id;
      await pedir('Registro duplicado', 'POST', '/api/auth/registro', 409, publico);
      await pedir('Login incorrecto', 'POST', '/api/auth/login', 401, { email: publico.email, password: 'incorrecta' });
      const estudiante = await login(publico, 'Login estudiante');
      await probarJWT(publico, estudiante, 1800);
      const adminU = await crearCuenta('admin'); const admin = await login(adminU, 'Login admin');
      const docenteU = await crearCuenta('docente'); const docente = await login(docenteU, 'Login docente');
      const otroU = await crearCuenta('docente'); const otro = await login(otroU, 'Login otro docente');
      const otroAlumno = await crearCuenta('estudiante');
      const d = { nombre: 'Curso ' + sufijo, codigo: 'C-' + sufijo, docente_id: docenteU.id };
      await pedir('Estudiante no crea cursos', 'POST', '/api/cursos', 403, d, estudiante);
      await pedir('Docente no crea cursos', 'POST', '/api/cursos', 403, d, docente);
      await pedir('Curso sin token', 'POST', '/api/cursos', 401, d);
      const curso = await pedir('Admin crea curso', 'POST', '/api/cursos', 201, d, admin);
      await pedir('Matricula por admin', 'POST', '/api/matriculas', 201, { curso_id: curso.id, estudiante_id: publico.id }, admin);
      const n = { curso_id: curso.id, estudiante_id: publico.id, nota: 18.5 };
      await pedir('Estudiante no registra nota', 'POST', '/api/notas', 403, n, estudiante);
      await pedir('Admin no actua como docente', 'POST', '/api/notas', 403, n, admin);
      await pedir('Docente ajeno no registra nota', 'POST', '/api/notas', 403, n, otro);
      await pedir('Nota fuera de rango', 'POST', '/api/notas', 400, { ...n, nota: 21 }, docente);
      await pedir('Alumno sin matricula', 'POST', '/api/notas', 404, { ...n, estudiante_id: otroAlumno.id }, docente);
      await pedir('Docente registra nota', 'POST', '/api/notas', 201, n, docente);
      await pedir('Docente actualiza nota', 'POST', '/api/notas', 200, { ...n, nota: 19 }, docente);
      const notas = await pedir('Estudiante consulta notas propias', 'GET', '/api/notas/mias', 200, undefined, estudiante);
      assert.ok(notas.some(x => x.curso_id === curso.id && x.nota === 19));
      const tokenOtro = await login(otroAlumno, 'Login otro estudiante');
      const ajenas = await pedir('Query no permite consultar notas ajenas', 'GET', '/api/notas/mias?estudiante_id=' + publico.id, 200, undefined, tokenOtro);
      assert.ok(!ajenas.some(x => x.curso_id === curso.id));
      await pedir('Docente no usa notas propias de estudiante', 'GET', '/api/notas/mias', 403, undefined, docente);
      await pedir('Cambio con clave actual incorrecta', 'PUT', '/api/auth/password', 401, { password_actual: 'incorrecta', password_nueva: 'Nueva_' + sufijo }, estudiante);
      await pedir('Cambiar contrasena', 'PUT', '/api/auth/password', 200, { password_actual: publico.password, password_nueva: 'Nueva_' + sufijo }, estudiante);
      await pedir('Token anterior revocado', 'GET', '/api/auth/perfil', 401, undefined, estudiante);
      await pedir('Clave anterior ya no sirve', 'POST', '/api/auth/login', 401, { email: publico.email, password: publico.password });
      await login({ ...publico, password: 'Nueva_' + sufijo }, 'Login con clave nueva');
    }
    console.log(nombre + ': ' + resultados.length + '/' + resultados.length + ' comprobaciones HTTP correctas');
    return resultados.slice();
  } finally {
    if (db) await db.pool.end();
  }
}
if (require.main === module) {
  const nombre = process.argv[2] || 'exp6';
  cargar(nombre);
  const base = process.argv[3] || 'http://localhost:' + (process.env.PORT || 3000);
  verificar(nombre, base).then(lista => {
    if (process.env.RESULTADO_JSON) require('node:fs').writeFileSync(process.env.RESULTADO_JSON, JSON.stringify(lista, null, 2));
  }).catch(err => { console.error(err.message); process.exitCode = 1; });
}
module.exports = { verificar };
