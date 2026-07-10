import { useEffect, useState } from "react";

import { BookOpen, GraduationCap, User } from "lucide-react";

import { getSubjectOfferingById } from "@/api/subjectOfferingApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

const STATUS_VARIANTS = {
  true: "bg-green-100 text-green-700",
  false: "bg-gray-100 text-gray-700",
};

export default function SubjectOfferingViewSheet({
  open,
  onOpenChange,
  subjectOfferingId,
}) {
  const [subjectOffering, setSubjectOffering] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !subjectOfferingId) return;

    async function loadSubjectOffering() {
      try {
        setLoading(true);

        const response = await getSubjectOfferingById(subjectOfferingId);

        setSubjectOffering(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSubjectOffering();
  }, [open, subjectOfferingId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">
        {loading ? (
          <div className="space-y-6 p-8">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />

            <Skeleton className="mx-auto h-8 w-64" />

            <Skeleton className="mx-auto h-5 w-40" />

            <Skeleton className="h-72 rounded-2xl" />
          </div>
        ) : subjectOffering ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <BookOpen className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-center">
                  {subjectOffering.subjectName}
                </h1>

                <p className="mt-2 font-mono text-blue-100">
                  {subjectOffering.subjectCode}
                </p>

                <Badge
                  className={`mt-5 ${STATUS_VARIANTS[subjectOffering.active]}`}
                >
                  {subjectOffering.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6 p-8">
              {/* Subject Information */}

              <EntitySection icon={BookOpen} title="Subject Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    label="Subject"
                    value={subjectOffering.subjectName}
                  />

                  <DetailField
                    label="Subject Code"
                    value={subjectOffering.subjectCode}
                  />

                  <DetailField
                    label="Academic Session"
                    value={subjectOffering.academicSession}
                  />

                  <DetailField
                    label="Status"
                    value={
                      <Badge
                        className={STATUS_VARIANTS[subjectOffering.active]}
                      >
                        {subjectOffering.active ? "Active" : "Inactive"}
                      </Badge>
                    }
                  />
                </div>
              </EntitySection>

              {/* Faculty Assignment */}

              <EntitySection icon={User} title="Faculty Assignment">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    label="Faculty"
                    value={subjectOffering.facultyName}
                  />

                  <DetailField
                    label="Program"
                    value={subjectOffering.programName}
                  />

                  <DetailField
                    label="Semester"
                    value={`Semester ${subjectOffering.semesterNumber}`}
                  />

                  <DetailField
                    label="Section"
                    value={subjectOffering.sectionName}
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
