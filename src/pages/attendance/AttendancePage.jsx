import { Save, History } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useAttendance } from "@/hooks/useAttendance";


import TodayClasses from "@/components/attendance/TodayClasses";
import StudentAttendanceTable from "@/components/attendance/StudentAttendanceTable";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AttendancePage() {
  const navigate = useNavigate();

  const {
    selectedDate,
    setSelectedDate,

    classes,
    selectedClass,

    students,

    attendance,

    summary,

    loadingClasses,
    loadingStudents,

    saving,

    selectClass,

    updateAttendance,

    saveAttendance,
    markAllPresent,

    attendanceMarked,

  } = useAttendance();

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}

      <PageHeader
        title="Attendance"
        description="Mark attendance for today's classes."
        buttonText="Attendance History"
        buttonIcon={History}
        onButtonClick={() => navigate("/dashboard/attendance/history")}
      />

      {/* Date */}

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">Select Date</h3>

            <p className="text-sm text-slate-500">
              Choose a date to view your scheduled classes.
            </p>
          </div>

          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-56"
          />
        </CardContent>
      </Card>

      {/* Today's Classes */}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Today's Classes</h2>

        <TodayClasses
          classes={classes}
          selectedClass={selectedClass}
          onSelect={selectClass}
          loading={loadingClasses}
        />
      </div>

      {/* Summary */}

      {students.length > 0 && <AttendanceSummary summary={summary} />}

      {/* Students */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Students</h2>

          <Button
            variant="outline"
            onClick={markAllPresent}
            disabled={!students.length}
          >
            Mark All Present
          </Button>
        </div>

        <StudentAttendanceTable
          students={students}
          attendance={attendance}
          onStatusChange={updateAttendance}
          loading={loadingStudents}
        />
      </div>

      {/* Save */}

      {students.length > 0 && (
        <div className="flex justify-end">
          <Button size="lg" onClick={() => setOpen(true)} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : attendanceMarked ? "Update Attendance" : "Submit Attendance"}
          </Button>
          
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Attendance?</AlertDialogTitle>

                <AlertDialogDescription>
                  You are about to submit attendance for{" "}
                  <strong>{selectedClass?.subjectName}</strong>.
                  <br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={async () => {
                    await saveAttendance();
                    setOpen(false);
                  }}
                >
                  Submit Attendance
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
