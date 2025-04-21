// src/components/Seller/WelcomeSeller.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './WelcomeSeller.module.css';

function WelcomeSeller() {
  const [seller, setSeller] = useState({ email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/seller',
          { withCredentials: true }
        );
        setSeller({
          email: response.data.sellerExist.email
        });
      } catch (err) {
        console.error('Failed to load seller:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeller();
  }, []);

  if (loading) {
    return (
      <div className={styles.welcomeSeller}>
        {/* <div className={styles.loading}>Loading seller info…</div> */}
      </div>
    );
  }

  return (
    <div>

    <div className={styles.welcomeSeller}>
      {/* Static intro text */}
      
      {/* Seller Card */}
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

      {/* Notifications Card */}
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
    </div>
  );
}

export default WelcomeSeller;
