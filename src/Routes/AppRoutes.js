import React from 'react';
import SignIn from '../Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../Auth/Signup';
import PhysicianPatients from '../Physian/PhysicianPatients';
import HomePage from '../Homepage/HomePage';
// import PatientLogin from '../Patient/PhysicianDetails';
import SignInPatient from '../Auth/SignInPatient';
import PhysicianDetails from '../Patient/PhysicianDetails';



const AppRoutes = () => {
  return (

<Routes>
  <Route path="/" element={<HomePage />} />
  {/* <Route path="/physician-login" element={<PhysicianLogin />} /> */}
  <Route path="/patient" element={<PhysicianDetails />} />
  <Route path="/sign-in" element={<SignIn />} />
  <Route path="/sign-in-patient" element={<SignInPatient />} />
  <Route path="/sign-up" element={<SignUp/>} />
  <Route path="/physician/patients" element={<PhysicianPatients/>} />
</Routes>

  );
};

export default AppRoutes;
