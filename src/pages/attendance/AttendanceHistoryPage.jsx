import PageHeader from "@/components/common/PageHeader";

import { Input } from "@/components/ui/input";
import {useNavigate} from "react-router-dom";

import { ArrowLeft } from "lucide-react";
    

import { Search } from "lucide-react";

import { useMemo, useState } from "react";

import { useAttendanceHistory } from "@/hooks/useAttendanceHistory";

import AttendanceHistoryCard from "@/components/attendance/AttendanceHistoryCard";

export default function AttendanceHistoryPage() {
    const navigate = useNavigate();

  const {
    history,
    loading,
  } = useAttendanceHistory();

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {

    return history.filter((session) => {

      const keyword = search.toLowerCase();

      return (
        session.subjectName.toLowerCase().includes(keyword) ||
        session.subjectCode.toLowerCase().includes(keyword) ||
        session.sectionName.toLowerCase().includes(keyword)
      );

    });

  }, [history, search]);

  return (


      <div className="space-y-6">

        <PageHeader
          title="Attendance History"
          description="View previously submitted attendance sessions."
          buttonText="Back to Attendance"
          buttonIcon={ArrowLeft}
          onButtonClick={() => navigate("/dashboard/attendance")}
        />

        {/* Search */}

        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            placeholder="Search by subject, code or section..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />

        </div>

        {/* Loading */}

        {loading && (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (

              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-slate-100"
              />

            ))}

          </div>

        )}

        {/* Empty */}

        {!loading && filteredHistory.length === 0 && (

          <div className="rounded-2xl border border-dashed p-16 text-center">

            <h2 className="text-xl font-semibold">
              No Attendance History
            </h2>

            <p className="mt-2 text-slate-500">
              Attendance sessions will appear here after they are submitted.
            </p>

          </div>

        )}

        {/* Cards */}

        {!loading && filteredHistory.length > 0 && (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredHistory.map((session) => (

              <AttendanceHistoryCard
                key={session.sessionId}
                session={session}
              />

            ))}

          </div>

        )}

      </div>


  );

}