import React from "react";
import styles from "./ProductDetails.module.css";

function ProductDetails({
  productName,
  productReviews,
  productColors,
  productDescription,
}) {
  return (
    <div className={styles.productDetailsContainer}>
      <h2 className={styles.productName}>{productName}</h2>
      <hr></hr>
      <div className={styles.productRatingContainer}>
        <p>4.0</p>
        <img src="./src/images/Group 121.png" alt="Logo" />

        <p>17, ratings</p>
      </div>
      <p style={{fontSize:'13px',marginTop:'5px'}}>9K+ bought in past month</p>
      <div className={styles.OredrcolorsContainer}>
        {productColors.map((color, index) => (
          <div
            key={index}
            className={styles.colorCircle}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
            <p style={{fontWeight:'600',marginTop:'5px'}}>Abouth this item</p>
<hr></hr>

      <div className={styles.productDescription}>
        <p>Incredible Sound Loved by 20 Million+ People</p>
        <p> clarity and detail.</p>
      <p  >{productDescription}</p>
      </div>
      
    </div>
  );
}

export default ProductDetails;
