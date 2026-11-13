/*
 * ARCHIVO: ejercicios/ejercicio01_bodega/src/routes/productos.routes.js
 * DESCRIPCION: Rutas REST para productos.
 */
const { Router } = require('express');
const c = require('../controllers/productos.controller');
const router = Router();
router.get('/', c.listar);
router.get('/:id', c.obtener);
router.post('/', c.crear);
router.put('/:id', c.actualizar);
router.delete('/:id', c.eliminar);
module.exports = router;
