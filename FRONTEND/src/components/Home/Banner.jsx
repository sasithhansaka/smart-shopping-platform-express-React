// Banner.jsx
import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>ENDLE BEATS</h1>
        <p className={styles.bannerTagline}>YOUR MUSIC, YOUR WORLD.</p>
        <p className={styles.bannerDescription}>
          Immerse yourself in pure audio bliss with our noise-cancelling headphones. 
          Say goodbye to distractions and hello to crystal-clear sound that transports 
          you to a world of your own.
        </p>
        <button className={styles.browseButton}>BROWSE</button>
      </div>
    </div>
  );
};

export default Banner;