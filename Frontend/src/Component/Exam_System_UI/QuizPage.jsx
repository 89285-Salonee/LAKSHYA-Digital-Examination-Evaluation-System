import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsBySubject, submitExamResult } from "../Service/QuizService";

import "./Styles/QuizPage.css";

const TIMER_SECONDS = 15;

const QuizPage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [questions, setQuestions]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  // exam flow: "start" | "exam" | "result"
  const [phase, setPhase]             = useState("start");

  const [currentIdx, setCurrentIdx]   = useState(0);
  const [answers, setAnswers]         = useState({});   // { [questionId]: choiceString }
  const [timeLeft, setTimeLeft]       = useState(TIMER_SECONDS);
  const [autoAdvanced, setAutoAdvanced] = useState(false); // flag to show "time up" briefly

  const [score, setScore]             = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");

  const timerRef = useRef(null);

  // ── Fetch questions ────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await getQuestionsBySubject(subject);
        setQuestions(res.data);
      } catch (e) {
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [subject]);

  // ── Timer logic ────────────────────────────────────────────────────────────
  const advanceQuestion = useCallback(() => {
    setCurrentIdx(prev => prev + 1);
    setTimeLeft(TIMER_SECONDS);
    setAutoAdvanced(false);
  }, []);

  useEffect(() => {
    if (phase !== "exam") return;
    if (currentIdx >= questions.length) return; // safety

    clearInterval(timerRef.current);
    setAutoAdvanced(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Mark as time-up (no answer recorded → treated as wrong)
          setAutoAdvanced(true);
          setTimeout(() => {
            setCurrentIdx(ci => {
              const next = ci + 1;
              if (next >= questions.length) {
                // trigger submit
                setPhase("submitting");
              } else {
                setTimeLeft(TIMER_SECONDS);
                setAutoAdvanced(false);
              }
              return next;
            });
          }, 800); // brief "Time's up!" flash
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, currentIdx, questions.length]);

  // ── When phase becomes "submitting" trigger submit ─────────────────────────
  useEffect(() => {
    if (phase === "submitting") {
      handleSubmit();
    }
  }, [phase]);

  // ── Compute score & submit to API ──────────────────────────────────────────
  const handleSubmit = async (fromButton = false) => {
    clearInterval(timerRef.current);
    setSubmitting(true);
    setSubmitError("");

    // Calculate score
    let count = 0;
    questions.forEach(q => {
      if (answers[q.id] && answers[q.id] === q.correctAnswer) count++;
    });
    setScore(count);

    // POST to /exam-results/submit
    try {
      await submitExamResult(subject, count, questions.length);
    } catch (e) {
      setSubmitError("Result saved locally but failed to sync with server.");
    } finally {
      setSubmitting(false);
      setPhase("result");
    }
  };

  const handleSelect = (questionId, choice) => {
    setAnswers(prev => ({ ...prev, [questionId]: choice }));
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    if (currentIdx + 1 >= questions.length) {
      setPhase("submitting");
    } else {
      advanceQuestion();
    }
  };

  // ── Percent for timer ring ─────────────────────────────────────────────────
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timeLeft > 8 ? "var(--primary)" :
    timeLeft > 4 ? "#f5a623" :
    "#ff4757";
  const circumference = 2 * Math.PI * 22; // r=22
  const dashOffset = circumference * (1 - timerPct / 100);

  // ── Renders ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="qp-center">
      <div className="qp-spinner" />
      <p className="qp-loading-text">Loading questions…</p>
    </div>
  );

  if (error) return (
    <div className="qp-center">
      <p className="qp-error">{error}</p>
      <button className="qp-btn" onClick={() => navigate("/attempt-exam")}>Back</button>
    </div>
  );

  // ── START SCREEN ───────────────────────────────────────────────────────────
  if (phase === "start") return (
    <div className="qp-start-screen">
      <div className="qp-start-card">
        <div className="qp-subject-icon">📋</div>
        <h1 className="qp-title">{subject} Exam</h1>
        <div className="qp-info-grid">
          <div className="qp-info-item">
            <span className="qp-info-label">Questions</span>
            <span className="qp-info-value">{questions.length}</span>
          </div>
          <div className="qp-info-item">
            <span className="qp-info-label">Time/Question</span>
            <span className="qp-info-value">{TIMER_SECONDS}s</span>
          </div>
          <div className="qp-info-item">
            <span className="qp-info-label">Total Time</span>
            <span className="qp-info-value">{questions.length * TIMER_SECONDS}s</span>
          </div>
        </div>
        <ul className="qp-rules">
          <li>⏱ Each question has a <strong>{TIMER_SECONDS}-second</strong> timer</li>
          <li>🔒 Unanswered questions auto-advance when time runs out</li>
          <li>✅ Select an option and click <strong>Next</strong> to proceed</li>
          <li>🚫 You cannot go back to previous questions</li>
        </ul>
        <button className="qp-btn qp-btn-start" onClick={() => setPhase("exam")}>
          Start Exam
        </button>
      </div>
    </div>
  );

  // ── RESULT SCREEN ──────────────────────────────────────────────────────────
  if (phase === "result" || (phase === "submitting" && submitting)) {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const grade = pct >= 90 ? "A+" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 45 ? "C" : "F";
    const gradeColor = pct >= 60 ? "var(--primary)" : pct >= 45 ? "#f5a623" : "#ff4757";

    if (submitting) return (
      <div className="qp-center">
        <div className="qp-spinner" />
        <p className="qp-loading-text">Saving your result…</p>
      </div>
    );

    return (
      <div className="qp-result-screen">
        <div className="qp-result-card">
          <h2 className="qp-result-title">Exam Complete!</h2>
          <p className="qp-result-subject">{subject}</p>

          <div className="qp-score-ring-wrap">
            <svg width="140" height="140" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="var(--surface3)" strokeWidth="5" />
              <circle
                cx="28" cy="28" r="22" fill="none"
                stroke={gradeColor} strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - pct / 100)}
                strokeLinecap="round"
                transform="rotate(-90 28 28)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="qp-score-ring-label">
              <span className="qp-score-pct" style={{ color: gradeColor }}>{pct}%</span>
              <span className="qp-score-grade" style={{ color: gradeColor }}>{grade}</span>
            </div>
          </div>

          <div className="qp-result-stats">
            <div className="qp-stat"><span>Correct</span><strong style={{color:"var(--primary)"}}>{score}</strong></div>
            <div className="qp-stat"><span>Wrong</span><strong style={{color:"#ff4757"}}>{questions.length - score}</strong></div>
            <div className="qp-stat"><span>Total</span><strong>{questions.length}</strong></div>
          </div>

          {submitError && <p className="qp-warn">{submitError}</p>}

          <div className="qp-result-actions">
            <button className="qp-btn" onClick={() => navigate("/attempt-exam")}>
              All Exams
            </button>
            <button className="qp-btn qp-btn-start" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── EXAM SCREEN ────────────────────────────────────────────────────────────
  const q = questions[currentIdx];
  if (!q) return null;
  const selectedChoice = answers[q.id];
  const isLast = currentIdx + 1 >= questions.length;

  return (
    <div className="qp-exam-screen">
      {/* Header bar */}
      <div className="qp-exam-header">
        <span className="qp-exam-subject">{subject}</span>
        <span className="qp-exam-progress">
          Question <strong>{currentIdx + 1}</strong> / {questions.length}
        </span>
        {/* Timer ring */}
        <div className="qp-timer-wrap">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="var(--surface3)" strokeWidth="4" />
            <circle
              cx="28" cy="28" r="22" fill="none"
              stroke={timerColor} strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
              style={{ transition: "stroke-dashoffset 0.9s linear" }}
            />
          </svg>
          <span className="qp-timer-num" style={{ color: timerColor }}>
            {autoAdvanced ? "⏱" : timeLeft}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="qp-progress-bar">
        <div
          className="qp-progress-fill"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Time-up overlay */}
      {autoAdvanced && (
        <div className="qp-timeup-banner">⏰ Time's up! Moving to next question…</div>
      )}

      {/* Question card */}
      <div className="qp-question-card">
        <p className="qp-question-num">Q{currentIdx + 1}.</p>
        <h2 className="qp-question-text">{q.question}</h2>

        <ul className="qp-choices">
          {q.choices.map((choice, i) => (
            <li key={i}>
              <button
                className={`qp-choice-btn ${selectedChoice === choice ? "qp-choice-selected" : ""}`}
                onClick={() => handleSelect(q.id, choice)}
                disabled={autoAdvanced}
              >
                <span className="qp-choice-letter">{String.fromCharCode(65 + i)}</span>
                <span className="qp-choice-text">{choice}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="qp-question-footer">
          <span className="qp-answered-hint">
            {selectedChoice ? "✔ Answer selected" : "No answer selected"}
          </span>
          <button
            className={`qp-btn qp-btn-next ${!selectedChoice ? "qp-btn-next-skip" : ""}`}
            onClick={handleNext}
            disabled={autoAdvanced}
          >
            {isLast ? "Finish Exam" : selectedChoice ? "Next →" : "Skip →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
