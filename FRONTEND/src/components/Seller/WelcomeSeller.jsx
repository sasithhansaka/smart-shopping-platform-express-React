import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WelcomeSeller.module.css";
// const [date, setDate] = useState(new Date());


function WelcomeSeller() {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/seller", {
          withCredentials: true,
        });
        setSeller(response.data.sellerExist);
      } catch (err) {
        console.error("Failed to load seller:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeller();
  }, []);

  if (loading || !seller) {
    return <div className={styles.welcomeSeller}></div>;
  }

  return (
    <div className={styles.welcomeSellerContainer}>
      <div className={styles.welcomeSeller}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
              alt="Seller Icon"
              className={styles.icon}
            />
            <div>
              <h3 className={styles.sellerName}>{seller.email}</h3>
              <p className={styles.verified}>Verified Seller</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4961/4961950.png"
              alt="Notification Icon"
              className={styles.icon}
            />
            <div>
              <h3 className={styles.notificationTitle}>
                Important Notifications
              </h3>
              <p className={styles.notificationText}>
                You Are Updated! No New Important Notification For You.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex",backgroundColor: "#f1f2f5" }}>
        {/* User Details */}
        <div className={styles.userDetails}>
          <div className={styles.detailBox}>
            <p>
              <strong>Account Type:</strong> {seller.AccountType}
            </p>
            <p>
              <strong>Store Name:</strong> {seller.Store_name}
            </p>
            <p>
              <strong>Email:</strong> {seller.email}
            </p>
            <p>
              <strong>Address:</strong> {seller.address}
            </p>
            <p>
              <strong>Bank Number:</strong> {seller.Bank_details[0].BankNumber}
            </p>
            <p>
              <strong>PIN Number:</strong> {seller.Bank_details[0].PinNumber}
              *******
            </p>
          </div>
        </div>
        <div className={styles.calenderDiv}>

        </div>
      </div>
    </div>
  );
}

export default WelcomeSeller;
