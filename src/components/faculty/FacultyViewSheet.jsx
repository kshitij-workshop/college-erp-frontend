import { useEffect, useState } from "react";

import { getFacultyById } from "@/api/facultyApi";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User, GraduationCap, MapPin } from "lucide-react";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";

export default function FacultyViewSheet({ open, onOpenChange, facultyId }) {
  const [faculty, setFaculty] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !facultyId) return;

    async function loadFaculty() {
      try {
        setLoading(true);

        const res = await getFacultyById(facultyId);

        setFaculty(res.data.data);
      } finally {
        setLoading(false);
      }
    }

    loadFaculty();
  }, [open, facultyId]);

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
        ) : faculty ? (
          <>
            {/* Hero */}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={faculty.photoUrl} />

                  <AvatarFallback className="bg-blue-600 text-2xl font-bold text-white">
                    {faculty.fullName
                      ?.split(" ")
                      .map((x) => x[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <h1 className="mt-5 text-3xl font-bold text-white">
                  {faculty.fullName}
                </h1>

                <p className="mt-2 text-blue-100">{faculty.email}</p>

                <Badge
                  className={
                    faculty.status === "ACTIVE"
                      ? "mt-5 bg-green-100 text-green-700"
                      : faculty.status === "ON_LEAVE"
                        ? "mt-5 bg-yellow-100 text-yellow-700"
                        : faculty.status === "RESIGNED"
                          ? "mt-5 bg-red-100 text-red-700"
                          : "mt-5 bg-slate-100 text-slate-700"
                  }
                >
                  {faculty.status.replaceAll("_", " ")}
                </Badge>
              </div>
            </div>

            <div className="max-h-[calc(100vh-250px)] overflow-y-auto space-y-6 p-8">
              <EntitySection icon={User} title="Personal Information">
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField label="Phone" value={faculty.phone} />
                  <DetailField label="Gender" value={faculty.gender} />
                  <DetailField
                    label="Date of Birth"
                    value={faculty.dateOfBirth}
                  />
                  <DetailField label="Blood Group" value={faculty.bloodGroup} />
                </div>
              </EntitySection>

              <EntitySection
                icon={GraduationCap}
                title="Professional Information"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <DetailField
                    className="md:col-span-2"
                    label="Employee Code"
                    value={faculty.employeeCode}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Department"
                    value={faculty.departmentName}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Designation"
                    value={faculty.designation?.replaceAll("_", " ")}
                  />

                  <DetailField
                    label="Qualification"
                    value={faculty.qualification}
                  />

                  <DetailField
                    label="Specialization"
                    value={`${faculty.specialization}`}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Experience Years"
                    value={faculty.experienceYears}
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Joining Date"
                    value={faculty.joiningDate}
                  />
                </div>
              </EntitySection>

              <EntitySection icon={MapPin} title="Address">
                <DetailField label="Current Address" value={faculty.address} />
              </EntitySection>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
