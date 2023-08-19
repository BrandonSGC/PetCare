const express = require('express');
const router = express.Router();

const { spGetEvents, spCreateEvent, spGetEventsByPet, spDeleteEventById } = require('../db/connection.js');

router.post('/createEvent', async (req, res) => {
    // Get data from request
    const { id_mascota, event, date, description } = req.body;

    console.log(id_mascota, event, date, description)
    
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


router.get('/getEvents', async (req, res) => {
    try {
        const events = await spGetEvents();
        res.json(events);
    } catch (error) {
        console.log(error);
    }
});

router.get('/getPetEvents', async (req, res) => {
    // Get data from request
    const { id_mascota } = req.query;
    try {
        const events = await spGetEventsByPet(id_mascota);
        res.json(events);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteEvent', async (req, res) => {
    // Get data from request
    const { id } = req.body;

    console.log(id)
    
    try {
        if (await spDeleteEventById(id)) {
            res.json({success: true, message:'Evento eliminado correctamente!'});
        } else {
            res.json({success: false, message:'Ha ocurrido un error eliminando el Evento.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
});

module.exports = router;