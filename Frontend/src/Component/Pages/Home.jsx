import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styling/Home.css";

const Home = () => {
  const features = [
    { icon: "📊", title: "Always Accessible", text: "Available 24/7 from any device with internet access. Take exams anytime, anywhere without physical constraints." },
    { icon: "🏆", title: "Engaging Experience", text: "Interactive formats increase engagement and keep learners actively motivated, fostering deeper learning." },
    { icon: "📱", title: "Continuous Growth", text: "Easily updated exam content aligned with the current syllabus. Supports repeated attempts to reinforce knowledge." },
  ];

  const categories = [
    { id: 1, name: "General Knowledge", desc: "Test your knowledge about the world", icon: "🌍" },
    { id: 2, name: "Science", desc: "Explore the wonders of science", icon: "🔬" },
    { id: 3, name: "History", desc: "Journey through historical events", icon: "🏛️" },
    { id: 4, name: "Programming", desc: "Challenge your coding knowledge", icon: "💻" },
  ];

  const stats = [
    { num: "500+", label: "Questions" },
    { num: "10+", label: "Subjects" },
    { num: "1000+", label: "Students" },
    { num: "99%", label: "Uptime" },
  ];

  return (
    <Container className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-badge">Digital Examination Platform</div>
        <h1 className="hero-title">
          Welcome to <span>LAKSHYA</span>
        </h1>
        <p className="hero-subtitle">" ज्ञानस्य दीपः विद्यर्थीणां कृते "</p>
        <div className="hero-buttons">
          <Button as={Link} to="/signup" className="btn-primary-gold">Get Started</Button>
          <Button as={Link} to="/about" className="btn-outline-gold">Learn More</Button>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-strip">
        {stats.map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="py-4">
        <div className="text-center mb-2">
          <h2 className="section-title">Why Choose <span>LAKSHYA</span>?</h2>
        </div>
        <div className="section-line"></div>
        <Row className="g-4">
          {features.map((f, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 feature-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon">{f.icon}</div>
                  <Card.Title>{f.title}</Card.Title>
                  <Card.Text>{f.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Categories */}
      <section className="py-5">
        <div className="text-center mb-2">
          <h2 className="section-title">Exam <span>Categories</span></h2>
        </div>
        <div className="section-line"></div>
        <Row className="g-4">
          {categories.map(c => (
            <Col key={c.id} md={3} sm={6}>
              <Card className="h-100 category-card">
                <Card.Body className="text-center p-4">
                  <div className="category-icon">{c.icon}</div>
                  <Card.Title>{c.name}</Card.Title>
                  <Card.Text>{c.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;
