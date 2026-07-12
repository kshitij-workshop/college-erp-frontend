import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useAttendanceSession } from "@/hooks/useAttendanceSession";

import AttendanceStatusBadge from "@/components/attendance/AttendanceStatusBadge";

export default function AttendanceSessionPage() {
    const navigate = useNavigate();

  const {
    session,
    loading,
  } = useAttendanceSession();

  if (loading) {
    return (
      <DashboardLayout>
        <Skeleton className="h-[500px] rounded-2xl" />
      </DashboardLayout>
    );
  }

  return (

      <div className="space-y-6">

        <PageHeader
          title="Attendance Details"
          description="View submitted attendance."
          buttonText="Back to Attendance History"
          buttonIcon={ArrowLeft}
          onButtonClick={() => navigate("/dashboard/attendance/history")}
        />

        <Card className="rounded-2xl p-6">

          <div className="mb-6 grid gap-4 md:grid-cols-2">

            <Info
              title="Subject"
              value={session.subjectName}
            />

            <Info
              title="Subject Code"
              value={session.subjectCode}
            />

            <Info
              title="Section"
              value={session.sectionName}
            />

            <Info
              title="Date"
              value={session.sessionDate}
            />

            <Info
              title="Time"
              value={`${session.startTime} - ${session.endTime}`}
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-4 py-3 text-left">
                    Roll No.
                  </th>

                  <th className="px-4 py-3 text-left">
                    Registration No.
                  </th>

                  <th className="px-4 py-3 text-left">
                    Student
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {session.students.map((student) => (

                  <tr
                    key={student.studentId}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-4 py-3">
                      {student.rollNumber}
                    </td>

                    <td className="px-4 py-3">
                      {student.registrationNumber}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {student.fullName}
                    </td>

                    <td className="px-4 py-3">

                      <AttendanceStatusBadge
                        status={student.status}
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </Card>

      </div>

  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="font-semibold">
        {value}
      </h3>
    </div>
  );
}