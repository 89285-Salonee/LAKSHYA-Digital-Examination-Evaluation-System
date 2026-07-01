import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <h5>LAKSHYA</h5>
            <p className="brand-sub-footer">Digital Examination &amp; Evaluation System</p>
            <p className="footpara">Empowering learners through smart, accessible, and interactive digital examination technology.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/feedback">Feedback</a></li>
            </ul>
          </Col>
          <Col md={3} className="footer-col">
            <h5>Contact Info</h5>
            <address>
              <p className="footpara">📧 info@lakshya.ac.in</p>
              <p className="footpara">📞 +91 111-222-3344</p>
              <p className="footpara">📍 CDAC Kharghar, Mumbai</p>
            </address>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3 footer-credits">
            <div className="divider-gold"></div>
            <p style={{color:'var(--text-muted)', fontSize:14, marginTop:16}}>
              Crafted with <span style={{color:'var(--gold)'}}>♦</span> by Ritik, Salonee, Shreya, Sneha &amp; Varad &nbsp;·&nbsp; CDAC Mumbai © 2026
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
