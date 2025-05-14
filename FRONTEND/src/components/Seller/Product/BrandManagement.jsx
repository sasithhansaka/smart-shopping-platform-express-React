import React from "react";
import styles from "./BrandManagement.module.css";
// import { FaYoutube } from "react-icons/fa"; // Import YouTube icon
import Breadcrumbs from "../Breadcrumbs";
import { FaYoutube, FaChartLine, FaRocket } from "react-icons/fa";
import { FaBullhorn, FaLightbulb } from "react-icons/fa";

function BrandManagement() {
  return (
    <div className={styles.brandWrapper}>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Brand Management</h3>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h3>Logo & Visual Identity</h3>
          <p>
            Upload, update and maintain your brand logos to ensure customers
            recognize your business instantly.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Brand Story</h3>
          <p>
            Tell your unique story. Build trust and emotional connection with
            your audience through words and visuals.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Marketing Materials</h3>
          <p>
            Organize banners, posters, and digital assets to create a consistent
            customer experience across platforms.
          </p>
        </div>
      </div>

      {/* YouTube Video Section */}
      <div className={styles.videoSection}>
        <h2 className={styles.videoTitle}>
          {/* <FaRocket className={styles.icon} /> */}
          Google Digital Services
          <FaChartLine className={styles.icon} />
        </h2>

        <p className={styles.videoIntro}>
          Learn how to elevate your brand visibility, connect with your target
          audience, and drive business growth using the powerful tools and
          insights offered by Google. This video guides you through effective
          strategies to establish a memorable brand and gain a competitive edge
          in the digital marketplace.<br></br><br></br>
          Craft and manage your brand identity with elegance. Stand out in the
          market with consistency and creativity. From defining your visual
          aesthetics to communicating your brand values, ensure every customer
          interaction leaves a lasting impression. Elevate your presence with a
          unified voice across all touchpoints—build loyalty, boost recognition,
          and create a brand that truly resonates.
        </p>
        {/* <p className={styles.subtitle}></p> */}

        <div className={styles.videoWrapper}>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/I6tB4bP5OzQ"
            title="Grow Your Business with Google DS"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default BrandManagement;
