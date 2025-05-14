import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import MyProfile from "../components/Profile/MyProfile";
import Settings from "../components/Profile/Settings";
import OrderHistory from "../components/Profile/OrderHistory";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    email: "",
    isSeller: false,
  });

  const navigate = useNavigate();

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigateSeller = () => {
    if (user.isSeller) {
      navigate("/seller"); // Navigate to seller page if isSeller is true
    } else {
      navigate("/BecomeSeller"); // Navigate to BecomeSeller page if isSeller is false
    }
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "shop":
        navigate("/"); // Redirect to home
        return null;
      case "orders":
        return (
          <div className={styles.content}>
            <OrderHistory />
          </div>
        );
      case "profile":
        return (
          <div className={styles.content}>
            <MyProfile />
          </div>
        );
      case "settings":
        return (
          <div className={styles.content}>
            <Settings />
          </div>
        );
      default:
        return <div className={styles.content}>Profile Content</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.brandName}>LOGO</div>

        <nav className={styles.navLinks}>
          <button
            className={`${styles.navButton} ${
              activeTab === "shop" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("shop")}
          >
            SHOP
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "orders" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            ORDERS
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "profile" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            className={`${styles.navButton} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>
        <button className={styles.sellerButton} onClick={navigateSeller}>
          SELLER
        </button>

        <div className={styles.languageSelector}>ENGLISH</div>
      </div>

      <div className={styles.mainContent}>{renderComponent()}</div>
    </div>
  );
};

export default ProfilePage;
