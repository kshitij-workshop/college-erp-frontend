import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getFacultyDashboard } from "@/api/dashboardApi";

function normalizeFacultyDashboard(payload, user) {
  const data = payload ?? {};

  return {
    facultyName:
      data.facultyName ||
      data.fullName ||
      user?.fullName ||
      user?.name ||
      "Faculty",
    employeeCode:
      data.employeeCode ||
      data.employeeId ||
      user?.employeeCode ||
      user?.code ||
      "-",
    departmentName:
      data.departmentName ||
      data.department?.name ||
      user?.departmentName ||
      "-",
    designation: data.designation || data.roleTitle || user?.role || "-",
    email: data.email || data.facultyEmail || user?.email || "-",
    totalSubjectsAssigned:
      data.totalSubjectsAssigned ?? data.subjectsAssignedCount ?? 0,
    totalAttendanceSessionsTaken:
      data.totalAttendanceSessionsTaken ?? data.attendanceSessionsTaken ?? 0,
    totalAssignmentsCreated:
      data.totalAssignmentsCreated ?? data.assignmentsCreatedCount ?? 0,
    totalExamsCreated: data.totalExamsCreated ?? data.examsCreatedCount ?? 0,
    assignedSubjects:
      data.assignedSubjects ||
      data.subjects ||
      data.subjectAssignments ||
      data.teachingSubjects ||
      [],
    todayClasses:
      data.todayClasses ||
      data.upcomingClasses ||
      data.classesToday ||
      data.schedule ||
      [],
    recentNotices:
      data.recentNotices || data.notices || data.alerts || data.messages || [],
  };
}

export function useFacultyDashboard() {
  const { user } = useAuth();
  const [facultyDashboard, setFacultyDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchFacultyDashboard() {
    try {
      setLoading(true);
      const res = await getFacultyDashboard();
      setFacultyDashboard(
        normalizeFacultyDashboard(res.data?.data ?? res.data, user),
      );
      setError(null);
    } catch (err) {
      console.warn(
        "Faculty dashboard fetch failed, falling back to auth profile.",
        err,
      );
      setFacultyDashboard(normalizeFacultyDashboard(null, user));
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFacultyDashboard();
  }, [user]);

  return {
    facultyDashboard,
    loading,
    error,
    refresh: fetchFacultyDashboard,
  };
}
