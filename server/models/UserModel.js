import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        userMail:{
            type:String,
            required:true
        },
        userPass:{
            type:String,
            required:true
        },
        userProjects:{
            type:[String],
            required:false
        }
    }
)

const userModel=mongoose.model('users',userSchema);
export default userModel;