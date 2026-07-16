import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useBatchAttendanceAnalytics } from "@/hooks/useBatchAttendanceAnalytics";

export default function AdminAnalyticsFilter({
  setStudents,
  setLoading,
}) {
  const {
    departments,
    programs,
    batches,

    departmentId,
    setDepartmentId,

    programId,
    setProgramId,

    batchId,
    setBatchId,

    loadingFilters,
  } = useBatchAttendanceAnalytics({
    setStudents,
    setLoading,
  });

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Attendance Analytics
        </h2>

        <p className="text-sm text-muted-foreground">
          View overall attendance batch-wise.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select
          value={departmentId}
          onValueChange={setDepartmentId}
          disabled={loadingFilters}
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
  );
}