// Estados de memoria (simulación)
let reportes = [
    { 
        id: "1",
        usuarioId: "1",
        periodo: {
            inicio: "2024-01-01",
            fin: "2024-01-31"
        },
        totalSesiones: 12,
        ejerciciosMasUsados: [
            { ejercicioId: "1", nombre: "Sentadillas", frecuencia: 8 },
            { ejercicioId: "2", nombre: "Flexiones", frecuencia: 6 },
            { ejercicioId: "3", nombre: "Correr", frecuencia: 4 }
        ],
        progreso: {
            pesoMaximoLevantado: 80,
            repeticionesTotales: 480,
            tiempoTotalMinutos: 360,
            sesionesCompletadas: 10,
            consistencyScore: 83
        },
        recomendaciones: [
            "Aumentar peso en sentadillas progresivamente",
            "Incluir más ejercicios de flexibilidad",
            "Mantener la consistencia de 3 sesiones por semana"
        ],
        generadoEn: "2024-02-01T10:00:00Z"
    }
];

// Datos necesarios para generar reportes (simulados)
let entrenamientos = [
    {
        id: "1",
        seccionId: "1",
        usuarioId: "1",
        fechaRealizada: "2024-01-15T08:00:00Z",
        ejerciciosRealizados: [
            { ejercicioId: "1", seriesCompletadas: 4, repeticionesCompletadas: [12, 12, 10, 10], pesoUsado: [70, 70, 75, 75] },
            { ejercicioId: "3", seriesCompletadas: 3, repeticionesCompletadas: [15, 15, 12], pesoUsado: [0, 0, 0] }
        ]
    }
    // ... más entrenamientos
];

let ejercicios = [
    { id: "1", nombre: "Sentadillas" },
    { id: "2", nombre: "Flexiones" },
    { id: "3", nombre: "Correr" }
];

// GET /reportes?usuarioId=1&periodo=2024-01
const getReportes = (req, res) => {
    const { usuarioId, periodo } = req.query;
    let result = reportes;

    if (usuarioId) {
        result = result.filter(r => r.usuarioId === usuarioId);
    }

    if (periodo) {
        result = result.filter(r => 
            r.periodo.inicio.startsWith(periodo) || 
            r.periodo.fin.startsWith(periodo)
        );
    }

    res.status(200).json(result);
};

