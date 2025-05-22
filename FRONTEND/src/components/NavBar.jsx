// Navbar.jsx
import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

   const NewAccountClick = () => {
    navigate("/auth");
  };

  const handleProfileClick = () => {
    navigate("/Profile");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTop}>
        <div className={styles.navbarTopLeft}>
          <h1 className={styles.logo}>TRADENEST</h1>
        </div>
        <div className={styles.navbarTopCenter}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for anything"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>SEARCH</button>
            <select className={styles.categoryDropdown}>
              <option>All Categories</option>
              <option>Home</option>
              <option>Gifts</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
          </div>
        </div>
        <h4  onClick={(e) => {
              e.preventDefault();
              NewAccountClick();
            }}>NEW ACCOUNT</h4>
      </div>
      <div className={styles.navbarBottom}>
        <div className={styles.navbarBottomLeft}>
          <img src="./src/images/Sorting.png" alt="Sorting" />
          <h4>ALL CATEGORIES</h4>
          <img src="./src/images/Down Button.png" alt="Sorting" />
        </div>
        <div className={styles.navbarBottomCenter}>
          <a
            href="#"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleHomeClick();
            }}
          >
            Home
          </a>
          <a href="#" className={styles.navLink}>
            Gifts
          </a>
          <a href="#" className={styles.navLink}>
            Sell
          </a>
          <a href="#" className={styles.navLink}>
            Store
          </a>
          <a href="#" className={styles.navLink}>
            Help & Contact
          </a>
        </div>
        <div className={styles.navbarBottomRight}>
          <img src="./src/images/Shopping Bag.png" alt="Sorting" />
          <img src="./src/images/Gift1.png" alt="Sorting" />
          <h4 onClick={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}>PROFILE</h4>
          <img src="./src/images/Expand Arrow.png" alt="Sorting" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
