import React, { useState, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./Orders.module.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Attempting to fetch orders...");
        const ordersResponse = await axios.get(
          "http://localhost:3000/api/order/seller-orders",
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

        if (ordersData.length > 0) {
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
                  return { data: { data: null } };
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
        }
      } catch (error) {
        console.error("Data fetching error:", error);
        let errorMessage = "Failed to load orders";

        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Orders endpoint not found (404)";
          } else if (error.response.status === 500) {
            errorMessage = "Server error (500)";
          }
        } else if (error.request) {
          errorMessage = "No response from server";
        } else {
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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Your Orders</h3>

      <div className={styles.tableContainer}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Delivery By</th>
              <th>Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const item = order.items; // Single item object
              const product = products[item.productId];
              const totalPrice =
                ((product?.price || 0) *
                  item.quantity *
                  (1 - item.discountPercentage / 100)) || 0;

              return (
                <tr key={order._id}>
                  <td>{product?.short_title || "Unknown Product"}</td>
                  <td>
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className={styles.productThumbnail}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.discountPercentage}%</td>
                  <td>{formatDate(order.delieveredBefore)}</td>
                  <td>{totalPrice.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
