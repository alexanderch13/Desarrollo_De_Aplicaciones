/*
 * ARCHIVO: actividades/experiencia05/src/routes/libros.routes.js
 * DESCRIPCION: Define las rutas REST del catalogo y su politica de acceso.
 */
const { Router } = require('express');
const c = require('../controllers/libros.controller');
const router = Router();
router.get('/', c.listar);
router.get('/:id', c.obtener);
router.post('/', c.crear);
router.put('/:id', c.actualizar);
router.delete('/:id', c.eliminar);
module.exports = router;
