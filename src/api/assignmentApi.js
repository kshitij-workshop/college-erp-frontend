import api from "./axios";

export const createAssignment = (data) => api.post("/assignments", data);

export const getAssignmentsByOffering = (offeringId) =>
  api.get(`/assignments/offering/${offeringId}`);

export const getAssignmentsBySection = (sectionId) =>
  api.get(`/assignments/section/${sectionId}`);

export const getAssignment = (id) => api.get(`/assignments/${id}`);

export const updateAssignment = (id, data) =>
  api.put(`/assignments/${id}`, data);

export const deleteAssignment = (id) => api.delete(`/assignments/${id}`);

export const getAssignmentSubmissions = (assignmentId) =>
  api.get(`/assignments/${assignmentId}/submissions`);

export const gradeSubmission = (submissionId, data) =>
  api.patch(`/assignments/submissions/${submissionId}/grade`, data);

export const submitAssignment = (data) =>
  api.post("/assignments/submit", data); 


export async function getMyAssignments() {
    return api.get("/assignments/my");
}

export async function getMySubmission(assignmentId) {
    return api.get(`/assignments/${assignmentId}/my-submission`);
}