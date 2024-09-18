import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import project from "../../../assets/project.png";
import { GlobalContext } from "../../globalContext/ContextData";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { navState, setNavState, data, setData } = useContext(GlobalContext);
  const [category, setCategory] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [wait,setWait]=useState(false);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(!token){
      navigate('/')
    }
  },[])
  const addDeviceHandler = () => {
    setWait(true);
    try {
      axios
        .post(`https://iotex-ajgn.vercel.app/device/add/${id}`, {
          deviceName,
          deviceCategory:category,
        })
        .then((res) => {
          toast.success(res.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setWait(false);
            navigate(`/dash/${id}`);
          }, 2000);
        })
        .catch((err) => {
          setWait(false);
          toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch {
      console.log("error");
    }
  };
  return (
    <div className="newDevice">
      <img
        src={project}
        className="img"
        style={{ margin: "30px", background: "white" }}
      />
      <select
        name=""
        id=""
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value={0}>select category</option>
        <option value={1}>Light</option>
        <option value={3}>Data Monitor</option>
        <option value={2}>Motor</option>
        <option value={4}>Digital Switch</option>
      </select>
      <input
        type="text"
        placeholder="Device Name"
        onChange={(e) => setDeviceName(e.target.value)}
        required
      />
      <div style={{ display: "flex", alignItems: "center", columnGap: "20px" }}>
        {
          !wait?<button className="login-btn" onClick={addDeviceHandler}>Add Device </button>:<button className="login-btn" style={{background:"red",color:"white"}}>Loading... </button>
        }
        <Link to={`/dash/${id}`}>
          {" "}
          <p style={{ color: "darkblue" }}>{`Dashboard - >`}</p>
        </Link>
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
  );
};

export default AddDevice;
