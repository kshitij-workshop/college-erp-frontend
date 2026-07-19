import { Save, History, CalendarDays, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useAttendance } from "@/hooks/useAttendance";

import TodayClasses from "@/components/attendance/TodayClasses";
import StudentAttendanceTable from "@/components/attendance/StudentAttendanceTable";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";
import AttendanceAnalytics from "@/components/attendance/analytic/AttendanceAnalytics";

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
  const [open, setOpen] = useState(false);

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

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-10">
      
      <PageHeader
        title="Attendance Management"
        description="Track and manage daily student attendance records."
        buttonText="View History"
        buttonIcon={History}
        onButtonClick={() => navigate("/dashboard/attendance/history")}
      />

      <Tabs defaultValue="mark" className="space-y-6 sm:space-y-8">
        
        {/* Sleek Tabs */}
        <div className="bg-slate-50/50 p-1.5 rounded-xl border border-slate-200 inline-flex w-full sm:w-auto">
          <TabsList className="h-auto p-0 bg-transparent gap-1 w-full sm:w-auto grid grid-cols-2 sm:flex">
            <TabsTrigger 
              value="mark" 
              className="px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all font-semibold"
            >
              Mark Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="px-4 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all font-semibold"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ========================= */}
        {/* MARK ATTENDANCE */}
        {/* ========================= */}
        <TabsContent value="mark" className="space-y-6 sm:space-y-8 outline-none">
          
          {/* Enhanced Date Picker Card */}
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100/50 text-blue-600 rounded-xl">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Select Date</h3>
                  <p className="text-sm font-medium text-slate-500">
                    Choose a date to view scheduled classes.
                  </p>
                </div>
              </div>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-56 rounded-xl border-slate-200 h-11 bg-white focus-visible:ring-blue-500/20"
              />
            </CardContent>
          </Card>

          {/* Classes Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
            </div>
            <TodayClasses
              classes={classes}
              selectedClass={selectedClass}
              onSelect={selectClass}
              loading={loadingClasses}
            />
          </div>

          {students.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AttendanceSummary summary={summary} />
            </div>
          )}

          {/* Students Section */}
          {students.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
              
              {/* Premium Control Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Users className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Student List</h2>
                    <p className="text-xs font-medium text-slate-500">
                      {students.length} students enrolled
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={markAllPresent}
                  disabled={!students.length}
                  className="rounded-xl font-semibold border-slate-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors w-full sm:w-auto"
                >
                  Mark All Present
                </Button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <StudentAttendanceTable
                  students={students}
                  attendance={attendance}
                  onStatusChange={updateAttendance}
                  loading={loadingStudents}
                />
              </div>

              {/* Enhanced Submit Button */}
              <div className="pt-4 flex justify-end">
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  disabled={saving}
                  className="w-full sm:w-auto rounded-xl shadow-md font-semibold text-base px-8 h-12"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {saving
                    ? "Saving Records..."
                    : attendanceMarked
                    ? "Update Attendance"
                    : "Submit Attendance"}
                </Button>
              </div>
            </div>
          )}

        </TabsContent>

        {/* ========================= */}
        {/* ANALYTICS */}
        {/* ========================= */}
        <TabsContent value="analytics" className="outline-none">
          <AttendanceAnalytics />
        </TabsContent>
      </Tabs>

      {/* Premium Alert Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md p-0 overflow-hidden">
          <div className="p-6 bg-white">
            <AlertDialogHeader className="text-left flex flex-row items-start gap-4 space-y-0">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl font-bold">
                  Submit Attendance?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-slate-500 font-medium">
                  You are about to submit the final attendance records for{" "}
                  <span className="font-bold text-slate-900">
                    {selectedClass?.subjectName}
                  </span>.
                  <br className="mb-2" />
                  Make sure all entries are correct before proceeding.
                </AlertDialogDescription>
              </div>
            </AlertDialogHeader>
          </div>
          
          <div className="bg-slate-50 p-4 sm:p-6 border-t flex flex-col-reverse sm:flex-row justify-end gap-3">
            <AlertDialogCancel className="mt-0 rounded-xl font-semibold">
              Review Again
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl font-semibold px-6"
              onClick={async () => {
                await saveAttendance();
                setOpen(false);
              }}
            >
              Confirm Submission
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
