import React, { useState, useEffect } from "react";
import styles from "./ProductsPage.module.css";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/getproducts",
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        if (!response.data?.data) {
          throw new Error("Invalid product data format");
        }

        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price (LKR)</th>
            <th>Discount (%)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.short_title || "Unnamed"}</td>
              <td>
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.short_title}
                    className={styles.productThumbnail}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>{product.brand || "-"}</td>
              <td>{product.category || "-"}</td>
              <td>{product.quantity || 0}</td>
              <td>{product.price?.toFixed(2)}</td>
              <td>{product.discountPercentage || 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;
