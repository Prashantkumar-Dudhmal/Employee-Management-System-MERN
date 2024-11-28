const mongoose =require('mongoose')
require("dotenv").config({ path: "./.env" });

const mongooseURL = process.env.CONNECTION_STRING;
async function MongoConnect()
{
    try{const a=await mongoose.connect(mongooseURL);
        console.log("db connected");
    }
    catch(e){
    console.log("db connection error ................")}
}

module.exports=MongoConnect;