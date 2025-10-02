const express = require('express');
const router = express.Router();

//importar versiones de rutas 
const v1Routes = require('./v1');

//configurar las rutas versionadas
router.use('/v1', v1Routes);

//ruta base para informacion de la API
router.get('/', (req, res) => {
    res.json ({
        message: 'API de Workout Tracker',
        version: ['v1'],
        endpoints: {
            v1: '/api/v1'
        }
    });
});

module.exports = router;

