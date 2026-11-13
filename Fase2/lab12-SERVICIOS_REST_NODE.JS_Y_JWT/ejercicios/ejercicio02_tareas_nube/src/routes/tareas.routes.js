/*
 * ARCHIVO: ejercicios/ejercicio02_tareas_nube/src/routes/tareas.routes.js
 * DESCRIPCION: Expone las operaciones CRUD y la ruta PATCH de tareas.
 */
const { Router } = require('express');
const c = require('../controllers/tareas.controller');
const router = Router();
router.get('/', c.listar);
router.get('/:id', c.obtener);
router.post('/', c.crear);
router.put('/:id', c.actualizar);
router.patch('/:id/estado', c.estado);
router.delete('/:id', c.eliminar);
module.exports = router;
