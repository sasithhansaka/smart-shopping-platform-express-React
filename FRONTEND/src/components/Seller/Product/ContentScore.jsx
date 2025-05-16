import React from "react";
import styles from "./ContentScore.module.css";

function ContentScore({ completionStatus }) {
  const sections = [
    { name: "Basic Information", key: "basicInfo" },
    { name: "Product Specification", key: "productSpec" },
    { name: "Price, Stock & Variants", key: "priceStock" },
    { name: "Product Description", key: "description" },
  ];

  // Calculate completion percentage
  const completedCount = sections.filter(
    (section) => completionStatus[section.key]
  ).length;
  const completionPercentage = Math.round((completedCount / sections.length) * 100);

  return (
    <div className={styles.contentScore}>
      <h2>Content Score</h2>
      {/* <div className={styles.scorePercentage}>{completionPercentage}</div> */}
      <hr></hr>
      
      <div className={styles.sectionsContainer}>
        {sections.map((section) => (
          <div key={section.key} className={styles.sectionItem}>
            <div
              className={`${styles.statusCircle} ${
                completionStatus[section.key] ? styles.completed : ""
              }`}
            ></div>
            <span>{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentScore;