import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../Styling/Contact.css";
import { Toast } from "../Common/Popup";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setToast({ type: 'success', title: 'Message Sent', message: "Thanks! We'll get back to you shortly." });
  };

  return (
    <Container className="contact-page py-5">
      {toast && (
        <Toast type={toast.type} title={toast.title} message={toast.message}
          onClose={() => setToast(null)} autoClose={5000} />
      )}

      <Row className="g-4">
        <Col md={6}>
          <div className="contact-info">
            <h2 className="mb-4">Get in Touch</h2>
            <p className="mb-4 para">Have questions, suggestions, or feedback? We'd love to hear from you!</p>
            <div className="contact-details">
              <div className="contact-item mb-3"><h5>📍 Address</h5><p className="para">CDAC Mumbai, Kharghar</p></div>
              <div className="contact-item mb-3"><h5>📞 Phone</h5><p className="para">+91 (11) 222-3344</p></div>
              <div className="contact-item mb-3">
                <h5>📧 Email</h5>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@lakshya.ac.in"
                  target="_blank" rel="noreferrer" id="emaillink" className="para">
                  info@lakshya.ac.in
                </a>
              </div>
              <div className="contact-item"><h5>🕐 Working Hours</h5><p className="para">Monday – Friday: 9:00 AM – 6:00 PM</p></div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="contact-form">
            {!submitted ? (
              <Form onSubmit={handleSubmit}>
                <h2 className="mb-4">Send a Message</h2>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required className="custom-password-input" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="you@example.com" required className="custom-password-input" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="How can we help?" required className="custom-password-input" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your message..." required className="custom-password-input" />
                </Form.Group>
                <Button type="submit" className="btn-primary w-100">Send Message</Button>
              </Form>
            ) : (
              <div id="thanks" className="text-center">
                <div style={{fontSize:'3rem', marginBottom:16}}>✅</div>
                <h2 style={{marginBottom:12}}>Message Received!</h2>
                <p className="para">Thank you for reaching out. Our team will respond within 24 hours.</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
