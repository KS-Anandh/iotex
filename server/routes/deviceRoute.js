import express, { Router } from 'express'
import deviceModel from '../models/deviceModel.js';
import projectModel from '../models/projectModel.js';

const device=express.Router();

device.post("/add/:id",async(req,res)=>{
    const projectId=req.params.id
    const {deviceName,deviceCategory}=req.body;
    try{
        const device= new deviceModel({deviceName,deviceCategory,deviceStatus:false,deviceLevel:0});
        const status=await device.save();
        if(!status){
            res.status(500).json("Enter data Properly");
        }
        const project = await projectModel.updateOne({_id:projectId},{$push:{devices:device._id}});
        if(!project){
            res.status(500).json("Device is not created");
        }
        res.status(200).json("added");
    }
    catch(err){
        res.status(500).json(err.message);
    }
})
device.delete("/delete/:projectId/:deviveId",async(req,res)=>{
    const {projectId,deviveId}=req.params;
    try{
        const device=await deviceModel.deleteOne({_id:deviveId});
        if(device){
        const project =await projectModel.updateOne({_id:projectId},{$pull:{devices:deviveId}});
        if(project){
            return  res.status(200).json("Device is removed");
        }
        else{return res.status(500).json("Server error");}
        }
        return res.status(500).json("Server error");
    }
    catch(err){
        res.status(500).json("server error")
    }
})
device.put('/update/:id',async(req,res)=>{
    const deviceId=req.params.id;
    try{
        const update=await deviceModel.updateOne({_id:deviceId},req.body);
        if(!update){
            res.status(500).json("server error");
        }
        res.status(200).json("updated successfully");
    }
    catch(err){

    }
})
device.post("/getAll",async(req,res)=>{
     const {list}=req.body;
     try{
        const data=await deviceModel.find({_id:{$in:list}})
        // if(!data){return res.status(500).json("server -- Error");}
        return res.status(200).json(data);
     }
     catch(err){
        return res.status(500).json(err.message)
     }
})

device.get("/device/:id",async(req,res)=>{
    const {id} =req.params;
    try{
        const data=await deviceModel.findOne({_id:id})
        if(!data){
            return res.status(500).json("Server error")
        }
        return res.status(200).json(data)
    }
    catch{
        return res.status(500).json("Server error")
    }
})
device.get("/range/:id",async(req,res)=>{
    const {id} =req.params;
    try{
        const data=await deviceModel.findOne({_id:id})
        if(!data){
            return res.status(500).json("Server error")
        }
        if(data.deviceStatus){
            return res.status(200).json(data.deviceLevel)
        }
        return res.status(200).json(0);
    }
    catch{
        return res.status(500).json("Server error")
    }
})
device.get("/status/:id",async(req,res)=>{
    const {id} =req.params;
    try{
        const data=await deviceModel.findOne({_id:id})
        if(!data){
            return res.status(500).json("Server error")
        }
        return res.status(200).json(data.deviceStatus)
    }
    catch{
        return res.status(500).json("Server error")
    }
})
device.put('/range/:id/:value',async(req,res)=>{
    const deviceId=req.params.id;
    const deviceRange=req.params.value;
    try{
        const update=await deviceModel.updateOne({_id:deviceId},{deviceLevel:deviceRange});
        if(!update){
            res.status(500).json("server error");
        }
        res.status(200).json("updated successfully");
    }
    catch(err){

    }
})

export default device;
