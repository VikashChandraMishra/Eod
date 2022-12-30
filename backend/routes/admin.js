const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Report = require('../models/Report')


router.post('/registration', async (req, res) => {
    try {

        let {
            username,
            password,
            name,
            empID,
            gender,
            mobile,
            email,
            designation,
            reportingManager
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username: username }, { empID: empID }, { mobile: mobile }, { email: email }]
        });


        if (existingUser) {

            return res.json({
                "success": false,
                "message": "user already exists"
            });

        } else {

            if (designation == "reporting manager" && reportingManager != 0)
                return res.json({
                    "success": false,
                    "message": "Reporting Manager cannot have a reporting manager"
                });

            else if (designation == "reporting manager" && reportingManager == 0) {
                
                reportingManager = null;
            
            } else {
                
                reportingManager = await User.findOne({ "empID": reportingManager });

                if (reportingManager) {

                    if (reportingManager.designation == "employee")
                        return res.json({
                            "success": false,
                            "message": "An employee cannot be a Reporting Manager"
                        });
                    else {

                        reportingManager = reportingManager.name;

                    }

                } else return res.json({
                    "success": false,
                    "message": "Reporting Manager with the given username does not exist"
                });

            }


            await User.create({
                username: username,
                password: password,
                name: name,
                empID: empID,
                gender: gender,
                mobile: mobile,
                email: email,
                designation: designation,
                reportingManager: reportingManager
            });

        }

        return res.json({
            "success": true,
            "message": "user successfully registered"
        });

    } catch (error) {

        console.error(error.message);
        return res.status(500).send("Internal Server Error!");

    }
})



router.get('/fetch-reporting-managers', async (req, res) => {
    try {

        const reportingManagers = await User.find({ "designation": "reporting manager" });

        return res.json({
            "success": true,
            "message": "reporting managers' list successfully fetched",
            "reportingManagers": reportingManagers
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})



module.exports = router;