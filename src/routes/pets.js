const express = require('express');
const router = express.Router();

const { spCreatePet } = require('../db/connection.js');

router.post('/registerPet', async (req, res) => {
    const { name, animal, fechaNacimiento } = req.body;
    console.log(name, animal, fechaNacimiento);

    // try {
    //     if (condition) {
            
    //     } else {
            
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return {success: false, message: ''};
    // }
})

module.exports = router;