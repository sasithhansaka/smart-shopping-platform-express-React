// Navbar.jsx
import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
      </div>
      <div className={styles.navbarBottom}>
        <div className={styles.navbarBottomLeft}>
          <img src="./src/images/Sorting.png" alt="Sorting" />
          <h4>ALL CATEGORIES</h4>
          <img src="./src/images/Down Button.png" alt="Sorting" />
        </div>
        <div className={styles.navbarBottomCenter}>
          <a href="#" className={styles.navLink}>
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
          <h4>PROFILE</h4>
          <img src="./src/images/Expand Arrow.png" alt="Sorting" />
        </div>
      </div>
      {/* <div className={styles.navbarLeft}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.searchContainer}>
          <select className={styles.categoryDropdown}>
            <option>All Categories</option>
            <option>Home</option>
            <option>Gifts</option>
            <option>Electronics</option>
            <option>Clothing</option>
          </select>
          <input 
            type="text" 
            placeholder="Search for anything" 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>SEARCH</button>
        </div>
      </div>
      
      <div className={styles.navbarRight}>
        <a href="#" className={styles.navLink}>Home</a>
        <a href="#" className={styles.navLink}>Gifts</a>
        <a href="#" className={styles.navLink}>Sell</a>
        <a href="#" className={styles.navLink}>Store</a>
        <a href="#" className={styles.navLink}>Help & Contact</a>
        <div className={styles.userGreeting}>Hi John!</div>
      </div> */}
    </nav>
  );
};

export default Navbar;
