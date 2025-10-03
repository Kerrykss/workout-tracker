const express = require('express');
const router = express.Router();
const {
    getEntrenamientos,
    getEntrenamientoById,
    createEntrenamiento,
    updateEntrenamiento,
    deleteEntrenamiento,
    addEjercicioRealizado,
    getEntrenamientosBySeccion
} = require('../../controllers/entrenamientoController');

// GET /api/entrenamientos?seccionId=1&fecha=2024-01-20
router.get('/', getEntrenamientos);

// GET /api/entrenamientos/seccion/:seccionId
router.get('/seccion/:seccionId', getEntrenamientosBySeccion);

// GET /api/entrenamientos/:id
router.get('/:id', getEntrenamientoById);

// POST /api/entrenamientos
router.post('/', createEntrenamiento);

// PUT /api/entrenamientos/:id
router.put('/:id', updateEntrenamiento);

// DELETE /api/entrenamientos/:id
router.delete('/:id', deleteEntrenamiento);

// POST /api/entrenamientos/:id/ejercicios
router.post('/:id/ejercicios', addEjercicioRealizado);

module.exports = router;