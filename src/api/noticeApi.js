import api from "./axios";

export const createNotice = (data) => api.post("/notices", data);
export const getNotices = () => api.get("/notices");
export const getNotice = (id) => api.get(`/notices/${id}`);
export const updateNotice = (id, data) => api.put(`/notices/${id}`, data);
export const deactivateNotice = (id) => api.patch(`/notices/${id}/deactivate`);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);
