import React, { useState } from "react";
import motor from '../../../assets/motor.jpg'
import Variable from "../Variable";
import servoVariable from "../servoVariable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const servoMotor = ({roomName,deviceName,Alevel,Astatus}) => {
    const [level,setLevel]=useState(Alevel);
    const [status,setStatus]=useState(Astatus);
  return (
  <div className="device" style={{background:status?"lightblue":"black",color:status?"black":"white"}}>
     <div className="deviceInfo">
         <h4>{roomName}</h4>
         <h4>{deviceName}</h4>
     </div>
    {status?<img src={motor} width={90} height={90} style={{padding:"10px",background:"white",borderRadius:"15px"}}/>:<img src={motor} width={90} height={90} style={{padding:"10px",background:"white",borderRadius:"15px"}}/>}
export default servoVariable
     {status? <servoVariable level={level} setLevel={setLevel} />:<h4 style={{margin:"10px"}}>DEVICE IS OFF</h4>}
    
    <button style={{background:status?"black":"white",color:status?"white":"black"}} onClick={()=>setStatus((prev)=>!prev)} className="device-btn">{status?"OFF":"ON"}  </button>
  </div>
  );
};

export default servoMotor;
