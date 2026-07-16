import { useMemo, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import StudentAttendanceSummary from "@/components/attendance/StudentAttendanceSummary";
import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import SubjectAttendanceCard from "@/components/attendance/SubjectAttendanceCard";
import AttendanceHistoryDialog from "@/components/attendance/AttendanceHistoryDialog";

import { useStudentAttendance } from "@/hooks/useStudentAttendance";

export default function StudentAttendancePage() {
  const { dashboard, loading } = useStudentAttendance();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  function handleViewHistory(subject) {
    setSelectedSubject(subject);
    setHistoryOpen(true);
  }

  const filteredSubjects = useMemo(() => {
    if (!dashboard?.subjects) return [];

    return dashboard.subjects.filter((subject) => {
      const matchesSearch =
        subject.subjectName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        subject.subjectCode
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL"
          ? true
          : filter === "EXCELLENT"
          ? subject.percentage >= 90
          : filter === "GOOD"
          ? subject.percentage >= 75 && subject.percentage < 90
          : subject.percentage < 75;

      return matchesSearch && matchesFilter;
    });
  }, [dashboard, search, filter]);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Attendance"
          description="Track your attendance across all subjects."
        />

        <div className="rounded-3xl border bg-white p-10 text-center text-muted-foreground">
          Loading attendance...
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Attendance"
          description="Track your attendance across all subjects."
        />

        <div className="rounded-3xl border bg-white p-10 text-center text-red-500">
          Failed to load attendance.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance"
        description="Track your attendance across all subjects."
      />

      <StudentAttendanceSummary dashboard={dashboard} />

      <AttendanceFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {filteredSubjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No subjects found
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing the search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredSubjects.map((subject) => (
            <SubjectAttendanceCard
              key={subject.subjectOfferingId}
              subject={subject}
              onViewHistory={handleViewHistory}
            />
          ))}
        </div>
      )}

      <AttendanceHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        subject={selectedSubject}
      />
    </div>
  );
}