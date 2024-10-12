import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logOut from './LogOut';

function NavBar() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLoggedIn"));

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {console.log(isLogged)}
        <Link to="/">
          <Navbar.Brand href="#">ShaRecipe</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
          </Nav>
          
          <div className="d-flex">
            {(isLogged === null || isLogged != "true") ? 
            <>
            <Link to="/login">
              <Button 
                variant="outline-dark" 
                style={{ borderRadius: '12px', marginRight: '8px' }}>
                Sign In
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                variant="dark" 
                style={{ borderRadius: '12px' }}>
                Sign Up
              </Button>
            </Link>
            </>
            :
              <Button 
                variant="dark" 
                style={{ borderRadius: '12px' }}
                onClick={() => logOut(setIsLogged)}>
                Log Out
              </Button>

            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
