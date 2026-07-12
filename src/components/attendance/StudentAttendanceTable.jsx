import { User } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const STATUS_OPTIONS = [
  {
    value: "PRESENT",
    label: "Present",
    color: "bg-green-100 text-green-700",
  },
  {
    value: "ABSENT",
    label: "Absent",
    color: "bg-red-100 text-red-700",
  },
  {
    value: "LATE",
    label: "Late",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "LEAVE",
    label: "Leave",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function StudentAttendanceTable({
  students = [],
  attendance = {},
  onStatusChange,
  loading,
}) {
  if (loading) {
    return (
      <Card className="rounded-2xl p-8">
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-lg bg-slate-100"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (students.length === 0) {
    return (
      <Card className="rounded-2xl border-dashed p-10 text-center">
        <p className="text-slate-500">Select a class to load students.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-2xl">
      {/* Header */}

      <div className="grid grid-cols-12 border-b bg-slate-50 px-6 py-4 font-semibold text-slate-700">
        <div className="col-span-2">Roll No.</div>

        <div className="col-span-4">Student</div>

        <div className="col-span-6">Attendance</div>
      </div>

      {/* Students */}
      <div className="max-h-[600px] overflow-y-auto">
        {students.map((student) => (
          <div
            key={student.studentId}
            className="grid grid-cols-12 items-center border-b px-6 py-4 transition hover:bg-slate-50"
          >
            {/* Roll */}

            <div className="col-span-2">
              <Badge variant="secondary">{student.registrationNumber}</Badge>
            </div>

            {/* Name */}

            <div className="col-span-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>

              <span className="font-medium">{student.fullName}</span>
            </div>

            {/* Attendance */}

            <div className="col-span-6">
              <RadioGroup
                value={attendance[student.studentId]}
                onValueChange={(value) =>
                  onStatusChange(student.studentId, value)
                }
                className="flex gap-4"
              >
                {STATUS_OPTIONS.map((status) => (
                  <div key={status.value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={status.value}
                      id={`${student.studentId}-${status.value}`}
                    />

                    <Label
                      htmlFor={`${student.studentId}-${status.value}`}
                      className={`cursor-pointer rounded-md px-2 py-1 text-xs ${status.color}`}
                    >
                      {status.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
