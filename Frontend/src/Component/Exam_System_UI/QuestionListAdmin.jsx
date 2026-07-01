import React, { useEffect, useState } from "react";
import QuestionCardAdmin from "./QuestionCardAdmin";
import { getAllQuestions, deleteQuestion, updateQuestion } from "../Service/QuizService";

const styles = {
  wrapper: {
    padding: "8px 0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  title: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "1.3rem",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #7df9ff, #00d4ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  badge: {
    background: "rgba(0,212,255,0.1)",
    border: "1px solid rgba(0,212,255,0.25)",
    color: "#00d4ff",
    borderRadius: "100px",
    padding: "3px 14px",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    flex: "0 0 calc(50% - 10px)",
    minWidth: "280px",
    background: "linear-gradient(145deg, #0d1830, #111f3d)",
    border: "1px solid rgba(0,212,255,0.12)",
    borderRadius: "14px",
    padding: "22px 20px",
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  qText: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15px",
    color: "#e2f0ff",
    marginBottom: "14px",
    lineHeight: "1.5",
    fontWeight: 500,
  },
  choiceList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 12px 0",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  choiceItem: {
    fontSize: "13px",
    color: "#6b8aad",
    padding: "6px 12px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "6px",
    border: "1px solid rgba(0,212,255,0.07)",
  },
  correctBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#5ef5b0",
    background: "rgba(16,217,123,0.08)",
    border: "1px solid rgba(16,217,123,0.2)",
    borderRadius: "6px",
    padding: "4px 10px",
    marginBottom: "14px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  btnEdit: {
    padding: "6px 18px",
    background: "transparent",
    border: "1px solid rgba(0,212,255,0.3)",
    color: "#00d4ff",
    borderRadius: "7px",
    fontSize: "12px",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnDelete: {
    padding: "6px 18px",
    background: "transparent",
    border: "1px solid rgba(244,63,94,0.3)",
    color: "#fb7185",
    borderRadius: "7px",
    fontSize: "12px",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    background: "rgba(22,37,72,0.8)",
    border: "1px solid rgba(0,212,255,0.2)",
    borderRadius: "8px",
    color: "#e2f0ff",
    fontSize: "14px",
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    marginBottom: "8px",
  },
  btnSave: {
    padding: "7px 20px",
    background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
    border: "none",
    color: "#fff",
    borderRadius: "7px",
    fontSize: "12px",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  btnCancel: {
    padding: "7px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#6b8aad",
    borderRadius: "7px",
    fontSize: "12px",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    color: "#6b8aad",
    padding: "48px 0",
    fontFamily: "'Sora', sans-serif",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  empty: {
    textAlign: "center",
    color: "#6b8aad",
    padding: "48px 0",
    fontFamily: "'Sora', sans-serif",
    fontSize: "14px",
  },
};

const QuestionListAdmin = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllQuestions()
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load questions. Make sure the backend is running.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert("Failed to delete question.");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await updateQuestion(id, updatedData);
      // use server response so correctAnswer type stays consistent
      const saved = res.data || updatedData;
      setQuestions((prev) => prev.map((q) => (q.id === id ? saved : q)));
    } catch {
      alert("Failed to update question.");
    }
  };

  if (loading) return <div style={styles.loading}>Loading questions…</div>;
  if (error)   return <div style={{ ...styles.empty, color: "#fb7185" }}>{error}</div>;
  if (!questions.length) return <div style={styles.empty}>No questions found. Add one above.</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.title}>All Questions</span>
        <span style={styles.badge}>{questions.length} total</span>
      </div>
      <div style={styles.grid}>
        {questions.map((q) => (
          <QuestionCardAdmin
            key={q.id}
            data={q}
            isAdmin={true}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionListAdmin;
