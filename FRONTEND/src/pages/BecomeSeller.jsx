import React, { useState } from "react";
import styles from "./BecomeSeller.module.css";
import axios from "axios";
import { useEffect } from "react";

function BecomeSeller() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    email: "",
    isSeller: false,
    username: "",
  });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      sendemail();
      // setMessage("OTP has been sent to your email");
    } catch (error) {
      // setMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendemail = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/emails/upgrade-customer",
        { to: user.email },
        { withCredentials: true }
      );
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/customer",
          { withCredentials: true }
        );

        const userData = {
          ...response.data.data,
        };

        setUser(userData);
        console.log(userData);
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data.message
          : "An error occurred";
        alert(errorMessage);
      }
    };

    fetchUserData();
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/emails/confirm-customer",
        {
          ConfirmCode: otp,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("OTP confirmed successfully!");
        navigate("/UpgradeSeller"); 
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error confirming OTP:", error.response.data);
        alert(
          error.response.data.message ||
            "An error occurred while confirming OTP."
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error confirming OTP:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something else happened
        console.error("Error confirming OTP:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className={styles.form}>
          <h2>Brand name</h2>
          <p>Verify your email to continue</p>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            {/* <p>{user.username}</p> */}
            <p>{user.email}</p>
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter the OTP you received"
            />
            <p className={styles.emailNote}>OTP sent to {email}</p>
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {message && (
        <p
          className={
            otpSent && message.includes("successfully")
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default BecomeSeller;
