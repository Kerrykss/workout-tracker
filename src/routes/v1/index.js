const express = require('express'); 
const router = express.Router();

// importar rutas específicas
const userRoutes = require("./user.routes");
const ejerciciosRoutes = require("./ejercicios.routes"); // Completé la ruta
const planDeEntrenamientoRoutes = require("./planDeEntrenamiento.routes"); // Importé la ruta
const seccionDeEntrenamientoRoutes = require("./seccionDeEntrenamiento.routes"); // Importé la ruta
const entrenamientoRoutes = require("./entrenamiento.routes"); // Importé la ruta
const reporteEntrenamientoRoutes = require("./reporteEntrenamiento.routes"); // Importé la ruta
// configurar las rutas
router.use("/users", userRoutes);   // Corregí las comillas
router.use("/ejercicios", ejerciciosRoutes); // Completé la línea
router.use("/planDeEntrenamiento", planDeEntrenamientoRoutes); // Configuré la ruta
router.use("/seccionDeEntrenamiento", seccionDeEntrenamientoRoutes); // Configuré la ruta
module.exports = router;
router.use("/entrenamiento", entrenamientoRoutes); 
router.use("/reporteEntrenamiento", reporteEntrenamientoRoutes);