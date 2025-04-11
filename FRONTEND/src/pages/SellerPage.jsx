// pages/SellerPage.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Slidebar from '../components/Seller/Slidebar';

function SellerPage() {
  return (
    <div>
      <Slidebar>
        <Outlet />
      </Slidebar>
    </div>
  );
}

export default SellerPage;