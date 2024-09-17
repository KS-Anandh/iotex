import React, { useEffect, useState } from 'react'
import LedDevice from './devices/LedDevice'
import MotorDevice from '../componets/devices/MotorDevice'
import MonitorDevice from './devices/MonitorDevice'
import Switch from './devices/Switch'
import servoMotor from './devices/servoMotor'


const Device = ({setDevices,deviceName,deviceId,Alevel,Astatus,category,projectId}) => {

  const [name,setName]=useState(deviceName);
 const [level,setLevel]=useState(Alevel);
 const [status,setStatus]=useState(Astatus);
  return (
    <>
      {category==1?<LedDevice setDevices={setDevices} deviceId={deviceId} projectId={projectId} deviceName={name} Alevel={level} setLevel={setLevel} status={status} setStatus={setStatus}/>:category==2?<MotorDevice projectId={projectId} deviceId={deviceId}setStatus={setStatus} setLevel={setLevel} deviceName={name} Alevel={level} status={status} setDevices={setDevices}/>:category==3?<MonitorDevice projectId={projectId} deviceId={deviceId} setStatus={setStatus} setLevel={setLevel}  deviceName={name} Alevel={level} status={status} setDevices={setDevices}/>:category==4?<Switch projectId={projectId} deviceId={deviceId} setStatus={setStatus} setLevel={setLevel} deviceName={name} level={level}  status={status} setDevices={setDevices}/>:""}
    </>
  )
  
}

export default Device