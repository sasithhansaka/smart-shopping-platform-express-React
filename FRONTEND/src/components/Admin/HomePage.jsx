import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fraudulentProducts, setFraudulentProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/getproducts",
        { withCredentials: true }
      );
      if (!response.data?.data) throw new Error("Invalid product data format");
      setProducts(response.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch fraudulent products
  const fetchFraudulentProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/fraud-check-all-products"
      );
      setFraudulentProducts(data.fraudulent_products || []);
    } catch (err) {
      console.error("Error fetching fraudulent products:", err);
      // Don't set error here to avoid hiding the main table
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFraudulentProducts();
    // eslint-disable-next-line
  }, []);

  const approveProduct = async (product) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/product/${product._id}`,
        { status: "active" },
        { withCredentials: true }
      );
      fetchProducts();
      fetchFraudulentProducts(); // refresh fraud check after approval
    } catch (error) {
      console.log("Error updating product:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      alert("Failed to approve product. See console for details.");
    }
  };

  // Helper: Map fraudulent products for quick lookup
  const fraudMap = React.useMemo(() => {
    const map = {};
    fraudulentProducts.forEach((fp) => {
      map[fp._id] = fp.reason;
    });
    return map;
  }, [fraudulentProducts]);

  // Only pending products
  const pendingProducts = products.filter(
    (product) => product.status === "pending"
  );

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.productsContainer}>
      <h2>Pending Products</h2>
      {pendingProducts.length === 0 ? (
        <p></p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>AI Flag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((product) => {
              const fraudReason = fraudMap[product._id];
              return (
                <tr key={product._id}>
                  <td>{product.short_title || "Unnamed"}</td>
                  <td>
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.short_title}
                        className={styles.productThumbnail}
                        style={{ maxWidth: "60px", maxHeight: "60px" }}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{product.brand || "-"}</td>
                  <td>{product.category || "-"}</td>
                  <td>{product.price || "-"}</td>

                  <td>
                    <span
                      className={
                        product.status === "pending"
                          ? styles.pending
                          : styles.active
                      }
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    {fraudReason ? (
                      <span className={styles.redFlag} title={fraudReason}>
                        🚩
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => approveProduct(product)}
                      className={styles.approveButton}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomePage;
