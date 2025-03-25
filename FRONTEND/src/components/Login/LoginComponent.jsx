import React from "react";
import { useState } from "react";
import axios from "axios";

function LoginComponent() {
  const [userfield, setUserField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserField = (event) => setUserField(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

    try {
      if (!userfield || !password) {
        setError("Please fill in all fields");
        return;
      }

      const data = {
        password,
        ...(isEmail(userfield)
          ? { email: userfield }
          : { username: userfield }),
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );

      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      alert("Login successful");


      setUserField("");
      setPassword("");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="text"
          name="userfield"
          placeholder="Enter your username or email"
          onChange={handleUserField}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginComponent;


// SecureP@ss123


