const express =require("express");
const server=express()
const dotenv=require("dotenv");
dotenv.config()
const port=process.env.port

const connectToDB = require("./config");
const userRouter = require("./routes/user.route");
const auth = require("./middlewares/auth.middleware");


server.use(express.json())
server.use("/user",userRouter)

server.get("/",(req,res)=>{
    res.status(201).send("server started")
})

server.get("/update",auth,(req,res)=>{
    res.status(201).send("server started")
})

server.listen(port,async()=>{
    try {
        await connectToDB()
        console.log(`server running on port ${port} and connected to db`)
    } catch (error) {
        console.log(`error while starting the server ${error}`)
    }
})