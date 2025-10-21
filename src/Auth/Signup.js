import React, { useState } from "react";
import "./Auth.css";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/IMG-20250216-WA0011.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUpApi } from "./AuthCalls";
const SignUp = () => {
  const navigate = useNavigate();


  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const notify = (message, type) => {
      if (type === "success") {
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          className: "custom-toast-sucess",
          closeButton: false,
          hideProgressBar: true
        });
      } else if ("error") {
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          className: "custom-toast-sucess",
          closeButton: false,
          hideProgressBar: true
        });
      } else {
        toast.info(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          className: "custom-toast-sucess",
          closeButton: false,
          hideProgressBar: true
        });
      }
    }
  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        className: "custom-toast-error",
      });
      return;
    } else {
      //send user details to server
      const payload = {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "password": password
      }
      const response = await SignUpApi(payload);
      console.log("res",response?.data?.message);
      
      if (response?.status === 201) {
        notify(response?.data?.message,"success");
        setTimeout(() => {
          navigate("/sign-In");
        }, 2000);
      }else if(response?.status === 409){
        notify(response?.data?.message,"info");
      
    }else{
      notify(response?.errorCode,"error");
    }
     
    }

  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        px: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
        backdropFilter: "blur(3px)",
      }}
    >
      <form className="formContainer" onSubmit={submitForm}>
        <header>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Signup
          </Typography>
        </header>
        <Typography variant="p" fontWeight={700} gutterBottom>
          Welcome please Sign-up to continue
        </Typography>
        <input
          name="FirstName"
          placeholder="Enter FirstName"
          value={firstname}
          required
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <input
          name="lastname"
          placeholder="Enter LastName"
          value={lastname}
          required
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <input
          name="email"
          placeholder="Enter Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          name="password"
          placeholder="Enter Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Re Enter Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
        <Typography mt={2}>
          Already have an account?{" "}
          <Link to="/Sign-in" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>
            Sign-In
          </Link>
        </Typography>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SignUp;
