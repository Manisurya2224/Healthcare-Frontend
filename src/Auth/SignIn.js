// src/pages/SignIn.js

import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/IMG-20250216-WA0012.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignInApi } from "./AuthCalls";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        className: "custom-toast-success",
        closeButton: false,
        hideProgressBar: true,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        className: "custom-toast-error",
        closeButton: false,
        hideProgressBar: true,
      });
    } else {
      toast.info(message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        className: "custom-toast-info",
        closeButton: false,
        hideProgressBar: true,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notify("Please enter both email and password", "error");
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await SignInApi(payload);

      if (response?.status === 200) {
        const token = response.data.jwt;
        if (token) {
          localStorage.setItem("token", token);
          notify(response?.data?.message || "Login successful!", "success");
          setTimeout(() => {
            navigate("/physician/patients");
          }, 2000);
        } else {
          notify("Token not received from server", "error");
        }
      } else {
        notify(response?.data?.message || "Login failed", "error");
      }
    } catch (error) {
      notify("An error occurred during login", "error");
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
        textAlign: "center",
        px: 3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(3px)",
      }}
    >
      <form className="formContainer" onSubmit={submitForm} name="sign-in">
        <header>
          <h1>Sign in</h1>
        </header>
        <p>Welcome, please sign in to continue</p>
        <input
          name="email"
          // type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user name"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Input Password"
          required
        />
        <button type="submit">Login</button>
        <Typography mt={2}>
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              color: "#ffcc00",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign-Up
          </Link>
        </Typography>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SignIn;
