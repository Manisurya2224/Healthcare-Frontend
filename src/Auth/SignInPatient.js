import { Box, Typography } from "@mui/material";
import backgroundImage from "../assets/IMG-20250216-WA0012.jpg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignInApi } from "./AuthCalls";
import axiosInstance from "../api/axiosInstance";

const SignInPatient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message, type = "info") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
      className: `custom-toast-${type}`,
      closeButton: false,
      hideProgressBar: true,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) return notify("Please enter both email and password", "error");

    try {
      const payload = { email, password };
      const response = await SignInApi(payload);

      if (response?.status === 200 && response.data?.jwt) {
        const token = response.data.jwt;
        localStorage.setItem("token", token);

        notify("Login successful!", "success");

        // fetch physician info assigned to patient
        try {
          const physicianRes = await axiosInstance.get(`/patients/by-email/${email}/physician`);
          const physician = physicianRes.data;
          localStorage.setItem("physician", JSON.stringify(physician));

          notify("Physician data loaded. Redirecting...", "info");
          setTimeout(() => navigate("/patient"), 1500);
        } catch (err) {
          console.error("Physician fetch error:", err);
          notify("Could not load physician data", "error");
        }
      } else {
        notify(response?.data?.message || "Login failed", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      notify("Login request failed", "error");
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
      <form className="formContainer" onSubmit={submitForm}>
        <header><h1>Sign in</h1></header>
        <p>Welcome, please sign in to continue</p>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Login</button>
        <Typography mt={2}>
          Don’t have an account?{" "}
          <Link to="/sign-up" style={{ color: "#ffcc00", textDecoration: "none", fontWeight: "bold" }}>
            Sign-Up
          </Link>
        </Typography>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default SignInPatient;
