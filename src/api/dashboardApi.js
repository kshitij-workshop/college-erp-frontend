import api from "./axios";

export function getDashboard() {
  return api.get("/dashboard");
}