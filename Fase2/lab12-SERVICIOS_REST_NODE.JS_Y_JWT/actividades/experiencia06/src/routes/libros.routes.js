/*
 * ARCHIVO: actividades/experiencia06/src/routes/libros.routes.js
 * DESCRIPCION: Define las rutas REST del catalogo y su politica de acceso.
 */
const { Router } = require('express');
const c = require('../controllers/libros.controller');
const router = Router();
router.get('/', c.listar);
router.get('/:id', c.obtener);
const { verificarToken, permitirRoles } = require('../middlewares/auth');
router.post('/', verificarToken, permitirRoles('admin'), c.crear);
router.put('/:id', verificarToken, permitirRoles('admin'), c.actualizar);
router.delete('/:id', verificarToken, permitirRoles('admin'), c.eliminar);
module.exports = router;
