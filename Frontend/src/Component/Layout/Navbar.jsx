import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";
import { getToken, removeToken, storeToken } from "../Service/AdminService";
import { jwtDecode } from "jwt-decode";
import lakshyaIcon from "../../assets/LAKSHYAicon.png";

const CustomNavbar = ({ isExpanded, setIsExpanded, navRef }) => {
  const { isAuthenticated, setIsAuthenticated, role, setRole, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = getToken();
  let userEmail = "";
  if (token) {
    try {
      const decode = jwtDecode(token);
      userEmail = decode.sub;
    } catch(e) {}
  }

  const handleLogout = () => {
    storeToken("token");
    removeToken();
    setRole(null);
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const LogoMark = () => (
    <img src={lakshyaIcon} alt="LAKSHYA" className="navbar-logo-icon" />
  );

  const ProfileAvatar = ({ email }) => (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#030712', fontSize: 15
    }}>
      {email ? email[0].toUpperCase() : 'U'}
    </div>
  );

  return (
    <Navbar ref={navRef} variant="dark" expand="lg" fixed="top" className="custom-navbar"
      expanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <LogoMark />
          <div>
            LAKSHYA
            <span className="brand-sub">Digital Examination &amp; Evaluation System</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
            <Nav.Link as={Link} to="/feedback" className="nav-link">Feedback</Nav.Link>
          </Nav>

          {!loading && !isAuthenticated && (
            <Nav>
              <Button as={Link} to="/signin" className="nav-button">Sign In</Button>
            </Nav>
          )}

          {!loading && isAuthenticated && role === "ROLE_STUDENT" && (
            <Nav className="align-items-center gap-2">
              <Nav.Link as={Link} to="/attempt-exam" className="nav-link">My Exams</Nav.Link>
              <Nav.Link as={Link} to="/my-history" className="nav-link">My History</Nav.Link>
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-student">
                  <ProfileAvatar email={userEmail} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText><strong style={{color:'var(--primary)'}}>Email:</strong> {userEmail}</Dropdown.ItemText>
                  <Dropdown.ItemText><strong style={{color:'var(--primary)'}}>Role:</strong> {role?.replace("ROLE_", "")}</Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate("/contact")}>Help</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} style={{color:'#fb7185'}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}

          {!loading && isAuthenticated && role === "ROLE_ADMIN" && (
            <Nav className="align-items-center gap-2">
              <Nav.Link as={Link} to="/manage-exams" className="nav-link">Manage Exams</Nav.Link>
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-admin">
                  <ProfileAvatar email={userEmail} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText><strong style={{color:'var(--primary)'}}>Email:</strong> {userEmail}</Dropdown.ItemText>
                  <Dropdown.ItemText><strong style={{color:'var(--primary)'}}>Role:</strong> ADMIN</Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate("/contact")}>Help</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} style={{color:'#fb7185'}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
