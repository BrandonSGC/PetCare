const express = require('express');
const router = express.Router();

const { spCreatePet, spGetPetsByUserId } = require('../db/connection.js');

router.post('/registerPet', async (req, res) => {
    // Get data from request
    const { id_dueno, name, kind, fechaNacimiento } = req.body;
    
    try {
        if (await spCreatePet(parseInt(id_dueno), name, kind, fechaNacimiento)) {
            res.json({success: true, message:'Mascota registrada correctamente!'});
        } else {
            res.json({success: false, message:'Ha ocurrido un error registrando la Mascota.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
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