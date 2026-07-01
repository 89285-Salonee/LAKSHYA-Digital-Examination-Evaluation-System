import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Layout/Navbar";
import Footer from "./Component/Layout/Footer";
import Home from "./Component/Pages/Home";
import About from "./Component/Pages/About";
import Contact from "./Component/Pages/Contact";
import Feedback from "./Component/Pages/Feedback";
import SignIn from "./Component/Pages/SignIn";
import SignUp from "./Component/Pages/SignUp";
import AuthProvider from "./context/AuthContext";
import "./App.css";
import QuizStarter from "./Component/Exam_System_UI/QuizStarter";
import ManageQuizzes from "./Component/Exam_System_UI/ManageQuizzes";
import QuizPage from "./Component/Exam_System_UI/QuizPage";
import ExamHistory from "./Component/Exam_System_UI/ExamHistory";

function App() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(80);

  // Measure actual navbar height whenever it expands/collapses or window resizes
  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };
    // slight delay so the collapse animation has started
    const t = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [isNavbarExpanded]);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar
            isExpanded={isNavbarExpanded}
            setIsExpanded={setIsNavbarExpanded}
            navRef={navRef}
          />
          <main
            style={{
              paddingTop: navHeight + 16 + "px",
              transition: "padding-top 0.3s ease",
              minHeight: "80vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/attempt-exam" element={<QuizStarter />} />
              <Route path="/manage-exams" element={<ManageQuizzes />} />
              <Route path="/attempt-exam/:subject" element={<QuizPage />} />
              <Route path="/my-history" element={<ExamHistory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
