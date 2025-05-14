import React from 'react'
import Breadcrumbs from "../Breadcrumbs";
import styles from "./Orders.module.css";

function Orders() {
  return (
    <div>
        <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Orders</h3>
    </div>
  )
}

export default Orders
