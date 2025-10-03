const express = require('express');
const router = express.Router();
const {
    getExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    deleteExercise
} = require('../../controllers/ejerciciosController');

// GET /api/exercises?categoria=fuerza&search=Sentadillas&grupoMuscular=piernas
router.get('/', getExercises);

// GET /api/exercises/:id
router.get('/:id', getExerciseById);

// POST /api/exercises
router.post('/', createExercise);

// PUT /api/exercises/:id
router.put('/:id', updateExercise);

// DELETE /api/exercises/:id
router.delete('/:id', deleteExercise);

module.exports = router;