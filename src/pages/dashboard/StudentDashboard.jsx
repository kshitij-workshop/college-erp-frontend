import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useAssignments } from "@/hooks/useAssignments";
import { useDashboard } from "@/hooks/useDashboard";
import { getClasses } from "@/api/attendanceApi";
import { getStudentResults } from "@/api/examApi";
import { getMySubjectOfferings } from "@/api/subjectOfferingApi";
import { getNotices } from "@/api/noticeApi";

import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarClock,
  ClipboardList,
  Mail,
  MapPin,
  Users,
  Clock3,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionCard({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {Icon ? <Icon className="h-5 w-5 text-slate-400" /> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dashboard: studentDashboard, loading: dashboardLoading } =
    useDashboard();
  const { assignments, loading: assignmentsLoading } = useAssignments();

  const [todayClasses, setTodayClasses] = useState([]);
  const [studentResults, setStudentResults] = useState([]);
  const [notices, setNotices] = useState([]);
  const [subjectOfferings, setSubjectOfferings] = useState([]);

  const [classesLoading, setClassesLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [noticesLoading, setNoticesLoading] = useState(true);
  const [offeringsLoading, setOfferingsLoading] = useState(true);

  const displayName =
    studentDashboard?.studentName || user?.fullName || user?.name || "Student";
  const email = user?.email || "—";
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let active = true;

    async function loadTodayClasses() {
      try {
        setClassesLoading(true);
        const response = await getClasses(today);
        if (!active) return;
        setTodayClasses(response.data.data ?? []);
      } catch (error) {
        console.error(error);
        if (active) setTodayClasses([]);
      } finally {
        if (active) setClassesLoading(false);
      }
    }

    async function loadStudentResults() {
      if (!user?.id) return;
      try {
        setResultsLoading(true);
        const response = await getStudentResults(user.id, true);
        if (!active) return;
        setStudentResults(response.data.data ?? []);
      } catch (error) {
        console.error(error);
        if (active) setStudentResults([]);
      } finally {
        if (active) setResultsLoading(false);
      }
    }

    async function loadNotices() {
      try {
        setNoticesLoading(true);
        const response = await getNotices();
        if (!active) return;
        setNotices((response.data.data ?? []).slice(0, 5));
      } catch (error) {
        console.error(error);
        if (active) setNotices([]);
      } finally {
        if (active) setNoticesLoading(false);
      }
    }

    async function loadMySubjectOfferings() {
      try {
        setOfferingsLoading(true);
        const response = await getMySubjectOfferings();
        if (!active) return;
        setSubjectOfferings(response.data.data ?? []);
      } catch (error) {
        console.error(error);
        if (active) setSubjectOfferings([]);
      } finally {
        if (active) setOfferingsLoading(false);
      }
    }
    loadTodayClasses();
    loadTodayClasses();
    loadStudentResults();
    loadNotices();
    loadMySubjectOfferings();

    return () => {
      active = false;
    };
  }, [today, user?.id]);

  const loading =
    dashboardLoading ||
    classesLoading ||
    resultsLoading ||
    noticesLoading ||
    offeringsLoading ||
    assignmentsLoading;

  const hasContent =
    Boolean(studentDashboard) ||
    todayClasses.length > 0 ||
    assignments.length > 0 ||
    studentResults.length > 0 ||
    notices.length > 0;

  if (loading && !hasContent) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-48 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-72 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-100" />
        </div>

        <div className="grid gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2" />
          <div className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  const overallAttendancePercentage =
    studentDashboard?.overallAttendancePercentage ?? 0;
  const totalAssignmentsSubmitted =
    studentDashboard?.totalAssignmentsSubmitted ?? 0;
  const totalExamsAppeared = studentDashboard?.totalExamsAppeared ?? 0;
  const booksCurrentlyIssued = studentDashboard?.booksCurrentlyIssued ?? 0;
  const pendingFeeAmount = studentDashboard?.pendingFeeAmount ?? 0;
  const formattedPendingFee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(pendingFeeAmount);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {getGreeting()}, {displayName}
        </h1>

        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Keep track of your classes, assignments, exams, attendance, and grades
          from one place.
        </p>
        <br />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={() => navigate("/dashboard/timetable")}>
            My Timetable
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/assignments")}
          >
            Assignments
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/exams")}
          >
            Exams
          </Button>
        </div>

        <br />

        <div className="grid gap-3 pt-2 sm:grid-cols-2 xl:grid-cols-4">
          <StatRow icon={Mail} label="Email" value={email} />
          <StatRow
            icon={ClipboardList}
            label="Roll Number"
            value={studentDashboard?.rollNumber || "—"}
          />
          <StatRow
            icon={Award}
            label="Registration Number"
            value={studentDashboard?.registrationNumber || "—"}
          />
          <StatRow
            icon={BookOpen}
            label="Program"
            value={studentDashboard?.programName || "—"}
          />
          <StatRow
            icon={Users}
            label="Section"
            value={studentDashboard?.sectionName || "—"}
          />
          <StatRow
            icon={CalendarClock}
            label="Semester"
            value={studentDashboard?.semesterNumber || "—"}
          />
          <StatRow icon={Bell} label="Role" value={user?.role || "STUDENT"} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendancePercentage}%`}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Assignments Submitted"
          value={totalAssignmentsSubmitted}
          icon={ClipboardList}
          color="orange"
        />
        <StatCard
          title="Exams Appeared"
          value={totalExamsAppeared}
          icon={CalendarClock}
          color="blue"
        />
        <StatCard
          title="Books Issued"
          value={booksCurrentlyIssued}
          icon={BookOpen}
          color="purple"
        />
        <StatCard
          title="Pending Fee"
          value={formattedPendingFee}
          icon={AlertCircle}
          color="purple"
        />
      </div>

      <br />
      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Today's Classes"
          description="Classes scheduled for today."
          icon={Clock3}
        >
          <div className="space-y-3">
            {todayClasses.length ? (
              todayClasses.slice(0, 4).map((classItem) => (
                <div
                  key={classItem.timetableEntryId}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {classItem.subjectName}
                        </p>
                        {classItem.attendanceMarked ? (
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                            Attended
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {classItem.subjectCode} • {classItem.sectionName}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-slate-500">
                      {formatDateTime(`${today}T${classItem.startTime}`)} -{" "}
                      {formatDateTime(`${today}T${classItem.endTime}`)}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Room {classItem.roomNumber}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {classItem.facultyName}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No classes scheduled for today.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="My Courses"
          description="Subject offerings you are enrolled in."
          icon={BookOpen}
        >
          <div className="space-y-3">
            {subjectOfferings.length ? (
              subjectOfferings.slice(0, 6).map((offering) => (
                <div
                  key={offering.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">
                    {offering.subjectName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {offering.subjectCode} • Sem {offering.semesterNumber} •{" "}
                    {offering.sectionName}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                    {offering.programName} • {offering.academicSession}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No enrolled courses are available.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Quick Actions"
          description="Jump to common tasks."
          icon={ArrowRight}
        >
          <div className="space-y-3">
            <Button
              variant="outline"
              className="h-auto w-full justify-start rounded-2xl border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50"
              onClick={() => navigate("/dashboard/timetable")}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">View Timetable</p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Check your class schedule.
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full justify-start rounded-2xl border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50"
              onClick={() => navigate("/dashboard/assignments")}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    View Assignments
                  </p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Check pending assignments.
                  </p>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full justify-start rounded-2xl border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50"
              onClick={() => navigate("/dashboard/exams")}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                  <CalendarClock className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">View Exams</p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Check exam schedules.
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Pending Assignments"
          description="Assignments due soon."
          icon={ClipboardList}
        >
          <div className="space-y-3">
            {assignments.length ? (
              assignments
                .filter((a) => new Date(a.dueDate) > new Date())
                .slice(0, 4)
                .map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {assignment.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {assignment.subjectName} • {assignment.sectionName}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        {formatDateTime(assignment.dueDate)}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No pending assignments.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Exam Results"
          description="Published exam results."
          icon={Award}
        >
          <div className="space-y-3">
            {studentResults.length ? (
              studentResults.slice(0, 4).map((result) => (
                <div
                  key={result.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {result.examName}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {result.subjectName} • {result.sectionName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm font-semibold text-slate-900">
                        {result.marks}/{result.maxMarks}
                      </p>
                      <p className="text-xs text-slate-500">
                        {((result.marks / result.maxMarks) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No published results yet.
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Latest Notices"
        description="Recent announcements and updates."
        icon={Bell}
      >
        <div className="space-y-3">
          {notices.length ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-xl bg-blue-100 p-2 text-blue-700">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">
                      {notice.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {notice.content}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {formatDate(notice.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              No notices yet.
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
