import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import MyProfile from '../components/Profile/MyProfile';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderComponent = () => {
    switch (activeTab) {
      case 'shop ':
        return <div className={styles.content}>Shop Content</div>;
      case 'orders':
        return <div className={styles.content}>Groups Content</div>;
      case 'profile':
        return <div className={styles.content}><MyProfile/></div>;
      case 'settings':
        return <div className={styles.content}>Settings Content</div>;
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
            className={`${styles.navButton} ${activeTab === 'shop' ? styles.active : ''}`}
            onClick={() => setActiveTab('shop')}
          >
            SHOP
          </button>
          
          <button 
            className={`${styles.navButton} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
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
        <button className={styles.sellerButton}>SELLER</button>
        
        <div className={styles.languageSelector}>ENGLISH</div>
      </div>
      
      <div className={styles.mainContent}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProfilePage;