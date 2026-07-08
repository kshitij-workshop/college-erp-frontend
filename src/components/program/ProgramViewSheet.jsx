import { useEffect, useState } from "react";

import { getProgramById } from "@/api/programApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { GraduationCap, Building2 } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function ProgramViewSheet({ open, onOpenChange, programId }) {
  const [program, setProgram] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !programId) return;

    async function loadProgram() {
      try {
        setLoading(true);

        const response = await getProgramById(programId);

        setProgram(response.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadProgram();
  }, [open, programId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />

            <Skeleton className="mx-auto h-8 w-60" />

            <Skeleton className="mx-auto h-5 w-28" />

            <Skeleton className="h-44 rounded-2xl" />
          </div>
        ) : program ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-lg">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">{program.name}</h1>

                <p className="mt-2 text-blue-100">{program.code}</p>

                <Badge
                  className={
                    program.active
                      ? "mt-5 bg-green-100 text-green-700"
                      : "mt-5 bg-red-100 text-red-700"
                  }
                >
                  {program.active ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </div>
            </div>

            {/* Body */}

            <div className="space-y-6 p-8">
              <EntitySection icon={Building2} title="Program Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    className="md:col-span-2"
                    label="Program Name"
                    value={program.name}
                  />

                  <DetailField label="Program Code" value={program.code} />

                  <DetailField
                    label="Department"
                    value={program.departmentName}
                  />

                  <DetailField
                    label="Duration"
                    value={`${program.durationYear} Years`}
                  />

                  <DetailField
                    label="Total Semesters"
                    value={program.totalSemester}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Status"
                    value={program.active ? "ACTIVE" : "INACTIVE"}
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
