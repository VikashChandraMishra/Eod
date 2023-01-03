const express = require('express');
const fetchUser = require('../middlewares/fetchUser.js');
const Report = require('../models/Report.js');
const router = express.Router();
const User = require('../models/User.js');

const {
    ADMIN_USERNAME,
} = process.env;



router.get('/fetch-employees', fetchUser, async (req, res) => {
    try {

        var employees;

        var employeesByBranch = [];
        var Guwahati = [];
        var Delhi = [];
        var Chennai = [];
        var Mumbai = [];


        if (req.id == ADMIN_USERNAME) {

            employees = await User.find();

        } else {

            const user = await User.findById(req.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "action unauthorized"
                })
            }

            employees = await User.find({ reportingManager: user.name });

        }

        for (let i = 0; i < employees.length; i++) {

            if (employees[i].branch == "Guwahati") {
                Guwahati.push(employees[i].empID + " " + employees[i].name);
            } else if (employees[i].branch == "Delhi") {
                Delhi.push(employees[i].empID + " " + employees[i].name);
            } else if (employees[i].branch == "Chennai") {
                Chennai.push(employees[i].empID + " " + employees[i].name);
            } else if (employees[i].branch == "Mumbai") {
                Mumbai.push(employees[i].empID + " " + employees[i].name);
            }

        }

        let i = 0;

        while (Guwahati[i] || Delhi[i] || Chennai[i] || Mumbai[i]) {

            if (!Guwahati[i]) Guwahati[i] = null;
            if (!Delhi[i]) Delhi[i] = null;
            if (!Chennai[i]) Chennai[i] = null;
            if (!Mumbai[i]) Mumbai[i] = null;

            employeesByBranch.push({
                "Guwahati": Guwahati[i],
                "Delhi": Delhi[i],
                "Chennai": Chennai[i],
                "Mumbai": Mumbai[i]
            });

            i++;
        }


        return res.json({
            "success": true,
            "message": "employees' list successfully fetched",
            "employees": employeesByBranch,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})



router.get('/fetch-eods', async (req, res) => {
    try {

        const eods = await Report.find({ "empID": req.header('empID') });

        return res.json({
            "success": true,
            "message": "eods' list successfully fetched",
            "eods": eods,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})



router.post('/submit-eod', fetchUser, async (req, res) => {

    try {

        const id = req.id;

        const {
            task
        } = req.body;


        const existingUser = await User.findById(id);

        if (!existingUser) {

            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (existingUser.designation == "employee" || existingUser.designation == "reporting manager") {

            if (existingUser.currentSubmission == "not done")
                existingUser.currentSubmission = "done";
            else if (existingUser.currentSubmission == "done") {

                return res.json({
                    success: false,
                    message: "Only one EOD can be submitted per day"
                })

            }

            await existingUser.save();

            await Report.create({
                empID: existingUser.empID,
                task: task
            });

            return res.json({
                success: true,
                message: "eod successfully submitted"
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
        const eods = await Report.find({ "empID": user.empID });

        return res.json({
            "success": true,
            "message": "eods' list successfully fetched",
            "eods": eods,
            "user": user
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})



module.exports = router;