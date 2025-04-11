// src/components/Seller/WelcomeSeller.jsx
import React from 'react';
import styles from './WelcomeSeller.module.css';

function WelcomeSeller() {
  return (
    <div className={styles.welcomeSeller}>
      <h1>Welcome to Seller Center</h1>
      <p>Manage your products, orders, and grow your business from here.</p>
    </div>
  );
}

export default WelcomeSeller;