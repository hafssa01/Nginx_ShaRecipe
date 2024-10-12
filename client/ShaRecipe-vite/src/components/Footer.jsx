import React from 'react';
import Container from 'react-bootstrap/Container';



function Footer() {
  return (
    <footer className="footer fixed-bottom" style={{ 
      backgroundColor: '#f8f9fa',
      color: '#212529', 
      textAlign: 'center',
      padding: '1rem',
      marginTop: 'auto',
  
    }}>
      <Container>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} ShaRecipe. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
