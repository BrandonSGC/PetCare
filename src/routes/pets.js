const express = require('express');
const router = express.Router();

const { spCreatePet, spGetPetsByUserId } = require('../db/connection.js');

router.post('/registerPet', async (req, res) => {
    // Get data from request
    const { name, animal, fechaNacimiento } = req.body;
    console.log(name, animal, fechaNacimiento);
    
});

router.get('/getPets', async (req, res) => {
    // Get data from request
    const { id_usuario } = req.query;

    try {
        const pets = await spGetPetsByUserId(id_usuario);
        res.json(pets);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;