const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('successful!!!!')
    }
    catch(err){
        console.log('fail!!!')
    }
}
module.exports = {connect};

