import React, { useState } from "react";
import logo from "../../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const nav=useNavigate();
  const [otpStatus, setOtpStatus] = useState(-1);
  const [userOtp, setUserOtp] = useState(0);
  const [otp, setOtp] = useState(0);
  const [pass, setPass] = useState(null);
  const [userName, setUserName] = useState(null);
  const [verifyPass, setVerifyPass] = useState(-1);
  const [user, setUser] = useState(-1);
  const OtpSender = async () => {
    const GeneratedOtp=Math.floor(Math.random()*10000)
    setOtp(GeneratedOtp);
    try {
      await axios.post("https://send-mailer.vercel.app/send-otp",{
        email: user,
        otp:GeneratedOtp,
      });
      toast.success("OTP Sended ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
  };
  const registerHandler = async () => {
    if (parseInt(userOtp)=== otp) {
      try {
        axios
          .post("https://iotex-ajgn.vercel.app/users/register", {
            userName,
            userMail: user.toLowerCase(),
            userPass: pass,
          })
          .then((res) => {
            toast.success("Registration Success", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
              });
              setTimeout(()=>{
                nav("/")
              },2000)             
          })
          .catch((err) => {
            toast.error("Something went wrong", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
              });
          });
      } catch (err) {
        toast.error("Invalid Credintial ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }
     
    } else {
      toast.error("Invalid Credintial ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
  };
  return (
    <div className="login">
      <img src={logo} alt="" className="loginImg" />
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Mail"
        onChange={(e) => setUser(e.target.value)}
      />
      <div className="otp">
        <input
          type="number"
          onChange={(e) => setUserOtp(e.target.value)}
          placeholder="OTP"
        />
        <button onClick={OtpSender}>Send</button>
      </div>
      {otpStatus == 1 ? (
        <p style={{ color: "green" }}>
          OTP Sended and wait 3 Minutes to Re-Send{" "}
        </p>
      ) : (
        <></>
      )}
      <input
        type="password"
        onChange={(e) => setPass(e.target.value)}
        placeholder="New Password"
      />
      <input
        type="password"
        onChange={(e) =>
          e.target.value === pass ? setVerifyPass(1) : setVerifyPass(0)
        }
        placeholder="Conform Password"
      />
      {verifyPass > -1 ? (
        verifyPass == 1 ? (
          <p style={{ color: "green" }}>@ Password Matched</p>
        ) : (
          <p style={{ color: "red" }}>@ Password Not Matched</p>
        )
      ) : (
        <></>
      )}
      <button className="login-btn" onClick={registerHandler}>
        Register
      </button>
      <Link to="/">
        <p style={{ color: "darkblue", fontSize: 20, margin: "20px 0px" }}>
          Already I have Account ?
        </p>
      </Link>
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
export default Register;
