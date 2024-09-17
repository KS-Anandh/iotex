import React, { useEffect, useState } from "react";
import ledOff from '../../../assets/led-off.png'
import OffSwitch from '../../../assets/switch_1.png'
import bin from '../../../assets/bin.png'
import OnSwitch from '../../../assets/power_button.png'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Switch = ({deviceName,Astatus,deviceId,projectId,setDevices}) => {
    const [status,setStatus]=useState(Astatus);
    useEffect(()=>{
      axios.put(`https://iotex-ajgn.vercel.app/device/update/${deviceId}`,{deviceStatus:status})
      .then((res)=>{
        console.log("updated")
      })
      .catch((err)=>{
        console.log("error");
      })
  },[status])

  const deleteHandler=()=>{
    if(confirm("You want to delete Device")){
      try{
        axios.delete(`https://iotex-ajgn.vercel.app/device/delete/${projectId}/${deviceId}`)
        .then((res)=>{
          toast.success("Deletion Success", {
            position: "top-right",
            autoClose:2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
            });
          setDevices((prev)=>{
            return prev.filter(item=>item._id!=deviceId)
          })
        })
        .catch((err)=>{alert(err)})}
      catch{ console.log("Error")   }   
    }
    else{
      toast.info("Deletion Cancelled", {
        position: "top-right",
        autoClose:2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });
    }
  }
  const copy=()=>{
    navigator.clipboard.writeText(deviceId).then(()=>{
      toast.success("Device Id Copied", {
        position: "top-right",
        autoClose:1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });
    })
    .catch(err=>{
      console.log("error");
    })

  }
  return (
  <div className="device" style={{background:status?"lightblue":"black",color:status?"black":"white",height:"300px",justifyContent:"flex-start"}}>
    <div style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"15px"}}>
    <p id="copy" onClick={copy} style={{cursor:"pointer",border:"2px solid grey",display:"flex",alignItems:"center",justifyContent:"center",width:"90px",height:"30px",borderRadius:"10px"}}>Copy Key</p>
    <img src={bin} onClick={deleteHandler}  style={{width:"25px",height:"25px"}} />
    </div>
     <div className="deviceInfo">
         <h4>{deviceName}</h4>
     </div>
     {status?<img src={OnSwitch} className="img"  />:<img src={OffSwitch} className="img" />}
    <button style={{background:status?"black":"white",color:status?"white":"black",margin:"20px"}} onClick={()=>setStatus((prev)=>!prev)} className="device-btn">{status?"OFF":"ON"}  </button>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </div>
  );
};

export default Switch;
