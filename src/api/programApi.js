import api from "./axios";

export const getPrograms = () =>
  api.get("/programs");

export const getProgramById = (id) =>
  api.get(`/programs/${id}`);

export const getProgramsByDepartment = (departmentId) =>
  api.get(`/programs/department/${departmentId}`);

export const createProgram = (data) =>
  api.post("/programs", data);

export const updateProgram = (id, data) =>
  api.put(`/programs/${id}`, data);

export const deleteProgram = (id) =>
  api.delete(`/programs/${id}`);

export const deactivateProgram = (id) =>
  api.patch(`/programs/${id}/deactivate`);