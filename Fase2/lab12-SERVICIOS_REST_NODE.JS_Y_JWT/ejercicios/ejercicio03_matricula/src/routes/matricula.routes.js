/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/routes/matricula.routes.js
 * DESCRIPCION: Aplica autenticacion antes de autorizar admin, docente y estudiante por endpoint.
 */
const { Router } = require('express');
const c = require('../controllers/matricula.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth');
const router = Router();
router.use(verificarToken);
router.get('/cursos', c.cursos);
router.post('/cursos', permitirRoles('admin'), c.crearCurso);
router.post('/matriculas', permitirRoles('admin'), c.matricular);
router.post('/notas', permitirRoles('docente'), c.registrarNota);
router.get('/notas/mias', permitirRoles('estudiante'), c.misNotas);
module.exports = router;
