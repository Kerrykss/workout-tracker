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


// GET /exercises/:id
const getExerciseById = (req, res) => {
    const { id } = req.params;
    const exercise = exercises.find(e => e.id === id);

    if (!exercise) {
        return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.status(200).json(exercise);
};
// POST /exercises
const createExercise = (req, res) => {
    const { nombre, descripcion, categoria, grupoMuscular } = req.body;

    if (!nombre || !descripcion || !categoria || !grupoMuscular) {
        return res.status(400).json({ 
            error: 'Nombre, descripción, categoría y grupo muscular son requeridos' 
        });
    }

    // Validar categorías permitidas
    const categoriasPermitidas = ['cardio', 'fuerza', 'flexibilidad'];
    if (!categoriasPermitidas.includes(categoria)) {
        return res.status(400).json({ 
            error: 'Categoría no válida. Use: cardio, fuerza o flexibilidad' 
        });
    }

    const newExercise = {
        id: `${Date.now()}`,
        nombre,
        descripcion,
        categoria,
        grupoMuscular
    };

    exercises.push(newExercise);
    res.status(201).json(newExercise);
};
// PUT /exercises/:id
const updateExercise = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, grupoMuscular } = req.body;

    const index = exercises.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    if (!nombre || !descripcion || !categoria || !grupoMuscular) {
        return res.status(400).json({ 
            error: 'Nombre, descripción, categoría y grupo muscular son requeridos' 
        });
    }

    // Validar categorías permitidas
    const categoriasPermitidas = ['cardio', 'fuerza', 'flexibilidad'];
    if (!categoriasPermitidas.includes(categoria)) {
        return res.status(400).json({ 
            error: 'Categoría no válida. Use: cardio, fuerza o flexibilidad' 
        });
    }

    exercises[index] = {
        ...exercises[index],
        nombre,
        descripcion,
        categoria,
        grupoMuscular
    };

    res.status(200).json(exercises[index]);
};

// DELETE /exercises/:id
const deleteExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    const deletedExercise = exercises.splice(index, 1);
    res.status(200).json({ deleted: deletedExercise[0].id });
};

module.exports = {
    getExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    deleteExercise
};