// src/pages/PhysicianPatients.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const PhysicianPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/physician/patients")
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load patients. Please check if you're logged in.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Patients</h2>
      {patients.length === 0 ? (
        <p>No patients assigned yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Active</th>
              <th>Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.active ? "Yes" : "No"}</td>
                <td>{patient.lastVisitDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PhysicianPatients;
