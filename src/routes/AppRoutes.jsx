import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import Login from "@/pages/auth/Login";

import DashboardLayoutPage from "@/pages/dashboard/DashboardLayoutPage";
import DashboardHome from "@/pages/dashboard/DashboardHome";

import StudentsPage from "@/pages/students/StudentsPage";

import ProtectedRoute from "./ProtectedRoute";
import FacultyPage from "@/pages/faculty/FacultyPage";

export default function AppRoutes() {

  const { user, loading } = useAuth();

  if (loading) return null;

  return (

    <Routes>

      <Route
        path="/"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayoutPage />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="students"
          element={<StudentsPage />}
        />

        <Route
          path="faculty"
          element={<FacultyPage />}
        />

      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>

  );

}