import React from 'react'

function ProductDetails({productName, productReviews, productColors, productDescription}) {
  return (
    <div className={styles.productDetailsContainer}>
        <h1>{productDescription}</h1>
        <hr></hr>
        <p>{productReviews.length}</p>
        <p>abouth this item</p>
        <p>{productDescription}</p>
    </div>
  )
}

export default ProductDetails
