import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-1">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} My Movie App. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Follow us on:</p>
            <a href="#" className="text-light me-2">Facebook</a>
            <a href="#" className="text-light me-2">Twitter</a>
            <a href="#" className="text-light">Instagram</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
