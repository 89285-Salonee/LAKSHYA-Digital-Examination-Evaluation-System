import React, { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin, storeToken } from "../Service/AdminService";
import "../Styling/Sign.css";
import { AuthContext } from "../../context/AuthContext";
import { Toast } from "../Common/Popup";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const response = await loginAdmin(formData);
      if (response.status === 201 && response.data.jwt) {
        const token = response.data.jwt;
        storeToken(token);
        const decoded = jwtDecode(token);
        const userRole = decoded.authorities?.[0] || null;
        setIsAuthenticated(true);
        setRole(userRole);
        setToast({ type: 'success', title: 'Welcome Back', message: 'Login successful! Redirecting...' });
        setTimeout(() => navigate("/"), 1400);
      }
    } catch (error) {
      setToast({ type: 'error', title: 'Login Failed', message: error.response?.data?.message || "Invalid credentials. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
          autoClose={4000}
        />
      )}
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sign In</h2>
        <p className="form-subtitle">Welcome back to LAKSHYA</p>
        <div className="form-divider"></div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input className="input" type="email" id="email" name="email"
            value={formData.email} onChange={handleChange}
            placeholder="you@example.com" required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input className="input" type="password" name="password" id="password"
            value={formData.password} onChange={handleChange}
            placeholder="Enter your password" required />
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Authenticating..." : "Sign In"}
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/signup" className="register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
