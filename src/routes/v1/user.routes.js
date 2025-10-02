const express = require('express');
const router = express.Router();

//Estados de memoria (simulacion)
let users = [
    { 
        id: "1",
        name: "Kerry",
        email: "Kerry@gmail.com",
        role: "user",
        createdAt: "2025-09-12T12:25:00Z"
    }
];


//GET/api/v1/users
router.get('/', (req, res) => {
    res.status(200).json(users);
});

//GET/users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
});

module.exports = router;