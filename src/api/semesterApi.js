import api from "./axios";

export const getSemesters = () =>
  api.get("/semesters");

export const getSemesterById = (id) =>
  api.get(`/semesters/${id}`);

export const getSemestersByBatch = (batchId) =>
  api.get(`/semesters/batch/${batchId}`);

export const createSemester = (data) =>
  api.post("/semesters", data);

export const updateSemester = (id, data) =>
  api.put(`/semesters/${id}`, data);

export const deleteSemester = (id) =>
  api.delete(`/semesters/${id}`);

export const deactivateSemester = (id) =>
  api.patch(`/semesters/${id}/deactivate`);