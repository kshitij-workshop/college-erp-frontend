import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect } from "react";

import { useAttendanceAnalytics } from "@/hooks/useAttendanceAnalytics";

export default function FacultyAnalyticsFilter({
  setStudents,
  setLoading,
  setSelectedOfferingId,
}) {
  const {
    offerings,
    selectedOffering,
    setSelectedOffering,
    loadingOfferings,
  } = useAttendanceAnalytics({
    setStudents,
    setLoading,
  });

  useEffect(() => {
  if (selectedOffering) {
    setSelectedOfferingId(Number(selectedOffering));
  }
}, [selectedOffering, setSelectedOfferingId]);

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Attendance Analytics
        </h2>

        <p className="text-sm text-muted-foreground">
          View attendance analytics for your assigned subjects.
        </p>
      </div>

      <div className="max-w-xl">
        <Select
          value={selectedOffering}
          onValueChange={(value) => {
            setSelectedOffering(value);
            setSelectedOfferingId(Number(value));
          }}
          disabled={loadingOfferings}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Subject Offering" />
          </SelectTrigger>

          <SelectContent>
            {offerings.map((offering) => (
              <SelectItem
                key={offering.id}
                value={String(offering.id)}
              >
                {offering.subjectCode} • {offering.subjectName} •{" "}
                {offering.sectionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}