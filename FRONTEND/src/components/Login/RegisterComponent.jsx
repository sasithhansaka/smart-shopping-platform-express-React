import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./RegisterComponent.module.css"; // Assuming you have a CSS file for styles

function RegisterComponent() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserName = (event) => setUserName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleConfirmPassword = (event) =>
    setConfirmPassword(event.target.value);

  const handleRegister = async (event) => {
    event.preventDefault();

    const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

    try {
      if (!username || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const data = {
        username,
        email,
        password,
      };

      console.log(data);

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        { withCredentials: true }
      );

      const accessToken = response.data.data?.accessToken;
      const refreshToken = response.data.data?.refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      alert("Registration successful");

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>REGISTER</h1>
      <p>Register to your brand account</p>
      <form onSubmit={handleRegister}>
        <h3>Username</h3>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={handleUserName}
        />
        <h3>Email</h3>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleEmail}
        />
        <h3>Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handlePassword}
        />
        <h3>Confirm Password</h3>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={handleConfirmPassword}
        />
        <button type="submit">Sign In </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RegisterComponent;
