// Estados de memoria (simulación)
let plans = [
    { 
        id: "1",
        usuarioId: "1",
        nombre: "Rutina fuerza nivel 1",
        objetivo: "hipertrofia",
        duracionSemanas: 8,
        secciones: ["1", "2"]
    },
    { 
        id: "2",
        usuarioId: "1", 
        nombre: "Plan cardio para principiantes",
        objetivo: "resistencia",
        duracionSemanas: 4,
        secciones: ["3"]
    }
];

// GET /plans?usuarioId=1&objetivo=hipertrofia&search=fuerza
const getPlans = (req, res) => {
    const { usuarioId, objetivo, search } = req.query;
    let result = plans;

    if (usuarioId) {
        result = result.filter(p => p.usuarioId === usuarioId);
    }

    if (objetivo) {
        result = result.filter(p => p.objetivo === objetivo);
    }

    if (search) {
        result = result.filter(p => 
            p.nombre.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.status(200).json(result);
};

// GET /plans/:id
const getPlanById = (req, res) => {
    const { id } = req.params;
    const plan = plans.find(p => p.id === id);

    if (!plan) {
        return res.status(404).json({ message: 'Plan de entrenamiento no encontrado' });
    }
    res.status(200).json(plan);
};