import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {
        withCredentials: true
      });
      navigate('/login');
    }catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred";
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.profileTitle}>Settings</h1>
      
      <div className={styles.settingsSection}>
        <h2>Logout The Account</h2>
        <p>If You Are Want Delete Your Account Please Stay informed with Us With A. New Account</p>
        <button 
          onClick={handleLogout}
          className={styles.actionButton}
        >
          Logout Account
        </button>
      </div>

      <div className={styles.settingsSection}>
        <h2>Preferred Language</h2>
        <p>If You Are Want Delete Your Account Please Stay informed with Us with A. New Account</p>
        <button className={styles.languageButton}>
          ENGLISH
        </button>
      </div>

      <div className={styles.settingsSection}>
        <h2>Preferred Country</h2>
        <p>If You Are Want Delete Your Account Please Stay informed with Us With A. New Account</p>
        <button className={styles.countryButton}>
          Sri Lanka
        </button>
      </div>
    </div>
  );
}

export default Settings;