// components/Seller/Slidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiSettings,
  FiUser,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";
import styles from './Slidebar.module.css';

const Slidebar = () => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (location.pathname.includes('/seller/manage-products') || 
        location.pathname.includes('/seller/add-products') ||
        location.pathname.includes('/seller/brand-management')) {
      setExpandedItem('products');
    } else if (location.pathname.includes('/seller/orders') || 
               location.pathname.includes('/seller/reviews')) {
      setExpandedItem('ordersReviews');
    } else {
      setExpandedItem(null);
    }
  }, [location.pathname]);

  const toggleExpand = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={styles.sellerDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>BRAND SELLER CENTER</h2>
        </div>
        
        <nav className={styles.sidebarNav}>
          <NavLink 
            to="/seller/dashboard" 
            end 
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <FiHome className={`${styles.navIcon} ${isActive('/seller/dashboard') ? styles.activeIcon : ''}`} />
            <span>Dashboard</span>
          </NavLink>

          {/* Products Section */}
          <div className={`${styles.navGroup} ${expandedItem === 'products' ? styles.expanded : ''}`}>
            <div 
              className={`${styles.navItem} ${isActive('/seller/manage-products') || 
                isActive('/seller/add-products') || 
                isActive('/seller/brand-management') ? styles.active : ''}`} 
              onClick={() => toggleExpand('products')}
            >
              <FiPackage className={`${styles.navIcon} ${isActive('/seller/manage-products') || 
                isActive('/seller/add-products') || 
                isActive('/seller/brand-management') ? styles.activeIcon : ''}`} />
              <span>Products</span>
              {expandedItem === 'products' ? <FiChevronDown /> : <FiChevronRight />}
            </div>
            <div className={styles.subItemsContainer}>
              <div className={styles.verticalLine}></div>
              <div className={styles.subItems}>
                <NavLink 
                  to="/seller/manage-products" 
                  className={({ isActive }) => 
                    `${styles.subItem} ${isActive ? styles.active : ''}`
                  }
                >
                  Manage Products
                </NavLink>
                <NavLink 
                  to="/seller/add-products" 
                  className={({ isActive }) => 
                    `${styles.subItem} ${isActive ? styles.active : ''}`
                  }
                >
                  Add Products
                </NavLink>
                <NavLink 
                  to="/seller/brand-management" 
                  className={({ isActive }) => 
                    `${styles.subItem} ${isActive ? styles.active : ''}`
                  }
                >
                  Brand Management
                </NavLink>
              </div>
            </div>
          </div>

          {/* Growth */}
          <NavLink 
            to="/seller/growth" 
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <FiTrendingUp className={`${styles.navIcon} ${isActive('/seller/growth') ? styles.activeIcon : ''}`} />
            <span>Growth</span>
          </NavLink>

          {/* Orders & Reviews */}
          <div className={`${styles.navGroup} ${expandedItem === 'ordersReviews' ? styles.expanded : ''}`}>
            <div 
              className={`${styles.navItem} ${isActive('/seller/orders') || 
                isActive('/seller/reviews') ? styles.active : ''}`} 
              onClick={() => toggleExpand('ordersReviews')}
            >
              <FiShoppingBag className={`${styles.navIcon} ${isActive('/seller/orders') || 
                isActive('/seller/reviews') ? styles.activeIcon : ''}`} />
              <span>Orders Reviews</span>
              {expandedItem === 'ordersReviews' ? <FiChevronDown /> : <FiChevronRight />}
            </div>
            <div className={styles.subItemsContainer}>
              <div className={styles.verticalLine}></div>
              <div className={styles.subItems}>
                <NavLink 
                  to="/seller/orders" 
                  className={({ isActive }) => 
                    `${styles.subItem} ${isActive ? styles.active : ''}`
                  }
                >
                  Orders
                </NavLink>
                <NavLink 
                  to="/seller/reviews" 
                  className={({ isActive }) => 
                    `${styles.subItem} ${isActive ? styles.active : ''}`
                  }
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>

          {/* Settings */}
          <NavLink 
            to="/seller/settings" 
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <FiSettings className={`${styles.navIcon} ${isActive('/seller/settings') ? styles.activeIcon : ''}`} />
            <span>Settings</span>
          </NavLink>

          {/* My Profile */}
          <NavLink 
            to="/seller/my-profile" 
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <FiUser className={`${styles.navIcon} ${isActive('/seller/my-profile') ? styles.activeIcon : ''}`} />
            <span>My Profile</span>
          </NavLink>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Slidebar;