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