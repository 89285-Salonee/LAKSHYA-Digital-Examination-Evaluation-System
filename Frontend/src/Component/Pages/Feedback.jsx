import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import "../Styling/Feedback.css";
import { Toast } from "../Common/Popup";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setToast({ type: 'success', title: 'Feedback Received', message: 'Thank you! Your feedback helps us improve LAKSHYA.' });
  };

  return (
    <Container className="feedback-page py-4">
      {toast && (
        <Toast type={toast.type} title={toast.title} message={toast.message}
          onClose={() => setToast(null)} autoClose={5000} />
      )}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="feedback-card" style={{
            background: 'linear-gradient(145deg, var(--surface2), var(--surface3))',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position:'absolute', top:0, left:0, right:0, height:2,
              background:'linear-gradient(90deg, var(--accent), var(--primary))'
            }}/>
            <Card.Body style={{padding:'36px 32px'}}>
              {!submitted ? (
                <>
                  <h1 style={{
                    fontFamily:'Rajdhani, sans-serif',
                    textAlign:'center',
                    marginBottom:28,
                    background:'linear-gradient(135deg, var(--primary-light), var(--primary))',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                    letterSpacing:'2px',
                    textTransform:'uppercase',
                    fontSize:'1.8rem'
                  }}>Share Feedback</h1>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="feedbackType">
                      <Form.Label style={{color:'var(--text-muted)',fontSize:11.5,textTransform:'uppercase',letterSpacing:'1px',fontWeight:600}}>Feedback Type</Form.Label>
                      <Form.Select required className="custom-password-input">
                        <option value="">Select feedback type</option>
                        <option value="suggestion">Any Suggestion?</option>
                        <option value="bug">Report an Issue</option>
                        <option value="compliment">Give Compliment</option>
                        <option value="general">General Feedback</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="feedbackEmail">
                      <Form.Label style={{color:'var(--text-muted)',fontSize:11.5,textTransform:'uppercase',letterSpacing:'1px',fontWeight:600}}>Email Address (Optional)</Form.Label>
                      <Form.Control type="email" placeholder="you@example.com" className="custom-password-input" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="feedbackMessage">
                      <Form.Label style={{color:'var(--text-muted)',fontSize:11.5,textTransform:'uppercase',letterSpacing:'1px',fontWeight:600}}>Your Feedback</Form.Label>
                      <Form.Control as="textarea" rows={4} placeholder="Please provide detailed feedback..." required className="custom-password-input" />
                    </Form.Group>

                    <div className="rating-section mb-4">
                      <Form.Label style={{color:'var(--text-muted)',fontSize:11.5,textTransform:'uppercase',letterSpacing:'1px',fontWeight:600,display:'block',marginBottom:10}}>Overall Experience</Form.Label>
                      <div className="d-flex justify-content-between gap-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="d-flex align-items-center gap-1">
                            <Form.Check type="radio" id={`rating-${num}`} name="rating" value={num} required />
                            <label htmlFor={`rating-${num}`} style={{color:'var(--text-muted)',marginBottom:0,cursor:'pointer'}}>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-grid">
                      <Button type="submit" style={{
                        background:'linear-gradient(135deg, var(--accent), var(--primary))',
                        border:'none',
                        color:'#fff',
                        fontFamily:'Rajdhani, sans-serif',
                        fontWeight:700,
                        letterSpacing:'1.5px',
                        textTransform:'uppercase',
                        borderRadius:10,
                        padding:'13px',
                        fontSize:14,
                        boxShadow:'0 4px 20px rgba(139,92,246,0.2)',
                        transition:'all 0.25s'
                      }}>Submit Feedback</Button>
                    </div>
                  </Form>
                </>
              ) : (
                <div className="text-center" style={{padding:'20px 0'}}>
                  <div style={{fontSize:'3rem', marginBottom:20}}>🎯</div>
                  <h2 style={{
                    fontFamily:'Rajdhani, sans-serif',
                    background:'linear-gradient(135deg, var(--primary-light), var(--primary))',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                    backgroundClip:'text', letterSpacing:'1.5px', textTransform:'uppercase',
                    marginBottom:12
                  }}>Thank You!</h2>
                  <p style={{color:'var(--text-muted)', fontSize:15, lineHeight:1.7}}>
                    We appreciate you taking the time to help us improve LAKSHYA.<br />
                    Your input is valuable and will be carefully reviewed by our team.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
