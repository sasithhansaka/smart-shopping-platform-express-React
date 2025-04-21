import React from 'react';
import styles from './BrandManagement.module.css';

function BrandManagement() {
  return (
    <div className={styles.brandWrapper}>
      <h1 className={styles.title}>Brand Management</h1>
      <p className={styles.subtitle}>
        Craft and manage your brand identity with elegance. Stand out in the market with consistency and creativity.
      </p>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h3>Logo & Visual Identity</h3>
          <p>Upload, update and maintain your brand logos to ensure customers recognize your business instantly.</p>
        </div>
        <div className={styles.card}>
          <h3>Brand Story</h3>
          <p>Tell your unique story. Build trust and emotional connection with your audience through words and visuals.</p>
        </div>
        <div className={styles.card}>
          <h3>Marketing Materials</h3>
          <p>Organize banners, posters, and digital assets to create a consistent customer experience across platforms.</p>
        </div>
      </div>
    </div>
  );
}

export default BrandManagement;
