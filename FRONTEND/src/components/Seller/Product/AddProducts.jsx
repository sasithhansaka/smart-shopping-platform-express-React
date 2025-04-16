import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./AddProducts.module.css";

function AddProducts() {
  
  return (
    <div>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Add Products</h3>
    </div>
  );
}

export default AddProducts;
