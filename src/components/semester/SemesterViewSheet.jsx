import { useEffect, useState } from "react";

import { getSemesterById } from "@/api/semesterApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { CalendarRange, GraduationCap } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function SemesterViewSheet({ open, onOpenChange, semesterId }) {
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !semesterId) return;

    async function loadSemester() {
      try {
        setLoading(true);

        const response = await getSemesterById(semesterId);

        setSemester(response.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadSemester();
  }, [open, semesterId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto h-8 w-56" />
            <Skeleton className="mx-auto h-5 w-40" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        ) : semester ? (
          <>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <CalendarRange className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  Semester {semester.semesterNumber}
                </h1>

                <p className="mt-2 text-blue-100">{semester.batchName}</p>

                <Badge
                  className={
                    semester.active
                      ? "mt-5 bg-green-100 text-green-700"
                      : "mt-5 bg-red-100 text-red-700"
                  }
                >
                  {semester.active ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <EntitySection icon={GraduationCap} title="Semester Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    label="Semester"
                    value={`Semester ${semester.semesterNumber}`}
                  />

                  <DetailField
                    label="Department"
                    value={semester.departmentName}
                  />

                  <DetailField label="Program" value={semester.programName} />

                  <DetailField label="Batch" value={semester.batchName} />

                  <DetailField
                    label="Current Semester"
                    value={semester.current ? "Yes" : "No"}
                  />

                  <DetailField
                    label="Status"
                    value={semester.active ? "ACTIVE" : "INACTIVE"}
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
