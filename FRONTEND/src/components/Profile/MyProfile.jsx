import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.css";
import axios from "axios";

function MyProfile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isSeller: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/customer", 
          { withCredentials: true }
        );
        
        // Split username into first and last names
        const username = response.data.data.username || "";
        const [firstName = "", lastName = ""] = username.split(" ");
        
        const userData = {
          ...response.data.data,
          firstName,
          lastName
        };
        
        setUser(userData);
        setEditData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...editData,
        username: `${editData.firstName} ${editData.lastName}`.trim()
      };

      console.log("Updated Data:", updatedData); // Log the updated data
      
      const response = await axios.patch(
        "http://localhost:3000/api/user/customer/update",
        updatedData,
        { withCredentials: true }
      );
      
      setUser(updatedData);
      setIsEditing(false);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(user);
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>My Profile</h1>
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>
          <div className={styles.imagePlaceholder}></div>
        </div>
        <div className={styles.profileInfo}>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <p className={styles.verifiedBadge}>
            {user.isSeller ? "Verified Seller" : "Verified Shopper"}
          </p>
        </div>
        <button onClick={handleEdit} className={styles.editButton}>
          Edit
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
                    <p className={styles.ProfileTitle}>Personal Information</p>
          <div className={styles.nameFields}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={editData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editData.lastName || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={editData.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Country</label>
            <input
              type="text"
              value="Sri Lanka"
              readOnly
              className={styles.readOnlyInput}
            />
          </div>

          <div className={styles.formButtons}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.profileDetails}>
          <p>Personal Information</p>
          <div className={styles.nameFields}>
            <div className={styles.detailGroup}>
              <span className={styles.detailLabel}>First Name</span>
              <span className={styles.detailValue}>{user.firstName}</span>
            </div>
            <div className={styles.detailGroup}>
              <span className={styles.detailLabel}>Last Name</span>
              <span className={styles.detailValue}>{user.lastName}</span>
            </div>
          </div>

          <div className={styles.detailGroup}>
            <span className={styles.detailLabel}>Email Address</span>
            <span className={styles.detailValue}>{user.email}</span>
          </div>

          <div style={{ display: "flex", gap: '390px', backgroundColor: '#181818' }}>
            <div className={styles.detailGroup}>
              <span className={styles.detailLabel}>Bio</span>
              <span className={styles.detailValue} style={{ color: "#CCF642" }}>
                {user.isSeller ? "Verified Seller" : "Verified Shopper"}
              </span>
            </div>

            <div className={styles.detailGroup}>
              <span className={styles.detailLabel}>Country</span>
              <span className={styles.detailValue}>Sri Lanka</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.footerLinks}>
        <a href="#">Refund Policy</a>
        <a href="#">Shipping Policy</a>
        <a href="#">Term Of Service</a>
        <a href="#">Contact Information</a>
      </div>
    </div>
  );
}

export default MyProfile;