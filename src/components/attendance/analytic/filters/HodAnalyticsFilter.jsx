import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useHodAttendanceAnalytics } from "@/hooks/useHodAttendanceAnalytics.js";

export default function HodAnalyticsFilter({
  setStudents,
  setLoading,
  setSelectedOfferingId,
}) {
  const {
    loadingFilters,

    programs,
    batches,
    subjects,

    programId,
    setProgramId,

    batchName,
    setBatchName,

    subjectOfferingId,
    setSubjectOfferingId,
  } = useHodAttendanceAnalytics({
    setStudents,
    setLoading,
    setSelectedOfferingId,
  });

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Attendance Analytics
        </h2>

        <p className="text-sm text-muted-foreground">
          View attendance analytics for your department.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {/* Program */}

        <Select
          value={programId}
          onValueChange={setProgramId}
          disabled={loadingFilters}
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
          value={batchName}
          onValueChange={setBatchName}
          disabled={!programId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Batch" />
          </SelectTrigger>

          <SelectContent>
            {batches.map((batch) => (
              <SelectItem
                key={batch.id}
                value={batch.id}
              >
                {batch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject */}

        <Select
          value={subjectOfferingId}
          onValueChange={setSubjectOfferingId}
          disabled={!batchName}
        >
          <SelectTrigger>
            <SelectValue placeholder="Subject" />
          </SelectTrigger>

          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem
                key={subject.id}
                value={String(subject.id)}
              >
                {subject.subjectCode} • {subject.subjectName} • Sec{" "}
                {subject.sectionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>
    </div>
  );
}
