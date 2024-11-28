import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <nav>
        <Link to="/dashboard"> Home </Link>
        <Link to="/employee-list"> Employee List </Link>
        {/*<Link to="/employee-create"> Employee Create </Link>*/}
        <span>Hukum Gupta</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Welcome Admin Panel</h1>
    </div>
  );
};

export default Dashboard;
