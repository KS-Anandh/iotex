import express from 'express'
import userModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken'
import auth from '../middlewares/auth.js';
import deviceModel from '../models/deviceModel.js';
import projectModel from '../models/projectModel.js';
const user=express.Router();

user.post('/register',async(req,res)=>{
    const {userName,userMail,userPass}=req.body;
    try{
      const verify=await userModel.findOne({userMail});
      if(verify){
       return res.status(202).json("User is Already Existed ")
      }
      const user= await new userModel({userName,userMail,userPass})
      const save= await user.save();
      if(!save){
       return res.status(500).json("Somthing went Wrong")
      }
      return res.status(200).json(user);
    }
    catch(err){
        res.status(500).json("server error");
    }
})

user.post('/login',async(req,res)=>{
    const {userMail,userPass}=req.body;
    try{
      const user= await userModel.findOne({userMail,userPass});
      if(!user){ return res.status(500).json("Invalid Mail and Password");}
      const payload={
        id:user._id,
        userName:user.userName,
        userMail:user.userMail
      }
      const token= jwt.sign(payload,"eciotex")
      return res.status(200).json(token);
    }
    catch(err){ res.status(500).json("server error from login"); }
})
user.get("/verify", auth, (req, res) => {
  res.status(200).json(req.body.user);
});
user.put('/forget',async(req,res)=>{
    const {userMail,newPass}=req.body;
    try{
      const actual=await userModel.findOne({userMail});
      const user= await userModel.findByIdAndUpdate(actual._id,{userPass:newPass});
      if(!user){  return res.status(500).json("Invalid Mail and Password"); }
      return res.status(200).json(user);
    }
    catch(err){ res.status(500).json("server error");}
})
user.get("/id/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await userModel.findOne({_id:id});
        if(!user){ return res.status(500).json("Error");  }
           return res.status(200).json(user);
    }
    catch(err){res.status(500).json("server error") }  
})

user.get("/",async(req,res)=>{
    try{
        const users=await userModel.find({});
        if(!users){return res.status(500).json("Error"); }
           return res.status(200).json(users);
    }
    catch(err){
        res.status(500).json("server error")
    }
    
})
user.post("/gmail", async (req, res) => {
  const { userName, userMail } = req.body;
  try {
    const user = await userModel.findOne({ userMail });
    if (!user) {
      const user = await new userModel({
        userName,
        userMail,
        userPass: "gmail",
      });
      const save = await user.save();
      if (!save) {
        return res.status(500).json("Somthing went Wrong");
      } else {
        const payload = {
          id: user._id,
          userName: user.userName,
          userMail: user.userMail,
        };
        const token = jwt.sign(payload, "eciotex");
        return res.status(200).json(token);
      }
    } else {
      const payload = {
        id: user._id,
        userName: user.userName,
        userMail: user.userMail,
      };
      const token = jwt.sign(payload, "eciotex");
      return res.status(200).json(token);
    }
  } catch (err) {
    res.status(500).json("server error");
  }
});
export default user;
