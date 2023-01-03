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

            if (!eod) {

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

            if (!eod) {

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



router.get('/fetch-all-subordinates-submission-status', fetchUser, async (req, res) => {

    try {
        var employees = [];
        var submitted = 0;
        var notSubmitted = 0;

        const user = await User.findById(req.id);

        if (!user) {

            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (user.designation != "reporting manager") {

            return res.json({
                success: false,
                message: "unauthorized action"
            });

        }

        employees = await User.find({"reportingManager": user.name});

        for (let i = 0; i < employees.length; i++) {

            if (employees[i].currentSubmission == "done") submitted += 1;
            else if (employees[i].currentSubmission == "not done") notSubmitted += 1;

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