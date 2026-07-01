import React, { useState } from "react";

const s = {
  card: {
    background: "linear-gradient(145deg, #0d1830, #111f3d)",
    border: "1px solid rgba(0,212,255,0.12)",
    borderRadius: "14px",
    padding: "22px 20px",
    marginBottom: "0",
    flex: "0 0 calc(50% - 10px)",
    minWidth: "280px",
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.25s, box-shadow 0.25s",
    fontFamily: "'Sora', sans-serif",
  },
  accent: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #00d4ff, #8b5cf6)",
    transformOrigin: "left",
    transition: "transform 0.3s",
  },
  qText: { fontSize: "15px", color: "#e2f0ff", marginBottom: "14px", lineHeight: 1.55, fontWeight: 500 },
  choiceList: { listStyle: "none", padding: 0, margin: "0 0 12px 0", display: "flex", flexDirection: "column", gap: "5px" },
  choiceItem: { fontSize: "13px", color: "#6b8aad", padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "6px", border: "1px solid rgba(0,212,255,0.07)" },
  correctBadge: { display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5ef5b0", background: "rgba(16,217,123,0.08)", border: "1px solid rgba(16,217,123,0.2)", borderRadius: "6px", padding: "4px 10px", marginBottom: "14px" },
  subjectTag: { display: "inline-block", fontSize: "11px", color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "6px", padding: "3px 10px", marginBottom: "12px", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 },
  actions: { display: "flex", gap: "8px" },
  btnEdit: { padding: "6px 16px", background: "transparent", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", borderRadius: "7px", fontSize: "12px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" },
  btnDelete: { padding: "6px 16px", background: "transparent", border: "1px solid rgba(244,63,94,0.3)", color: "#fb7185", borderRadius: "7px", fontSize: "12px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" },
  input: { width: "100%", padding: "9px 12px", background: "rgba(22,37,72,0.8)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "8px", color: "#e2f0ff", fontSize: "14px", fontFamily: "'Sora',sans-serif", outline: "none", marginBottom: "8px", display: "block", boxSizing: "border-box" },
  label: { fontSize: "11px", color: "#6b8aad", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px", display: "block", fontFamily: "'Rajdhani',sans-serif" },
  select: { width: "100%", padding: "9px 12px", background: "rgba(22,37,72,0.8)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "8px", color: "#e2f0ff", fontSize: "14px", fontFamily: "'Sora',sans-serif", outline: "none", marginBottom: "8px", display: "block", boxSizing: "border-box" },
  btnSave: { padding: "7px 20px", background: "linear-gradient(135deg,#00d4ff,#8b5cf6)", border: "none", color: "#fff", borderRadius: "7px", fontSize: "12px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" },
  btnCancel: { padding: "7px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#6b8aad", borderRadius: "7px", fontSize: "12px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" },
};

const QuestionCardAdmin = ({ data, isAdmin, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion]         = useState(data.question);
  const [editedChoices, setEditedChoices]           = useState([...(data.choices || [])]);
  // correctAnswer comes from backend as a plain STRING
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState(
    Array.isArray(data.correctAnswer) ? data.correctAnswer[0] : data.correctAnswer || ""
  );
  const [hovered, setHovered] = useState(false);

  // Normalise: backend returns string, guard for safety
  const correctAnswerDisplay = Array.isArray(data.correctAnswer)
    ? data.correctAnswer.join(", ")
    : data.correctAnswer || "";

  const handleUpdate = () => {
    onUpdate(data.id, {
      ...data,
      question: editedQuestion,
      choices: editedChoices,
      correctAnswer: editedCorrectAnswer,   // send as plain string
    });
    setEditMode(false);
  };

  return (
    <div
      style={{
        ...s.card,
        borderColor: hovered ? "rgba(0,212,255,0.3)" : "rgba(0,212,255,0.12)",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...s.accent, transform: hovered ? "scaleX(1)" : "scaleX(0)" }} />

      {editMode ? (
        <>
          <label style={s.label}>Question</label>
          <input style={s.input} type="text" value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)} placeholder="Question text" />

          <label style={s.label}>Choices</label>
          {editedChoices.map((choice, idx) => (
            <input key={idx} style={s.input} type="text" value={choice}
              onChange={(e) => {
                const u = [...editedChoices]; u[idx] = e.target.value; setEditedChoices(u);
              }}
              placeholder={`Choice ${idx + 1}`}
            />
          ))}

          <label style={s.label}>Correct Answer</label>
          <select style={s.select} value={editedCorrectAnswer}
            onChange={(e) => setEditedCorrectAnswer(e.target.value)}>
            <option value="">-- Select correct answer --</option>
            {editedChoices.filter(Boolean).map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <div style={s.actions}>
            <button style={s.btnSave} onClick={handleUpdate}>Save</button>
            <button style={s.btnCancel} onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={s.subjectTag}>{data.subject}</div>
          <p style={s.qText}>{data.question}</p>
          <ul style={s.choiceList}>
            {(data.choices || []).map((c, i) => (
              <li key={i} style={{
                ...s.choiceItem,
                ...(c === correctAnswerDisplay
                  ? { color: "#5ef5b0", borderColor: "rgba(16,217,123,0.2)", background: "rgba(16,217,123,0.05)" }
                  : {})
              }}>
                {c === correctAnswerDisplay && "✓ "}{c}
              </li>
            ))}
          </ul>
          <div style={s.correctBadge}>✓ Correct: {correctAnswerDisplay}</div>
          {isAdmin && (
            <div style={s.actions}>
              <button style={s.btnEdit} onClick={() => setEditMode(true)}>Edit</button>
              <button style={s.btnDelete} onClick={() => onDelete(data.id)}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionCardAdmin;
