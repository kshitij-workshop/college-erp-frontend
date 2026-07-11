import { useEffect, useState } from "react";
import {
  CalendarDays,
  BookOpen,
  Clock3,
  Building2,
  GraduationCap,
  User,
} from "lucide-react";

import { getTimetableEntry } from "@/api/timetableApi";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

function formatTime(time) {
  if (!time) return "-";

  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDay(day) {
  if (!day) return "-";

  return day.charAt(0) + day.slice(1).toLowerCase();
}

export default function TimetableViewSheet({
  open,
  onOpenChange,
  timetableId,
}) {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !timetableId) return;

    async function loadTimetable() {
      try {
        setLoading(true);

        const response = await getTimetableEntry(timetableId);

        setTimetable(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTimetable();
  }, [open, timetableId]);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-xl p-0 bg-slate-50">

        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto h-8 w-52" />
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        ) : timetable ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-white">

              <div className="flex flex-col items-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">

                  <CalendarDays className="h-12 w-12" />

                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  {formatDay(timetable.dayOfWeek)}
                </h1>

                <p className="mt-2 text-white/90">
                  {formatTime(timetable.startTime)}
                  {" - "}
                  {formatTime(timetable.endTime)}
                </p>

              </div>

            </div>

            <div className="space-y-6 p-8">

              <EntitySection
                icon={BookOpen}
                title="Subject Information"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <DetailField
                    label="Subject Code"
                    value={timetable.subjectCode}
                  />

                  <DetailField
                    label="Subject Name"
                    value={timetable.subjectName}
                  />

                  <DetailField
                    label="Academic Session"
                    value={timetable.academicSession}
                  />

                </div>
              </EntitySection>

              <EntitySection
                icon={User}
                title="Faculty"
              >
                <DetailField
                  label="Faculty Name"
                  value={timetable.facultyName}
                />
              </EntitySection>

              <EntitySection
                icon={GraduationCap}
                title="Academic Details"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <DetailField
                    label="Program"
                    value={timetable.programName}
                  />

                  <DetailField
                    label="Semester"
                    value={`Semester ${timetable.semesterNumber}`}
                  />

                  <DetailField
                    label="Section"
                    value={timetable.sectionName}
                  />

                </div>
              </EntitySection>

              <EntitySection
                icon={Clock3}
                title="Schedule"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <DetailField
                    label="Day"
                    value={formatDay(timetable.dayOfWeek)}
                  />

                  <DetailField
                    label="Time Slot"
                    value={timetable.timeSlotLabel}
                  />

                  <DetailField
                    label="Start Time"
                    value={formatTime(timetable.startTime)}
                  />

                  <DetailField
                    label="End Time"
                    value={formatTime(timetable.endTime)}
                  />

                </div>
              </EntitySection>

              <EntitySection
                icon={Building2}
                title="Room"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <DetailField
                    label="Room Number"
                    value={timetable.roomNumber}
                  />

                  <DetailField
                    label="Room Type"
                    value={timetable.roomType}
                  />

                </div>
              </EntitySection>

            </div>

          </>
        ) : null}

      </SheetContent>
    </Sheet>
  );
}