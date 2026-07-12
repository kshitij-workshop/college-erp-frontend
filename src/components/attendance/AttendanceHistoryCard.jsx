import {
  CalendarDays,
  Clock3,
  Users,
  Eye,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AttendanceHistoryCard({ session }) {
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl p-6 transition hover:shadow-lg">
      <div className="space-y-5">

        {/* Subject */}

        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-blue-600" />
            {session.subjectName}
          </h2>

          <p className="text-sm text-slate-500">
            {session.subjectCode} 
          </p>
        </div>

        {/* Info */}

        <div className="grid gap-3 text-sm text-slate-600">

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {session.sessionDate}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {session.startTime} - {session.endTime}
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {session.sectionName}
          </div>

        </div>

        {/* Summary */}

        <div className="grid grid-cols-4 gap-2">

          <SummaryCard
            label="Present"
            value={session.presentCount}
            color="bg-green-100 text-green-700"
          />

          <SummaryCard
            label="Absent"
            value={session.absentCount}
            color="bg-red-100 text-red-700"
          />

          <SummaryCard
            label="Late"
            value={session.lateCount}
            color="bg-yellow-100 text-yellow-700"
          />

          <SummaryCard
            label="Leave"
            value={session.leaveCount}
            color="bg-blue-100 text-blue-700"
          />

        </div>

        <Button
          className="w-full"
          onClick={() =>
            navigate(`/dashboard/attendance/history/${session.sessionId}`)
          }
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>

      </div>
    </Card>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div
      className={`rounded-xl p-3 text-center ${color}`}
    >
      <p className="text-xl font-bold">
        {value}
      </p>

      <p className="text-xs">
        {label}
      </p>
    </div>
  );
}