const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Report = require('../models/Report.js');
const fetchUser = require('../middlewares/fetchUser.js');



router.post('/submit-eod', fetchUser, async (req, res) => {

    try {

        const id = req.id;
        const {
            date,
            task
        } = req.body;

        const existingUser = await User.findById(id);

        if (!existingUser) {

            return res.json({
                "success": false,
                "message": "user does not exist"
            });

        } else if (existingUser.designation == "employee") {

            await Report.create({
                empID: existingUser.empID,
                date: date,
                task: task
            });

            return res.json({
                "success": true,
                "message": "report successfully submitted"
            });

        }

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Internal Server Error!");

    }

})



router.get('/get-user-eods', fetchUser, async (req, res) => {
    try {

        const user = await User.findById(req.id);
        const eods = await Report.find({"empID": user.empID});
        
        return res.json({
            "success": true,
            "message": "eods' list successfully fetched",
            "eods": eods,
            "employee": user
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})


module.exports = router;