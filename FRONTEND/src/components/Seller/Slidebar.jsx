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
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: 'none' }}
          >

          <FiHome className={`${styles.navIcon} ${isActive('/seller/dashboard') ? styles.activeIcon : ''}`} />
            <span>Dashboard</span>
          </NavLink>

          {/* Products Section */}
          <div className={`${styles.navGroup} ${expandedItem === 'products' ? styles.expanded : ''}`}>
            <div 
              className={`${styles.navItem} ${isActive('/seller/manage-products') || 
                isActive('/seller/add-products') || 
                isActive('/seller/brand-management') ? styles.navItemActive : ''}`} 
              onClick={() => toggleExpand('products')}
              style={{ textDecoration: 'none' }}
            >
              <FiPackage className={`${styles.navIcon} ${isActive('/seller/manage-products') || 
                isActive('/seller/add-products') || 
                isActive('/seller/brand-management') ? styles.activeIcon : ''}`} />
              <span>Products</span>
              {expandedItem === 'products' ? (
                <FiChevronDown className={styles.chevronIcon} />
              ) : (
                <FiChevronRight className={styles.chevronIcon} />
              )}
            </div>
            <div className={styles.subItemsContainer}>
              <div className={styles.verticalLine}></div>
              <div className={styles.subItems}>
                <NavLink 
                  to="/seller/manage-products" 
                  className={({ isActive }) => 
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: 'none' }}
                >
                  Manage Products
                </NavLink>
                <NavLink 
                  to="/seller/add-products" 
                  className={({ isActive }) => 
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: 'none' }}
                >
                  Add Products
                </NavLink>
                <NavLink 
                  to="/seller/brand-management" 
                  className={({ isActive }) => 
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: 'none' }}
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
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: 'none' }}
          >
            <FiTrendingUp className={`${styles.navIcon} ${isActive('/seller/growth') ? styles.activeIcon : ''}`} />
            <span>Growth</span>
          </NavLink>

          {/* Orders & Reviews */}
          <div className={`${styles.navGroup} ${expandedItem === 'ordersReviews' ? styles.expanded : ''}`}>
            <div 
              className={`${styles.navItem} ${isActive('/seller/orders') || 
                isActive('/seller/reviews') ? styles.navItemActive : ''}`} 
              onClick={() => toggleExpand('ordersReviews')}
              style={{ textDecoration: 'none' }}
            >
              <FiShoppingBag className={`${styles.navIcon} ${isActive('/seller/orders') || 
                isActive('/seller/reviews') ? styles.activeIcon : ''}`} />
              <span>Orders Reviews</span>
              {expandedItem === 'ordersReviews' ? (
                <FiChevronDown className={styles.chevronIcon} />
              ) : (
                <FiChevronRight className={styles.chevronIcon} />
              )}
            </div>
            <div className={styles.subItemsContainer}>
              <div className={styles.verticalLine}></div>
              <div className={styles.subItems}>
                <NavLink 
                  to="/seller/orders" 
                  className={({ isActive }) => 
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: 'none' }}
                >
                  Orders
                </NavLink>
                <NavLink 
                  to="/seller/reviews" 
                  className={({ isActive }) => 
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: 'none' }}
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>

         

          {/* My Profile */}
          <NavLink 
            to="/seller/my-profile" 
            className={({ isActive }) => 
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: 'none' }}
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