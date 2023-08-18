const express = require('express');
const router = express.Router();

const { spGetEvents, spCreateEvent } = require('../db/connection.js');


router.get('/getEvents', async (req, res) => {
    try {
        const pets = await spGetEvents();
        res.json(pets);
    } catch (error) {
        console.log(error);
    }
});



router.post('/creaetEvent', async (req, res) => {
    // Get data from request
    const { id_mascota, event, date, description } = req.body;
    
    try {
        if (await spCreateEvent(id_mascota, event, date, description)) {
            res.json({success: true, message:'Evento registrado correctamente!'});
        } else {
            res.json({success: false, message:'Ha ocurrido un error registrando el Evento.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
});




module.exports = router;