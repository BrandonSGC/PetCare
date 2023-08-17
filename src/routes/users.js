const express = require('express');
const router = express.Router();

const { spCreateUser } = require('../db/connection.js');

router.post('/registerUser', async (req, res) => {
    // Get data from form.
    const { name, surnames, email, password } = req.body;
    console.log(name, surnames, email, password);
    try {
        if (await spCreateUser(name, surnames, email, password)) {
            res.json({success: true, message:'Usuario registrado correctamente!'});
        } else {
            res.json({success: false, message:'Ha ocurrido un error registrando el usuario.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
});

module.exports = router;
