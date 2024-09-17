import React,{useEffect, useState} from 'react'
import Device from './Device';
import add from '../../assets/plus.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../globalContext/ContextData';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dash = () => {
  const nav=useNavigate("/")
  const [devices,setDevices]=useState([]);
  const {id}=useParams();
  const {navState,setNavState,data,setData}=useContext(GlobalContext);
  useEffect(()=>{
    setNavState(0);
    const token=localStorage.getItem("token");
    if(!token){
      nav("/");
    }
    axios.get(`http://localhost:9700/projects/project/${id}`)
    .then((res)=>{
      setDevices(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  
  return (
    <>
   <Link to={`/projects`}><button style={{margin:"20px 5px",width:"150px",height:"40px",background:"rgb(105, 229, 200)",fontSize:"18px",border:"none",color:"darkblue",borderRadius:"30px 0px 0px 30px"}}>{'Go to Projects'}</button></Link>
    {devices.length==0?<center style={{margin:'30px 0px'}}>-- NOT DEVICES FOUND YET --</center>:""}
    <div className='dash'>
      {
        devices.map((item,key)=>{
          return(
            <Device setDevices={setDevices} deviceId={item._id} projectId={id} key={key}  category={item.deviceCategory} deviceName={item.deviceName} Astatus={item.deviceStatus} Alevel={item.deviceLevel} />
          )
        })
      }
      <div className='addDevice'>
              <p>Add the Device which are you want to monitor and control</p>
           <Link to={`/add/${id}`}><img src={add} /></Link> 
      </div>
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
    </>
  )
}

export default Dash