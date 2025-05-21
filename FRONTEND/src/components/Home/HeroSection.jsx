// HeroSection.jsx
import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroGrid}>
        {/* Row 1 */}
        <div className={styles.heroCardsmall1}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                LATEST <br></br>APPLE
              </h3>
              <h1>IPHONES</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/ipone.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>

        <div className={styles.heroCardsmall2}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                NEW <br></br>WEARING
              </h3>
              <h1>GALAXIE</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/watch.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>

        <div className={styles.heroCardbig1}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                NEW <br></br>TREND
              </h3>
              <h1>DEVICES</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/lap.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>
      </div>
      <div className={styles.heroGrid2}>
        {/* Row 2 */}
        <div className={styles.heroCardbig2}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                NEW <br></br>TREND
              </h3>
              <h1>DEVICES</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/lap.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>

        <div className={styles.heroCardsmall3}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                NEW <br></br>WEARING
              </h3>
              <h1>GALAXIE</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/watch.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>

        <div className={styles.heroCardsmall4}>
          <div className={styles.cardTop}>
            <div className={styles.cardTopLeft}>
              <h3>
                NEW <br></br>WEARING
              </h3>
              <h1>GALAXIE</h1>
            </div>
            <div className={styles.cardimage}>
              <img
                src="./src/images/watch.png"
                alt="Apple"
                className={styles.appleImage}
              />
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.browseButton}>BROWSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
