import { useEffect, useState } from "react";

import { getSectionById } from "@/api/sectionApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { GraduationCap, Users } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function SectionViewSheet({ open, onOpenChange, sectionId }) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !sectionId) return;

    async function loadSection() {
      try {
        setLoading(true);

        const response = await getSectionById(sectionId);

        setSection(response.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadSection();
  }, [open, sectionId]);

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
        ) : section ? (
          <>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <Users className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">
                  Section {section.name}
                </h1>

                <p className="mt-2 text-blue-100">
                  Semester {section.semesterNumber}
                </p>

                <Badge
                  className={
                    section.active
                      ? "mt-5 bg-green-100 text-green-700"
                      : "mt-5 bg-red-100 text-red-700"
                  }
                >
                  {section.active ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <EntitySection icon={GraduationCap} title="Section Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Section" value={section.name} />

                  <DetailField
                    label="Department"
                    value={section.departmentName}
                  />

                  <DetailField label="Program" value={section.programName} />

                  <DetailField label="Batch" value={section.batchName} />

                  <DetailField
                    label="Semester"
                    value={`Semester ${section.semesterNumber}`}
                  />

                  <DetailField
                    label="Maximum Strength"
                    value={section.maxStrength}
                  />

                  <DetailField
                    label="Status"
                    value={section.active ? "ACTIVE" : "INACTIVE"}
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
