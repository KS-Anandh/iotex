import React, { useState } from "react";
import bin from "../../../assets/bin.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MonitorDevice = ({
  deviceName,
  Alevel,
  status,
  deviceId,
  projectId,
  setDevices,
}) => {
  const [level, setLevel] = useState(Alevel);
  setInterval(() => {
    axios
      .get(`http://localhost:9700/device/device/${deviceId}`)
      .then((res) => setLevel(res.data.deviceLevel))
      .catch((err) => {
        console.log(err);
      });
  }, 2000);
  const deleteHandler = () => {
    if (confirm("You want to delete Device")) {
      try {
        axios
          .delete(
            `http://localhost:9700/device/delete/${projectId}/${deviceId}`
          )
          .then((res) => {
            toast.success("Deletion success", {
              position: "top-right",
              autoClose:2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
              });
            setDevices((prev) => {
              return prev.filter((item) => item._id != deviceId);
            });
          })
          .catch((err) => {
            alert(err);
          });
      } catch {
        console.log("Error");
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
  };
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
    <div
      className="device"
      style={{
        background: status ? "darkgreen" : "black",
        color: status ? "black" : "white",
        justifyContent: "flex-start",
        height:"300px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "15px",
        }}
      >
        <p id="copy" onClick={copy} style={{cursor:"pointer",border:"2px solid grey",display:"flex",alignItems:"center",justifyContent:"center",width:"90px",height:"30px",borderRadius:"10px"}}>Copy Key</p>
        <img
          src={bin}
          onClick={deleteHandler}
          style={{ width: "25px", height: "25px" }}
        />
      </div>
      <div className="deviceInfo">
        <h4 style={{ color: "white" }}>{deviceName}</h4>
      </div>
      <div className="displayD" style={{color:"white",border:"2px solid lightgrey",width:"300px",borderRadius:"5px",fontSize:"30px"}}>{level}</div>
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

export default MonitorDevice;
