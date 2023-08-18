const express = require('express');
const router = express.Router();

const { spLogin } = require('../db/connection.js');

router.post('/login', async (req, res) => {
    // Get data from form.
    const { email, password } = req.body;
    
    try {
        const info = await spLogin(email, password);

        if (info.success) {
            res.json({success: true, message:'Se ha iniciado sesión correctamente!', userInfo: info.userInfo});
        } else {
            res.json({success: false, message:'Credenciales inválidas.'});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:'Ha ocurrido un error en el servidor.'});
    }
});

module.exports = router;