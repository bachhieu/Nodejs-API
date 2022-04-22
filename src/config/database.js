const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
    try{
        await mongoose.connect('mongodb://localhost/my_database');
        console.log('successful!!!!')
    }
    catch(err){
        console.log('fail!!!')
    }
}
module.exports = {connect};

