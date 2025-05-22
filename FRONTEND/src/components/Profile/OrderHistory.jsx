import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import axios from "axios";
import FooterLinks from "./footerLinks";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. First check if the order endpoint exists
        console.log("Attempting to fetch orders...");
        const ordersResponse = await axios.get(
          "http://localhost:3000/api/order/customer-orders",
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        console.log("Orders response:", ordersResponse);

        if (!ordersResponse.data?.data) {
          throw new Error("Invalid orders data format");
        }

        const ordersData = ordersResponse.data.data;
        setOrders(ordersData);

        // 2. Only fetch products if we have orders
        if (ordersData.length > 0) {
          console.log("Fetching products for", ordersData.length, "orders...");
          const productIds = [
            ...new Set(ordersData.map((order) => order.items.productId)),
          ];

          const productResponses = await Promise.all(
            productIds.map((id) =>
              axios
                .get(`http://localhost:3000/api/product/${id}`, {
                  withCredentials: true,
                  timeout: 5000,
                })
                .catch((e) => {
                  console.warn(`Failed to fetch product ${id}:`, e);
                  return { data: { data: null } }; // Return null if fetch fails
                })
            )
          );

          const productMap = {};
          productResponses.forEach((response, index) => {
            if (response.data?.data) {
              productMap[productIds[index]] = response.data.data;
            }
          });

          setProducts(productMap);
          console.log("Fetched", Object.keys(productMap).length, "products");
        }
      } catch (error) {
        console.error("Data fetching error:", error);
        let errorMessage = "Failed to load orders";

        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);

          if (error.response.status === 404) {
            errorMessage = "Orders endpoint not found (404)";
          } else if (error.response.status === 500) {
            errorMessage = "Server error (500)";
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          errorMessage = "No response from server";
        } else {
          // Something happened in setting up the request
          console.error("Request setup error:", error.message);
          errorMessage = error.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return "Invalid date";
    }
  };

  // if (!orders.length) {
  //   return (
  //     <div className={styles.profileContainer}>
  //       <h1 className={styles.profileTitle}>Orders</h1>
  //       <p>No orders found.</p>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Orders</h1>

      <div className={styles.ordersGrid}>
        {orders.map((order) => {
          const product = products[order.items.productId];
          const discountedPrice =
            order.items.price * (1 - order.items.discountPercentage / 100);
          const totalPrice = discountedPrice * order.items.quantity;

          return (
            <div key={order._id} className={styles.orderCard}>
              <h3 className={styles.productName}>
                {product ? product.short_title : ""}
              </h3>
              {product && product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.short_title || "Product image"}
                  className={styles.productImage}
                />
              )}

              <div className={styles.orderDetails}>
                <div className={styles.detailRow}>
                  <span>Order Date:</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Quantity:</span>
                  <span>{order.items.quantity}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>totalPrice:</span>
                  <span>LKR {order.items.price}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Delivery By:</span>
                  <span>{formatDate(order.delieveredBefore)}</span>
                </div>
                <div className={styles.priceSection}>
                  <span></span>
                  <span className={styles.priceValue}>
                    LKR {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <FooterLinks />
    </div>
  );
}

export default OrderHistory;
