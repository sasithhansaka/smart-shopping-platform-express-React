import React from "react";
// import Slidebar from "../components/Seller/Slidebar";
import AdminSliderBar from "../components/Admin/AdminSliderBar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <AdminSliderBar>
        <Outlet />
      </AdminSliderBar>
    </div>
  );
}

export default AdminPage;
