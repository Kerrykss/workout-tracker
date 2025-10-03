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

// POST /plans
const createPlan = (req, res) => {
    const { usuarioId, nombre, objetivo, duracionSemanas, secciones } = req.body;

    if (!usuarioId || !nombre || !objetivo || !duracionSemanas) {
        return res.status(400).json({ 
            error: 'usuarioId, nombre, objetivo y duracionSemanas son requeridos' 
        });
    }

    // Validar objetivos permitidos
    const objetivosPermitidos = ['hipertrofia', 'resistencia', 'pérdida de peso', 'mantenimiento', 'definición'];
    if (!objetivosPermitidos.includes(objetivo)) {
        return res.status(400).json({ 
            error: 'Objetivo no válido. Use: hipertrofia, resistencia, pérdida de peso, mantenimiento o definición' 
        });
    }

    const newPlan = {
        id: `${Date.now()}`,
        usuarioId,
        nombre,
        objetivo,
        duracionSemanas: parseInt(duracionSemanas),
        secciones: secciones || []
    };

    plans.push(newPlan);
    res.status(201).json(newPlan);
};

// PUT /plans/:id
const updatePlan = (req, res) => {
    const { id } = req.params;
    const { usuarioId, nombre, objetivo, duracionSemanas, secciones } = req.body;

    const index = plans.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
    }

    if (!usuarioId || !nombre || !objetivo || !duracionSemanas) {
        return res.status(400).json({ 
            error: 'usuarioId, nombre, objetivo y duracionSemanas son requeridos' 
        });
    }

    // Validar objetivos permitidos
    const objetivosPermitidos = ['hipertrofia', 'resistencia', 'pérdida de peso', 'mantenimiento', 'definición'];
    if (!objetivosPermitidos.includes(objetivo)) {
        return res.status(400).json({ 
            error: 'Objetivo no válido. Use: hipertrofia, resistencia, pérdida de peso, mantenimiento o definición' 
        });
    }

    plans[index] = {
        ...plans[index],
        usuarioId,
        nombre,
        objetivo,
        duracionSemanas: parseInt(duracionSemanas),
        secciones: secciones || plans[index].secciones
    };

    res.status(200).json(plans[index]);
};

// DELETE /plans/:id
const deletePlan = (req, res) => {
    const { id } = req.params;
    const index = plans.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Plan de entrenamiento no encontrado' });
    }

    const deletedPlan = plans.splice(index, 1);
    res.status(200).json({ deleted: deletedPlan[0].id });
};

module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};