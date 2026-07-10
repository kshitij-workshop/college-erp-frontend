import { useEffect, useState } from "react";

import { BookOpen, GraduationCap } from "lucide-react";

import { getSubjectById } from "@/api/subjectApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function SubjectViewSheet({ open, onOpenChange, subjectId }) {
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !subjectId) return;

    async function loadSubject() {
      try {
        setLoading(true);

        const response = await getSubjectById(subjectId);

        setSubject(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadSubject();
  }, [open, subjectId]);

  const TYPE_VARIANTS = {
    THEORY: "bg-blue-100 text-blue-700",
    LAB: "bg-purple-100 text-purple-700",
    ELECTIVE: "bg-orange-100 text-orange-700",
  };

  const STATUS_VARIANTS = {
    true: "bg-green-100 text-green-700",
    false: "bg-gray-100 text-gray-700",
  };

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
        ) : subject ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10">
                  <BookOpen className="h-12 w-12" />
                </div>

                <h1 className="mt-5 text-3xl font-bold">{subject.name}</h1>

                <p className="mt-2 font-mono text-blue-100">{subject.code}</p>

                <Badge className={`mt-5 ${STATUS_VARIANTS[subject.active]}`}>
                  {subject.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="space-y-6 p-8">
              {/* Subject Information */}

              <EntitySection icon={BookOpen} title="Subject Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Subject Name" value={subject.name} />

                  <DetailField label="Subject Code" value={subject.code} />

                  <DetailField label="Credits" value={subject.credits} />

                  <DetailField
                    label="Subject Type"
                    value={
                      <Badge className={TYPE_VARIANTS[subject.type]}>
                        {subject.type}
                      </Badge>
                    }
                  />

                  <DetailField
                    label="Status"
                    value={
                      <Badge className={STATUS_VARIANTS[subject.active]}>
                        {subject.active ? "Active" : "Inactive"}
                      </Badge>
                    }
                  />
                </div>
              </EntitySection>

              {/* Academic Information */}

              <EntitySection icon={GraduationCap} title="Academic Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Program" value={subject.programName} />

                  <DetailField
                    label="Semester"
                    value={`Semester ${subject.semesterNumber}`}
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
