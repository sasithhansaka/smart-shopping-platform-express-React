import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProductBuyContainer.module.css";
import { FaCheckCircle } from "react-icons/fa";

function ProductBuyContainer({
  productPrice,
  productDiscount,
  productStock,
  productSellerId,
  productId,
}) {
  const [seller, setSeller] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/seller/${productSellerId}`,
          { withCredentials: true }
        );
        setSeller(response.data.data);
        console.log("Seller data:", response.data.data);
      } catch (err) {
        console.error("Error fetching seller:", err);
      }
    };

    if (productSellerId) {
      fetchSeller();
    }
  }, [productSellerId]);

  const originalPrice = productPrice;
  const discountedPrice =
    originalPrice + (originalPrice * productDiscount) / 100;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= productStock) {
      setQuantity(value);
    }
  };

  const handleBuyNow = async () => {
    const data = {
      sellerId: productSellerId,
      items: {
        productId,
        quantity,
        price: productPrice,
        discountPercentage: productDiscount,
      },
      totalamount: productPrice * quantity, // or use discounted price if needed
      shippingAddress: {
        address: "123 Main Street",
        city: "Colombo",
        postal_code: "10000",
        country: "Sri Lanka",
      },
    };

    try {
      console.log("Order data:", data);
      const response = await axios.post(
        "http://localhost:3000/api/order",
        data,
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      console.log("Order response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const MinusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

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
            <img
              // src={seller.profileImage}
              alt={seller.name}
              className={styles.sellerImage}
            />
            <div>
              <p className={styles.sellerName}>
                {seller.Store_name}
                <FaCheckCircle className={styles.verifiedIcon} />
              </p>

              <p className={styles.sellerLink}>Seller's other items</p>
              {/* <p className={styles.sellerLink}>About this seller</p> */}
            </div>
          </div>
        </div>
      )}

      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.originalPrice}>
            {originalPrice.toLocaleString()} LKR
          </span>
          <span className={styles.discountBadge}>save {productDiscount}%</span>
          <div className={styles.discountedPrice}>
            {discountedPrice.toLocaleString()} LKR
          </div>
        </div>
      </div>

      <div className={styles.condition}>Condition: NEW</div>

      <div className={styles.quantitySection}>
        <label className={styles.quantityLabel}>Quantity:</label>
        <div className={styles.quantityControl}>
          <button
            onClick={decrementQuantity}
            className={styles.quantityButton}
            disabled={quantity <= 1}
          >
            <MinusIcon className={styles.quantityIcon} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
            min="1"
            max={productStock}
          />
          <button
            onClick={incrementQuantity}
            className={styles.quantityButton}
            disabled={quantity >= productStock}
          >
            <PlusIcon className={styles.quantityIcon} />
          </button>
        </div>
      </div>

      {/* <div className={styles.totalPrice}>
        Total: {totalPrice.toLocaleString()} LKR
      </div> */}

      <div className={styles.buttonGroup}>
        <button className={styles.buyNowButton} onClick={handleBuyNow}>
          Buy Now
        </button>
        <button className={styles.addToCartButton}>Add to cart</button>
      </div>

      <button className={styles.watchlistButton}>Add to watchlist</button>
    </div>
  );
}

export default ProductBuyContainer;
