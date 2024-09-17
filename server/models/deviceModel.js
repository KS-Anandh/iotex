import mongoose from "mongoose";

const deviceSchema=mongoose.Schema(
    {
        deviceName:{
            type:String,
            required:true
        },
        deviceCategory:{
            type:Number,
            required:true
        },
        deviceStatus:{
            type:Boolean,
            required:true
        },
        deviceLevel:{
            type:Number,
            required:false
        },
        deviceData:{
            type:[Number],
            required:false
        }
    }
)
const deviceModel=mongoose.model('devices',deviceSchema);
export default deviceModel;
