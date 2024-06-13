import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import SubTiers from "../src/components/SubTiers";
import ProfileDetails from "../src/components/ProfileDetails";
import UserDashboard from "./components/UserDashboard";
import About from "./components/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition: Bounce,
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subtiers" element={<SubTiers />} />
        <Route path="/profiledetails" element={<ProfileDetails />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}
