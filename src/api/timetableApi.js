import api from "./axios";

// ==============================
// Create
// ==============================

export function createTimetableEntry(data) {
  return api.post("/timetable/entries", data);
}

// ==============================
// Update
// ==============================

export function updateTimetableEntry(id, data) {
  return api.put(`/timetable/entries/${id}`, data);
}

// ==============================
// Delete
// ==============================

export function deleteTimetableEntry(id) {
  return api.delete(`/timetable/entries/${id}`);
}

// ==============================
// Get By Id
// ==============================

export function getTimetableEntry(id) {
  return api.get(`/timetable/entries/${id}`);
}

// ==============================
// Get All / Filter
// ==============================

export function getTimetableEntries(params = {}) {
  return api.get("/timetable/entries", {
    params,
  });
}
