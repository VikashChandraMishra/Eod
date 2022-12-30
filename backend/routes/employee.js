const express = require('express');
const fetchUser = require('../middlewares/fetchUser');
const User = require('../models/User');
const router = express.Router();



router.get('/fetch-profile', fetchUser, async (req, res) => {

    try {
        
        const user = await User.findById(req.id);

        if (!user) {

            return res.json({
                success: false,
                message: "user does not exist"
            });

        }

        return res.status(200).json({
            success: true,
            message: "user profile retrieved",
            user: user
        });

    } catch (error) {

        console.log(error);
        return res.status(500).send("Internal Server Error!");

    }

})


module.exports = router;