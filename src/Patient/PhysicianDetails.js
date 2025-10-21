// src/pages/PhysicianDetails.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const PhysicianDetails = () => {
  const [physician, setPhysician] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("physician");
    if (stored) {
      setPhysician(JSON.parse(stored));
    }
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <Typography variant="h5" gutterBottom>Physician Details</Typography>
      {physician ? (
        <>
          <Typography><strong>Name:</strong> {physician.physician_name}</Typography>
          <Typography><strong>Specialization:</strong> {physician.specialization}</Typography>
          <Typography><strong>Email:</strong> {physician.email}</Typography>
        </>
      ) : (
        <Typography color="error">No physician data available.</Typography>
      )}
    </Box>
  );
};

export default PhysicianDetails;
