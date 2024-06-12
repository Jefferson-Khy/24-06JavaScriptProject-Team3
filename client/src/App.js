import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import SubTiers from "../src/components/SubTiers";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subtiers" element={<SubTiers />} />
      </Routes>
    </div>
  );
}
