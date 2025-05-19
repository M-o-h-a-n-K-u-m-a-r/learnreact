import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './masters/Dashboard.js';
import Login from './Login.js';
import BOL from './BOL.js';
import BronzeFrameSize from './masters/BronzeFrameSize.js';
import ProductionProcessStatus from './masters/ProductionProcessStatus.js';
import Customer from './masters/Customer.js';
import Admin from './Admin.js';
import Inventory from './masters/Inventory.js';
import Orders from './masters/Orders.js';

import 'react-bootstrap';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/BOL" element={<BOL />} />
        <Route path="/BronzeFrameSize" element={<BronzeFrameSize />} />
        <Route path="/ProductionProcessStatus" element={<ProductionProcessStatus />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Admin" element={<Admin />} />

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

