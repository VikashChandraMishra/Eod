const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Report = require('../models/Report');
const fetchUser = require('../middlewares/fetchUser.js');


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
            reportingManager,
            branch
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
                    "message": "Reporting Manager with the given EMP ID does not exist"
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
                reportingManager: reportingManager,
                branch: branch
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




router.get('/fetch-all-submission-status', fetchUser, async (req, res) => {

    try {
        var employees = [];
        var submitted = 0;
        var notSubmitted = 0;

        if (req.id == "admin") {

            employees = await User.find();

            for (let i = 0; i < employees.length; i++) {

                if (employees[i].currentSubmission == "done") submitted += 1;
                else if (employees[i].currentSubmission == "not done") notSubmitted += 1;

            }

        }

        const submittedPercentage = (submitted * 100) / employees.length;
        const notSubmittedPercentage = (notSubmitted * 100) / employees.length;

        return res.json({
            success: true,
            message: "submission data fetched",
            data: { submittedPercentage: submittedPercentage, notSubmittedPercentage: notSubmittedPercentage }
        });

    } catch (error) {

        console.log(error);
        return res.status(500).send("Internal Server Error");

    }

})


module.exports = router;