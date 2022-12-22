const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    user: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    task: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },

    
});

module.exports = mongoose.model('report', reportSchema);