import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ManageProducts.module.css";
import Breadcrumbs from "../Breadcrumbs";
import { FiPlus } from "react-icons/fi"; // Import the plus icon from Feather Icons

const STATUS_TYPES = ["all", "active", "Inactive", "pending"];

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

  const NavigateToAddProduct = () => {
    window.location.href = "/seller/add-products";
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        withCredentials: true,
      });
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
      // Switch between 'active' and 'inactive'
      const updatedStatus = product.status === "active" ? "Inactive" : "active";
      await axios.patch(
        `http://localhost:3000/api/product/${product._id}`,
        { status: updatedStatus },
        { withCredentials: true }
      );
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F1F2F5" }}>
      <Breadcrumbs />
      <h3
        className={styles.addProductTitle}
        style={{ backgroundColor: "#F1F2F5" }}
      >
        Manage Products
      </h3>
      <div style={{ display: "flex", gap: "30px", backgroundColor: "#F1F2F5" }}>
        {STATUS_TYPES.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              cursor: "pointer",
              color: activeTab === tab ? "#147AFF" : "#000",
              borderBottom: activeTab === tab ? "2px solid #147AFF" : "none",
              // paddingBottom: "20px",
              paddingTop: "20px",
              backgroundColor: "#F1F2F5",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}

        <button
          className={styles.newProductButton}
          onClick={NavigateToAddProduct}
        >
          <span className={styles.iconCircle}>
            <FiPlus className={styles.plusIcon} />
          </span>
          NEW PRODUCT
        </button>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.tableDiv}>
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
                        backgroundColor: "#F9FBFF",
                      }}
                    >
                      <img
                        src={product.images?.[0]}
                        alt="Product"
                        width="50"
                        height="50"
                        style={{
                          backgroundColor: "#F5F8FD",
                          borderRadius: "10px",
                        }}
                      />
                      <p className={styles.productLongTitle}>
                        {product.long_title}
                      </p>
                    </div>
                  </td>
                  {product.status === "pending" ? (
                    <td colSpan="3">
                      <div
                        style={{
                          padding: "5px",
                          background: "#E6F4EA",
                          color: "#333",
                          borderRadius: "5px",
                          fontSize: "13px",
                        }}
                      >
                        Product Will Be Activated After Passing QC.
                        <strong style={{ backgroundColor: "#E6F4EA" }}>
                          Updated Before: 2025-06-04
                        </strong>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className={styles.productPrice}>
                        LKR.{product.price}.00
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          onClick={() => toggleActiveStatus(product)}
                          style={{
                            position: "relative",
                            width: "50px",
                            height: "26px",
                            borderRadius: "20px",
                            border: "none",
                            cursor: "pointer",
                            padding: "0",
                            backgroundColor:
                              product.status === "active"
                                ? "#147AFF"
                                : "#E0E0E0",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "3px",
                              left:
                                product.status === "active"
                                  ? "calc(100% - 23px)"
                                  : "3px",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "white",
                              transition: "all 0.3s ease",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            }}
                          />
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
    </div>
  );
}

export default ManageProducts;
