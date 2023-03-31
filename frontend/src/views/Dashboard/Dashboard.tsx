import "./Dashboard.scss";
import React from "react";
import { Sidebar } from "../../components";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
