import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductBuyContainer.module.css";

function ProductBuyContainer({
  productPrice,
  productDiscount,
  productStock,
  productSellerId,
}) {
  const [seller, setSeller] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   const fetchSeller = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/seller/${productSellerId}`,
  //         { withCredentials: true }
  //       );
  //       setSeller(response.data.data);
  //     } catch (err) {
  //       console.error("Error fetching seller:", err);
  //     }
  //   };

  //   if (productSellerId) {
  //     fetchSeller();
  //   }
  // }, [productSellerId]);

  const originalPrice = productPrice;
  const discountedPrice = originalPrice - (originalPrice * productDiscount) / 100;
  const totalPrice = discountedPrice * quantity;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= productStock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < productStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.container}>
      {seller && (
        <div className={styles.sellerSection}>
          <div className={styles.sellerInfo}>
            {/* <img
              src={seller.profileImage}
              alt={seller.name}
              className={styles.sellerImage}
            />
            <div>
              <p className={styles.sellerName}>{seller.name}</p>
              <p className={styles.sellerLink}>Seller's other items</p>
              <p className={styles.sellerLink}>About this seller</p>
            </div> */}
          </div>
        </div>
      )}

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.originalPrice}>
            {originalPrice.toLocaleString()} LKR
          </span>
          <span className={styles.discountBadge}>save {productDiscount}%</span>
        </div>
        <div className={styles.discountedPrice}>
          {discountedPrice.toLocaleString()} LKR
        </div>
      </div>

      <div className={styles.condition}>Condition: New</div>

      <div className={styles.quantitySection}>
        <label>Quantity:</label>
        <div className={styles.quantityControl}>
          <button onClick={decrementQuantity} className={styles.quantityButton}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
            min="1"
            max={productStock}
          />
          <button onClick={incrementQuantity} className={styles.quantityButton}>
            +
          </button>
        </div>
      </div>

      {/* <div className={styles.totalPrice}>
        Total: {totalPrice.toLocaleString()} LKR
      </div> */}

      <div className={styles.buttonGroup}>
        <button className={styles.buyNowButton}>Buy Now</button>
        <button className={styles.addToCartButton}>Add to cart</button>
      </div>

      <button className={styles.watchlistButton}>Add to watchlist</button>
    </div>
  );
}

export default ProductBuyContainer;