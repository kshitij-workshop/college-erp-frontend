import api from "./axios";

// ==============================
// Create
// ==============================

export function createTimeSlot(data) {
  return api.post("/time-slots", data);
}

// ==============================
// Update
// ==============================

export function updateTimeSlot(id, data) {
  return api.put(`/time-slots/${id}`, data);
}

// ==============================
// Delete
// ==============================

export function deleteTimeSlot(id) {
  return api.delete(`/time-slots/${id}`);
}

// ==============================
// Get By Id
// ==============================

export function getTimeSlot(id) {
  return api.get(`/time-slots/${id}`);
}

// ==============================
// Get All
// ==============================

export function getTimeSlots() {
  return api.get("/time-slots");
}