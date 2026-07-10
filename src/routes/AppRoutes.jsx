import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import Login from "@/pages/auth/Login";

import DashboardLayoutPage from "@/pages/dashboard/DashboardLayoutPage";
import DashboardHome from "@/pages/dashboard/DashboardHome";

import StudentsPage from "@/pages/students/StudentsPage";

import ProtectedRoute from "./ProtectedRoute";
import FacultyPage from "@/pages/faculty/FacultyPage";
import DepartmentPage from "@/pages/department/DepartmentPage";
import ProgramPage from "@/pages/program/ProgramPage";
import BatchPage from "@/pages/batch/BatchPage";
import SectionPage from "@/pages/section/SectionPage";
import SemesterPage from "@/pages/semester/SemesterPage";
import SubjectsPage from "@/pages/subjects/SubjectsPage";
import SubjectOfferingPage from "@/pages/subject-offerings/SubjectOfferingPage";

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayoutPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        <Route path="students" element={<StudentsPage />} />

        <Route path="faculty" element={<FacultyPage />} />
        <Route path="departments" element={<DepartmentPage />} />
        <Route path="programs" element={<ProgramPage />} />
        <Route path="batches" element={<BatchPage />} />
        <Route path="semesters" element={<SemesterPage />} />
        <Route path="sections" element={<SectionPage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="subject-offerings" element={<SubjectOfferingPage />} /> 



      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
