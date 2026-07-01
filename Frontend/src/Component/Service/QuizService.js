import axios from "axios";

const BASE = "http://localhost:8080";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getSubjects() {
  return axios.get(`${BASE}/online-exam/subjects`);
}

export function getQuestionsBySubject(subject) {
  return axios.get(`${BASE}/online-exam/questions/subject/${subject}`, {
    headers: authHeader(),
  });
}

export function getAllQuestions() {
  return axios.get(`${BASE}/online-exam/all-questions`);
}

export function getAllDistinctSubjects() {
  return axios.get(`${BASE}/online-exam/subjects`);
}

export function addQuestion(newQuestion) {
  return axios.post(
    `${BASE}/online-exam/admin/create-new-question`,
    newQuestion,
    { headers: authHeader() }
  );
}

export function deleteQuestion(id) {
  return axios.delete(`${BASE}/online-exam/admin/question/${id}/delete`, {
    headers: authHeader(),
  });
}

export function updateQuestion(id, updatedQuestion) {
  return axios.put(
    `${BASE}/online-exam/admin/question/${id}/update`,
    updatedQuestion,
    { headers: authHeader() }
  );
}

export function submitExamResult(subject, score, totalQuestions) {
  return axios.post(
    `${BASE}/exam-results/submit`,
    { subject, score, totalQuestions },
    { headers: authHeader() }
  );
}

export function getMyHistory() {
  return axios.get(`${BASE}/exam-results/my-history`, {
    headers: authHeader(),
  });
}

export function getMyHistoryBySubject(subject) {
  return axios.get(`${BASE}/exam-results/my-history/${subject}`, {
    headers: authHeader(),
  });
}
