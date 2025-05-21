import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./MyProfile.module.css";

function MyProfile() {
  // State for seller data
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    BankNumber: "",
    PinNumber: "",
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/seller", {
          withCredentials: true,
        });
        setSellerData(response.data.sellerExist);

        // Initialize form data with seller data
        setFormData({
          firstName: response.data.sellerExist.firstName || "",
          lastName: response.data.sellerExist.lastName || "",
          email: response.data.sellerExist.email || "",
          address: response.data.sellerExist.address || "",
          BankNumber:
            response.data.sellerExist.Bank_details[0]?.BankNumber || "",
          PinNumber: response.data.sellerExist.Bank_details[0]?.PinNumber || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Error fetching profile data. Please try again later.");
        setLoading(false);
        console.error("Error fetching seller data:", err);
      }
    };

    fetchSellerData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    // if (!formData.email || !formData.address || !formData.firstName || !formData.lastName) {
    //   toast.error('First name, last name, email, and address are required fields');
    //   return;
    // }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Construct update data
      const updateData = {
        // firstName: formData.firstName,
        // lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        Bank_details: [
          {
            BankNumber: formData.BankNumber,
            PinNumber: formData.PinNumber,
          },
        ],
      };

      // Send PUT request
      await axios.put("http://localhost:3000/api/seller", updateData, {
        withCredentials: true,
      });

      setSuccessMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");

      setIsEditing(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Error updating profile. Please try again."
      );
      console.error("Error updating profile:", err);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  // Cancel edit
  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: sellerData.firstName || "",
      lastName: sellerData.lastName || "",
      email: sellerData.email || "",
      address: sellerData.address || "",
      BankNumber: sellerData.Bank_details[0]?.BankNumber || "",
      PinNumber: sellerData.Bank_details[0]?.PinNumber || "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Breadcrumbs />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Breadcrumbs />
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <button
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Profile</h3>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                {sellerData?.Store_name?.charAt(0) || "S"}
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h1>{sellerData?.Store_name || "Store Name"}</h1>
              <p className={styles.accountType}>
                {sellerData?.AccountType || "Personal"} Account
              </p>
            </div>
          </div>
          <div>
            {!isEditing ? (
              <button className={styles.editButton} onClick={toggleEditMode}>
                Edit
              </button>
            ) : (
              <div className={styles.editActions}>
                <button className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
                <button className={styles.saveButton} onClick={handleSubmit}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        <div className={styles.profileContent}>
          <form onSubmit={handleSubmit} className={styles.profileForm}>
            <div className={styles.formSection}>
              <h2>Personal Details</h2>
              <div className={styles.infoNameColumns}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Enter your first name"
                      autoComplete="off"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {sellerData?.firstName || "-"}
                    </div>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Enter your last name"
                      autoComplete="off"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {sellerData?.lastName || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Contact Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className={styles.infoValue}>{sellerData?.email}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Business Address</label>
                {isEditing ? (
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder="Enter your business address"
                    rows="3"
                  />
                ) : (
                  <div className={styles.infoValue}>{sellerData?.address}</div>
                )}
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Bank Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="BankNumber">Bank Account Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="BankNumber"
                    name="BankNumber"
                    value={formData.BankNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your bank account number"
                  />
                ) : (
                  <div className={styles.infoValue}>
                    {sellerData?.Bank_details[0]?.BankNumber
                      ? `${sellerData.Bank_details[0].BankNumber.substring(
                          0,
                          4
                        )}•••••${sellerData.Bank_details[0].BankNumber.slice(
                          -4
                        )}`
                      : "Not provided"}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="PinNumber">PIN Number</label>
                {isEditing ? (
                  <input
                    type="password"
                    id="PinNumber"
                    name="PinNumber"
                    value={formData.PinNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your bank PIN number"
                  />
                ) : (
                  <div className={styles.infoValue}>
                    {sellerData?.Bank_details[0]?.PinNumber
                      ? "••••••"
                      : "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className={styles.profileActivity}>
          <h2>Recent Activity</h2>
          <div className={styles.activityEmpty}>
            <p>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
