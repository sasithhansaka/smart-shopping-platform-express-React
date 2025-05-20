import React, { useState } from "react";
import styles from "./GiftBoxSuggestion.module.css";
import axios from "axios";

function GiftBoxSuggestion() {
  const [story, setStory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  // Fetch product details for each suggestion by id
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
            <div className={styles.header}>
              {/* <span role="img" aria-label="gift">🎁</span> Gift Box Suggestion */}
            </div>
            <form onSubmit={handleSubmit} className={styles.formgiftBox}>
              {/* <p>What is your thourgh</p> */}
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
                />

                <button type="submit" className={styles.button}>
                  <span className={styles.iconCircle}>
                    <img src="./src/images/Gift.png" alt="Gift" />
                  </span>
                  Find the gift
                </button>
              </div>
            </form>

            {/* {loading && <div className={styles.loading}>Loading...</div>} */}

            {/* Show answer if present */}
            {answer && <div className={styles.answer}>{answer}</div>}

            {/* Show product suggestions if available */}
            {!answer && !loading && products.length > 0 && (
              <div className={styles.suggestionList}>
                {products.map((prod) => (
                  <div key={prod._id} className={styles.suggestionCard}>
                    {prod.image && (
                      <img
                        src={prod.image}
                        alt={prod.longName}
                        className={styles.productImage}
                      />
                    )}
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{prod.longName}</div>
                      <div className={styles.productReason}>{prod.reason}</div>
                    </div>
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
