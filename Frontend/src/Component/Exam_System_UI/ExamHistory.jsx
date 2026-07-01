import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyHistory } from "../Service/QuizService";
import "./Styles/ExamHistory.css";

const gradeColor = (pct) =>
  pct >= 60 ? "var(--primary)" : pct >= 45 ? "#f5a623" : "#ff4757";

const gradeLabel = (pct) =>
  pct >= 90 ? "A+" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 45 ? "C" : "F";

const subjectIcons = {
  Java: "☕", Python: "🐍", MySQL: "🗄️", JavaScript: "📜",
  DSA: "🌳", "C++": "⚙️", HTML: "🌐", CSS: "🎨", default: "📘",
};

const ExamHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyHistory();
        // sort newest first
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt)
        );
        setHistory(sorted);
      } catch (e) {
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          setError("Please sign in to view your exam history.");
        } else {
          setError("Failed to load history. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const subjects = ["All", ...new Set(history.map((h) => h.subject))];
  const filtered =
    filterSubject === "All" ? history : history.filter((h) => h.subject === filterSubject);

  const bestPct = filtered.length
    ? Math.max(...filtered.map((h) => h.percentage))
    : 0;
  const avgPct = filtered.length
    ? Math.round(filtered.reduce((s, h) => s + h.percentage, 0) / filtered.length)
    : 0;

  if (loading) return (
    <div className="eh-center">
      <div className="eh-spinner" />
      <p className="eh-muted">Loading your history…</p>
    </div>
  );

  if (error) return (
    <div className="eh-center">
      <p className="eh-error">{error}</p>
      <button className="eh-btn" onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  );

  return (
    <div className="eh-page">
      {/* Header */}
      <div className="eh-header">
        <h1 className="eh-title">My Exam History</h1>
        <p className="eh-subtitle">Track your progress across all subjects</p>
      </div>

      {/* Stats bar */}
      {history.length > 0 && (
        <div className="eh-stats-bar">
          <div className="eh-stat-card">
            <span className="eh-stat-label">Total Attempts</span>
            <span className="eh-stat-val">{filtered.length}</span>
          </div>
          <div className="eh-stat-card">
            <span className="eh-stat-label">Best Score</span>
            <span className="eh-stat-val" style={{ color: gradeColor(bestPct) }}>
              {bestPct.toFixed(0)}%
            </span>
          </div>
          <div className="eh-stat-card">
            <span className="eh-stat-label">Average Score</span>
            <span className="eh-stat-val" style={{ color: gradeColor(avgPct) }}>
              {avgPct}%
            </span>
          </div>
        </div>
      )}

      {/* Subject filter */}
      {subjects.length > 2 && (
        <div className="eh-filter-row">
          {subjects.map((s) => (
            <button
              key={s}
              className={`eh-filter-btn ${filterSubject === s ? "eh-filter-active" : ""}`}
              onClick={() => setFilterSubject(s)}
            >
              {s !== "All" && (subjectIcons[s] || subjectIcons.default) + " "}
              {s}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <div className="eh-empty">
          <span className="eh-empty-icon">📋</span>
          <p>No exam attempts yet.</p>
          <button className="eh-btn eh-btn-primary" onClick={() => navigate("/attempt-exam")}>
            Start an Exam
          </button>
        </div>
      )}

      {/* History cards */}
      <div className="eh-list">
        {filtered.map((item, idx) => {
          const pct   = Math.round(item.percentage);
          const color = gradeColor(pct);
          const grade = gradeLabel(pct);
          const icon  = subjectIcons[item.subject] || subjectIcons.default;
          const date  = new Date(item.attemptedAt);
          const dateStr = date.toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
          });
          const timeStr = date.toLocaleTimeString("en-IN", {
            hour: "2-digit", minute: "2-digit",
          });
          const circumference = 2 * Math.PI * 18;
          const dashOffset    = circumference * (1 - pct / 100);

          return (
            <div key={item.id ?? idx} className="eh-card">
              {/* Left: subject */}
              <div className="eh-card-left">
                <span className="eh-card-icon">{icon}</span>
                <div>
                  <p className="eh-card-subject">{item.subject}</p>
                  <p className="eh-card-date">{dateStr} · {timeStr}</p>
                </div>
              </div>

              {/* Middle: score bar */}
              <div className="eh-card-mid">
                <div className="eh-score-bar-wrap">
                  <div
                    className="eh-score-bar-fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="eh-score-fraction">
                  {item.score} / {item.totalQuestions} correct
                </span>
              </div>

              {/* Right: ring + grade */}
              <div className="eh-card-right">
                <div className="eh-ring-wrap">
                  <svg width="52" height="52" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="var(--surface3)" strokeWidth="4" />
                    <circle
                      cx="22" cy="22" r="18" fill="none"
                      stroke={color} strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 22 22)"
                    />
                  </svg>
                  <div className="eh-ring-label">
                    <span className="eh-ring-pct" style={{ color }}>{pct}%</span>
                  </div>
                </div>
                <span className="eh-grade" style={{ color }}>{grade}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom action */}
      {history.length > 0 && (
        <div className="eh-bottom">
          <button className="eh-btn eh-btn-primary" onClick={() => navigate("/attempt-exam")}>
            + Attempt New Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamHistory;
