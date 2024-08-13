const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config()

const url=process.env.MONGO_URL


const connectToDB=async()=>{
try {
   await mongoose.connect(url);
    console.log("connected to DB")
} catch (error) {
    console.log(`error while starting the server ${error}`)
}
}

module.exports=connectToDB