// GET /reportes/:id
const getReporteById = (req, res) => {
    const { id } = req.params;
    const reporte = reportes.find(r => r.id === id);

    if (!reporte) {
        return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.status(200).json(reporte);
};

// POST /reportes/generar - Generar nuevo reporte automáticamente
const generarReporte = (req, res) => {
    const { usuarioId, inicio, fin } = req.body;

    if (!usuarioId || !inicio || !fin) {
        return res.status(400).json({ 
            error: 'usuarioId, inicio y fin son requeridos' 
        });
    }

    // Simular generación de reporte basado en datos existentes
    const entrenamientosUsuario = entrenamientos.filter(e => e.usuarioId === usuarioId);
    const entrenamientosPeriodo = entrenamientosUsuario.filter(e => 
        e.fechaRealizada >= inicio && e.fechaRealizada <= fin
    );

    if (entrenamientosPeriodo.length === 0) {
        return res.status(404).json({ 
            error: 'No hay datos de entrenamiento para el período especificado' 
        });
    }

    // Calcular métricas
    const ejerciciosFrecuencia = calcularEjerciciosMasUsados(entrenamientosPeriodo);
    const metricasProgreso = calcularProgreso(entrenamientosPeriodo);
    const recomendaciones = generarRecomendaciones(metricasProgreso, ejerciciosFrecuencia);

    const nuevoReporte = {
        id: `${Date.now()}`,
        usuarioId,
        periodo: { inicio, fin },
        totalSesiones: entrenamientosPeriodo.length,
        ejerciciosMasUsados: ejerciciosFrecuencia.slice(0, 5), // Top 5
        progreso: metricasProgreso,
        recomendaciones,
        generadoEn: new Date().toISOString()
    };

    reportes.push(nuevoReporte);
    res.status(201).json(nuevoReporte);
};

// Funciones auxiliares para generar reportes
const calcularEjerciciosMasUsados = (entrenamientos) => {
    const frecuencia = {};
    
    entrenamientos.forEach(entrenamiento => {
        entrenamiento.ejerciciosRealizados.forEach(ejercicio => {
            if (!frecuencia[ejercicio.ejercicioId]) {
                frecuencia[ejercicio.ejercicioId] = 0;
            }
            frecuencia[ejercicio.ejercicioId]++;
        });
    });

    return Object.entries(frecuencia)
        .map(([ejercicioId, frecuencia]) => ({
            ejercicioId,
            nombre: obtenerNombreEjercicio(ejercicioId),
            frecuencia
        }))
        .sort((a, b) => b.frecuencia - a.frecuencia);
};

const calcularProgreso = (entrenamientos) => {
    let pesoMaximo = 0;
    let repeticionesTotales = 0;
    let tiempoEstimado = 0;

    entrenamientos.forEach(entrenamiento => {
        entrenamiento.ejerciciosRealizados.forEach(ejercicio => {
            // Calcular peso máximo
            ejercicio.pesoUsado.forEach(peso => {
                if (peso > pesoMaximo) {
                    pesoMaximo = peso;
                }
            });

            // Calcular repeticiones totales
            ejercicio.repeticionesCompletadas.forEach(repeticiones => {
                repeticionesTotales += repeticiones;
            });

            // Estimación de tiempo (5 min por serie)
            tiempoEstimado += ejercicio.seriesCompletadas * 5;
        });
    });

    const consistencyScore = Math.min(100, (entrenamientos.length / 15) * 100); // Basado en 15 sesiones esperadas

    return {
        pesoMaximoLevantado: pesoMaximo,
        repeticionesTotales,
        tiempoTotalMinutos: tiempoEstimado,
        sesionesCompletadas: entrenamientos.length,
        consistencyScore: Math.round(consistencyScore)
    };
};

const generarRecomendaciones = (progreso, ejerciciosFrecuencia) => {
    const recomendaciones = [];

    // Recomendación basada en consistencia
    if (progreso.consistencyScore < 70) {
        recomendaciones.push("Intenta mantener una mayor consistencia en tus entrenamientos");
    } else {
        recomendaciones.push("¡Excelente consistencia! Sigue así");
    }

    // Recomendación basada en variedad de ejercicios
    if (ejerciciosFrecuencia.length < 5) {
        recomendaciones.push("Considera agregar más variedad a tu rutina de ejercicios");
    }

    // Recomendación basada en progreso de peso
    if (progreso.pesoMaximoLevantado > 0 && progreso.pesoMaximoLevantado < 50) {
        recomendaciones.push("Puedes intentar aumentar gradualmente el peso en tus ejercicios");
    }

    // Recomendación general
    recomendaciones.push("Recuerda mantener una hidratación adecuada durante tus entrenamientos");

    return recomendaciones;
};

const obtenerNombreEjercicio = (ejercicioId) => {
    const ejercicio = ejercicios.find(e => e.id === ejercicioId);
    return ejercicio ? ejercicio.nombre : `Ejercicio ${ejercicioId}`;
};

// GET /reportes/usuario/:usuarioId - Obtener todos los reportes de un usuario
const getReportesByUsuario = (req, res) => {
    const { usuarioId } = req.params;
    
    const reportesUsuario = reportes.filter(r => r.usuarioId === usuarioId);
    
    res.status(200).json({
        usuarioId,
        totalReportes: reportesUsuario.length,
        reportes: reportesUsuario
    });
};


// DELETE /reportes/:id
const deleteReporte = (req, res) => {
    const { id } = req.params;
    const index = reportes.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    const deletedReporte = reportes.splice(index, 1);
    res.status(200).json({ 
        message: 'Reporte eliminado',
        deleted: deletedReporte[0].id 
    });
};

module.exports = {
    getReportes,
    getReporteById,
    generarReporte,
    getReportesByUsuario,
    deleteReporte
};