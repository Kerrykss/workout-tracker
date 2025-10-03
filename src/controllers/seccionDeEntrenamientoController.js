// Estados de memoria (simulación)
let secciones = [
    { 
        id: "1",
        planId: "1",
        fechaProgramada: "2024-01-20T08:00:00Z",
        comentarios: "Día de piernas - intensidad media",
        ejercicios: [
            {
                ejercicioId: "1",
                series: 4,
                repeticiones: 12,
                peso: 70
            },
            {
                ejercicioId: "3", 
                series: 3,
                repeticiones: 15,
                peso: 0
            }
        ]
    },
    { 
        id: "2",
        planId: "1",
        fechaProgramada: "2024-01-22T08:00:00Z",
        comentarios: "Día de upper body",
        ejercicios: [
            {
                ejercicioId: "2",
                series: 4,
                repeticiones: 10,
                peso: 0
            }
        ]
    }
];

// GET /secciones?planId=1&fecha=2024-01-20
const getSecciones = (req, res) => {
    const { planId, fecha } = req.query;
    let result = secciones;

    if (planId) {
        result = result.filter(s => s.planId === planId);
    }

    if (fecha) {
        result = result.filter(s => s.fechaProgramada.startsWith(fecha));
    }

    res.status(200).json(result);
};

// GET /secciones/:id
const getSeccionById = (req, res) => {
    const { id } = req.params;
    const seccion = secciones.find(s => s.id === id);

    if (!seccion) {
        return res.status(404).json({ message: 'Sección de entrenamiento no encontrada' });
    }
    res.status(200).json(seccion);
};

// POST /secciones
const createSeccion = (req, res) => {
    const { planId, fechaProgramada, comentarios, ejercicios } = req.body;

    if (!planId || !fechaProgramada) {
        return res.status(400).json({ 
            error: 'planId y fechaProgramada son requeridos' 
        });
    }

    // Validar estructura de ejercicios si se proporcionan
    if (ejercicios && Array.isArray(ejercicios)) {
        for (let ejercicio of ejercicios) {
            if (!ejercicio.ejercicioId || !ejercicio.series || !ejercicio.repeticiones) {
                return res.status(400).json({ 
                    error: 'Cada ejercicio debe tener ejercicioId, series y repeticiones'
                });
            }
        }
    }

    const newSeccion = {
        id: `${Date.now()}`,
        planId,
        fechaProgramada,
        comentarios: comentarios || "",
        ejercicios: ejercicios || []
    };

    secciones.push(newSeccion);
    res.status(201).json(newSeccion);
};
