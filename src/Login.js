import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import credentials from './JSON/LoginCredentials.json';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = credentials.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      navigate('/dashboard');
    } else {
      setError('Invalid Username or Password');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClear = () => {
    setUsername('');
    setPassword('');
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2 className="mb-4 text-center"><b><i>Login</i></b></h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label><b>Username</b></Form.Label>
          <Form.Control
            ref={usernameRef}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="info" type="submit">
            Login
          </Button>
        </div>
        <br />
        <div className="d-grid">
          <Button variant="danger" type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <br></br>
        {error && <Alert variant="danger">{error}</Alert>}

      </Form>
    </Container>
  );
}

export default Login;
