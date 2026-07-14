import api from "./axios";

export function getDashboard() {
  return api.get("/dashboard");
}

export function getFacultyDashboard() {
  return api.get("/dashboard/faculty");
}