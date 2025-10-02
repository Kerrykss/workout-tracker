const express = require('express'); 
const router = express.Router();

//importar rutas especificas
const userRoutes = require('./user.routes');

//configurar las rutas
router.use('/users', userRoutes);   


module.exports = router;