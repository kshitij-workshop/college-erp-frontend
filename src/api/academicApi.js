import api from "./axios";

export const getDepartments = () =>
  api.get("/departments");

export const getPrograms = (departmentId) =>
  api.get(`/programs/department/${departmentId}`);

export const getBatches = (programId) =>
  api.get(`/batches/program/${programId}`);

export const getSemesters = (batchId) =>
  api.get(`/semesters/batch/${batchId}`);

export const getSections = (semesterId) =>
  api.get(`/sections/semester/${semesterId}`);

export const getAllSemesters = () =>
  api.get("/semesters");

export function getAllPrograms() {
  return api.get("/programs");
}

export function getAllSections() {
    return api.get("/sections");
}

export function getAllBatches() {
    return api.get("/batches");
}

export function getAllDepartments() {
    return api.get("/departments");
}

export function getProgramsByDepartment(departmentId) {
    return api.get(`/programs/department/${departmentId}`);
}

export function getBatchesByProgram(programId) {
    return api.get(`/batches/program/${programId}`);
} 

