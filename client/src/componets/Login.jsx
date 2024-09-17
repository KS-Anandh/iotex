import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/login.jpeg'
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { GlobalContext } from '../globalContext/ContextData'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setPage}) => {
  const nav=useNavigate()
const {navState,setNavState}=useContext(GlobalContext);
const [name,setName]=useState(null);
const [pass,setPass]=useState(null);
  useEffect(()=>{
    setNavState(1);
    if(localStorage.getItem("token")){
      nav("/projects");
    }
  },[])
  const loginHandler=async()=>{
    try{
    await axios.post("http://localhost:9700/users/login",{userMail:name.toLowerCase(),userPass:pass})
    .then((res)=>{
      localStorage.setItem("token",res.data);
      toast.success('Login Success', {
        position: "top-center",
        autoClose:3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      setTimeout(()=>{
        nav("/projects")
      },3000)
    })
    .catch((err)=>{
      toast.error("Invalid Credintial", {
        position: "top-center",
        autoClose:3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    })
  }
  catch(err){
    toast.error("Invalid Credintial", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
  }
  }
  return (
    <>
    <div className='login'>
        <img src={logo} alt="" className='loginImg' />
        <input type="text" placeholder='Username' onChange={(e)=>setName(e.target.value)}/>
        <input type="password" placeholder='Password' onChange={(e)=>setPass(e.target.value)}/>
    {/* <Link to="/projects"> */}
    <button className='login-btn' onClick={loginHandler}>Login</button>
    {/* </Link>  */}
      <Link to="/register"> <p style={{color:"darkblue",fontSize:20,margin:"20px 0px"}}>New User ?</p></Link>
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

export default Login