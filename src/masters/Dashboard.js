import { React, useState, useEffect } from "react";
import "react-bootstrap";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar";
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {

  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    funLoad();
  }, []);

  const funLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AppNavbar />

      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ maxWidth: "300px" }} className="p-3 text-center">
          <h2>Dashboard</h2>
          <p>Welcome! You are logged in.</p>
        </Card>
      </Container>

      {/* <div className="mt-3 d-flex justify-content-center"> 
          <Button variant="success" size='lg' onClick={() => navigate('/dashboard')} type="button">Reload</Button>
      </div> */}

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