const express = require('express');
const router = express.Router();
const {
    getReportes,
    getReporteById,
    generarReporte,
    getReportesByUsuario,
    deleteReporte
} = require('../../controllers/reporteEntrenamientoController');

// GET /api/reportes?usuarioId=1&periodo=2024-01
router.get('/', getReportes);

// GET /api/reportes/usuario/:usuarioId
router.get('/usuario/:usuarioId', getReportesByUsuario);

// GET /api/reportes/:id
router.get('/:id', getReporteById);

// POST /api/reportes/generar
router.post('/generar', generarReporte);

// DELETE /api/reportes/:id
router.delete('/:id', deleteReporte);

module.exports = router;