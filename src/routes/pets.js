const express = require('express');
const router = express.Router();

const { spCreatePet, spGetPetsByUserId } = require('../db/connection.js');
const { rootCertificates } = require('tls');

router.post('/registerPet', async (req, res) => {
    const { name, animal, fechaNacimiento } = req.body;
    console.log(name, animal, fechaNacimiento);
});

router.get('/getPets', async (req, res) => {
    // validate login...

    // Then we have to get the userId or the user information...

    // Finally we get the pets information from the user registered
    try {
        const pets = await spGetPetsByUserId(1);
        res.json(pets);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;