import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.message}>Page Not Found</h2>
      <p className={styles.description}>
        The page you're looking for doesn't exist or has been moved. Let's get you back home.
      </p>
      <button className={styles.button} onClick={goHome}>
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
