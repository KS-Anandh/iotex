import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ledOn from "../../assets/project.png";
import { GlobalContext } from "../globalContext/ContextData";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProject = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState(null);
  const [desc, setDesc] = useState(null);

  //axios method to create project and we want update to context data.
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/");
    }
  },[])
  const handler = () => {
   const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:9700/projects/add",
        { name: projectName, description: desc },
        { headers: { token: token } }
      )
      .then((res) => {
        toast.success("New Project Created ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
          setTimeout(()=>{
            navigate("/projects");
          },2000)
      })
  };
  return (
    <div className="newDevice">
      <img
        src={ledOn}
        className="img"
        style={{ margin: "30px", background: "white" }}
      />
      <input
        type="text"
        placeholder="Project Name"
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (Optional)"
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <div style={{ display: "flex", alignItems: "center", columnGap: "20px" }}>
        <button className="login-btn" onClick={handler}>
          Create Project
        </button>
        <Link to="/projects">
          {" "}
          <p style={{ color: "darkblue" }}>{`Projects >>>`}</p>
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

export default AddProject;
