require("dotenv").config();
const connectToMongo = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express');
const schedule = require('node-schedule');
const User = require("./models/User.js");
const app = express();
const port = 5000;

connectToMongo();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/admin', require('./routes/admin.js'));
app.use('/api/manager', require('./routes/manager.js'));
app.use('/api/employee', require('./routes/employee.js'));
app.use('/api/common', require('./routes/reusable.js'));


schedule.scheduleJob('59 4 0 * * *', async () => {

    const users = await User.find();

    for (let i = 0; i < users.length; i++) {

        users[i].currentSubmission = "not done";
        await users[i].save();

    }

});


app.listen(port, () => {
    console.log(`API listening on port ${port}`);
}); 