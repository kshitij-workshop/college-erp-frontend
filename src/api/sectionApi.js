import api from "./axios";

export const getSections = () => api.get("/sections");

export const getSectionById = (id) => api.get(`/sections/${id}`);

export const getSectionsBySemester = (semesterId) =>
  api.get(`/sections/semester/${semesterId}`);

export const createSection = (data) => api.post("/sections", data);

export const updateSection = (id, data) => api.put(`/sections/${id}`, data);

export const deleteSection = (id) => api.delete(`/sections/${id}`);

export const deactivateSection = (id) =>
  api.patch(`/sections/${id}/deactivate`);
