import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { useBatchAttendanceAnalytics } from "@/hooks/useBatchAttendanceAnalytics";

import AttendanceAnalyticsTable from "./AttendanceAnalyticsTable";
import AdminStudentAttendanceDialog from "./dialog/AdminStudentAttendanceDialog";

export default function AdminAttendanceAnalytics() {
  const {
    departments,
    programs,
    batches,

    students,

    loadingFilters,
    loadingStudents,

    departmentId,
    setDepartmentId,

    programId,
    setProgramId,

    batchId,
    setBatchId,
  } = useBatchAttendanceAnalytics();

  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function handleView(student) {
    setSelectedStudent(student);
    setDetailsOpen(true);
  }

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return students.filter(
      (student) =>
        student.studentName.toLowerCase().includes(keyword) ||
        String(student.registrationNumber).includes(keyword)
    );
  }, [students, search]);

  return (
    <div className="space-y-6">

      {/* Filters */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold">
          Attendance Analytics
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View overall attendance of students batch-wise.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          {/* Department */}

          <Select
            value={departmentId}
            onValueChange={setDepartmentId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>

            <SelectContent>
              {departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={String(department.id)}
                >
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Program */}

          <Select
            value={programId}
            onValueChange={setProgramId}
            disabled={!departmentId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Program" />
            </SelectTrigger>

            <SelectContent>
              {programs.map((program) => (
                <SelectItem
                  key={program.id}
                  value={String(program.id)}
                >
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Batch */}

          <Select
            value={batchId}
            onValueChange={setBatchId}
            disabled={!programId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Batch" />
            </SelectTrigger>

            <SelectContent>
              {batches.map((batch) => (
                <SelectItem
                  key={batch.id}
                  value={String(batch.id)}
                >
                  {batch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>

      </div>

      {/* Search */}

      {batchId && (
        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Search by student name or registration number..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      )}

      {/* Table */}

      {batchId && (
        <AttendanceAnalyticsTable
          students={filteredStudents}
          loading={loadingStudents}
          onView={handleView}
        />
      )}

      {/* Dialog */}

      <AdminStudentAttendanceDialog
    open={detailsOpen}
    onOpenChange={setDetailsOpen}
    student={selectedStudent}
/>

    </div>
  );
}