import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="dbrd">
      <nav>
        <Link to="/dashboard"> Home </Link>
        <Link to="/employee-list"> Employee List </Link>
        <span>Hukum Gupta</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome Admin Panel</h1>
    </div>
  );
};

export default Dashboard;
