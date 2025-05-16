import React from "react";
import styles from "./FooterLinks.module.css";

function FooterLinks() {
  return (
    <div>
      <div className={styles.footerLinks}>
        <a href="#">Refund Policy</a>
        <a href="#">Shipping Policy</a>
        <a href="#">Term Of Service</a>
        <a href="#">Contact Information</a>
      </div>
    </div>
  );
}

export default FooterLinks;
