import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import healthcareBg from '../assets/healthpic.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  const handlePhysicianClick = () => {
    navigate('/sign-in');
  };

  const handlePatientClick = () => {
    navigate('/sign-in-patient');
  };

  return (
    <div className="home-container"
    style={{ backgroundImage: `url(${healthcareBg})` }}>
      <div className="overlay">
        <h1 className="title">Welcome to Healthcare Portal</h1>
        <div className="button-group">
          <button onClick={handlePhysicianClick} className="home-btn"
          >Physician</button>
          <button onClick={handlePatientClick} className="home-btn">Patient</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
