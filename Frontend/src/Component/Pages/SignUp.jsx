import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styling/Sign.css';
import { Toast } from "../Common/Popup";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("ROLE_STUDENT");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const response = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        setToast({ type: 'error', title: 'Registration Failed', message: data.error || "Registration failed. Please try again." });
      } else {
        setToast({ type: 'success', title: 'Account Created', message: "Registered successfully! Redirecting to sign in..." });
        setFirstName(""); setLastName(""); setEmail(""); setPassword("");
        setTimeout(() => navigate("/signin"), 1600);
      }
    } catch (err) {
      setToast({ type: 'error', title: 'Server Error', message: "Unable to reach the server. Please try again later." });
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
          autoClose={5000}
        />
      )}
      <form onSubmit={handleRegister} className="login-form">
        <h2>Register</h2>
        <p className="form-subtitle">Create your LAKSHYA account</p>
        <div className="form-divider"></div>

        <div className="input-group">
          <label>First Name</label>
          <input type="text" value={firstName} required className="input-field" minLength={3}
            placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input type="text" value={lastName} required className="input-field" minLength={3}
            placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input type="email" value={email} required className="input-field"
            placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} required className="input-field"
            placeholder="Min 5 chars with uppercase, digit & symbol"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" disabled={loading} className="register-button">
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/signin")}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
