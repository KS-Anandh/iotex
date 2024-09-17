import React, { useEffect, useState } from "react";
import ledOff from '../../../assets/led-off.png'
import ledOn from '../../../assets/led-on.png'
import bin from '../../../assets/bin.png'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LedDevice = ({setDevices,deviceName,deviceId,Alevel,Astatus,projectId}) => {
  const [level,setLevel]=useState(Alevel);
    const [status,setStatus]=useState(Astatus);
    useEffect(()=>{
        axios.put(`https://iotex-ajgn.vercel.app/device/update/${deviceId}`,{deviceStatus:status,deviceLevel:level})
        .then((res)=>{
          console.log("updated")
        })
        .catch((err)=>{
          alert("error");
        })
    },[status,level])
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
          .catch((err)=>{
            console.log(err)
          })
        }
        catch{
          alert("Error")
        }   
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
  <div className="device" style={{background:status?"lightblue":"black",color:status?"black":"white",padding:"10px",height:"300px",justifyContent:"flex-start"}}>
    <div style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"5px"}}>
    <p id="copy" onClick={copy} style={{cursor:"pointer",border:"2px solid grey",display:"flex",alignItems:"center",justifyContent:"center",width:"90px",height:"30px",borderRadius:"10px"}}>Copy Key</p>
    <img src={bin} onClick={deleteHandler}  style={{width:"25px",height:"25px"}} />
    </div>
    <div style={{display:"flex",justifyContent:"flex-start",width:"100%",padding:"5px"}}>
   
    </div>
     <div className="deviceInfo">
         <h4 style={{margin:"0px 10px 5px 10px" }}>{deviceName.toUpperCase()}</h4>
     </div>
     {status?<img src={ledOn} className="img" width={100} />:<img src={ledOff} className="img" />}
     {/* {status? <Variable level={level} setLevel={setLevel} />:<h4 style={{margin:"10px"}}>DEVICE IS OFF</h4>} */}
     {status?<div style={{display:"flex",alignItems:"center",columnGap:"10px"}}><input type="range" defaultValue={level*20} onChange={(e)=>{
      setLevel(parseInt(e.target.value/20));
     }}style={{margin:"15px 0px",width:"200px"}} /><h3>{level*20}%</h3></div>:""}
    
    <button style={{background:status?"black":"white",color:status?"white":"black",margin:"10px"}} onClick={()=>setStatus((prev)=>!prev)} className="device-btn">{status?"OFF":"ON"}  </button>
    <ToastContainer
position="top-right"
autoClose={2000}
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

export default LedDevice;
