import React, { useState } from "react";
import styles from "./UpgradeSeller.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpgradeSeller() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AccountType: "Personal",
    Store_name: "",
    email: "",
    address: "",
    BankNumber: "",
    PinNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      AccountType: formData.AccountType,
      Store_name: formData.Store_name,
      email: formData.email,
      address: formData.address,
      Bank_details: [
        {
          BankNumber: formData.BankNumber,
          PinNumber: formData.PinNumber,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/seller",
        payload,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert("You are now a seller!");
        navigate("/seller/dashboard"); // Update this to your seller page route
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error.");
    }
  };

  return (
    <div className={styles.fullContainer}>
      <div className={styles.upgradeSellerContainer}>
        <h2>Upgrade to Seller</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Account Type
            <select
              name="AccountType"
              value={formData.AccountType}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
          </label>

          <label>
            Store Name
            <input
              type="text"
              name="Store_name"
              value={formData.Store_name}
              onChange={handleChange}
              required
              placeholder="Enter your store name"
              autoComplete="off"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              autoComplete="off"
            />
          </label>

          <label>
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              autoComplete="off"
            />
          </label>

          <label>
            Bank Number
            <input
              type="text"
              name="BankNumber"
              value={formData.BankNumber}
              onChange={handleChange}
              required
              placeholder="Enter your bank number"
              autoComplete="off"
            />
          </label>

          <label>
            Pin Number
            <input
              type="password"
              name="PinNumber"
              value={formData.PinNumber}
              onChange={handleChange}
              required
              placeholder="Enter your bank pin"
              autoComplete="off"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Upgrade
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpgradeSeller;
