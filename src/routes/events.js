const express = require('express');
const router = express.Router();

const { spGetEvents } = require('../db/connection.js');



router.get('/getEvents', async (req, res) => {
    try {
        const pets = await spGetEvents();
        res.json(pets);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;