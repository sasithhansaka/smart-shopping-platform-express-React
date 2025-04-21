import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ManageProducts.module.css";
import Breadcrumbs from "../Breadcrumbs";

const STATUS_TYPES = ["all", "active", "inactive", "pending", "deleted"];

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeTab, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        withCredentials: true,
      });
      console.log(response.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  const filterProducts = () => {
    if (activeTab === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((product) => product.status === activeTab));
    }
  };

  const toggleActiveStatus = async (product) => {
    try {
      const updatedStatus = product.status === "active" ? "inactive" : "active";
      await axios.patch(`http://localhost:3000/api/product/${product._id}`, {
        status: updatedStatus,
      });
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Manage Products</h3>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {STATUS_TYPES.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              cursor: "pointer",
              color: activeTab === tab ? "#147AFF" : "#000",
              borderBottom: activeTab === tab ? "2px solidrgb(43, 53, 66)" : "none",
              paddingBottom: "4px",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>
      <div className={styles.productContainer}>
        <p className={styles.productDetailsTitle}>Product Details</p>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Product Info</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product._id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={product.images?.[0]} alt="Product" width="50" />
                    {product.long_title}
                  </div>
                </td>
                {product.isApproved === false ? (
                  <td colSpan="3">
                    <div
                      style={{
                        padding: "10px",
                        background: "#E6F4EA",
                        color: "#333",
                        borderRadius: "5px",
                      }}
                    >
                      Product Will Be Activated After Passing QC.{" "}
                      <strong>Updated On: 2025-04-04</strong>
                    </div>
                  </td>
                ) : (
                  <>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        onClick={() => toggleActiveStatus(product)}
                        style={{
                          backgroundColor:
                            product.status === "active" ? "#147AFF" : "black",
                          border: "none",
                          padding: "6px 12px",
                          color: "white",
                          borderRadius: "20px",
                          cursor: "pointer",
                        }}
                      >
                        {product.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;
