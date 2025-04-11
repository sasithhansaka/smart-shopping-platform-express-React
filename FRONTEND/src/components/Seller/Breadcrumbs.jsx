// components/Seller/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x && x !== 'seller');

  // Skip breadcrumbs on dashboard/welcome page
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return null;
  }

  const getReadableName = (segment) => {
    const nameMap = {
      '': 'Home',
      'manage-products': 'Manage Products',
      'add-products': 'Add Products',
      'brand-management': 'Brand Management',
      'growth': 'Growth',
      'orders': 'Orders',
      'reviews': 'Reviews',
      'settings': 'Settings',
      'my-profile': 'My Profile'
    };
    return nameMap[segment] || segment.replace(/-/g, ' ');
  };

  // Start with Home as the first breadcrumb
  const breadcrumbs = [
    { path: '/seller', name: 'Home' }
  ];

  // Build the rest of the path
  let currentPath = '/seller';
  pathnames.forEach(segment => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      path: currentPath,
      name: getReadableName(segment)
    });
  });

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <span className={styles.separator}> &gt; </span>}
          {index === breadcrumbs.length - 1 ? (
            <span className={styles.current}>{crumb.name}</span>
          ) : (
            <Link to={crumb.path} className={styles.link}>
              {crumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;