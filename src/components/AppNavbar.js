import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SS_New_Logo from './SS_New_Logo.png'; 

function AppNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <img src={SS_New_Logo} style={{ width: '200px', height: '50px' }} alt="Salem Stones" />
      </div>

      <Navbar expand="lg" style={{ backgroundColor: 'darkkhaki' }}>
        <Container fluid>
          <Navbar.Brand href="" onClick={() => navigate('/')}>Logout</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <Nav.Link href="" onClick={() => navigate('/Dashboard')}><b>Dashboard</b></Nav.Link>
              <Nav.Link href="" onClick={() => navigate('/BOL')}><b>BOL</b></Nav.Link>
              <Nav.Link href="" onClick={() => navigate('/Orders')}><b>Orders</b></Nav.Link>
              <NavDropdown title={<b>Masters</b>} id="basic-nav-dropdown">
                <NavDropdown.Item href="" onClick={() => navigate('/BronzeFrameSize')}><b>Bronze Frame Size</b></NavDropdown.Item>
                <NavDropdown.Item href="" onClick={() => navigate('/ProductionProcessStatus')}><b>Production Process Status</b></NavDropdown.Item>
                <NavDropdown.Item href="" onClick={() => navigate('/Customer')}><b>Customer</b></NavDropdown.Item>
                <NavDropdown.Item href="" onClick={() => navigate('/Inventory')}><b>Inventory</b></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" onClick={() => navigate('/Admin')}><b>Admin</b></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
