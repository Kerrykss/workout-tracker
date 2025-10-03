// Estados de memoria (simulación)
let exercises = [
    { 
        id: "1",
        nombre: "Sentadillas",
        descripcion: "Ejercicio para fortalecer piernas y glúteos",
        categoria: "fuerza",
        grupoMuscular: "piernas"
    },
    { 
        id: "2",
        nombre: "Flexiones de pecho",
        descripcion: "Ejercicio para trabajar pectoral y tríceps",
        categoria: "fuerza",
        grupoMuscular: "pecho"
    },
    { 
        id: "3",
        nombre: "Correr",
        descripcion: "Ejercicio cardiovascular de intensidad media-alta",
        categoria: "cardio",
        grupoMuscular: "piernas"
    }
];

// GET /exercises?categoria=fuerza&search=Sentadillas&grupoMuscular=piernas
const getExercises = (req, res) => {
    const { categoria, search, grupoMuscular } = req.query;
    let result = exercises;

    if (categoria) {
        result = result.filter(e => e.categoria === categoria);
    }

    if (grupoMuscular) {
        result = result.filter(e => e.grupoMuscular === grupoMuscular);
    }

    if (search) {
        result = result.filter(e => 
            e.nombre.toLowerCase().includes(search.toLowerCase()) ||
            e.descripcion.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.status(200).json(result);
};
