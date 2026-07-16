import { useAuth } from "@/hooks/useAuth";

import StudentAttendancePage from "@/pages/attendance/StudentAttendancePage";
import AdminFacultyAttendancePage from "@/pages/attendance/AdminFacultyAttendancePage";

export default function AttendancePage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "STUDENT":
      return <StudentAttendancePage />;

    case "FACULTY":
    case "ADMIN":
      return <AdminFacultyAttendancePage />;

    default:
      return null;
  }
}