import React, { useEffect, useState } from "react";
import motor from "../../../assets/motor.jpg";
import bin from "../../../assets/bin.png";
import Variable from "../Variable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MotorDevice = ({
  deviceName,
  deviceId,
  Alevel,
  Astatus,
  projectId,
  setDevices,
}) => {
  const [level, setLevel] = useState(Alevel);
  const [status, setStatus] = useState(Astatus);
  useEffect(() => {
    axios
      .put(`https://iotex-ajgn.vercel.app/device/update/${deviceId}`, {
        deviceStatus: status,
        deviceLevel: level,
      })
      .then((res) => {
        console.log("updated from Motor");
      })
      .catch((err) => {
        console.log("error");
      });
  }, [level, status]);
  const deleteHandler = () => {
    if (confirm("You want to delete Device")) {
      try {
        axios
          .delete(
            `https://iotex-ajgn.vercel.app/device/delete/${projectId}/${deviceId}`
          )
          .then((res) => {
            toast.success(res.data, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setDevices((prev) => {
              return prev.filter((item) => item._id != deviceId);
            });
          })
          .catch((err) => {
            console.log(err);
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
        background: status ? "lightblue" : "black",
        color: status ? "black" : "white",
        height: "300px",
        justifyContent:"flex-start"
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
        <h4 style={{ margin: "0px 10px 10px 10px" }}>{deviceName.toUpperCase()}</h4>
      </div>
      {status ? (
        <img
          src={motor}
          width={90}
          height={90}
          style={{ padding: "15px", background: "white", borderRadius: "15px" }}
        />
      ) : (
        <img
          src={motor}
          width={90}
          height={90}
          style={{ padding: "10px", background: "white", borderRadius: "15px" }}
        />
      )}
      {status ? <Variable level={level} setLevel={setLevel} /> : ""}

      <button
        style={{
          background: status ? "black" : "white",
          color: status ? "white" : "black",
          margin: "10px",
        }}
        onClick={() => setStatus((prev) => !prev)}
        className="device-btn"
      >
        {status ? "OFF" : "ON"}{" "}
      </button>
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

export default MotorDevice;
