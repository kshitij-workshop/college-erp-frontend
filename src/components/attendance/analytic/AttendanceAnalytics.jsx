import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useCurrentFaculty } from "@/hooks/useCurrentFaculty";

import AttendanceAnalyticsTable from "./AttendanceAnalyticsTable";
import { useBatchAttendanceAnalytics } from "@/hooks/useBatchAttendanceAnalytics";
import { useHodBatchAttendanceAnalytics } from "@/hooks/useHodBatchAttendanceAnalytics";

import AdminAnalyticsFilter from "./filters/AdminAnalyticsFilter";
import HodAnalyticsFilter from "./filters/HodAnalyticsFilter";
import FacultyAnalyticsFilter from "./filters/FacultyAnalyticsFilter";

import AdminStudentAttendanceDialog from "@/components/attendance/analytic/dialog/AdminStudentAttendanceDialog";
import StudentSubjectAttendanceDialog from "@/components/attendance/analytic/dialog/StudentSubjectAttendanceDialog";

export default function AttendanceAnalytics() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("ALL");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedOfferingId, setSelectedOfferingId] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const { faculty } = useCurrentFaculty();

const isAdmin = user?.role === "ADMIN";

const isHod =
  user?.role === "FACULTY" &&
  faculty?.designation === "HOD";
  console.log(user);
console.log(faculty);
console.log(isHod);

  function handleView(student) {
    setSelectedStudent(student);
    setDetailsOpen(true);
  }

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(keyword) ||
        String(student.registrationNumber).includes(keyword);

      const percentage = student.percentage;

      let matchesAttendance = true;

      switch (attendanceFilter) {
        case "90":
          matchesAttendance = percentage >= 90;
          break;

        case "75":
          matchesAttendance = percentage >= 75 && percentage < 90;
          break;

        case "60":
          matchesAttendance = percentage >= 60 && percentage < 75;
          break;

        case "LOW":
          matchesAttendance = percentage < 60;
          break;

        default:
          matchesAttendance = true;
      }

      return matchesSearch && matchesAttendance;
    });
  }, [students, search, attendanceFilter]);



  return (
    <div className="space-y-6">
      {isAdmin ? (
        <AdminAnalyticsFilter
        useAnalyticsHook={useBatchAttendanceAnalytics}
          setStudents={setStudents}
          setLoading={setLoading}
        />
      ) : isHod ? (
        <HodAnalyticsFilter
          useAnalyticsHook={useHodBatchAttendanceAnalytics}
          setStudents={setStudents}
          setLoading={setLoading}
          setSelectedOfferingId={setSelectedOfferingId}
        />
      ) : (
        <FacultyAnalyticsFilter
          setStudents={setStudents}
          setLoading={setLoading}
          setSelectedOfferingId={setSelectedOfferingId}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="pl-10"
          />
        </div>

        <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Attendance Filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Students</SelectItem>

            <SelectItem value="90">90% and above</SelectItem>

            <SelectItem value="75">75% - 89%</SelectItem>

            <SelectItem value="60">60% - 74%</SelectItem>

            <SelectItem value="LOW">Below 60%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AttendanceAnalyticsTable
        students={filteredStudents}
        loading={loading}
        onView={handleView}
      />

      {user.role === "ADMIN" ? (
        <AdminStudentAttendanceDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          student={selectedStudent}
        />
      ) : (
        <StudentSubjectAttendanceDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          studentId={selectedStudent?.studentId}
          subjectOfferingId={selectedOfferingId}
        />
      )}
    </div>
  );
}
