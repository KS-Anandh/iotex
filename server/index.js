import express from 'express'
import mongoose from 'mongoose';
import cors from'cors'
import user from './routes/userRoute.js';
import project from './routes/projectRoute.js';
import device from './routes/deviceRoute.js';
const app=express();
app.use(express.json())
app.use(cors())
app.use("/users",user)
app.use('/projects',project)
app.use('/device',device)
app
app.get("/",(req,res)=>{
    res.send("IOTEX Is Running...")
})
//mongodb://localhost:27017/iotex
mongoose.connect("mongodb+srv://anandh:Nandha1432@cluster0.rusij.mongodb.net/iotex?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(9700,()=>{
        console.log("API Running in Port :9700")   
    })
    console.log("DataBase Connected Sucsessfully")
})
.catch((err)=>{
    console.log(err)
})