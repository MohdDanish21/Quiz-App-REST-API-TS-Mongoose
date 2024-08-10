import React, { useEffect, useState } from "react";
import "../Style/Register.module.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3002/auth")
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));
  // });
  function signUp(e) {
    e.preventDefault();
    const userData = {
      name: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    axios
      .post("http://localhost:3002/auth", userData)
      .then((res) => {
        alert("otp has been sent to your email");
        props.setToken(res.data.data.token);
      })
      .catch((error) => alert(error.res.data.message));
    navigate("/Otp");
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      <h1>Create new Account</h1>
      <p>
        Already Registered ? &nbsp;
        <p onClick={() => navigate("/login")}>login</p>
      </p>
      <br></br>

      <form action="">
        <div>
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="FullName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          ></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>

        <div>
          <label htmlFor="ConfirmPassword">ConfirmPassword</label>
          <input
            type="password"
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          ></input>
        </div>

        <button onClick={signUp} type="submit">
          Sign up
        </button>
      </form>
    </>
  );
}

export default Register;
