import api from "./axios";

export function createSubjectOffering(data) {
  return api.post("/subject-offerings", data);
}

export function getSubjectOfferings() {
  return api.get("/subject-offerings");
}

export function getMySubjectOfferings() {
  return api.get("/subject-offerings/my");
}

export function getSubjectOfferingById(id) {
  return api.get(`/subject-offerings/${id}`);
}

export function updateSubjectOffering(id, data) {
  return api.put(`/subject-offerings/${id}`, data);
}

export function deleteSubjectOffering(id) {
  return api.delete(`/subject-offerings/${id}`);
}
