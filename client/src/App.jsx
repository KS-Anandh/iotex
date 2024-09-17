import React, { useState, Link } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dash from "./componets/Dash";
import NavBar from "./componets/NavBar";
import Login from "./componets/Login";
import Register from "./componets/Register";
import Project from "./componets/Project";
import AddDevice from "./componets/devices/AddDevice";
import { ContextData } from "./globalContext/ContextData";
import AddProject from "./componets/AddProject";
const App = () => {
  return (
<ContextData>
    <BrowserRouter>
     <NavBar/>
      <Routes>
            <Route index path="/" Component={Login} />
            <Route  path="/register" Component={Register}/>
            <Route  path="/dash/:id" Component={Dash}/>
            <Route  path="/projects" Component={Project}/>
            <Route  path="/add/:id" Component={AddDevice}/>
            <Route  path="/addProject" Component={AddProject}/>
      </Routes>
    </BrowserRouter>
  </ContextData>
  );
};
export default App;
