import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import { Container, Card } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import LoadingSpinner from './components/LoadingSpinner';
import { React, useState, useEffect } from "react";

function BOL() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
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
          <h2>BOL</h2>
          <p>Welcome to the BOL page</p>
        </Card>
      </Container>

      <div className="mt-3 d-flex justify-content-center">
        <Button variant="success" size="lg" onClick={() => navigate("/dashboard")} type="button">
          Home
        </Button>
      </div>
    </>
  );
}

export default BOL;