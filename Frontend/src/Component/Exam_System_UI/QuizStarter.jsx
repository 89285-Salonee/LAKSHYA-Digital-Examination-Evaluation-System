import React, { useEffect, useState } from "react";
import { getSubjects } from "../Service/QuizService";
import { useNavigate } from "react-router-dom";
import "./Styles/QuizStarter.css";

const subjectIcons = {
  Java: "☕", Python: "🐍", MySQL: "🗄️", JavaScript: "📜",
  DSA: "🌳", "C++": "⚙️", HTML: "🌐", CSS: "🎨",
  default: "📘"
};

const QuizStarter = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllSubjects();
  }, []);

  return (
    <div className="quiz-container">
      <h2 className="exams-heading">Available Exams</h2>
      <p className="exams-subheading">Select a subject to begin your examination</p>
      <div className="subject-cards">
        {subjects.map((subject, idx) => (
          <div key={idx} className="subject-card">
            <div style={{fontSize:'2rem', marginBottom:8}}>{subjectIcons[subject] || subjectIcons.default}</div>
            <h3>{subject}</h3>
            <p>Click below to start the {subject} exam</p>
            <button onClick={() => navigate(`/attempt-exam/${subject}`)}>Attempt Exam</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizStarter;
