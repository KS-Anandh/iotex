import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import cross from '../../assets/cross.png'
import more from '../../assets/menu.png'
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../globalContext/ContextData';
const NavBar = () => {
  const nav=useNavigate()
  const [navBar,setNavBar]=useState(true);
  const buttonPressed=()=>{
    setNavBar((prev)=>!prev)
  }
  const {navState,setNavState}=useContext(GlobalContext);

  return (
    <>
    <div className='navBar' >
       <div style={{display:"flex",alignItems:"center",justifyContent:"space-around",columnGap:"30px",height:"120px"}}>
       <img src={logo} alt="" width={80} height={80} />
       <h3 style={{color:"rgb(204, 3, 93)",fontSize:"25px"}}><span style={{color:"rgb(44, 6, 50)"}}>IOT</span>EXT</h3>
       </div>
       <input id="checkBox" onChange={e=> setNavBar(e.target.checked)} defaultChecked={true} type='checkBox' style={{display:"none"}}/>
     {navBar && !navState==1?<label htmlFor='checkBox'><img src={more}  width={30} height={30}/></label> :navBar==1?"":< label htmlFor='checkBox'><img src={cross} width={30} height={30}/></label>}  
    </div>
    {
      navState==1?"":
      (
        <div className='sideNav' style={{right:navBar?"":"0px"}}>
      <ul>
        <button onClick={buttonPressed} style={{backgroundColor:"inherit",border:"none",color:"white",fontSize:"18px"}}>Documentation</button>
        <Link to="/projects"><button onClick={buttonPressed} style={{backgroundColor:"inherit",border:"none",color:"white",fontSize:"18px"}} >Projects</button></Link>
       <button onClick={()=>{
        localStorage.removeItem("token");
        setNavBar((prev)=>!prev)
        nav("/")
       }} style={{backgroundColor:"inherit",border:"none",color:"white",fontSize:"18px"}}>Logout</button>
      </ul>
    </div>
      )
    }
    
    </>
  )
}

export default NavBar
