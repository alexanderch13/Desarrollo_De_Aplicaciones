/*
 * ARCHIVO: ejercicios/ejercicio03_matricula/src/routes/auth.routes.js
 * DESCRIPCION: Agrupa los recursos de autenticacion y el perfil protegido.
 */
const { Router } = require('express');
const c = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth');
const router = Router();
router.post('/registro', c.registrar);
router.post('/login', c.login);
router.get('/perfil', verificarToken, c.perfil);
router.put('/password', verificarToken, c.password);
module.exports = router;
