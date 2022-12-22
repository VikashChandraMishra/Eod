const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const {
    SECRET_KEY,
    ADMIN_USERNAME,
    ADMIN_PASSWORD
} = process.env;



router.post('/login', async (req, res) => {

    try {

        let message;

        const {
            username,
            password
        } = req.body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

            return res.json({
                "success": true,
                "message": "admin verified"
            });

        }

        const existingUser = await User.findOne({ username, password });

        if (!existingUser) {

            return res.status(400).json({
                success: false,
                message: "incorrect credentials"
            });

        } else {

            const authToken = jwt.sign(existingUser.id, SECRET_KEY);

            if (existingUser.designation == "employee")
                message = "employee verified";
            else if (existingUser.designation == "reporting manager")
                message = "reporting manager verified";

            return res.json({
                "success": true,
                "authToken": authToken,
                "message": message
            });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})



module.exports = router;