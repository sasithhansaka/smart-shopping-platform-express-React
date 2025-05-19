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
    if (
      location.pathname.includes("/seller/manage-products") ||
      location.pathname.includes("/seller/add-products") ||
      location.pathname.includes("/seller/brand-management")
    ) {
      setExpandedItem("products");
    } else if (
      location.pathname.includes("/seller/orders") ||
      location.pathname.includes("/seller/reviews")
    ) {
      setExpandedItem("ordersReviews");
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

          {/* Products Section */}
          {/* <div
            className={`${styles.navGroup} ${
              expandedItem === "products" ? styles.expanded : ""
            }`}
          >
            <div
              className={`${styles.navItem} ${
                isActive("/seller/manage-products") ||
                isActive("/seller/add-products") ||
                isActive("/seller/brand-management")
                  ? styles.navItemActive
                  : ""
              }`}
              onClick={() => toggleExpand("products")}
              style={{ textDecoration: "none" }}
            >
              <FiPackage
                className={`${styles.navIcon} ${
                  isActive("/seller/manage-products") ||
                  isActive("/seller/add-products") ||
                  isActive("/seller/brand-management")
                    ? styles.activeIcon
                    : ""
                }`}
              />
              <span>Products</span>
              {expandedItem === "products" ? (
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
                  style={{ textDecoration: "none" }}
                >
                  Manage Products
                </NavLink>
                <NavLink
                  to="/seller/add-products"
                  className={({ isActive }) =>
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: "none" }}
                >
                  Add Products
                </NavLink>
                <NavLink
                  to="/seller/brand-management"
                  className={({ isActive }) =>
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: "none" }}
                >
                  Brand Management
                </NavLink>
              </div>
            </div>
          </div> */}

          {/* Growth */}
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

          {/* Orders & Reviews
          <div
            className={`${styles.navGroup} ${
              expandedItem === "ordersReviews" ? styles.expanded : ""
            }`}
          >
            <div
              className={`${styles.navItem} ${
                isActive("/seller/orders") || isActive("/seller/reviews")
                  ? styles.navItemActive
                  : ""
              }`}
              onClick={() => toggleExpand("ordersReviews")}
              style={{ textDecoration: "none" }}
            >
              <FiShoppingBag
                className={`${styles.navIcon} ${
                  isActive("/seller/orders") || isActive("/seller/reviews")
                    ? styles.activeIcon
                    : ""
                }`}
              />
              <span>Orders Reviews</span>
              {expandedItem === "ordersReviews" ? (
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
                  style={{ textDecoration: "none" }}
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/seller/reviews"
                  className={({ isActive }) =>
                    isActive ? styles.subItemActive : styles.subItem
                  }
                  style={{ textDecoration: "none" }}
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div> */}

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
