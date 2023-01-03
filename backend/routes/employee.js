const express = require('express');
const fetchUser = require('../middlewares/fetchUser');
const Report = require('../models/Report');
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



router.get('/fetch-submission-status', fetchUser, async (req, res) => {

    try {
        var approved = 0;
        var rejected = 0;

        const user = await User.findById(req.id);

        if (!user) {

            return res.json({
                success: false,
                message: "user does not exist"
            });

        } else if (user.designation != "employee") {

            return res.json({
                success: false,
                message: "unauthorized action"
            });

        }

        eods = await Report.find({ "empID": user.empID });

        for (let i = 0; i < eods.length; i++) {

            if (eods[i].status == "approved") approved += 1;
            else if (eods[i].status == "rejected") rejected += 1;

        }

        const approvedPercentage = (approved * 100) / eods.length;
        const rejectedPercentage = (rejected * 100) / eods.length;

        return res.json({
            success: true,
            message: "status data fetched",
            data: { approvedPercentage: approvedPercentage, rejectedPercentage: rejectedPercentage }
        });

    } catch (error) {

        console.log(error);
        return res.status(500).send("Internal Server Error");

    }

})

module.exports = router;