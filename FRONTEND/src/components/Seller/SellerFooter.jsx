import React from 'react';
import styles from './SellerFooter.module.css';

const SellerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <p className={styles.copyright}>Tradenest{currentYear}. All Rights Reserved.</p>
          <div className={styles.appBadge}>
            <span className={styles.appName}>Tradenest App</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SellerFooter;