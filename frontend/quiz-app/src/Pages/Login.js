import React, { useState } from "react";
import "../Style/Login.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3002/auth/login", userData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <p className="center">Sign in to continue</p>
      </div>
      <br></br>
      <form>
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

        <button onClick={login} type="submit">
          login
        </button>
        <br />
        <h6>
          Don't have an account?{" "}
          <h5 className="login" onClick={() => navigate("/Register")}>
            Sign up
          </h5>
        </h6>
      </form>
    </>
  );
}

export default Login;
