import api from "./axios";

export const createExam = (data) => api.post("/exams", data);
export const getExams = () => api.get("/exams");
export const getExamsByOffering = (subjectOfferingId) =>
  api.get(`/exams/offering/${subjectOfferingId}`);
export const getExam = (id) => api.get(`/exams/${id}`);
export const lockExam = (id) => api.patch(`/exams/${id}/lock`);
export const publishExamResult = (id) => api.patch(`/exams/${id}/publish`);
export const deleteExam = (id) => api.delete(`/exams/${id}`);

export const enterMarks = (data) => api.post("/marks", data);
export const getExamResults = (examId) => api.get(`/marks/exam/${examId}`);
export const getStudentResults = (studentId, onlyPublished = true) =>
  api.get(`/marks/student/${studentId}`, { params: { onlyPublished } });
