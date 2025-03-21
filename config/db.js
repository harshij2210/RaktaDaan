const { bgGreen } = require('colors');
const mongoose = require('mongoose');

const connectDB= async() =>{
    try{
await mongoose.connect(process.env.MONGO_URL);
console.log(`connected to db ${mongoose.connection.host}`.bgGreen.white);
    }
    catch(error){
        console.log(`Mongodb Database error ${error}`.bgRed.white);
    }
};

module.exports=connectDB;