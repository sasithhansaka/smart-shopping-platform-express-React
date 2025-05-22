import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ProductContainer.module.css";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/getproducts",
          {
            params: {
              limit: 5,
              status: "active",
            },
            withCredentials: true,
          }
        );

        if (!response.data?.data) {
          throw new Error("Invalid product data format");
        }

        const activeProducts = response.data.data.filter(
          (product) => product.status === "active"
        );
        const lastFiveProducts = activeProducts.slice(-5);

        setProducts(lastFiveProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    // Save the entire product object to localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    // Navigate to order page
    navigate("/order");
  };

  if (loading) {
    // return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    // return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>latest PRODUCTS</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => {
          const firstImage =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : product.image || null;

          return (
            <div
              key={product._id}
              className={styles.productCard}
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.productImage}>
                <div className={styles.productsp}></div>
                {firstImage ? (
                  <img src={firstImage} alt={product.name} />
                ) : (
                  <div className={styles.imagePlaceholder}>No Image</div>
                )}
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productInfoTop}>
                  <div className={styles.buynowbutton}>
                    <p className={styles.buynowtext}>BUY NOW</p>
                    <div className={styles.circle}>
                      <img
                        src="./src/images/ShoppingBagFull.png"
                        alt="Shopping Bag Full"
                      />
                    </div>
                  </div>
                  <p className={styles.Price}>{product.price} LKR</p>
                </div>
                <div className={styles.productCategory}>
                  {product.short_title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductContainer;
