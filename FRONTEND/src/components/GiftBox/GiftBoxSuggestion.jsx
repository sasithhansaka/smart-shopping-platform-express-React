import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./GiftBoxSuggestion.module.css";
import axios from "axios";
import { FiPackage } from "react-icons/fi";

function GiftBoxSuggestion() {
  const navigate = useNavigate(); // Initialize navigate
  const [story, setStory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const fetchProductDetails = async (suggestionsArr) => {
    setLoading(true);
    const productDetails = await Promise.all(
      suggestionsArr.map(async (item) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/product/${item._id}`,
            { withCredentials: true }
          );
          const images = response.data.data.images;
          return {
            ...item,
            image: Array.isArray(images) && images.length > 0 ? images[0] : "",
            longName: response.data.data.long_title || response.data.data.name,
          };
        } catch (e) {
          return {
            ...item,
            image: "",
            longName: item.name,
          };
        }
      })
    );
    setProducts(productDetails);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");
    setSuggestions([]);
    setProducts([]);
    setShowPopup(true);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/suggest-gift-box", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story }),
      });
      const data = await response.json();

      if (data.answer) {
        setAnswer(data.answer);
        setLoading(false);
      } else if (data.suggestions) {
        setSuggestions(data.suggestions);
        fetchProductDetails(data.suggestions);
      }
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleProductClick = (product) => {
    // Save the entire product object to localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    // Navigate to order page
    navigate("/order");
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={openPopup}
        title="Open Gift Box Suggester"
      >
        <img src="./src/images/Gift.png" alt="Gift" />
      </button>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <button
              onClick={closePopup}
              className={styles.closeButton}
              title="Close"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className={styles.formgiftBox}>
              <div className={styles.inputGroup}>
                <input
                  id="story-input"
                  type="text"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Example : I want a gift for my friend for his birthday, budget under 20000 LKR, he likes cricket."
                  className={styles.input}
                  required
                  autoFocus
                  autoComplete="off"
                />

                <button type="submit" className={styles.button}>
                  <span className={styles.iconCircle}>
                    <img src="./src/images/Gift.png" alt="Gift" />
                  </span>
                  Find the gift
                </button>
              </div>
            </form>

            {!loading && !answer && products.length === 0 && (
              <div className={styles.giftbox}>
                <div className={styles.giftbox1}>
                  <img src="./src/images/ChristmasGift.png" alt="Gift" />
                </div>
                <div className={styles.giftbox2}>
                  <img src="./src/images/ChristmasGift.png" alt="Gift" />
                </div>
                <div className={styles.giftbox1}>
                  <img src="./src/images/ChristmasGift.png" alt="Gift" />
                </div>
              </div>
            )}

            {loading && (
              <div className={styles.loading}>
                <span className={styles.spinner}></span>
              </div>
            )}

            {answer ===
              "Sorry, there are no suitable products for your gift box on our site." &&
              !loading && (
                <div className={styles.noProductsContainer}>
                  <div className={styles.noProductsContent}>
                    <FiPackage className={styles.noProductsIcon} />
                    <p className={styles.noProductsMessage}>
                      Your search did not match any products.
                    </p>
                  </div>
                </div>
              )}

            {answer &&
              answer !==
                "Sorry, there are no suitable products for your gift box on our site." && (
                <div className={styles.answer}>{answer}</div>
              )}

            {!answer && !loading && products.length > 0 && (
              <div className={styles.suggestionList}>
                {products.map((product) => (
                  <div 
                    key={product._id} 
                    className={styles.suggestionCard}
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.longName}
                        className={styles.productImage}
                      />
                    )}
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{product.longName}</div>
                      <div className={styles.productReason}>{product.reason}</div>
                    </div>
                    <img
                      className={styles.navigateIcon}
                      src="./src/images/Internal.png"
                      alt="Navigate to product"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GiftBoxSuggestion;