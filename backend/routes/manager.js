const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Report = require('../models/Report.js');
const fetchUser = require('../middlewares/fetchUser.js');



router.get('/approve-eod/:id', fetchUser, async (req, res) => {

    try {

        const userId = req.id;
        const eodId = req.params.id;
        
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.json({
                "success": false,
                "message": "user does not exist"
            });

        } else if (existingUser.designation == "employee") {

            return res.json({
                "success": false,
                "message": "action unauthorized"
            });

        } else if (existingUser.designation == "reporting manager") {

            const eod = await Report.findById(eodId);
            
            if(!eod) {

                return res.json({
                    "success": false,
                    "message": "eod does not exist"
                });

            } else {

                eod.status = "approved";
                await eod.save();

                return res.json({
                    "success": true,
                    "message": "EOD approved successfully"
                });

            }

        }

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Internal Server Error!");

    }

})



router.get('/reject-eod/:id', fetchUser, async (req, res) => {

    try {

        const userId = req.id;
        const eodId = req.params.id;
        
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.json({
                "success": false,
                "message": "user does not exist"
            });

        } else if (existingUser.designation == "employee") {

            return res.json({
                "success": false,
                "message": "action unauthorized"
            });

        } else if (existingUser.designation == "reporting manager") {

            const eod = await Report.findById(eodId);
            
            if(!eod) {

                return res.json({
                    "success": false,
                    "message": "eod does not exist"
                });

            } else {

                eod.status = "rejected";
                await eod.save();

                return res.json({
                    "success": true,
                    "message": "EOD rejected successfully"
                });

            }

        }

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Internal Server Error!");

    }

})



router.get('/fetch-eods', fetchUser, async (req, res) => {
    try {

        const manager = await User.findById(req.id);
        const employees = await User.find({"reportingManager": manager.name});

        let total = [];
        let eods = [];

        for (let i = 0; i < employees.length; i++) {

            eods = await Report.find({"empID": employees[i].empID});

            for (let i = 0; i < eods.length; i++) {
                total.push(eods[i]);
            }

        }

        return res.json({
            "success": true,
            "message": "eods' list successfully fetched",
            "eods": total,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})



module.exports = router;