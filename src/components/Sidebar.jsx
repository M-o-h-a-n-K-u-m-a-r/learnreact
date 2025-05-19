import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar bg-dark text-white p-3" style={{ minHeight: '100vh', width: '220px', float: 'left' }}>
      <h5 className="text-white">Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/Customer">Customer</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/Inventory">Inventory</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
