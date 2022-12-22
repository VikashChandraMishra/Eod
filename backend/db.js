const mongoose = require('mongoose');
const {mongoURI} = process.env;

mongoose.set('strictQuery',false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connection successful!');
    })
}

module.exports = connectToMongo;