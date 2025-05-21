import React, { useState, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs";
import styles from "./Orders.module.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [customers, setCustomers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "http://localhost:3000/api/order/seller-orders",
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        const ordersData = ordersResponse.data.data;
        setOrders(ordersData);

        // Unique product IDs
        const productIds = [
          ...new Set(ordersData.map((order) => order.items.productId)),
        ];
        // Unique customer IDs
        const customerIds = [
          ...new Set(ordersData.map((order) => order.customerId)),
        ];

        // Fetch products
        const productResponses = await Promise.all(
          productIds.map((id) =>
            axios
              .get(`http://localhost:3000/api/product/${id}`, {
                withCredentials: true,
                timeout: 5000,
              })
              .catch(() => ({ data: { data: null } }))
          )
        );
        const productMap = {};
        productResponses.forEach((response, index) => {
          if (response.data?.data) {
            productMap[productIds[index]] = response.data.data;
          }
        });
        setProducts(productMap);

        // Fetch customers
        const customerResponses = await Promise.all(
          customerIds.map((id) =>
            axios
              .get(`http://localhost:3000/api/user/customer/${id}`, {
                withCredentials: true,
                timeout: 5000,
              })
              .catch(() => ({ data: { data: null } }))
          )
        );
        const customerMap = {};
        customerResponses.forEach((response, index) => {
          if (response.data?.data) {
            customerMap[customerIds[index]] = response.data.data;
          }
        });
        setCustomers(customerMap);
      } catch (error) {
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

  if (loading) {
    // return <div className={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    // return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.ordersContainer}>
      <Breadcrumbs />
      <h3 className={styles.addProductTitle}>Orders</h3>

      <div className={styles.tableContainer}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Image</th>
              <th>Order Date</th>
              <th>Quantity</th>
              {/* <th>Discount</th> */}
              <th>Delivery By</th>
              <th>Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const item = order.items;
              const product = products[item.productId];
              const customer = customers[order.customerId];
              const totalPrice =
                (product?.price || 0) *
                  item.quantity *
                  (1 - item.discountPercentage / 100) || 0;

              return (
                <tr key={order._id}>
                  <td>
                    {customer?.username ? (
                      <span className={styles.customerName}>
                        {customer.username}
                      </span>
                    ) : (
                      <span className={styles.unknown}>Unknown</span>
                    )}
                  </td>
                  <td>{product?.short_title || "Unknown Product"}</td>
                  <td>
                    {product?.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt="Product"
                        className={styles.productThumbnail}
                      />
                    ) : (
                      <span className={styles.noImage}>No image</span>
                    )}
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{item.quantity}</td>
                  {/* <td>{item.discountPercentage}%</td> */}
                  <td>{formatDate(order.delieveredBefore)}</td>
                  <td>{totalPrice.toFixed(2)}</td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.noOrders}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
