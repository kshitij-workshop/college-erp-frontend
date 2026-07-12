import { BookOpen, Clock, MapPin, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function TodayClasses({
  classes = [],
  selectedClass,
  onSelect,
  loading,
}) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="h-36 animate-pulse bg-slate-100" />
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <Card className="flex h-40 items-center justify-center rounded-2xl border-dashed">
        <p className="text-slate-500">No classes scheduled for this date.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {classes.map((classItem) => {
        const active =
          selectedClass?.timetableEntryId === classItem.timetableEntryId;

        return (
          <Card
            key={classItem.timetableEntryId}
            onClick={() => onSelect(classItem)}
            className={`
              cursor-pointer rounded-2xl p-5 transition-all duration-200

              ${
                active
                  ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-100"
                  : "hover:border-blue-300 hover:shadow-md"
              }
            `}
          >
            <div className="space-y-4">
              {/* Subject */}

              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <BookOpen className="h-5 w-5 text-blue-600" />

                  {classItem.subjectName}
                </h3>
                {active && (
                  <span className="inline-flex rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                    Selected
                  </span>
                )}

                <p className="mt-1 text-sm text-slate-500">
                  {classItem.subjectCode}
                </p>
              </div>

              {/* Details */}

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {classItem.startTime} - {classItem.endTime}
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />

                  {classItem.sectionName}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Room {classItem.roomNumber}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
