import api from "./axios";

export const getStudentProfile = () => {
  return api.get("/students/me");
};

export const getFacultyProfile = () => {
  return api.get("/faculty/me");
};