import React from "react";
import styles from "./AdminSlideBar.module.css";
import  { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiSettings,
  FiUser,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

function AdminSliderBar() {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
   
  }, [location.pathname]);

  const toggleExpand = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={styles.sellerDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>ADMIN PANEL</h2>
        </div>

        <nav className={styles.sidebarNav}>
          <NavLink
            to="/admin/home"
            end
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: "none" }}
          >
            <FiHome
              className={`${styles.navIcon} ${
                isActive("/admin/home") ? styles.activeIcon : ""
              }`}
            />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: "none" }}
          >
            <FiTrendingUp
              className={`${styles.navIcon} ${
                isActive("/admin/orders") ? styles.activeIcon : ""
              }`}
            />
            <span>Orders</span>
          </NavLink>

          {/* My Profile */}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
            style={{ textDecoration: "none" }}
          >
            <FiUser
              className={`${styles.navIcon} ${
                isActive("/admin/products") ? styles.activeIcon : ""
              }`}
            />
            <span>Products</span>
          </NavLink>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminSliderBar;
