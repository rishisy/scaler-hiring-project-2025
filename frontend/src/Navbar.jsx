import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from './contexts/authContext.jsx';
import { useContext } from 'react';

function Navigation() {
    const {user} = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/students">Students</Nav.Link>
            <Nav.Link href="/room">Evaluation Room</Nav.Link>
            <Nav.Link href="">Logged : {user.user_name }</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Start Evaluation </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Evaluation Pending
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;


