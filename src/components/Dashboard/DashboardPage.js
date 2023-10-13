import React from 'react';
import './DashboardPage.css';
import Navbar from './Dashboard Components/Navbar/Navbar';
import Sidebar from './Dashboard Components/Sidebar/Sidebar';
import Home from './Dashboard Pages/Home/Home'

const DashboardPage = () => {
  return (
    <div className="dashboard_page_container">
      <Navbar />
      <div className="sidebar_container">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
};

export default DashboardPage;
