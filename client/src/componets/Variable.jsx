import React, { useEffect, useState } from 'react'

const Variable = ({level,setLevel}) => {
  return (
    <div className='variable'>
        <button onClick={()=>{
            setLevel((prev)=>{
                if(prev<=0){
                    return 5;
                }
                return prev-1
            })
        }}> - </button>
        <h2>{level}</h2>
        <button onClick={()=>{
            setLevel((prev)=>{
                if(prev>=5){
                    return 0;
                }
                return prev+1
            })
        }}> + </button>
    </div>
  )
}

export default Variable