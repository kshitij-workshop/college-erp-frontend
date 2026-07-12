import api from "./axios";

// ==========================================
// Faculty Classes
// ==========================================

export function getMyClasses(date) {
  return api.get("/attendance/faculty/me/classes", {
    params: {
      date,
    },
  });
}

// ==========================================
// Students for Selected Class
// ==========================================

export function getStudentsForClass(timetableEntryId) {
  return api.get(
    `/attendance/classes/${timetableEntryId}/students`
  );
}

// ==========================================
// Mark Attendance
// ==========================================

export function markAttendance(data) {
  return api.post("/attendance/mark", data);
}

// ==========================================
// Attendance Session
// ==========================================

export function getAttendanceSession(sessionId) {
  return api.get(`/attendance/session/${sessionId}`);
}

// ==========================================
// Attendance History
// ==========================================

export function getAttendanceSessionsByOffering(subjectOfferingId) {
  return api.get(`/attendance/offering/${subjectOfferingId}`);
}

// ==========================================
// Student Attendance Percentage
// ==========================================

export function getAttendancePercentage(studentId) {
  return api.get(`/attendance/student/${studentId}/percentage`);
}