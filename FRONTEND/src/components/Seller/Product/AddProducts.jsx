import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./AddProducts.module.css";
import ProductForm from "./ProductForm";
import ContentScore from "./ContentScore";

function AddProducts() {
  
  return (
    <div>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Add Products</h3>
      <div className={styles.addProductContainer}>
          <div>
             <ProductForm />
          </div>
          <div>
            {/* <ContentScore /> */}
          </div>
      </div>
    </div>
  );
}

export default AddProducts;
