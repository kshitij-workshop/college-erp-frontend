import api from "./axios";

export function getAttendanceSheet(timetableEntryId, date) {
  return api.get(`/attendance/classes/${timetableEntryId}/sheet`, {
    params: { date },
  });
}

export function updateAttendance(sessionId, data) {
  return api.put(`/attendance/session/${sessionId}`, data);
}

export function getClasses(date) {
  return api.get("/attendance/classes", {
    params: {
      date,
    },
  });
}



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

export function getAttendanceHistory() {
  return api.get("/attendance/history");
}

export async function getStudentAttendanceDashboard() {
    return api.get("/attendance/my/dashboard");
}