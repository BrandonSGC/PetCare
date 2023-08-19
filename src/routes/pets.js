const express = require('express');
const router = express.Router();

const { spCreatePet, spGetPetsByUserId } = require('../db/connection.js');

router.post('/registerPet', async (req, res) => {
    // Get data from request
    const { id_dueno, name, kind, fechaNacimiento, email, message } = req.body;

    
    try {
        if (await spCreatePet(parseInt(id_dueno), name, kind, fechaNacimiento)) {
            res.json({success: true, message:'Mascota registrada correctamente!'});
            sendEmail(email, message)
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


// Funcions
async function sendEmail(destinatario, mensaje) {
    const nodemailer = require('nodemailer');

    // SMPTP Configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'bransti20@gmail.com',
        pass: 'gxpssgblrkvrplsy'
        }
    });

    // Email configuration
    let info = await transporter.sendMail({
        from: 'bransti20@gmail.com',
        to: destinatario,
        subject: 'PetCare - Registro de Mascota',
        text: mensaje
    });

    console.log(`Correo enviado. Key del correo: ${info.messageId}`);
}


module.exports = router;