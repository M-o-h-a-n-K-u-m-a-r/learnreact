import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SalesPersonDropdown from '../components/SalesPersonDropdown.jsx';
import SalesChartPanel from '../components/SalesChartPanel.jsx';
import InvoicePanel from '../components/InvoicePanel.jsx';
import { fetchDashboardData } from '../service/salespersonapi.js';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const [user, setUser] = useState({});
  const [widgets, setWidgets] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Button show timeout
    const timer = setTimeout(() => setShowButton(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { user, widgets, salesPersons } = await fetchDashboardData();
        setUser(user);
        setWidgets(widgets);
        setSalesPersons(salesPersons);
        setSelectedSalesPerson(user.salesPersonCode || '');
        setHasPermission(widgets.length > 0);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }; 

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AppNavbar />

      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Header user={user} />
          <div className="container">
            <h2>Sales Dashboard</h2>

            {!hasPermission && <div className="alert alert-info">No permissions available</div>}

            {hasPermission && (
              <>
                <SalesPersonDropdown
                  salesPersons={salesPersons}
                  selected={selectedSalesPerson}
                  onChange={setSelectedSalesPerson}
                  user={user}
                />
                <div className="row">
                  {widgets.includes(1) && <SalesChartPanel title="Year To Date Sales Chart" />}
                  {widgets.includes(2) && <SalesChartPanel title="Year To Date Panel" />}
                </div>
                {widgets.includes(3) && <InvoicePanel />}
              </>
            )}
          </div>
        </main>
      </div>

      {showButton && (
        <div className="d-flex justify-content-center">
          <Button variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            &nbsp;Loading...
          </Button>
        </div>
      )}
    </>
  );
}

export default Dashboard;
