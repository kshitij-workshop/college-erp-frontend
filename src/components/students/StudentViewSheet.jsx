import { useEffect, useState } from "react";

import { getStudentById } from "@/api/studentApi";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User, GraduationCap, MapPin, Phone } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";


export default function StudentViewSheet({ open, onOpenChange, studentId }) {
  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !studentId) return;

    async function loadStudent() {
      try {
        setLoading(true);

        const res = await getStudentById(studentId);

        setStudent(res.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [open, studentId]);

  return (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">

      {loading ? (

        <div className="max-h-[calc(100vh-250px)] overflow-y-auto space-y-6 p-8">
          <Skeleton className="mx-auto h-24 w-24 rounded-full" />
          <Skeleton className="mx-auto h-7 w-52" />
          <Skeleton className="mx-auto h-5 w-72" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>

      ) : student ? (

        <>
          {/* Hero */}

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">

            <div className="flex flex-col items-center text-center">

              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">

                <AvatarImage src={student.photoUrl} />

                <AvatarFallback className="bg-blue-600 text-2xl font-bold text-white">

                  {student.fullName
                    ?.split(" ")
                    .map((x) => x[0])
                    .join("")
                    .substring(0, 2)}

                </AvatarFallback>

              </Avatar>

              <h1 className="mt-5 text-3xl font-bold text-white">
                {student.fullName}
              </h1>

              <p className="mt-2 text-blue-100">
                {student.email}
              </p>

              <Badge
                className={
                  student.status === "ACTIVE"
                    ? "mt-5 rounded-full border border-green-200 bg-green-50 px-4 py-1 text-green-700"
                    : "mt-5 bg-red-100 text-red-700"
                }
              >
                {student.status}
              </Badge>

            </div>

          </div>

          <div className="max-h-[calc(100vh-250px)] overflow-y-auto space-y-6 p-8">

            <EntitySection
              icon={User}
              title="Personal Information"
            >
              <div className="grid gap-6 md:grid-cols-2">

                <DetailField label="Phone" value={student.phone} />
                <DetailField label="Gender" value={student.gender} />
                <DetailField label="Date of Birth" value={student.dateOfBirth} />
                <DetailField label="Blood Group" value={student.bloodGroup} />

              </div>
            </EntitySection>

            <EntitySection
              icon={GraduationCap}
              title="Academic Information"
            >
              <div className="grid gap-6 md:grid-cols-2">

                <DetailField
                  className="md:col-span-2"
                  label="Registration Number"
                  value={student.registrationNumber}
                />

                <DetailField
                  className="md:col-span-2"
                  label="Department"
                  value={student.departmentName}
                />

                <DetailField
                  className="md:col-span-2"
                  label="Program"
                  value={student.programName}
                />

                <DetailField
                  label="Batch"
                  value={student.batchName}
                />

                <DetailField
                  label="Semester"
                  value={`${student.semesterNumber}`}
                />

                <DetailField
                  className="md:col-span-2"
                  label="Section"
                  value={student.sectionName}
                />

              </div>
            </EntitySection>

            <EntitySection
              icon={Phone}
              title="Guardian Details"
            >
              <div className="grid gap-6 md:grid-cols-2">

                <DetailField
                  className="md:col-span-2"
                  label="Guardian Name"
                  value={student.guardianName}
                />

                <DetailField
                  label="Guardian Phone"
                  value={student.guardianPhone}
                />

                <DetailField
                  label="Relation"
                  value={student.guardianRelation}
                />

              </div>
            </EntitySection>

            <EntitySection
              icon={MapPin}
              title="Address"
            >
              <DetailField
                label="Current Address"
                value={student.address}
              />
            </EntitySection>

          </div>

        </>

      ) : null}

    </SheetContent>
  </Sheet>
)
}