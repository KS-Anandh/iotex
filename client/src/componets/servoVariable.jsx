import React, { useState } from 'react'

const servoVariable = ({level,setLevel}) => {
  return (
    <div className='variable'>
        <button onClick={()=>{
            setLevel((prev)=>{
                if(prev<=0){
                    return 270;
                }
                return prev-45
            })
        }}> - </button>
        <h2>{level}</h2>
        <button onClick={()=>{
            setLevel((prev)=>{
                if(prev>=270){
                    return 0;
                }
                return prev+45
            })
        }}> + </button>
    </div>
  )
}

export default servoVariable