import api from "./axios";

// ==============================
// Create
// ==============================

export function createRoom(data) {
  return api.post("/rooms", data);
}

// ==============================
// Update
// ==============================

export function updateRoom(id, data) {
  return api.put(`/rooms/${id}`, data);
}

// ==============================
// Delete
// ==============================

export function deleteRoom(id) {
  return api.delete(`/rooms/${id}`);
}

// ==============================
// Get By Id
// ==============================

export function getRoom(id) {
  return api.get(`/rooms/${id}`);
}

// ==============================
// Get All
// ==============================

export function getRooms() {
  return api.get("/rooms");
}
