import express from 'express'
import userModel from '../models/UserModel.js';
import projectModel from '../models/projectModel.js';
import auth from '../middlewares/auth.js';
import deviceModel from '../models/deviceModel.js';
const project=express.Router();
project.get('/id',auth,async(req,res)=>{
    const user=req.body.user;
    try{
        const projects=await userModel.findOne({_id:user.id})
        if(!projects){
            return res.status(500).json("something went wrong") 
        }
        const data=await projectModel.find({_id:{$in:projects.userProjects}})
        return res.status(200).json(data)
    }
    catch(er){
        res.status(500).json("Server Error");
    }
})
project.post("/add",auth,async(req,res)=>{
    const {name,description,user}=req.body
    try{
       const project=await new projectModel({name,description})
       const status= await project.save();
       if(!status){
        return res.status(500).json("Something went Wrong")
       }
       const users=await userModel.updateOne({_id:user.id},{$push:{userProjects:project._id}})
       return res.status(200).json(project)
    }
    catch(err){
        res.status(500).json("server error")
    }
})
project.delete("/delete/:projectId",auth,async(req,res)=>{
    const {projectId}=req.params;
    const user=req.body.user;
    try{
       const remove=await userModel.updateOne({_id:user.id},{$pull:{userProjects:projectId}})
       if(remove){
        const remove=await projectModel.deleteOne({_id:projectId})
        if(!remove){
           return res.status(500).json("server error")
        }
        return res.status(200).json("Project Removed")
       }
       return res.status(500).json("server error")
       
    }
    catch(err){
        res.status(500).json("server error")
    }
})
project.get("/project/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await projectModel.findOne({_id:id});
        if(!user){return res.status(500).json("Error");}
        const devices=await deviceModel.find({_id:{$in:user.devices}})
        return res.status(200).json(devices);
    }
    catch(err){ res.status(500).json("server error")}  
})

export default project;