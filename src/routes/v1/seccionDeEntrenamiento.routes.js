const express = require('express');
const router = express.Router();
const {
    getSecciones,
    getSeccionById,
    createSeccion,
    updateSeccion,
    deleteSeccion,
    addEjercicioToSeccion
} = require('../../controllers/seccionDeEntrenamientoController');

// GET /api/secciones?planId=1&fecha=2024-01-20
router.get('/', getSecciones);

// GET /api/secciones/:id
router.get('/:id', getSeccionById);

// POST /api/secciones
router.post('/', createSeccion);

// PUT /api/secciones/:id
router.put('/:id', updateSeccion);

// DELETE /api/secciones/:id
router.delete('/:id', deleteSeccion);

// POST /api/secciones/:id/ejercicios
router.post('/:id/ejercicios', addEjercicioToSeccion);

module.exports = router;