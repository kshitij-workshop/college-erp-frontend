import api from "./axios";

// ===============================
// Create
// ===============================

export function createSubject(data) {
  return api.post("/subjects", data);
}

// ===============================
// Get All
// ===============================

export function getSubjects() {
  return api.get("/subjects");
}

// ===============================
// Get By Id
// ===============================

export function getSubjectById(id) {
  return api.get(`/subjects/${id}`);
}

// ===============================
// Update
// ===============================

export function updateSubject(id, data) {
  return api.put(`/subjects/${id}`, data);
}

// ===============================
// Deactivate
// ===============================

export function deactivateSubject(id) {
  return api.patch(`/subjects/${id}/deactivate`);
}

// ===============================
// Delete
// ===============================

export function deleteSubject(id) {
  return api.delete(`/subjects/${id}`);
}
