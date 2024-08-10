import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Landing.css";
import Logo from "../Assets/Logo.png";
import image from "../Assets/Quizimage.jpg";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="logo">
        <img src={Logo} alt="" />
        <h1>Welcome To Quiz App </h1>
      </div>

      <div className="center">
        <button className="btn" onClick={() => navigate("/register")}>
          Register Here
        </button>
      </div>
    </div>
  );
}

export default Landing;
