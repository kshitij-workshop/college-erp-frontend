import api from "./axios";

// ==========================================
// Mark Attendance
// ==========================================

export function markAttendance(data) {
  return api.post("/attendance/mark", data);
}

// ==========================================
// Get Attendance Session
// ==========================================

export function getAttendanceSession(sessionId) {
  return api.get(`/attendance/session/${sessionId}`);
}

// ==========================================
// Get Sessions by Subject Offering
// ==========================================

export function getAttendanceSessionsByOffering(subjectOfferingId) {
  return api.get(`/attendance/offering/${subjectOfferingId}`);
}

// ==========================================
// Get Student Attendance Percentage
// ==========================================

export function getAttendancePercentage(studentId) {
  return api.get(`/attendance/student/${studentId}/percentage`);
}