const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    designation : {
        type: String,
        required: true
    },

    reportingManager: {
        type: String,
    }

})

module.exports = mongoose.model('user', userSchema);