// Estados de memoria (simulación)
let entrenamientos = [
    { 
        id: "1",
        seccionId: "1",
        fechaRealizada: "2024-01-20T08:30:00Z",
        notas: "Buen entrenamiento, me sentí fuerte hoy",
        ejerciciosRealizados: [
            {
                ejercicioId: "1",
                seriesCompletadas: 4,
                repeticionesCompletadas: [12, 12, 10, 10],
                pesoUsado: [70, 70, 75, 75],
                notas: "Últimas series más pesadas"
            },
            {
                ejercicioId: "3",
                seriesCompletadas: 3,
                repeticionesCompletadas: [15, 15, 12],
                pesoUsado: [0, 0, 0],
                notas: "Mantener buena forma"
            }
        ]
    },
    { 
        id: "2",
        seccionId: "2",
        fechaRealizada: "2024-01-22T09:00:00Z",
        notas: "Entrenamiento corto pero intenso",
        ejerciciosRealizados: [
            {
                ejercicioId: "2",
                seriesCompletadas: 4,
                repeticionesCompletadas: [10, 10, 8, 8],
                pesoUsado: [0, 0, 0, 0],
                notas: ""
            }
        ]
    }
];

// GET /entrenamientos?seccionId=1&fecha=2024-01-20
const getEntrenamientos = (req, res) => {
    const { seccionId, fecha } = req.query;
    let result = entrenamientos;

    if (seccionId) {
        result = result.filter(e => e.seccionId === seccionId);
    }

    if (fecha) {
        result = result.filter(e => e.fechaRealizada.startsWith(fecha));
    }

    res.status(200).json(result);
};

// GET /entrenamientos/:id
const getEntrenamientoById = (req, res) => {
    const { id } = req.params;
    const entrenamiento = entrenamientos.find(e => e.id === id);

    if (!entrenamiento) {
        return res.status(404).json({ message: 'Entrenamiento no encontrado' });
    }
    res.status(200).json(entrenamiento);
};

// POST /entrenamientos
const createEntrenamiento = (req, res) => {
    const { seccionId, fechaRealizada, notas, ejerciciosRealizados } = req.body;

    if (!seccionId || !fechaRealizada) {
        return res.status(400).json({ 
            error: 'seccionId y fechaRealizada son requeridos' 
        });
    }

    // Validar estructura de ejercicios realizados
    if (ejerciciosRealizados && Array.isArray(ejerciciosRealizados)) {
        for (let ejercicio of ejerciciosRealizados) {
            if (!ejercicio.ejercicioId || !ejercicio.seriesCompletadas) {
                return res.status(400).json({ 
                    error: 'Cada ejercicio debe tener ejercicioId y seriesCompletadas'
                });
            }
            
            // Validar arrays de repeticiones y pesos
            if (ejercicio.repeticionesCompletadas && !Array.isArray(ejercicio.repeticionesCompletadas)) {
                return res.status(400).json({ 
                    error: 'repeticionesCompletadas debe ser un array'
                });
            }
            
            if (ejercicio.pesoUsado && !Array.isArray(ejercicio.pesoUsado)) {
                return res.status(400).json({ 
                    error: 'pesoUsado debe ser un array'
                });
            }
        }
    }

    const newEntrenamiento = {
        id: `${Date.now()}`,
        seccionId,
        fechaRealizada,
        notas: notas || "",
        ejerciciosRealizados: ejerciciosRealizados || []
    };

    entrenamientos.push(newEntrenamiento);
    res.status(201).json(newEntrenamiento);
};
