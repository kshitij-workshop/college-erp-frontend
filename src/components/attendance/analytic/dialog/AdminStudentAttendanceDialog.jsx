import { useEffect, useState } from "react";
import {
  User,
  BookOpen,
  Percent,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { getStudentOverallAttendance } from "@/api/attendanceApi";
import StudentSubjectAttendanceDialog from "./StudentSubjectAttendanceDialog";

export default function AdminStudentAttendanceDialog({
  open,
  onOpenChange,
  student,
}) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  async function loadStudent() {
    if (!student) return;
    try {
      setLoading(true);
      const response = await getStudentOverallAttendance(student.studentId);
      setDetails(response.data.data);
    } catch (error) {
      console.error("Failed to load student attendance", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadStudent();
    }
  }, [open, student]);

  function openHistory(subject) {
    setSelectedSubject(subject);
    setHistoryOpen(true);
  }

  // Dynamic theme logic based on attendance percentage
  const getTheme = (percentage) => {
    if (percentage >= 90) return { text: "text-green-600", bg: "[&>div]:bg-green-500", hover: "hover:border-green-300 hover:bg-green-50" };
    if (percentage >= 75) return { text: "text-blue-600", bg: "[&>div]:bg-blue-500", hover: "hover:border-blue-300 hover:bg-blue-50" };
    return { text: "text-red-600", bg: "[&>div]:bg-red-500", hover: "hover:border-red-300 hover:bg-red-50" };
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* Full-bleed header trick with p-0 and overflow-hidden */}
        <DialogContent className="w-[95vw] sm:max-w-4xl p-0 overflow-hidden rounded-2xl gap-0">
          
          <DialogHeader className="px-5 sm:px-8 py-5 border-b bg-white text-left">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900">
              Student Attendance Overview
            </DialogTitle>
          </DialogHeader>

          {/* Scrollable area */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 max-h-[75vh] overflow-y-auto bg-slate-50/50">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 opacity-60">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">
                  Loading attendance data...
                </p>
              </div>
            ) : details ? (
              <div className="space-y-6 sm:space-y-8">
                
                {/* Stats Grid */}
                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                  <Card className="rounded-2xl border-slate-200 shadow-sm border-0 bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <User className="h-4 w-4" />
                        Student Profile
                      </div>
                      <h2 className="mt-2 text-lg sm:text-xl font-bold text-slate-900 truncate">
                        {details.studentName}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Reg No: {details.registrationNumber}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl border-slate-200 shadow-sm border-0 bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <Percent className="h-4 w-4" />
                        Overall Attendance
                      </div>
                      <div className="mt-2">
                        <div className="flex items-end justify-between mb-2">
                          <h2 className={`text-2xl sm:text-3xl font-extrabold ${getTheme(details.overallPercentage).text}`}>
                            {details.overallPercentage.toFixed(1)}%
                          </h2>
                          <Badge variant="outline" className="text-slate-600 bg-slate-50">
                            {details.presentClasses} / {details.totalClasses} Classes
                          </Badge>
                        </div>
                        <Progress
                          value={details.overallPercentage}
                          className={`h-2.5 sm:h-3 bg-slate-100 ${getTheme(details.overallPercentage).bg}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Subjects List */}
                <div>
                  <div className="mb-4 flex items-center gap-2 text-slate-900 ml-1">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Subject-wise Breakdown</h3>
                  </div>

                  <div className="space-y-3">
                    {details.subjects.map((subject) => {
                      const theme = getTheme(subject.percentage);
                      return (
                        <button
                          key={subject.subjectOfferingId}
                          type="button"
                          onClick={() => openHistory(subject)}
                          // Mobile vs Desktop styling logic applied here
                          className={`group flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border bg-white p-4 sm:p-5 text-left shadow-sm transition-all duration-200 hover:shadow-md ${theme.hover}`}
                        >
                          <div className="space-y-1.5 overflow-hidden w-full">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <h4 className="font-bold text-slate-900 truncate">
                                {subject.subjectName}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {subject.subjectCode}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-slate-500">
                              {subject.presentClasses} / {subject.totalClasses} Classes Attended
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 w-full sm:w-auto border-t border-slate-100 sm:border-0 pt-3 sm:pt-0">
                            <div className="text-left sm:text-right">
                              <p className={`text-xl font-extrabold ${theme.text}`}>
                                {subject.percentage.toFixed(1)}%
                              </p>
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Attendance
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 font-medium">
                No attendance data found.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <StudentSubjectAttendanceDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        studentId={details?.studentId}
        subjectOfferingId={selectedSubject?.subjectOfferingId}
      />
    </>
  );
}