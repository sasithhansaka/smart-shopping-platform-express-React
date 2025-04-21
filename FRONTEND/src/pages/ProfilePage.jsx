import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderComponent = () => {
    switch (activeTab) {
      case 'shop ':
        return <div className={styles.content}>Shop Content</div>;
      case 'Orders':
        return <div className={styles.content}>Groups Content</div>;
      case 'profile':
        return <div className={styles.content}>Orders Content</div>;
      case 'settings':
        return <div className={styles.content}>Settings Content</div>;
      default:
        return <div className={styles.content}>Profile Content</div>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.brandName}>BRAND NAME</div>
        
        <nav className={styles.navLinks}>
          <button 
            className={`${styles.navButton} ${activeTab === 'shop' ? styles.active : ''}`}
            onClick={() => setActiveTab('shop')}
          >
            SHOP
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'groups' ? styles.active : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            ORDERS
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          
          {/* <button 
            className={`${styles.navButton} ${activeTab === 'sales' ? styles.active : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            SALES
          </button> */}
        </nav>
        
        <div className={styles.languageSelector}>ENGLISH</div>
      </div>
      
      <div className={styles.mainContent}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProfilePage;