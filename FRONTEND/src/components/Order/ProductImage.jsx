import React from "react";
import { useEffect } from "react";
import styles from "./ProductImage.module.css";

function ProductImage({ image }) {
  useEffect(() => {
    console.log("Selected Image:", image); // Log the image details whenever it changes
  }, [image]);
  return (
    <div className={styles.productImage}>
      <img src={image} />
    </div>
  );
}

export default ProductImage;
