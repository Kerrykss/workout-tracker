const express = require('express'); 
const router = express.Router();

// importar rutas específicas
const userRoutes = require("./user.routes");
const ejerciciosRoutes = require("./ejercicios.routes"); // Completé la ruta
const planDeEntrenamientoRoutes = require("./planDeEntrenamiento.routes"); // Importé la ruta

// configurar las rutas
router.use("/users", userRoutes);   // Corregí las comillas
router.use("/ejercicios", ejerciciosRoutes); // Completé la línea
router.use("/planDeEntrenamiento", planDeEntrenamientoRoutes); // Configuré la ruta

module.exports = router;