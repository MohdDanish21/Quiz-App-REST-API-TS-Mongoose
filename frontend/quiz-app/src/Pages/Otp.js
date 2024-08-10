import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const INITIAL_COUNT = 60;
const twoDigits = (num) => String(num).padStart(2, "0");

function Otp(props) {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState("STOPPED");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = Math.floor(secondsRemaining / 60);
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = Math.floor(minutesRemaining / 60);

  const handleStart = () => {
    setStatus("STARTED");
    setSecondsRemaining(INITIAL_COUNT);
  };

  const verifyOne = async (e) => {
    e.preventDefault();
    const userData = { otp };

    try {
      const res = await axios.post(
        `http://localhost:3002/auth/verify-registration-otp/${props.token}`,
        userData
      );
      alert(res.data.message);
      navigate("/Login"); // Navigate to login or another secure route
      setOtp("");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((prev) => prev - 1);
      } else {
        setStatus("STOPPED");
      }
    },
    status === "STARTED" ? 1000 : null
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div>
      <h3 style={{ color: "white", marginBottom: "40px", textAlign: "center" }}>
        Verify OTP for Login
      </h3>
      <input
        type="text"
        placeholder="Enter 6 Digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOne} type="submit">
        VERIFY
      </button>

      {status === "STARTED" ? (
        <div>
          <p>Resend OTP in</p>
          <p>
            {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
          </p>
        </div>
      ) : (
        <a
          style={{ marginLeft: "20px", cursor: "pointer", color: "white" }}
          onClick={handleStart}
        >
          Resend OTP
        </a>
      )}
    </div>
  );
}

export default Otp;
