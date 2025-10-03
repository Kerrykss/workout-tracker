const express = require('express');
const router = express.Router();
const {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
} = require('../../controllers/planDeEntrenamientoController');

// GET /api/planes?usuarioId=1&objetivo=hipertrofia&search=fuerza
router.get('/', getPlans);

// GET /api/planes/:id
router.get('/:id', getPlanById);

// POST /api/planes
router.post('/', createPlan);

// PUT /api/planes/:id
router.put('/:id', updatePlan);

// DELETE /api/planes/:id
router.delete('/:id', deletePlan);

module.exports = router;