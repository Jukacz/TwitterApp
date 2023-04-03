import "./Dashboard.scss";
import React from "react";
import { Sidebar } from "../../components";
import { Outlet, Route, Routes } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
