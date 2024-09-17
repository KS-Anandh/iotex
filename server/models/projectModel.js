import mongoose from "mongoose";

const projectShema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:false
        },
        devices:{
            type:[String],
            required:false
        }
    }
)
const projectModel=mongoose.model('projects',projectShema);
export default projectModel;
