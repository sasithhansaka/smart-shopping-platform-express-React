import React from 'react'
import styles from './ProductDetails.module.css'

function ProductDetails({productName, productReviews, productColors, productDescription}) {
  return (
    <div className={styles.productDetailsContainer}>
        <h2>{productDescription}</h2>
        <hr></hr>
        <p>{productReviews.length}</p>
        <p>abouth this item</p>
        
        <h3>Available Colors:</h3>
        <div className={styles.colorsContainer}>
          {productColors.map((color, index) => (
            <div
              key={index}
              className={styles.colorCircle}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        
        <p>{productDescription}</p>



    </div>
  )
}

export default ProductDetails
