import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useAssignments } from "@/hooks/useAssignments";
import { useExams } from "@/hooks/useExams";
import { getMySubjectOfferings } from "@/api/subjectOfferingApi";
import { getClasses } from "@/api/attendanceApi";
import { useDashboard } from "@/hooks/useDashboard";

import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  Mail,
  MapPin,
  Users,
  Clock3,
  Building2,
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

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
    const { dashboard:facultyDashboard, loading: dashboardLoading } =
      useDashboard();
  const { assignments, loading: assignmentsLoading } = useAssignments();
  const { exams, loading: examsLoading } = useExams();

  const [subjectOfferings, setSubjectOfferings] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [offeringsLoading, setOfferingsLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(true);

  const displayName = user?.fullName || user?.name || "Faculty";
  const email = user?.email || "—";
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let active = true;

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

    loadMySubjectOfferings();
    loadTodayClasses();

    return () => {
      active = false;
    };
  }, [today, user?.email, user?.fullName, user?.name]);

  const loading =
    assignmentsLoading || examsLoading || offeringsLoading || classesLoading;

  const hasContent =
    subjectOfferings.length > 0 ||
    todayClasses.length > 0 ||
    assignments.length > 0 ||
    exams.length > 0;

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {getGreeting()}, {displayName}
        </h1>

        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Keep track of today&apos;s classes, assigned subjects, assignments,
          and exams from one place.
        </p>
        <br />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={() => navigate("/dashboard/attendance")}>
            Mark attendance
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
          <StatRow icon={Bell} label="Role" value={user?.role || "FACULTY"} />
          <StatRow icon={Building2} label="Department" value={facultyDashboard?.departmentName || "FACULTY"} />
          <StatRow icon={Bell} label="EMP-CODE" value={facultyDashboard?.employeeCode || "FACULTY"} />


        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Subject Offerings"
          value={subjectOfferings.length}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Today's Classes"
          value={todayClasses.length}
          icon={Clock3}
          color="green"
        />
        <StatCard
          title="Assignments"
          value={assignments.length}
          icon={ClipboardList}
          color="orange"
        />
        <StatCard
          title="Exams"
          value={exams.length}
          icon={CalendarClock}
          color="purple"
        />
      </div>

      <br />
      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Today's classes"
          description="Classes scheduled for the selected date."
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
                            Submitted
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
                      {formatDateTime(`${classItem.startTime}`)} -{" "}
                      {formatDateTime(`${classItem.endTime}`)}
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
                No classes scheduled for this date.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Assigned subjects"
          description="Subject offerings currently assigned to you."
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
                No assigned subjects are available yet.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Quick actions"
          description="Jump straight to common faculty tasks."
          icon={ArrowRight}
        >
          <div className="space-y-3">
            <Button
              variant="outline"
              className="h-auto w-full justify-start rounded-2xl border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50"
              onClick={() => navigate("/dashboard/attendance")}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                  <ClipboardCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Mark attendance
                  </p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Open today&apos;s class attendance.
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
                    Review assignments
                  </p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    See active assignment work.
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
                  <p className="font-semibold text-slate-900">Check exams</p>
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Review exam schedules and status.
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Assignments"
          description="Recent assignments across your subject offerings."
          icon={ClipboardList}
        >
          <div className="space-y-3">
            {assignments.length ? (
              assignments.slice(0, 4).map((assignment) => (
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
                No assignments found.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Exams"
          description="Recent exams tied to your offerings."
          icon={CalendarClock}
        >
          <div className="space-y-3">
            {exams.length ? (
              exams.slice(0, 4).map((exam) => (
                <div
                  key={exam.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {exam.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {exam.subjectName} • Section {exam.sectionName}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-slate-500">
                      {formatDate(exam.examDate)}
                    </p>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    Max marks {exam.maxMarks} •{" "}
                    {exam.resultPublished
                      ? "Published"
                      : exam.locked
                        ? "Locked"
                        : "Draft"}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                No exams found.
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
