import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
